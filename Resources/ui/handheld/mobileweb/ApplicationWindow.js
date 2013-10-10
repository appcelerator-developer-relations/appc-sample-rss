//Application Window Component Constructor
function ApplicationWindow() {
	//declare module dependencies
	var rss = require('services/rss'),
		MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');

	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#fff'
	});

	//construct UI
	var masterView = new MasterView(),
		detailView = new DetailView();

	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title:'RSS Reader',
		layout: 'vertical'
	});
	var button = Ti.UI.createButton({
		backgroundImage: 'images/refresh_icon.png',
		width: 40,
		height: 40,
		top: 0,
		right: 10
	});
	button.addEventListener('click', function(e) {
		refreshRSS();
	});
	masterContainerWindow.add(button);
	masterContainerWindow.add(masterView);

	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow();
	detailContainerWindow.add(detailView);

	//create Mobile Web specific NavGroup UI
	var navGroup = Ti.UI.MobileWeb.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.showArticle(e.link);
		navGroup.open(detailContainerWindow);
	});
	
	function refreshRSS() {
		rss.loadRssFeed({
			success: function(data) {
	    		masterView.refreshRssTable(data);
	    	}
		});
	}
	
	// load initial rss feed
	refreshRSS();
	
	return self;
};
module.exports = ApplicationWindow;