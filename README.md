# Sample.RSS

This is a Titanium Alloy sample app that creates a RSS reader. With it you can pull a live RSS feed from the internet, list the articles and then drill down to the article itself.

## History
The original classic version was done by Tony Lukasavage. Fokke Zandbergen later made the Alloy version.

## Topics Covered

* Custom Android theme.
* Alloy Collection, Models and data-binding.
* Custom Alloy sync adapter for RSS.
* Global styles via [app.tss](app/styles/app.tss).
* Configuration via [config.json](app/config.json).
* Maximum code re-use via `<Require />`.
* Cross-platform navigation in a single [controller](app/controllers/index.js)-[view](app/views/index.xml) using conditional code.

as


* Remote Data acccess via `Ti.Network.HTTPClient`
* Modular Javascript with CommonJS
* Multiple window app using a single execution context
* Loose coupling of UI and data code using application level events via `Ti.App`
* Native UI features
  * Android menus
  * iOS navigation bar buttons
  * iOS Navigation Controller via `Titanium.UI.iPhone.NavigationGroup`
* Webviews for displaying web content
* Cross-platform design