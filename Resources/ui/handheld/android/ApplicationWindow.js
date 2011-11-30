//Application Window Component Constructor
exports.ApplicationWindow = function() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView').MasterView,
		DetailView = require('ui/common/DetailView').DetailView;
		rss = require('rss');

	//create object instance
	var self = Ti.UI.createWindow({
		title:'RSS Reader',
		backgroundColor:'#fff',
		exitOnClose:true,
		navBarHidden:false
	});

	//construct UI
	var masterView = new MasterView(),
		detailView = new DetailView();

	//create master 
	self.addEventListener('open', function() {
		self.activity.onCreateOptionsMenu = function(e) {
		    var menu = e.menu;
		    var menuItem = menu.add({ title: "Refresh" });
		    menuItem.setIcon("images/refresh_icon.png");
		    menuItem.addEventListener("click", function(e) {
		        rss.loadRssFeed();
		    });
		};
	});
	self.add(masterView);

	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		navBarHidden: false,
		backgroundColor:'#fff'
	});
	detailContainerWindow.add(detailView);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected', e);
		detailContainerWindow.open();
	});

	return self;
};