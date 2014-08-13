# µ-Crawler

A basic and tiny crawler that uses the [Web-State-Machine](https://github.com/WebMole/Web-State-Machine) algorithms.

## Installation

First, you will need the dependencies, just install [Node.js](http://nodejs.org/), [npm](https://npmjs.org/) and [bower](http://bower.io/)

Install npm dependencies

	npm install

Install browser dependencies

	bower install

## Usage

Run website on a webserver. If you have [Python](https://www.python.org/), you can simply run

    python -m SimpleHTTPServer

### Same Origin Policy

You should consider launching your Chrome with `--disable-web-security` to bypass [SOP](http://en.wikipedia.org/wiki/Same_origin_policy) with javascript execution inside an `iframe`.

Note: it won't allow access to websites that specify the origin in their header.

More info on [stackoverflow](http://stackoverflow.com/questions/3102819/chrome-disable-same-origin-policy)

## Development

Use [gruntjs](http://gruntjs.com/)

	grunt

Not much implemented in the `gruntfile` yet, there's only [livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) working atm but we may add minification and other cool things ;)
