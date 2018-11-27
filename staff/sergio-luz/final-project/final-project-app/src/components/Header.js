import React, { Component } from 'react'
import logic from '../logic'
import { throws } from 'assert';

class Header extends Component {

    handleEditProfileClick=()=>this.props.history.push(`/profile/${logic.myId}/edit`)

    handleGoHomeClick=()=>{
        console.log(this.props.history)
        if(!(this.props.history.location.pathname==='/home/search'))
            this.props.history.push('/home/search')}


    render() {

        return (<header className="headerPage">
            <nav className="head__Nav">
                <div className="container">
                    <ul className="ul__Nav">
                        <li>
                            <h1 className="logo" onClick={this.handleGoHomeClick}>Logo</h1>
                        </li>

                    </ul>
                </div>

                <div>
                    <img onClick={this.handleEditProfileClick} className="profile-image__Nav" src="./nobody_m.original.jpg" alt="" />
                </div>
            </nav>

            <aside className="head__Notify">
                <div className="container">
                    <ul className="ul__Nav">
                        <li className="li__Nav"><a className="button__Nav" href="#">Buscar</a></li>
                        <li className="li__Nav"><a className="button__Nav" href="#"></a></li>
                        <li className="li__Nav"><a className="button__Nav" href="#"></a></li>
                    </ul>
                </div>
            </aside>

        </header>)
    }

}


export default Header