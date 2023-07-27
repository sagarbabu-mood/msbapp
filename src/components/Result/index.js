// Result.js
import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Result extends Component {
  render() {
    const {score} = this.props

    return (
      <div className="result-container">
        <h2 className="result-title">Test Completed!</h2>
        <p className="result-score">Your Score: {score}</p>
        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    )
  }
}

export default Result
