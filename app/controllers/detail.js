(function constructor(args) {

	if (args.model) {
		showArticle(args.model);
	}

})(arguments[0] || {});

function showArticle(model) {
	$.win.title = model.get('title');
	$.webView.url = model.get('link');
}

function close() {
	$.win.close();
}
