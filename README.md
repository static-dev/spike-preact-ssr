# Spike Preact SSR

[![npm](https://img.shields.io/npm/v/spike-preact-ssr.svg?style=flat-square)](https://npmjs.com/package/spike-preact-ssr)
[![tests](https://img.shields.io/travis/static-dev/spike-preact-ssr.svg?style=flat-square)](https://travis-ci.org/static-dev/spike-preact-ssr?branch=master)
[![dependencies](https://img.shields.io/david/static-dev/spike-preact-ssr.svg?style=flat-square)](https://david-dm.org/static-dev/spike-preact-ssr)
[![coverage](https://img.shields.io/coveralls/static-dev/spike-preact-ssr.svg?style=flat-square)](https://coveralls.io/r/static-dev/spike-preact-ssr?branch=master)

Easily render preact components to HTML.

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Installation

`yarn add spike-preact-ssr`

### Usage

Let's say you have some preact components in a folder under `assets/js/pages`, like this:

```js
export default class {
  render () {
    return (<p>Hello there!</p>)
  }
}
```

...and you want to prerender these as HTML. You'd just add the plugin to spike, and tell it where your component(s) are, and how to map them to an output path as such:

```js
const path = require('path')
const PreactSSR = require('spike-preact-ssr')

module.exports = {
  // ...
  plugins: [
    new PreactSSR({
      pages: 'assets/js/pages/*.js', // globstar syntax optional
      output: (relativePath) => path.basename(relativePath).replace(/\.js$/, '.html') // by default it will map to its current location and just replace .js with .html
    })
  ]
  // ...
}
```

That's it! Run spike, and you'll see some nice pretty html rendered out as you wanted. If you have interactive components, you can then run them from JS as well and it will work just like normal server side rendering.

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
