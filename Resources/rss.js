var RSS_URL = 'http://feeds.mashable.com/Mashable?format=xml';
var MONTH_MAP = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };

var parseDate = function(dateString) {
	var dateParts = dateString.split(' ');
	var timeParts = dateParts[4].split(':');
	return MONTH_MAP[dateParts[2].toUpperCase()] + '/' + dateParts[1] + ' ' + timeParts[0] + ':' + timeParts[1];
};

exports.loadRssFeed = function(o) {
	var xhr = Titanium.Network.createHTTPClient();	
	xhr.open('GET', RSS_URL);
	xhr.onload = function() {
		var xml = this.responseXML;
		var items = xml.documentElement.getElementsByTagName("item");
		var data = [];

		for (var i = 0; i < items.length; i++) {
			var title = items.item(i).getElementsByTagName('title').item(0).text; 
			var link = items.item(i).getElementsByTagName('link').item(0).text; 
			var pubDate = parseDate(items.item(i).getElementsByTagName('pubDate').item(0).text);
			var image = items.item(i).getElementsByTagName('mash:thumbnail').item(0).getElementsByTagName('img').item(0).getAttribute('src'); 
			data.push({
				title: title,
				link: link,
				pubDate: pubDate,
				image: image
			});
		}
		if (o.success) { o.success(data); }
	};
	xhr.onerror = function() {
		if (o.error) { o.error(); }
	};

	if (o.start) { o.start(); }
	xhr.send();	
};