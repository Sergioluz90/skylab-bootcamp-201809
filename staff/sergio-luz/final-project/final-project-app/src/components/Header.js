import React, { Component } from 'react'
import logic from '../logic'
import { throws } from 'assert';
import CollapsibleProfile from './CollapsibleProfile';

class Header extends Component {

    state = {
        opened_collapsible: false
    }

    handleViewProfileClick = () => {
        this.props.history.push(`/profile/${logic.myId}`)
        this.handleCollapsible()
    }
    handleEditProfileClick = () => {
        this.props.history.push(`/profile/${logic.myId}/edit`)
        this.handleCollapsible()
    }
    handleGoHomeClick = () => {
        console.log(this.props.history)
        if (!(this.props.history.location.pathname === '/home/search'))
            this.props.history.push('/home/search')
    }
    handleLogoutSession=()=>{
        logic.logout()
        this.props.history.push(`/`)
    }

    handleCollapsible = () => {
        this.state.opened_collapsible ? this.setState({ opened_collapsible: false }) : this.setState({ opened_collapsible: true })
    }


    render() {
        const { user_info } = this.props
        const { opened_collapsible } = this.state

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
                    <img onClick={this.handleCollapsible} className="profile-image__Nav" src="./nobody_m.original.jpg" alt="" />

                    {opened_collapsible && <CollapsibleProfile
                        user_info={user_info}
                        handleCollapsible={this.handleCollapsible}
                        handleViewProfileClick={this.handleViewProfileClick}
                        handleEditProfileClick={this.handleEditProfileClick}
                        handleLogoutSession={this.handleLogoutSession}
                    />}
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