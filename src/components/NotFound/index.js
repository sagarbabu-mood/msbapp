// NotFound.js
import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h2 className="error-message">
      The page you are looking for is not available.
    </h2>
    <Link to="/" className="home-link">
      Go to Home
    </Link>
  </div>
)

export default NotFound
