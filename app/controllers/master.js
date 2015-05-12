var moment = require('alloy/moment');

(function constructor(args) {

	refresh();

})(arguments[0] || {});

function refresh(e) {

	if (OS_IOS && !e) {
		$.refreshControl.beginRefreshing();
	}

	function afterFetch(e) {

		if (OS_IOS) {
			$.refreshControl.endRefreshing();
		}
	}

	Alloy.Collections.feed.fetch({
		success: afterFetch,
		error: afterFetch
	});
}

function transform(model) {
	var transformed = model.toJSON();
	transformed.pubDate = moment(model.pubDate).format('LLL');
	return transformed;
}

function select(e) {
	var guid = e.itemId;
	var model = Alloy.Collections.feed.get(guid);

	$.trigger('select', {
		model: model
	});
}
