/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';

	if (OS_IOS) {

		// open SplitWindow for iPad
		if (Alloy.isTablet) {
			$.splitWin.open();

			// open NavigationWindow for iPhone
		} else {
			$.navWin.open();
		}

		// open master controller's view for other platforms
	} else {
		$.masterCtrl.getView().open();
	}

	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});

/**
 * event listener set via view for the select-event of the master controller
 * @param  {Object} e Event
 */
function onSelect(e) {
	'use strict';

	// selected model passed with the event
	var model = e.model;

	// create the detail controller with the model and get its view
	var win = Alloy.createController('detail', {
		model: model
	}).getView();

	// open the window in the NavigationWindow for iOS
	if (OS_IOS) {
		$.navWin.openWindow(win);

		// open the window over the master for other platform
	} else {
		win.open();
	}
}
