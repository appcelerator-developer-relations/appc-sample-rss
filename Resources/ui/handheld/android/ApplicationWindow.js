//Application Window Component Constructor
function ApplicationWindow() {
	//declare module dependencies
	var rss = require('services/rss'),
		MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');

	//create object instance
	var self = Ti.UI.createWindow({
		title: 'RSS Reader',
		backgroundColor: '#fff',
		exitOnClose: true,
		navBarHidden: false,
		activity: {
			onCreateOptionsMenu: function(e) {
				var menu = e.menu;
				var menuItem = menu.add({
					title: "Refresh"
				});
				menuItem.setIcon("images/refresh_icon.png");
				menuItem.addEventListener("click", function(e) {
					refreshRSS();
				});
			}
		}
	});

	var masterView = new MasterView();
	var actInd = Ti.UI.createActivityIndicator({
		message: 'Loading...',
		color: '#fff'
	});
	self.add(masterView);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		// Create a detail view window
		var detailView = new DetailView();
		var detailContainerWindow = Ti.UI.createWindow({
			title: 'View Article',
			navBarHidden: false,
			backgroundColor: '#fff'
		});
		detailContainerWindow.add(detailView);

		// Show an activity dialog in the status bar while the article loads
		var pb;
		detailContainerWindow.addEventListener('open', function() {
			pb = Titanium.UI.createActivityIndicator({
				location: Ti.UI.ActivityIndicator.STATUS_BAR,
				type: Ti.UI.ActivityIndicator.DETERMINANT,
				message: 'Loading article...',
			});
			pb.show();
		});
		detailView.addEventListener('articleLoaded', function() {
			pb.hide();
		});

		detailView.showArticle(e.link);

		detailContainerWindow.open();
	});

	function refreshRSS() {
		rss.loadRssFeed({
			start: function() {
				actInd.show();
			},
			error: function() {
				actInd.hide();
			},
			success: function(data) {
				masterView.refreshRssTable(data);
				actInd.hide();
			}
		});
	}

	// refresh RSS when ApplicationWindow opens
	self.addEventListener('open', function() {
		refreshRSS();
	});

	return self;
}
module.exports = ApplicationWindow;