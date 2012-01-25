//Application Window Component Constructor
function ApplicationWindow() {
	//declare module dependencies
	var rss = require('services/rss'),
		MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');

	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});

	//construct UI
	var masterView = new MasterView(),
		detailView = new DetailView();
	var titlebar = Ti.UI.createView({
		backgroundColor: '#aaa',
		heigth: 50,
		top: 0,
		left: 0
	});
	var titleLabel = Ti.UI.createLabel({
		text: 'RSS Reader',
		backgroundColor: '#aaa',
		color: '#fff',
		font: {
			fontSize: 32,
			fontWeight: 'bold'	
		},
		height: 'auto',
		textAlign: 'center',
		top: 6
	});
	var titleButton = Ti.UI.createButton({
		title: 'Refresh',
		height: 40,
		width: 100,
		right: 15,
		top: 5
	});
	titleButton.addEventListener('click', function(e) {
		refreshRSS(masterView);
	});
	titlebar.add(titleLabel);
	titlebar.add(titleButton);
	self.add(titlebar);

	masterView.borderColor = '#000';
	masterView.borderWidth = 1;

	//create master view container
	var masterContainer = Ti.UI.createView({
		top:50,
		bottom:0,
		left:0,
		width:240
	});
	masterContainer.add(masterView);
	self.add(masterContainer);

	//create detail view container
	var detailContainer = Ti.UI.createView({
		top:50,
		bottom:0,
		right:0,
		left:240
	});
	detailContainer.add(detailView);
	self.add(detailContainer);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.showArticle(e.link);
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
}
module.exports = ApplicationWindow;