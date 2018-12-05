import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './usercard.css'

class UserCard extends Component {
    render() {
        // const {user_info}=this.props

        return <Link className='user-card__link' to={`/profile/${this.props.elem.id}`}>
            <div className='container__image'>
                  <div className='profile__image-box'>
                    {this.props.elem && <img src={this.props.elem.profileImage ? this.props.elem.profileImage : 'https://res.cloudinary.com/db2aaxmvg/image/upload/v1543488064/nobody_m.original.jpg'} alt="Image did not load..."
                      className='profile__image'
                    />}
                  </div>
                </div>
            <div className="search-panel__profile-info">{this.props.elem.description ? this.props.elem.description : ''}</div>
            <div className="search-panel__profile-text"> {this.props.elem.username}</div>
            <div className="search-panel__profile-city"> {this.props.elem.city}</div>
            
        </Link>





    }
}

export default UserCard