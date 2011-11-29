exports.createNavigator = function(masterWindow) {
	if (Ti.Platform.osname === 'android') {
		masterWindow.open();
		return {
            open: function (win, obj) {
                win.open(obj);
            },
            close: function (win, obj) {
                win.close(obj);
            }
        };
	} else {
		var appWindow = Ti.UI.createWindow();
        var navGroup = Ti.UI.iPhone.createNavigationGroup({
            window: masterWindow
        });
        appWindow.add(navGroup);
        appWindow.open();
        return navGroup;
	}
};