// require the built-in MomentJS library
var moment = require('alloy/moment');

/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';

	// use the refresh callback for the initial load
	refresh();

	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});

/**
 * event listener added via view for the refreshControl (iOS) or button (Android)
 * @param  {Object} e Event, unless it was called from the constructor
 */
function refresh(e) {
	'use strict';

	// if we were called from the constructor programmatically show the refresh animation
	if (OS_IOS && !e) {
		$.refreshControl.beginRefreshing();
	}

	/**
	 * callback for fetch, both success and error
	 * @param  {Object} e Event
	 */
	function afterFetch(col, res) {

		// for iOS end the refreshing animation
		if (OS_IOS) {
			$.refreshControl.endRefreshing();
		}
	}

	// MobileWeb can't load the remote file because we don't have access control set-up
	var url = OS_MOBILEWEB ? Ti.Filesystem.resourcesDirectory + 'feed.xml' : Alloy.CFG.url;

	// let the collection fetch data from it's data source
	Alloy.Collections.feed.fetch({
		url: url,
		success: afterFetch,
		error: afterFetch
	});
}

/**
 * set via view to be applied on each model before it renders
 * @param  {Object} model BackBone model
 * @return {Object}       Transformed properties
 */
function transform(model) {
	'use strict';

	var transformed = model.toJSON();

	// return a formatted version of pubDate
	transformed.pubDate = moment(model.get('pubDate'), 'DD MMM YYYY HH:mm:ss ZZ').format('LLL');

	return transformed;
}

/**
 * event listener set via view for when the user selects a ListView item
 * @param  {Object} e Event
 */
function select(e) {
	'use strict';

	// we've stored the guid in the special itemId property of the item
	var guid = OS_MOBILEWEB ? e.row.itemId : e.itemId;

	// lookup the model
	var model = Alloy.Collections.feed.get(guid);

	// trigger the select event on this controller, passing the model with it
	// the index controller has an event listener for this event
	$.trigger('select', {
		model: model
	});
}
