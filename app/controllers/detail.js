/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';

	// model passed to the controller
	var model = args.model;

	// set the Window title and WebView URL
	$.win.title = model.get('title');
	$.webView.url = model.get('link');

	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});

/**
 * Event listener set via view to be called on when the user taps the home-icon (Android)
 */
function close() {
	'use strict';

	// close the window, showing the master window behind it
	$.win.close();
}
