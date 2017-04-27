const {h} = require('preact') // eslint-disable-line
const render = require('preact-render-to-string')
const glob = require('glob')
const Util = require('spike-util')
const path = require('path')

module.exports = class SpikePreactSSR {
  constructor (opts) {
    this.pagesMatcher = opts.pages
    this.outputFn = opts.output || ((p) => p.replace('js', 'html'))
    this.props = opts.props
  }

  apply (compiler) {
    this.util = new Util(compiler.options)

    this.util.runAll(compiler, (compilation, done) => {
      // pull the paths of all the pages we're trying to compile
      glob(path.join(this.util.conf.context, this.pagesMatcher), (err, res) => {
        if (err) return done(err)
        this.pages = res
        done()
      })
    })

    compiler.plugin('make', (compilation, done) => {
      // add pages to webpack pipeline
      // we remove the js extension, as spike will add this automatically
      this.util.addFilesAsWebpackEntries(compilation, this.pages.map((p) => p.replace(/\.js$/, '')))
        .done(() => { done() }, done)
    })

    compiler.plugin('emit', (compilation, done) => {
      // for each page, pull the webpack generated source
      this.pages.map((page) => {
        const key = page.replace(`${this.util.conf.context}${path.sep}`, '')
        const src = compilation.assets[key]._source.source()
        // eval the webpack source, and SSR it
        // TODO: this needs to commonjs as well as es modules
        const Component = eval(src).default // eslint-disable-line
        const ssrd = render(h(Component, this.props))
        // remove the previous source
        delete compilation.assets[key]
        // add the new source to be written as html
        compilation.assets[this.outputFn(key)] = {
          source: () => ssrd,
          size: () => ssrd.length
        }
      })
      done()
    })
  }
}
