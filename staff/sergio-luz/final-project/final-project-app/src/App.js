import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Register from './components/Register'
import Login from './components/Login'
import Error from './components/Error'

class App extends Component {

  state = {
    register: false,
    login: false,
    error: null
  }

  handleRegisterClick = () => this.props.history.push('/register')
  handleLoginClick = () => this.props.history.push('/login')
  handleGoBack = () => this.props.history.push('/')


  OnHandleLogin = () => {
    this.setState({ login: !this.state.login, error: null })
  }

  RegisterHandler = (name, username, email, password) => {

    console.log('papi: logic.register')
  }

  LoginHandler = (username, password) => {

    console.log('papi: logic.login')
  }

  render() {
    const { register, login, error } = this.state

    return <div>


      <Route exact path="/" render={() => <section>
        <button onClick={this.handleRegisterClick}>Register</button> or <button onClick={this.handleLoginClick}>Login</button></section>}/>

      <Route path="/register" render={() => !false? <Register history={this.props.history} RegisterHandler={this.RegisterHandler}/> : <Redirect to="/" />} />

      <Route path="/login" render={() => !false ? <Login history={this.props.history} LoginHandler={this.LoginHandler} /> : <Redirect to="/"  />} />

      {/* {error && <Error message={error} />} */}

      {/* {userId && <section><button onClick={this.handleLogoutClick}>Logout</button></section>} */}

      {/* TODO show Home on successful login */}
      {/* {userId && <Home texts={this.state.texts} handleDelete={this.handleDelete} handleEditPost={this.handleEditPost} handleSubmit={this.handleSubmit} userId={userId} />} } */}

    </div>
  }



}

export default withRouter(App)
