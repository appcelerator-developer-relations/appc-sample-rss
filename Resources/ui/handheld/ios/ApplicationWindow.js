//Application Window Component Constructor
exports.ApplicationWindow = function() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView').MasterView,
		DetailView = require('ui/common/DetailView').DetailView;
		rss = require('rss');

	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});

	//construct UI
	var masterView = new MasterView(),
		detailView = new DetailView();

	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title:'RSS Reader'
	});
	var button = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.REFRESH
	});
	button.addEventListener('click', function(e) {
		refreshRss(masterView);
	});
	masterContainerWindow.rightNavButton = button;
	masterContainerWindow.add(masterView);

	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow();
	detailContainerWindow.add(detailView);

	//createiOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected', e);
		navGroup.open(detailContainerWindow);
	});
	
	// load initial rss feed
	refreshRss(masterView);

	return self;
};

var refreshRss = function(masterView) {
	rss.loadRssFeed({
		success: function(data) {
    			masterView.refreshRssTable(data);
    		}	
	});
};