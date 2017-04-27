import {h} from 'preact' // eslint-disable-line
import Layout from '../components/layout'

export default ({ foo }) => {
  return (
    <Layout>
      <p>foo: {foo}</p>
    </Layout>
  )
}
