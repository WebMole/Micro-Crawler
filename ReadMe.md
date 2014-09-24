# µ-Crawler

A basic and tiny crawler that uses the [Web-State-Machine](https://github.com/WebMole/Web-State-Machine) algorithms. Visit the [live demo](http://webmole.github.io/micro-crawler/)

## Installation

First, you will need the dependencies, just install [Node.js](http://nodejs.org/), [npm](https://npmjs.org/) and [bower](http://bower.io/)

Install npm dependencies

	npm install

Install browser dependencies

	bower install

## Usage

You can run website on any webserver, but since some of the examples in `/sites/` are written in `php`, you may want to run this:

    php -S localhost:8000

Requires PHP version `5.4.0` or higher. For details, see [PHP Built-in web server](http://php.net/manual/en/features.commandline.webserver.php)

You could also use python like this:

    python -m SimpleHTTPServer 8000

Otherwise, you could also open run it directly by opening `index.html` in a browser, but some features may not work ;)

### Same Origin Policy

You should consider launching `Google Chrome` with `--disable-web-security` to bypass [SOP](http://en.wikipedia.org/wiki/Same_origin_policy) with javascript execution inside an `iframe`.

> Note: it won't allow access to websites that specify the origin in their header.

More info can be found on [stackoverflow chrome-disable-same-origin-policy](http://stackoverflow.com/questions/3102819/chrome-disable-same-origin-policy)

## Development

Use [gruntjs](http://gruntjs.com/)

	grunt

At this time, there is not much in `gruntfile` yet, [livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) works atm but we may add minification and other cool things later ;)

### Todo

* Provide a way to run headleassly using [PhantomJS](http://phantomjs.org/) or something like [dalekjs](http://dalekjs.com/) to run this in multiple browsers.
* Fix the `vanilla` infinite loop at end of crawl. 
    * Temp fix: uncheck `Explore automatically` in `WSM settings` when it's done
* Set a max width for `Next element to click:` in `WSM statistics` 
* Move `AutoRefresh` on a fixed place so it's easier to click when graphs updates automatically


Pull requests are welcome!
