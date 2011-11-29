// App namespace for preventing global pollution
SampleRss = {};
var rss = require('rss');

// Create main RSS feed window
var masterWindow = Ti.UI.createWindow({
	title: 'RSS Reader',
	backgroundColor: '#fff',
	navBarHidden: false,
	exitOnClose: true
});
var button = Ti.UI.createButton({
	systemButton: Ti.UI.iPhone.SystemButton.REFRESH
});
button.addEventListener('click', function(e) {
	Ti.API.debug('clicked refresh button');
	rss.loadRssFeed();
});
masterWindow.rightNavButton = button;
var tableview = Ti.UI.createTableView();
masterWindow.add(tableview);

// Handle data refreshes
Ti.App.addEventListener('app:dataRefresh', function(e) {
	if (Object.prototype.toString.apply(e.data) === '[object Array]') {
		var rows = [];
		for (var i = 0; i < e.data.length; i++) {
			var item = e.data[i];
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
			Ti.API.info(item.pubDate);
			var dateview = Ti.UI.createLabel({
				text: item.pubDate,
				textAlign: 'center',
				color: '#555',
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
			rows.push(tablerow);
		}
		tableview.setData(rows);
	}
});

// Open the master window and return the cross-platform nav controller
SampleRss.navigator = require('nav').createNavigator(masterWindow);
rss.loadRssFeed();
