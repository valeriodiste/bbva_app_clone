// Function used to show the dimensions of the screen, the window, and the document on the page at document load
function showDimensions() {

	// Add a div with, inside, the dimensions of the screen, the window, and the document
	$('#main').append('<div id="dimensions" style="z-index: 10; font-size: 24px; color: #ffffff; background-color: #00000050;"></div>');
	$('#dimensions').append('<div id="screen"></div>');
	$('#dimensions').append('<div id="window"></div>');
	$('#dimensions').append('<div id="document"></div>');

	// Update the dimensions of the screen, the window, and the document
	function updateDimensions() {
		$('#screen').html('Screen: ' + screen.width + ' x ' + screen.height);
		$('#window').html('Window: ' + $(window).width() + ' x ' + $(window).height());
		$('#document').html('Document: ' + $(document).width() + ' x ' + $(document).height());
	}

	// Update the dimensions when the window is resized
	$(window).resize(updateDimensions);

	// Update the dimensions when the page is loaded
	updateDimensions();

}

// Functoin to move to the "balance" page
function toggleSecondaryPage(activate) {

	// Get the main and secondary sections
	let mainSection = $("#main-section");
	let secondarySection = $("#secondary-section");

	if (activate) {
		// Hide the main section and show the secondary section
		mainSection.css("opacity", 0);
		secondarySection.css("opacity", 1);
		mainSection.css("pointer-events", "none");
		secondarySection.css("pointer-events", "auto");
		// Change the meta tag with name "theme-color" to "#358551" (green color)
		// $("meta[name='theme-color']").attr("content", "#358551");
	} else {
		// Hide the secondary section and show the main section
		mainSection.css("opacity", 1);
		secondarySection.css("opacity", 0);
		mainSection.css("pointer-events", "auto");
		secondarySection.css("pointer-events", "none");
		// Change back the meta tag with name "theme-color" to "#ffffff" (white color)
		// $("meta[name='theme-color']").attr("content", "#ffffff");
	}

}

// Function to toggle the login overlay
function toggleLoginOverlay(activate) {
	let loginOverlay = $("#login-overlay");
	if (activate) {
		$("#password-input").val("");
		$("#password-input").css("border-color", "");
		loginOverlay.css("opacity", 1);
		loginOverlay.css("pointer-events", "auto");
	} else {
		loginOverlay.css("opacity", 0);
		loginOverlay.css("pointer-events", "none");
	}
}

// Wait for the document to be ready
$(document).ready(function () {

	// Call the function to show the screen, window, and document dimensions on the page
	// showDimensions();

	// Add click functions to the main section button to go to the secondary page
	let selectedOpacity = 0.3;
	let mainSectionButtonClickOverlay = $("#main-section-button");
	// On tap down, set the ticket overlay to have a selected opacity
	mainSectionButtonClickOverlay.on("touchstart", function () {
		mainSectionButtonClickOverlay.css("opacity", selectedOpacity);
	});
	// On tap up, set the button overlay to have an opacity of 0 and "activate" the secondary section
	mainSectionButtonClickOverlay.on("touchend", function () {
		// Wait 250ms before setting the opacity to 0 and activatig the secondary section
		setTimeout(function () {
			toggleSecondaryPage(true);
			mainSectionButtonClickOverlay.css("opacity", "0");
		}, 250);
	});

	// On click of the "back" button on Android, go back to the main page
	let backButton = $("#back-button");
	backButton.on("click", function () {
		toggleSecondaryPage(false);
	});

	// At start, show the main page
	toggleSecondaryPage(true);

	// Get the price values elements and map their text values
	let priceValues = $(".price-val");
	let priceValuesText = priceValues.map(function () {
		return $(this).text();
	}).get();

	// Trigger price values on-off
	function togglePriceValues(toggleOn) {
		if (toggleOn) {
			// Show price values
			priceValues.each(function (index) {
				$(this).text(priceValuesText[index]);
			});
		} else {
			// Hide price values
			priceValues.each(function () {
				$(this).text("***,**");
			});
		}
	}

	// At start, hide price values
	togglePriceValues(false);

	// On click on the "price-values-toggle" button, toggle the price values on and off
	let priceValuesOn = false;
	let priceValuesToggleButton = $("#price-values-toggle");
	priceValuesToggleButton.on("touchstart", function () {
		priceValuesToggleButton.css("opacity", selectedOpacity);
	});
	priceValuesToggleButton.on("touchend", function () {
		setTimeout(() => {
			priceValuesOn = !priceValuesOn;
			togglePriceValues(priceValuesOn);
			priceValuesToggleButton.css("opacity", "0");
		}, 250);
	});

	// After 500ms, make the "#main" section opacity visible (1)
	setTimeout(function () {
		$("#main").css("opacity", 1);
	}, 500);

	// At start, hide the login overlay
	toggleLoginOverlay(false);

	$("#login-button").on("click", function () {
		// toggleLoginOverlay(false);
		// $("#password-input").val("");
		$("#password-input").css("border-color", "#ff0000");
	});
	$("#cancel-login-button").on("click", function () {
		setTimeout(() => {
			toggleLoginOverlay(false);
		}, 250);
	});

	let buttons = [];
	buttons.push($(".secondary-section-button"));
	buttons.push($(".secondary-section-clickable-text"));
	for (let i = 0; i < buttons.length; i++) {
		$(buttons[i]).on("click", function () {
			setTimeout(() => {
				toggleLoginOverlay(true);
			}, 250);
		});
	}




});