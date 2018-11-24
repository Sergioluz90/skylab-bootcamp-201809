import React, { Component } from 'react'
import Error from './Error'


class Login extends Component {
    state = { username: '', password: '', error: '' }

    handleUsernameChange = event => {
        const username = event.target.value

        this.setState({ username })
    }

    handlePasswordChange = event => {
        const password = event.target.value

        this.setState({ password })

    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { username, password } = this.state

        this.props.LoginHandler(username, password)
    }

    verResultados = event => {
        event.preventDefault()
    }

    render() {
        return <div className="login_component">
            <form className="login_form" onSubmit={this.handleSubmit}>
                <input type="text" className="form-control" type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                <br></br>
                <input type="password" className="form-control" type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                <br></br>
                {this.state.error && <Error message={this.state.error} />}
                <button className="btn btn-outline-secondary" type="submit">Login</button>
                <a className="btn btn-link" href="#" onClick={this.props.onGoBack}>back</a>
            </form>
        </div>
    }
}

export default Login