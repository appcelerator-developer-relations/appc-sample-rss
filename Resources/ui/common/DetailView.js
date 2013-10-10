//Detail View Component Constructor
function DetailView() {
	var self = Ti.UI.createView();
	var webview = Ti.UI.createWebView();
	self.add(webview);

	self.showArticle = function(url) {
		webview.url = url;
	};
	
	webview.addEventListener('load', function(e) {
		self.fireEvent('articleLoaded');
	});
	
	return self;
}
module.exports = DetailView;
