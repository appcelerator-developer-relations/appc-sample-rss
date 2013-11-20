var createRssRow = function(item) {
	var tablerow = Ti.UI.createTableViewRow({
		height: 70,
		link: item.link,
		className: 'itemRow',
		hasChild: true
	});
	var imageview = Ti.UI.createImageView({
		image: item.image,
		height: 42,
		width: 68,
		left: 5,
		top: 3
	});
	var titleview = Ti.UI.createLabel({
		text: item.title,
		color: '#000',
		height: 70,
		font: {
			fontSize: 16
		},
		left: 83,
		right: 5
	});
	var dateview = Ti.UI.createLabel({
		text: item.pubDate,
		textAlign: 'center',
		color: '#444',
		font: {
			fontSize: 12
		},
		height: 'auto',
		width: 68,
		left: 5,
		bottom: 3
	});
	tablerow.add(imageview);
	tablerow.add(dateview);
	tablerow.add(titleview);

	return tablerow;
};

//Master View Component Constructor
function MasterView() {
	var self = Ti.UI.createView({
		backgroundColor: '#fff'
	});

	var table = Ti.UI.createTableView();
	self.add(table);
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			link: e.row.link
		});
	});

	self.refreshRssTable = function(data) {
		if (Object.prototype.toString.apply(data) === '[object Array]') {
			var rows = [];
			for (var i = 0; i < data.length; i++) {
				rows.push(createRssRow(data[i]));
			}
			table.setData(rows);
		}
	};

	return self;
}
module.exports = MasterView;