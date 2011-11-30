//Detail View Component Constructor
exports.DetailView = function() {
	var self = Ti.UI.createView();
	var webview = Ti.UI.createWebView();
	self.add(webview);

	self.addEventListener('itemSelected', function(e) {
		webview.url = e.link;
	});

	return self;
};
