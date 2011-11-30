//Master View Component Constructor
exports.MasterView = function() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	var table = Ti.UI.createTableView();
	self.add(table);

	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', { link: e.row.link });
	});
	
	Ti.App.addEventListener('app:dataLoad', function(e) {
		if (Object.prototype.toString.apply(e.data) === '[object Array]') {
			var rows = [];
			for (var i = 0; i < e.data.length; i++) {
				rows.push(createRssRow(e.data[i]));
			}
			table.setData(rows);
		}
		//actInd.hide();
	});

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
		height: '42dp',
		width: '68dp',
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