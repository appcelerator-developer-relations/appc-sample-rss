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
	function afterFetch(e) {

		// for iOS end the refreshing animation
		if (OS_IOS) {
			$.refreshControl.endRefreshing();
		}
	}

	// let the collection fetch data from it's data source
	Alloy.Collections.feed.fetch({

		// use the URL set in config.json
		url: Alloy.CFG.url,

		// remove comments and comment out the above to load from a local XML file instead
		// url: Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'feed.xml').read().text,

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

	// return a formatted version of pubDate
	return {
		pubDate: moment(model.get('pubDate'), 'DD MMM YYYY HH:mm:ss ZZ').format('LLL')
	};
}

/**
 * event listener set via view for when the user selects a ListView item
 * @param  {Object} e Event
 */
function select(e) {
	'use strict';

	// we've stored the guid in the special itemId property of the item
	var guid = e.itemId;

	// lookup the model
	var model = Alloy.Collections.feed.get(guid);

	// trigger the select event on this controller, passing the model with it
	// the index controller has an event listener for this event
	$.trigger('select', {
		model: model
	});
}
