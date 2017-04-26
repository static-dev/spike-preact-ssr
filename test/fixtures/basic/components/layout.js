import Header from './header'

export default class {
  render () {
    return (
      <html>
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <Header />
          {this.props.children}
        </body>
      </html>
    )
  }
}
