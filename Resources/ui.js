var actInd = Ti.UI.createActivityIndicator({
	message: 'Loading RSS...',
	color: '#fff'
});

var createRssRow = function(item) {
	var tablerow = Ti.UI.createTableViewRow({
		height: '70dp',
		link: item.link,
		hasChild: true
	});
	var imageview = Ti.UI.createImageView({
		image: item.image,
		height: '42dp',
		width: '68dp',
		left: '5dp',
		top: '3dp'
	});
	var titleview = Ti.UI.createLabel({
		text: item.title,
		color: '#000',
		font: {
			fontSize: '16dp'
		},
		left: '83dp',
		right: '5dp'
	});
	var dateview = Ti.UI.createLabel({
		text: item.pubDate,
		textAlign: 'center',
		color: '#444',
		font: {
			fontSize: '12dp'	
		},
		height: 'auto',
		width: '68dp',
		left: '5dp',
		bottom: '3dp'
	});
	tablerow.add(imageview);
	tablerow.add(dateview);
	tablerow.add(titleview);
	
	return tablerow;
};

var createDetailWindow = function(link) {
	var detailWindow = Ti.UI.createWindow({
		backgroundColor: '#fff',
		navBarHidden: false	
	});
	var webview = Ti.UI.createWebView({
		url: link
	});
	detailWindow.add(webview);
	return detailWindow;
};

exports.createMasterWindow = function() {
	var rss = require('rss');
	var masterWindow = Ti.UI.createWindow({
		title: 'RSS Reader',
		backgroundColor: '#fff',
		navBarHidden: false,
		fullscreen: false,
		exitOnClose: true
	});
	var tableview = Ti.UI.createTableView();
	
	tableview.addEventListener('click', function(e) {
		SampleRss.navigator.open(createDetailWindow(e.row.link));
	});
	
	if (Ti.Platform.osname === 'android') {
		masterWindow.addEventListener('focus', function() {
			masterWindow.activity.onCreateOptionsMenu = function(e) {
				Ti.API.info('onCreateOptionsMenu');
			    var menu = e.menu;
			    var menuItem = menu.add({ title: "Refresh" });
			    menuItem.setIcon("refresh_icon.png");
			    menuItem.addEventListener("click", function(e) {
			        rss.loadRssFeed();
			    });
			};
		});
	} else {
		var button = Ti.UI.createButton({
			systemButton: Ti.UI.iPhone.SystemButton.REFRESH
		});
		button.addEventListener('click', function(e) {
			Ti.API.debug('clicked refresh button');
			rss.loadRssFeed();
		});
		masterWindow.rightNavButton = button;
	}
	
	Ti.App.addEventListener('app:dataStart', function() {
		actInd.show();
	});
	
	Ti.App.addEventListener('app:dataError', function() {
		actInd.hide();
	});
	
	Ti.App.addEventListener('app:dataLoad', function(e) {
		if (Object.prototype.toString.apply(e.data) === '[object Array]') {
			var rows = [];
			for (var i = 0; i < e.data.length; i++) {
				rows.push(createRssRow(e.data[i]));
			}
			tableview.setData(rows);
		}
		actInd.hide();
	});
	
	masterWindow.add(tableview);
	return masterWindow;
};