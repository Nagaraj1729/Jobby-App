import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 10})
    const {history} = this.props
    history.replace('/')
    this.setState({username: '', password: ''})
  }

  onLoginFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    // console.log('Form Submitted') // -*--*-*-*-*-*-*-*-* -*-*-*--*-5628456884654555851564515955526+9
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    // console.log('response::: ', response) // -*--*-*-*-*-*-*-*-* -*-*-*--*-5628456884654555851564515955526+9
    const data = await response.json() // -*--*-*-*-*-*-*-*-* -*-*-*--*-5628456884654555851564515955526+9
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
      // console.log('Login Succuess') // -*--*-*-*-*-*-*-*-* -*-*-*--*-5628456884654555851564515955526+9
      // console.log('data :- ', data) // -*--*-*-*-*-*-*-*-* -*-*-*--*-5628456884654555851564515955526+9
    } else {
      this.onLoginFailure(data.error_msg)
      // console.log('Login Failed') // -*--*-*-*-*-*-*-*-* -*-*-*--*-5628456884654555851564515955526+9
      // console.log('data :- ', data) // -*--*-*-*-*-*-*-*-* -*-*-*--*-5628456884654555851564515955526+9
    }
  }

  renderUsernameInputField = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          className="input-field"
          id="username"
          placeholder="Username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  renderPasswordInputField = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          className="input-field"
          id="password"
          placeholder="Password"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-page-bg">
        <div className="login-card">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="login-form" onSubmit={this.onSubmitLoginForm}>
            {this.renderUsernameInputField()}
            {this.renderPasswordInputField()}
            <button className="login-button" type="submit">
              Login
            </button>
            {showErrorMsg && (
              <p className="login-fail-error-msg">*{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
