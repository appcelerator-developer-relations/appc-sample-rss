//Master View Component Constructor
exports.MasterView = function() {
	var self = Ti.UI.createView({
		backgroundColor:'#fff'
	});
	
	var table = Ti.UI.createTableView();
	self.add(table);
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', { link: e.row.link });
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
};

var createRssRow = function(item) {
	var tablerow = Ti.UI.createTableViewRow({
		height: '70dp',
		link: item.link,
		hasChild: true
	});
	var imageview = Ti.UI.createImageView({
		image: item.image,
		height: 42, 
		width: 68, 
		left: '5dp',
		top: '3dp'
	});
	var titleview = Ti.UI.createLabel({
		text: item.title,
		color: '#000',
		font: {
			fontSize: '16dp'
		},
		left: '83dp',
		right: '5dp'
	});
	var dateview = Ti.UI.createLabel({
		text: item.pubDate,
		textAlign: 'center',
		color: '#444',
		font: {
			fontSize: '12dp'	
		},
		height: 'auto',
		width: '68dp',
		left: '5dp',
		bottom: '3dp'
	});
	tablerow.add(imageview);
	tablerow.add(dateview);
	tablerow.add(titleview);
	
	return tablerow;
};