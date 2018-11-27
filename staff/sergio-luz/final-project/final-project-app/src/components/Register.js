import React, { Component } from 'react'
// import logic from '../logic'


class Register extends Component {

    state = { _name: '', _username: '', _email: '', _password: '', _city: '' }


    handleLoginClick = () => this.props.history.push('/')

    RegisterHandler = event => {
        event.preventDefault()

        const { _name, _username, _email, _password, _city } = this.state
        this.props.RegisterHandler(_name, _username, _email, _password, _city)
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

    handleInput_City = event => {
        console.log('esta cambiando el city')

        const _city = event.target.value

        this.setState({ _city })
    }


    render() {
        return <div className='body__register'>


            <div className='register__logo'></div>

            <div className='register__wrapper-cover'>



                <img className='register__cover-image' src='https://image.freepik.com/free-vector/people-speaking-different-languages-with-flat-design_23-2147864792.jpg' ></img>

                <div className='register__form'>
                    <div className='register__banner'>
                        <a className='register__options-banner--active' href='#/register' > Register</a>
                        <a className='register__options-banner' href='#/' > Login</a>

                    </div>

                    <form className='register__form' onSubmit={this.RegisterHandler}>

                        <input className='register__input' onChange={this.handleInput_Name} value={this.state.name} type='text' placeholder='Name'></input>

                        <input className='register__input' onChange={this.handleInput_Username} type='text' placeholder='Username'></input>

                        <input className='register__input' onChange={this.handleInput_Email} type='text' placeholder='Email'></input>

                        <input className='register__input' onChange={this.handleInput_Password} type='text' placeholder='Your City'></input>

                        <input className='register__input' onChange={this.handleInput_City} type='password' placeholder='Password'></input>


                        <button className='btn-send--register' type='submit'> Register </button>
                    </form>
                </div>

            </div>

        </div>
    }
}

export default Register