// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;

	//considering tablet to have one dimension over 900px - can define your own
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow').ApplicationWindow;
	}
	else {
		if (osname === 'android') {
			Window = require('ui/handheld/android/ApplicationWindow').ApplicationWindow;
		}
		else {
			Window = require('ui/handheld/ios/ApplicationWindow').ApplicationWindow;
		}
	}
	new Window().open();
	
	require('rss').loadRssFeed();
})();
