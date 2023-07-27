// components/Register.js
import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Register extends Component {
  state = {
    gmail: '',
    name: '',
    password: '',
    errors: {
      gmail: '',
      name: '',
      password: '',
    },
    errorMsg: '',
    registrationSuccess: false,
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
    const {gmail, name, password} = this.state
    const errors = {
      gmail: gmail.trim() === '' ? '*Mail Required' : '',
      name: name.trim() === '' ? '*Name Required' : '',
      password: password.trim() === '' ? '*Password Required' : '',
    }

    if (Object.values(errors).some(error => error !== '')) {
      this.setState({errors, registrationSuccess: false})
    } else {
      const userDetails = {gmail, name, password}
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(userDetails),
      }
      const url = 'https://user1-login.onrender.com/register'
      const response = await fetch(url, options)
      console.log(response)
      const data = await response.text()
      console.log(data)
      if (response.ok) {
        // Perform the registration logic here (e.g., make a fetch call to the server)
        // For demonstration purposes, we'll simulate a registration success message
        setTimeout(() => {
          this.setState({registrationSuccess: true})
        }, 1000)
      } else {
        this.setState({errorMsg: data})
      }
    }
  }

  render() {
    const {
      gmail,
      name,
      password,
      errors,
      errorMsg,
      registrationSuccess,
    } = this.state

    return (
      <div className="register-container">
        <h2>Register</h2>
        {registrationSuccess ? (
          <div className="success-message">
            Registration successful! You will receive an email confirmation.
            <br />
            <Link to="/login">Login</Link>
          </div>
        ) : (
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
                placeholder="Gmail"
              />
              {errors.gmail && (
                <span className="error-message-login">{errors.gmail}</span>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Name"
              />
              {errors.name && (
                <span className="error-message-login">{errors.name}</span>
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
                placeholder="Password"
              />
              {errors.password && (
                <span className="error-message-login">{errors.password}</span>
              )}
            </div>
            <button type="submit">Register</button>
            {errorMsg && <p className="error-message-display">{errorMsg}</p>}
            <div className="login-here">
              <p>Already have an account?</p>
              <Link to="/login"> Login Here</Link>
            </div>
          </form>
        )}
      </div>
    )
  }
}

export default Register
