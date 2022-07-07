import BlankLayout from 'layout/BlankLayout'
import { Route as DefaultRoute } from 'react-router-dom'

const Route = ({
  component: Component,
  layout: Layout = BlankLayout,
  ...rest
}) => {
  return (
    <DefaultRoute
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}

export default Route
