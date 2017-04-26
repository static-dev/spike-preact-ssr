const test = require('ava')
const SSR = require('..')
const reactJsx = require('babel-plugin-transform-react-jsx')
const Spike = require('spike-core')
const jsStandards = require('spike-js-standards')
const path = require('path')
const fs = require('fs')
const fixtures = path.join(__dirname, 'fixtures')

test.only.cb('basic', (t) => {
  const proj = new Spike({
    root: path.join(fixtures, 'basic'),
    plugins: [new SSR({ pages: 'pages/*' })],
    babel: jsStandards({ appendPlugins: [[reactJsx, { pragma: 'h' }]] })
  })

  proj.on('error', t.end.bind(t))
  proj.on('compile', () => {
    const output = fs.readFileSync(path.join(fixtures, 'basic/public/pages/index.html'), 'utf8')
    t.is(output, '<html><head><title>Test Page</title></head><body><header><p>wow its the header</p></header><p>what a cool page</p></body></html>')
    t.end()
  })

  proj.compile()
})
