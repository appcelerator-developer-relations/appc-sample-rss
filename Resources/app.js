if (Ti.version < 1.8) {
  alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
} else {
  // This is a single context application with multiple windows in a stack
  (function() {
    //determine platform and form factor and render appropriate components
    var osname = Ti.Platform.osname,
      height = Ti.Platform.displayCaps.platformHeight,
      width = Ti.Platform.displayCaps.platformWidth;

    //considering tablets to have width over 720px and height over 600px - you can define your own
    function checkTablet() {
      var platform = Ti.Platform.osname;

      switch (platform) {
        case 'ipad':
          return true;
        case 'android':
          var psc = Ti.Platform.Android.physicalSizeCategory;
          var tiAndroid = Ti.Platform.Android;
          return psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_LARGE || psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_XLARGE;
        default:
          return Math.min(
            Ti.Platform.displayCaps.platformHeight,
            Ti.Platform.displayCaps.platformWidth
          ) >= 400
      }
    }

    var isTablet = checkTablet();
    console.log(isTablet);

    var Window;
    if (isTablet) {
      Window = require('ui/tablet/ApplicationWindow');
    } else {
      if (osname === 'android') {
        Window = require('ui/handheld/android/ApplicationWindow');
      } else if (osname === 'mobileweb') {
        Window = require('ui/handheld/mobileweb/ApplicationWindow');
      } else {
        Window = require('ui/handheld/ios/ApplicationWindow');
      }
    }
    new Window().open();
  })();
}
