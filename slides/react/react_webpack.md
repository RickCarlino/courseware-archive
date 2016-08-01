# Modern JavaScript Build Systems

---

## The Problem

```html
<script type="text/javascript" src="app/jquery.js"></script>
<script type="text/javascript" src="app/react.js"></script>
<script type="text/javascript" src="app/lodash.js"></script>
<script type="text/javascript" src="app/ng-route.js"></script>
<script type="text/javascript" src="app/d3.js"></script>
<script type="text/javascript" src="app/config.js"></script>
<script type="text/javascript" src="app/controllers/acme-claims.js"></script>
<script type="text/javascript" src="app/controllers/acme-inbound.js"></script>
<script type="text/javascript" src="app/controllers/acme-outbound.js"></script>
<script type="text/javascript" src="app/run.js"></script>
```

Managing script tags is error prone and tedious.

---

## More Problems

 * Adding new files.
 * Load order.
 * Minifying files.
 * Bundling non-javascript files (CSS, HTML templates, fonts).
 * Excluding unused/unneeded files.
 * Removing "dead code".

---

## The Ideal Solution

```javascript
<script type="text/javascript" src="/production_bundle.js"></script>
```

Reducing an app into one or more "bundles" simplifies maintenance.

---

## Modules Systems

A module system allows you to *import or require* one JavaScript file into another.

 * Frontend JavaScript does not yet have a way of loading files natively.
 * `<script>` tags were often the only option.
 * Server side JavaScript frameworks like Node.js have had a module specification for years.

---

 ## CommonJS Modules: require();

Server side JavaScript environments support a `require` keyword

```javascript
var add = require('./add.js');
add(2, 2); // => 4
```

---

## CommonJS Modules: module.exports;

Additionally, modules can be exported by adding property to the `module.exports` property within any file.

```javascript
module.exports = function add(lhand, rhand) {
  return lhand + rhand;
}
```

File order becomes less important.

Just load an "entry point" and let `require` do the rest!

**Wouldn't it be great if we could do this on the browser?**

---

## Enter "WebPack"

 * Webpack allows you to use `require` inside a browser
 * Run webpack against an "entry point" to generate a production bundle based off of `require` statements.
 * The result is a single javascript bundle.
 * Alternatively, the bundle can be "chunked" if it is larger in size.
 * Build steps such as minification may also be added.

---

## Installation

Webpack is accessible via the `webpack` command.

Install it via NPM:

```
sudo npm install webpack -g
```

---

## Most Simple Example

Run `webpack entry.js bundle.js` from **webpack\demos\hello_webpack**.

Notice that there is only one entry point, regardless of how many files the project has.

Larger projects may be "chunked" into multi-part bundles.

---

## NPM on the Frontend

```javascript
// Run "npm install react --save" first.
var react = require("react");
```

Run `webpack entry.js bundle.js` from **webpack\demos\npm**.

Try adding a `--optimize-minimize` flag to shrink output file size.

---

## Using a config file

 * Webpack from the command line is useful, but not ideal for projects with large amounts of configuration.
 * For production scale applications, it is recommended to store webpack configuration in a `webpack.config.js` file.
 * Type `webpack` to run webpack against the default config file.

---

## Demo: Common Config options

 * `config.entry`
 * `config.output.filename`
 * `config.output.path`

Try the demo:

```
cd webpack/demos/webpack_config
webpack --config webpack.config.js
```

---

## Webpack Dev Server

Running `webpack-dev-server --config CONFIG.JS` will run a development server that recompiles the JS bundle when changed.

The app will be available at [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)

The dev server can be configured via the [`config.devServer` attribute](https://webpack.github.io/docs/configuration.html#devserver).

demo:

```
cd webpack/demos/webpack_config
webpack-dev-server --config webpack.config.js
```

---

## Plugins

To avoid using the `--optimize-minimize` flag directly, we can set up a minifier plugin in our config file.

Demo:

```
cd webpack/demos/webpack_config/
webpack --config minify.config.js
```

---

## Using "loaders"

Transpiled languages like TypeScript, Coffeescript and Babel (ES2015) allow developers to write web apps in languages other than JavaScript.

Webpack transpiles these files (such as `*.ts` or `*.coffee` files) to native javascript using a "loader".

Loaders can be thought of as preprocessors.

---

## More About Loaders

Some loaders allow you to require resources other than `*.js` files.

Example: `require('style.css')` will add a CSS file to the bundle.

---

## Demo: Using a WebPack Loader

```bash
npm install typescript -g
npm link typescript
cd webpack/demos/webpack_config/loaders
webpack
```

---

## Debugging Transpiled Languages

A common problem with transpiled languages is the difficulty of debugging.

It can be difficult to compare implementation code with compiler output.

Browsers can map output source to the original source using "source maps".

```javascript
module.exports = {
  /* . Other config
   * options removed for clarity.
   */
  devtool: 'source-map'
};

```

---

## Debugging TypeScript / ES6 in Chrome

![](manuscript/images/source_maps.png)

---

## Questions?

---
