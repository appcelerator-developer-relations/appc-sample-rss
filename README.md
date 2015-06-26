# Titanium Alloy RSS Sample
> **OR:** An example of a *master > detail* app.

This is a Titanium Alloy sample app that creates a RSS reader. The app lets you pull a live RSS feed from the internet, list the articles and then drill down to the article itself.

![screenshots](screenshots.png)

As you'll [see](app/controllers/index.js) the code is heavily documented to tell you exactly what is going on.

Let's run through some of the main topics covered.

## Custom Android Material Theme
For Android, the app uses a [custom Android Material Theme](http://docs.appcelerator.com/platform/latest/#!/guide/Android_Themes-section-34636181_AndroidThemes-MaterialTheme). Material made it much easier to create custom Android themes and all you have to do is override some of the default colors in [platform/android/res/values/custom_theme.xml](platform/android/res/values/custom_theme.xml) and select the style name in [tiapp.xml](tiapp.xml) under *android/manifest/application@android:theme*.

* Guide: [Android Themes](http://docs.appcelerator.com/platform/latest/#!/guide/Android_Themes)

## Config
We've made it very easy to change the URL for the RSS feed without touching the code. It's set in [app/config.json](alloy/app/config.json) under *global/url* and read as `Alloy.CFG.url` in [app/controllers/master.js](app/controllers/master.js). As you can read in the guide, we could even set a different value for this propery based on the platform and environment the app runs on.

* Guide: [Project Configuration File (config.json)](http://docs.appcelerator.com/platform/latest/#!/guide/Project_Configuration_File_(config.json))

## Global Styles
For iOS we need to set the colors for our toolbars on each Window. Fortunately we can use [app/styles/app.tss](app/styles/app.tss) to set styles that apply to all views. This is also a great place to reset/normalize, like we do for Labels, which are by default `white` on Windows and some `grey` on Android.

* Guide: [Alloy Styles and Themes](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Styles_and_Themes)

## Conditional Code
As the screenshots show, we use platform and even device specific UI elements to provide the best user experience.

We could use Titanium and Alloy's support for [platform-specific resources](http://docs.appcelerator.com/platform/latest/#!/guide/Supporting_Multiple_Platforms_in_a_Single_Codebase-section-29004890_SupportingMultiplePlatformsinaSingleCodebase-Platform-specificresources) and create an Android-specific view in `app/views/android/index.xml` and an iOS-specific view in `app/views/iphone/index.xml`.

In this case we chose to use Alloy's support for [conditional code](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-ConditionalCode) to keep them all in one view. We would have needed this for an iPhone and iPad specific view anyway and this way you can see how we handle all platforms and form factors in one glance.

You will see we use conditional code in the other two [views](app/views) as well to use platform-specific UI elements like Android ActionBar menu items and a RefreshControl for iOS.

* Guides:
	* [Platform-specific resources](http://docs.appcelerator.com/platform/latest/#!/guide/Supporting_Multiple_Platforms_in_a_Single_Codebase-section-29004890_SupportingMultiplePlatformsinaSingleCodebase-Platform-specificresources)
	* [Conditional Code](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-ConditionalCode)

## Require
To keep our code [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) we create a seperate [master](app/views/master.xml) controller for the list. As you can see, we require this controller in all four different navigation patterns in [app/views/index.xml](app/views/index.xml).

* Guide: [Require Element](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-RequireElement)

## Navigation Patterns
The app uses the following navigation patterns:

* [`NavigationWindow`](http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.iOS.NavigationWindow) for iPhone and the similar [`NavigationGroup`](http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.MobileWeb.NavigationGroup) for MobileWeb. The classic example of this pattern is the *Settings App* on iOS. It stacks multiple windows, showing the title of the current window in a navigation bar that also has a *Back* button to pop back to the previous one. Ideal for hierarchies of two or more levels like our *master > detail*.
* [`SplitWindow`](http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.iOS.SplitWindow) for iPad is a pattern you will know from the *Mail App* on iOS. It displays two windows, one narrow and the other wide. Ideal for a single level *master > detail* app on bigger screens.
* And then finally, for Android we simply open windows on top of each other without managing much about them. And for Android this works just great because it has hardware buttons for navigation back as well as an [Action Bar](http://docs.appcelerator.com/platform/latest/#!/guide/Android_Action_Bar) that we can set to display a back button.

## ListView vs TableView
In [app/views/master.xml](https://github.com/appcelerator-developer-relations/Sample.RSS/blob/alloy/app/views/master.xml) you can see we use a ListView for iOS and Android and a TableView for MobileWeb, which does support ListViews.

[ListView](http://docs.appcelerator.com/platform/latest/#!/guide/ListViews) is the more efficient and faster successor of TableView, but there are some specific use cases for which we keep the TableView around for all platforms. The main difference is that ListViews use templates and data while TableViews are composed of regular views.

ListViews can be more difficult to implement in Titanium, but as you can see [Alloy hides most of that complexity](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_ListView_Guide) from you. So if you can, always use ListViews instead of TableViews.

* Guides:
	* [ListViews](http://docs.appcelerator.com/platform/latest/#!/guide/ListViews)
	* [Alloy ListView Guide](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_ListView_Guide)

## Collections, Models & Data-Binding
Perhaps the most complex part of our app is the use of Alloy Collections, Models and data-binding to fetch and display the RSS feed. It is really just seen as complex because Alloy does most of the work, which makes it feel like magic.

Embrace the magic and unleash the power of [BackBone.js](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Models) in Alloy:

### Models
[Models](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Collection_and_Model_Objects-section-36739589_AlloyCollectionandModelObjects-Models) can be seen as the rows of a table and their definition configures the columns and the connection to where the rows are read from and synced to. The columns are not required for all types of sync adapters and as you can see our [app/models/feed.js](app/models/feed.js) only has the configuration for our custom RSS sync adapter.

### Sync adapters
Alloy comes with a few [ready-made sync adapters](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Sync_Adapters_and_Migrations) of which the one for SQLite is probably the most interesting one. You can add custom sync adapters by dropping a CommonJS module that follows the expected [signature](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Sync_Adapters_and_Migrations-section-36739597_AlloySyncAdaptersandMigrations-CustomSyncAdapters) in `app/lib/alloy/sync` and use the filename in the model definition. A popular community adapter is [restapi](https://github.com/viezel/napp.alloy.adapter.restapi) by Mads Möller.

For this app, we created a custom [rss adapter](https://github.com/appcelerator-developer-relations/Sample.RSS/blob/alloy/app/lib/alloy/sync/rss.js) that reads a URL or path to a local file. For MobileWeb we use a local file because our RSS feed currently doesn't send a `Access-Control-Allow-Origin` header. When it is done, it calls the `opts.success` callback with the fetched data and BackBone will create and collect the models. We also fire a `fetch` event so that our data binding is triggered.

### Collections
[Collections](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Collection_and_Model_Objects-section-36739589_AlloyCollectionandModelObjects-Collections) can be seen as tables. They keep models and fire events if there are any changes. This is exactly what we need for data binding.

### Data Binding
[Data binding](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Data_Binding) simply comes down to listening to changes on an object and updating the UI accordingly. To do this we add a `dataCollection` tag to a [view element](app/views/master.xml) and Alloy will use that element's children to populate the view for each model in the collection.

In the master [controller](app/controllers/master.js) we can now call the collection's `fetch()` method to have it populate itself using the rss sync adapter which in turn will trigger the data binding to display them in the list. As you can see we also have the option to transform the data by setting a `dataTransform` function in the view.

* Guide: [Alloy Models](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Models), also on Collections, Data Binding and Sync Adapters

## Opening the detail view
The last piece of our puzzle is opening an article from our list. The [master view](app/views/master.xml) sets a `select` callback to be called when the user taps on a row. You can also see that it binds the identifying `guid` field of the models to a special `itemId` attribute of our rows.

The [master controller](app/controllers/master.js) defines the callback, receives the id of the model that comes with the event, looks up the model and then fires an event on the controller itself. We haven't talked too much about it, but every [controller](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Controllers) extends the `BackBone.Events` prototype, which allows it to dispatch events.

The reason we don't open the detail window directly from masters is that it depends on the navigation pattern how exactly we should. It's a best practice to keep controllers unaware of their context so we can re-use them in different contexts. So in the [index view](app/views/index.xml) we bind an `onSelect` listener to the `select` event of the master controller. In the [index controller](app/controllers/index.js) you will see that this again uses [Conditional Code](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Controllers-section-34636384_AlloyControllers-ConditionalCode) to determine how exactly to open the detail window, passing the model to the detail controller.

* Guides:
	* [Event Handling](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-EventHandling) in Alloy views
	* [Alloy Controllers](http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Controllers)

## WebViews
The [detail controller](app/controllers/detail.js) then receives the model and uses it to set the window title and WebView URL. The [WebView](http://docs.appcelerator.com/platform/latest/#!/guide/The_WebView_Component) can be seen as a chromeless browser, embedded in the app. Though one of Titanium's unique features is the use of native UI components, you can easily intergrate existing local or remote HTML and even [communicate](http://docs.appcelerator.com/platform/latest/#!/guide/Communication_Between_WebViews_and_Titanium) with it.

* Guide: [Integrating Web Content](http://docs.appcelerator.com/platform/latest/#!/guide/Integrating_Web_Content)