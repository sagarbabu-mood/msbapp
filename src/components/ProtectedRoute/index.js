import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('sagar_token')
  if (jwtToken === undefined) {
    return <Redirect to="/register" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
