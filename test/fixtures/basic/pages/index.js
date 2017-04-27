import {h, Component} from 'preact' // eslint-disable-line
import Layout from '../components/layout'

export default class extends Component {
  render () {
    return (
      <Layout>
        <p>foo: {this.props.foo}</p>
      </Layout>
    )
  }
}
