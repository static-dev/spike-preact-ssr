const test = require('ava')
const SSR = require('..')
const reactJsx = require('babel-plugin-transform-react-jsx')
const Spike = require('spike-core')
const jsStandards = require('spike-js-standards')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const fixtures = path.join(__dirname, 'fixtures')

test.only.cb('basic', (t) => {
  const proj = new Spike({
    root: path.join(fixtures, 'basic'),
    plugins: [new SSR({ pages: 'pages/*', props: { foo: 'bar' } })],
    babel: jsStandards({ appendPlugins: [[reactJsx, { pragma: 'h' }]] })
  })

  proj.on('error', t.end.bind(t))
  proj.on('compile', () => {
    const publicPath = path.join(fixtures, 'basic/public')
    const component = fs.readFileSync(path.join(publicPath, 'pages/index.html'), 'utf8')
    const functional = fs.readFileSync(path.join(publicPath, 'pages/index.html'), 'utf8')
    const expected = '<html><head><title>Test Page</title></head><body><header><p>wow its the header</p></header><p>foo: bar</p></body></html>'
    t.is(component, expected)
    t.is(functional, expected)
    rimraf(publicPath, () => t.end())
  })

  proj.compile()
})
