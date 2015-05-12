if (OS_IOS) {

	if (Alloy.isTablet) {
		$.splitWin.open();

	} else {
		$.navWin.open();
	}

} else if (OS_ANDROID) {
	$.masterCtrl.getView().open();
}

function onSelect(e) {
	var model = e.model;

	var win = Alloy.createController('detail', {
		model: model
	}).getView();

	if (OS_IOS) {
		$.navWin.openWindow(win);

	} else {
		win.open();
	}
}
