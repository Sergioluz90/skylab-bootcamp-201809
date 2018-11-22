import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Register from './components/Register'
import Login from './components/Login'
import Error from './components/Error'
import logic from './logic'
import Home from './components/Home'
import Header from './components/Header'
import { throws } from 'assert';

class App extends Component {

  state = {
    login: false,
    error: null
  }

  handleGoBack = () => this.props.history.push('/')
  handleHomeClick = () => this.props.history.push('/home')
  handleLoginClick = () => this.props.history.push('/')
  handleRegisterClick = () => this.props.history.push('/register')


  OnHandleLogin = () => {
    this.setState({ login: !this.state.login, error: null })
  }

  RegisterHandler = (name, username, email, password) => {

    logic.registerUser(name, username, password, email)
      .then(() => {
        this.setState({ error: null })
        this.handleLoginClick()
      })
      .catch(err => {
        this.setState({ error: err.message })
      })
  }

  LoginHandler = (username, password) => {

    logic.loginUser(username, password)
      .then(() => {
        this.setState({ error: null, login: true })
        this.handleHomeClick()
      })
      .catch(err => {
        this.setState({ error: err.message })
      })
  }

  render() {
    const { login, error } = this.state

    return <div>


      <Route exact path="/" render={() => !logic.loggedIn&& (<section>
        <button onClick={this.handleRegisterClick}>Register</button> or <button onClick={this.handleLoginClick}>Login</button></section>)} />

      {logic.loggedIn && <Header/>}

      <Route path="/register" render={() => !logic.loggedIn ? <Register history={this.props.history} RegisterHandler={this.RegisterHandler} /> : <Redirect to="/home" />} />

      <Route exact path="/" render={() => !logic.loggedIn ? <Login history={this.props.history} LoginHandler={this.LoginHandler} /> : <Redirect to="/home" />} />

      {error && <Error message={error} />}

      <Route path="/home" render={() => logic.loggedIn ? <Home isLoggedIn={this.state.login} />:<Redirect to="/"/>} />


      {/* {userId && <section><button onClick={this.handleLogoutClick}>Logout</button></section>} */}

      {/* TODO show Home on successful login */}
      {/* {userId && <Home texts={this.state.texts} handleDelete={this.handleDelete} handleEditPost={this.handleEditPost} handleSubmit={this.handleSubmit} userId={userId} />} } */}

    </div>
  }
}

export default withRouter(App)
