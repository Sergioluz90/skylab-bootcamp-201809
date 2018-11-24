import React, { Component } from 'react'
// import logic from '../logic'


class Register extends Component {

    state = { _name: '', _username: '', _email: '', _password: '' }

    RegisterHandler = event => {
        event.preventDefault()

        const { _name, _username, _email, _password } = this.state
        this.props.RegisterHandler(_name, _username, _email, _password)
    }

    handleInput_Name = event => {
        console.log('esta cambiando el name')

        const _name = event.target.value

        this.setState({ _name })
    }

    handleInput_Email = event => {
        console.log('esta cambiando el Email')

        const _email = event.target.value

        this.setState({ _email })
    }

    handleInput_Username = event => {
        console.log('esta cambiando el username')

        const _username = event.target.value

        this.setState({ _username })
    }

    handleInput_Password = event => {
        console.log('esta cambiando el password')

        const _password = event.target.value

        this.setState({ _password })
    }

    
    render() {
        return <div>

            <form onSubmit={this.RegisterHandler}>
                <input onChange={this.handleInput_Name} value={this.state.name} type="text" placeholder="Name"></input>

                <input onChange={this.handleInput_Username} type="text" placeholder="Username"></input>

                <input onChange={this.handleInput_Email} type="text" placeholder="Email"></input>

                <input onChange={this.handleInput_Password} type="password" placeholder="Password"></input>

                <button type='submit'> Register </button>
            </form>
            <a className="" href="#" onClick={this.props.onGoBack}>back</a>

        </div>
    }
}

export default Register