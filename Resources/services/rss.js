var osname = Ti.Platform.osname;
var RSS_URL = osname === 'mobileweb' ? '/feed.xml' : 'http://feeds.mashable.com/Mashable?format=xml';
var MONTH_MAP = {
	JAN: 1,
	FEB: 2,
	MAR: 3,
	APR: 4,
	MAY: 5,
	JUN: 6,
	JUL: 7,
	AUG: 8,
	SEP: 9,
	OCT: 10,
	NOV: 11,
	DEC: 12
};

var getRssText = function(item, key) {
	return osname === 'mobileweb'
		?	item.getElementsByTagName(key).item(0).textContent
		: item.getElementsByTagName(key).item(0).text;
};

var parseDate = function(dateString) {
	var dateParts = dateString.split(' ');
	var timeParts = dateParts[4].split(':');
	return MONTH_MAP[dateParts[2].toUpperCase()] + '/' + dateParts[1] + ' ' + timeParts[0] + ':' + timeParts[1];
};

exports.loadRssFeed = function(o, tries) {
	var xhr = Titanium.Network.createHTTPClient();
	tries = tries || 0;
	xhr.open('GET', RSS_URL);
	xhr.onload = function(e) {
		var xml = this.responseXML;
		if (xml === null || xml.documentElement === null) {
			if (tries < 3) {
				tries++;
				exports.loadRssFeed(o, tries);
				return;
			} else {
				alert('Error reading RSS feed. Make sure you have a network connection and try refreshing.');
				if (o.error) {
					o.error();
				}
				return;
			}
		}

		var items = xml.documentElement.getElementsByTagName('item');
		var data = [];

		for (var i = 0; i < items.length; i++) {
			var item = items.item(i);
			try {
				var url = item.getElementsByTagName('mash:thumbnail').item(0).text;
				var src = url.match(/src="([^\"]*)"/gim);
				var image = src[0].replace(/src=|"/gim, '');
			} catch (e) {
				image = '';
			}
			data.push({
				title: getRssText(item, 'title'),
				link: getRssText(item, 'link'),
				pubDate: parseDate(getRssText(item, 'pubDate')),
				image: image
			});
		}
		if (o.success) {
			o.success(data);
		}
	};
	xhr.onerror = function(e) {
		if (o.error) {
			o.error();
		}
	};

	if (o.start) {
		o.start();
	}
	xhr.send();
};