function parseXML(xml) {
	var elements = xml.documentElement.getElementsByTagName('item');
	var models = [];

	for (var i = 0; i < elements.length; i++) {
		var element = elements.item(i);
		var model = {};

		var childNodes = element.childNodes;
		var child;

		for (var j = 0; j < childNodes.length; j++) {
			child = childNodes.item(j);

			if (child.nodeType === child.ELEMENT_NODE) {
				model[child.nodeName] = model[child.nodeName] ? (_.isArray(model[child.nodeName]) ? model[child.nodeName] : [model[child.nodeName]]).concat(child.textContent) : child.textContent;
			}
		}

		models.push(model);
	}

	return models;
}

function loadUrl(url, callback) {

	alert('loadUrl');

	//if (!Ti.Network.online) {
	return callback(null, parseXML(Ti.XML.parseString(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'feed.xml').read().text)));
	//}

	var xhr = Ti.Network.createHTTPClient({
		onload: function onload(e) {
			var xml = this.responseXML;

			if (xml === null || xml.documentElement === null) {
				return callback(String.format('Response did not contain XML: %s', url));
			}

			var data = parseXML(xml);

			callback(null, data);
		},
		onerror: function onerror(e) {
			callback(String.format('Request failed: ' + e.error));
		}
	});

	xhr.open('GET', url);
	xhr.send();
};

function Sync(method, model, opts) {

	if (method === 'read') {
		var url = model.config.adapter.url;

		loadUrl(url, function onLoad(err, data) {

			if (err) {
				return opts.error && opts.error(err);
			}

			opts.success && opts.success(data.length === 1 ? data[0] : data);

			model.trigger('fetch');
		});

	} else {
		throw 'Unsupported operation.';
	}
}

module.exports.sync = Sync;

module.exports.afterModelCreate = function (Model, name) {
	Model = Model || {};
	Model.prototype.idAttribute = Model.prototype.config.adapter.idAttribute;
	return Model;
};
