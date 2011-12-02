//Application Window Component Constructor
exports.ApplicationWindow = function() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView').MasterView,
		DetailView = require('ui/common/DetailView').DetailView;
		rss = require('rss');

	//create object instance
	var masterView = new MasterView();
	var actInd = Ti.UI.createActivityIndicator({
		message: 'Loading...',
		color: '#fff'
	});
	var self = Ti.UI.createWindow({
		title:'RSS Reader',
		backgroundColor:'#fff',
		exitOnClose:true,
		navBarHidden:false,
		activity: {
			onCreateOptionsMenu: function(e) {
			    var menu = e.menu;
			    var menuItem = menu.add({ title: "Refresh" });
			    menuItem.setIcon("images/refresh_icon.png");
			    menuItem.addEventListener("click", function(e) {
			    		refreshRss(masterView, actInd);
			    });
			}
		}
	});
	
	// refresh RSS when ApplicationWindow opens
	self.addEventListener('open', function() {
		refreshRss(masterView, actInd);
	});
	self.add(masterView);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		// Create a detail view window
		var detailView = new DetailView();
		var detailContainerWindow = Ti.UI.createWindow({
			navBarHidden: false,
			backgroundColor:'#fff'
		});
		detailContainerWindow.add(detailView);
		
		// Show an activity dialog in the status bar while the article loads
		var pb;
		detailContainerWindow.addEventListener('open', function() {
			pb = Titanium.UI.createActivityIndicator({
				location: Ti.UI.ActivityIndicator.STATUS_BAR,
				type: Ti.UI.ActivityIndicator.DETERMINANT,
		    		message:'Loading article...',
			});
			pb.show();
		});
		detailView.addEventListener('articleLoaded', function() {
			pb.hide();
		});
		detailView.fireEvent('itemSelected', e);
		
		detailContainerWindow.open();
	});

	return self;
};

var refreshRss = function(masterView, actInd) {
	require('rss').loadRssFeed({
    		start: function() { actInd.show(); },
    		error: function() { actInd.hide(); },
    		success: function(data) {
    			masterView.refreshRssTable(data);
    			actInd.hide();
    		}
    	});
};