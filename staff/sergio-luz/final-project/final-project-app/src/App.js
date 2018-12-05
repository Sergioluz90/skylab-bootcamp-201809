import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import './App.css';
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Error from './components/Error/Error'
import logic from './logic'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Profile from './components/Profile/Profile'
import EditProfile from './components/EditProfile/EditProfile'
import Conversations from './components/Conversations/Conversatons'

class App extends Component {

  state = {
    error: 'null',
    user_info: null,
    my_info: null
  }

  handleGoBack = () => this.props.history.push('/')
  handleHomeClick = () => this.props.history.push('/home')
  handleLoginClick = () => this.props.history.push('/')
  handleRegisterClick = () => this.props.history.push('/register')

  RegisterHandler = (name, username, email, city, password) => {

    try {

      logic.registerUser(name, username, email, city, password)
        .then(() => {
          this.setState({ error: null })
          this.handleLoginClick()
        })
        .catch(err => {
          this.setState({ error: err.message })
        })
    } catch (err) {
      this.setState({ error: err.message })
    }
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

  retrieveUserInfo = (id) => {

    if (!id) id = logic.myId

    logic.retrieveProfile(id)
      .then(user => {

        this.setState({ user_info: user }, () => {
        })
      })
  }

  retrieveMyInfo = (id) => {
    if (!id) id = logic.myId

    logic.retrieveProfile(id)
      .then(user => {

        this.setState({ my_info: user }, () => {
        })
      })
  }


  handleAcceptError = () => {
    this.setState({ error: null })
  }

  render() {
    const { error, user_info, my_info } = this.state

    return <div>

      {logic.loggedIn && <Header history={this.props.history}
        error={error}
        handleAcceptError={this.handleAcceptError}
        my_info={my_info}
        retrieveMyInfo={this.retrieveMyInfo}
        retrieveUserInfo={this.retrieveUserInfo}
      />}

      <Route path="/register"
        render={() => !logic.loggedIn
          ? <Register history={this.props.history}
            RegisterHandler={this.RegisterHandler} />
          : <Redirect to="/home" />} />

      <Route exact path="/"
        render={() => !logic.loggedIn
          ? <Login history={this.props.history}
            LoginHandler={this.LoginHandler} />
          : <Redirect to="/home" />} />

      {error && !logic.loggedIn && <Error message={error}
        handleAcceptError={this.handleAcceptError}
      />}


      <Switch>
        <Route exact path="/home"
          render={() => logic.loggedIn ? <Home
            history={this.props.history}
            isLoggedIn={this.state.login}
          /> : <Redirect to="/" />} />

        <Route path="/home/:query"
          render={(props) => logic.loggedIn
            ? <Home query={props.match.params.query}
              history={this.props.history}
              isLoggedIn={this.state.login} />
            : <Redirect to="/" />} />
      </Switch>


      <Switch>
        <Route exact path="/conversations/:id"
          render={(props) => logic.loggedIn
            ? <Conversations id={props.match.params.id}
              history={this.props.history} />
            : <Redirect to="/" />} />

        <Route exact path="/conversations/:id/:receiver_id"
          render={(props) => logic.loggedIn
            ? <Conversations id={props.match.params.id}
              receiver_id={props.match.params.receiver_id}
              history={this.props.history} />
            : <Redirect to="/" />} />
      </Switch>

      <Route exact path="/profile/:id"
        render={(props) => logic.loggedIn
          ? <Profile history={this.props.history}
            my_info={this.state.my_info}
            id={props.match.params.id}
            retrieveUserInfo={this.retrieveUserInfo}
            user_info={this.state.user_info} />
          : <Redirect to="/" />} />

      <Route exact path="/profile/:id/edit"
        render={(props) => logic.loggedIn
          ? <EditProfile history={this.props.history}
            id={props.match.params.id}
            retrieveUserInfo={this.retrieveUserInfo}
            user_info={this.state.user_info} />
          : <Redirect to="/" />} />

    </div>
  }
}

export default withRouter(App)
