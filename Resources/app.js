SampleRss = {};

var masterWindow = require('ui').createMasterWindow();
SampleRss.navigator = require('nav').createNavigator(masterWindow);
require('rss').loadRssFeed();
