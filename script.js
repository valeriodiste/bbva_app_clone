// Function used to show the dimensions of the screen, the window, and the document on the page at document load
function showDimensions() {

	// Add a div with, inside, the dimensions of the screen, the window, and the document
	$('#main').append('<div id="dimensions" style="z-index: 10; font-size: 24px; color: #ffffff;"></div>');
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
function toggleSeconndaryPage(activate) {

	// Get the main and secondary sections
	let mainSection = $("#main-section");
	let secondarySection = $("#secondary-section");

	if (activate) {
		// Hide the main section and show the secondary section
		mainSection.css("opacity", 0);
		secondarySection.css("opacity", 1);
		// Change the meta tag with name "theme-color" to "#358551" (green color)
		// $("meta[name='theme-color']").attr("content", "#358551");
	} else {
		// Hide the secondary section and show the main section
		mainSection.css("opacity", 1);
		secondarySection.css("opacity", 0);
		// Change back the meta tag with name "theme-color" to "#ffffff" (white color)
		// $("meta[name='theme-color']").attr("content", "#ffffff");
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
			// Activate the secondary page
			toggleSeconndaryPage(true);
			// Set the opacity to 0
			mainSectionButtonClickOverlay.css("opacity", "0");
		}, 250);
	});

	// On click of the "back" button on Android, go back to the main page
	let backButton = $("#back-button");
	backButton.on("click", function () {
		toggleSeconndaryPage(false);
	});

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
	let priceValuesOn = true;
	togglePriceValues(false);

	// On click on the "price-values-toggle" button, toggle the price values on and off
	let priceValuesToggleButton = $("#price-values-toggle");
	priceValuesToggleButton.on("click", function () {
		priceValuesOn = !priceValuesOn;
		togglePriceValues(priceValuesOn);
	});

});