import React, { Component } from 'react'
import Error from '../Error/Error'


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
        return <div className='body__login'>


            <div className='login__logo'></div>

            <div className='login__wrapper-cover'>



                <img className='login__cover-image' src='https://image.freepik.com/free-vector/people-speaking-different-languages-with-flat-design_23-2147864792.jpg' ></img>

                <div className='login__form'>
                    <div className='login__banner'>
                        <a className='login__options-banner' href='#/register' > Register</a>
                        <a className='login__options-banner--active' href='#/' > Login</a>

                    </div>




                        <form className="login__form" onSubmit={this.handleSubmit}>
                        <label>Username:</label>
                            <input type="text" className='login__input' type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                            <br></br>
                            <label>Password:</label>
                            <input type="password" className='login__input' type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                            <br></br>
                            {this.state.error && <Error message={this.state.error} />}
                            <button className="btn-send--login" type="submit">Login</button>
                        </form>
                </div>

            </div>

        </div>
    }
}

export default Login