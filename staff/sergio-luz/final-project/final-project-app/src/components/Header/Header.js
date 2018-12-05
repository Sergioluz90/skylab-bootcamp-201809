import React, { Component } from 'react'
import logic from '../../logic'
import { throws } from 'assert';
import CollapsibleProfile from '../CollapsibleProfile/CollapsibleProfile';
import { Link } from 'react-router-dom'


class Header extends Component {

    state = {
        opened_collapsible: false
    }

    componentDidMount=()=>{
        this.props.retrieveMyInfo()
    }

    handleViewProfileClick = () => {
        this.props.history.push(`/profile/${logic.myId}`)
        this.handleCollapsible()
        this.props.retrieveUserInfo(logic.myId)
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

    handleLogoutSession = () => {
        logic.logout()
        this.props.history.push(`/`)
    }

    handleCollapsible = () => {
        this.state.opened_collapsible ? this.setState({ opened_collapsible: false }) : this.setState({ opened_collapsible: true })
    }


    render() {
        const { my_info } = this.props
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

                
                <div className='container-image__Nav'>
                    <div className='profile__image-box--Nav'>
                        <img onClick={this.handleCollapsible}
                            className="profile-image__Nav"
                            src={my_info ? (my_info.profileImage ? my_info.profileImage : 'https://res.cloudinary.com/db2aaxmvg/image/upload/v1543488064/nobody_m.original.jpg') : 'https://res.cloudinary.com/db2aaxmvg/image/upload/v1543488064/nobody_m.original.jpg'}
                            alt="profile_image_in_navbar"
                        />
                    </div>
                    {opened_collapsible && <CollapsibleProfile
                        my_info={my_info}
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
                        <li className="li__Nav"><a className="button__Nav" href="#">Search</a></li>
                        
                        <li className="li__Nav">{my_info && <Link to={`/conversations/${my_info.id}`}>Chats</Link>}</li>
                        <li className="li__Nav"><a className="button__Nav" href="#"></a></li>
                    </ul>
                </div>
            </aside>

        </header>)
    }

}


export default Header