import React from 'react'
import './index.css'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends React.Component {
  state = {
    gmail: '',
    password: '',
    errors: {
      gmail: '',
      password: '',
    },
    errorMsg: '',
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleBlur = event => {
    const {name, value} = event.target
    const errors = {...this.state.errors}
    errors[name] = value.trim() === '' ? '*Required' : ''
    this.setState({errors})
  }

  handleSubmit = async event => {
    event.preventDefault()
    const {gmail, password} = this.state
    const errors = {
      gmail: gmail.trim() === '' ? '*Mail Required' : '',
      password: password.trim() === '' ? '*Password Required' : '',
    }

    if (Object.values(errors).some(error => error !== '')) {
      this.setState({errors})
    } else {
      const userDetails = {gmail, password}
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(userDetails),
      }
      const url = 'https://user1-login.onrender.com/login'
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const {jwtToken} = data
        Cookies.set('sagar_token', jwtToken, {expires: 30})
        this.props.history.push('/')
      } else {
        const data = await response.text()
        this.setState({errorMsg: data})
      }
    }
  }

  render() {
    const {gmail, password, errors, errorMsg} = this.state

    const jwtToken = Cookies.get('sagar_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <label htmlFor="gmail">Gmail</label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              value={gmail}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="sagar@gmail.com"
            />
            {errors.gmail && (
              <span className="error-message-login">{errors.gmail}</span>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="sagar@babu"
            />
            {errors.password && (
              <span className="error-message-login">{errors.password}</span>
            )}
          </div>
          <button type="submit">Login</button>
          {errorMsg && <p className="error-message-display">{errorMsg}</p>}
          <div className="login-here">
            <p>Don't have an account?</p>
            <Link to="/register"> Register Here</Link>
          </div>
          <p>
            Your Credentials only works for few minutes, try logging the
            application with default credentials for next time
          </p>
        </form>
      </div>
    )
  }
}

export default Login
