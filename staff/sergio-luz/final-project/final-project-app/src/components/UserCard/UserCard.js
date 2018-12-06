import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './usercard.css'

function UserCard(props) {

    return <Link className='user-card__link' to={`/profile/${props.elem.id}`}>
        <div className='container__image'>
            <div className='profile__image-box'>
                {props.elem && <img src={props.elem.profileImage ? props.elem.profileImage : 'https://res.cloudinary.com/db2aaxmvg/image/upload/v1543488064/nobody_m.original.jpg'} alt="Image did not load..."
                    className='profile__image'
                />}
            </div>
        </div>
        <div className="search-panel__profile-info">{props.elem.description ? props.elem.description : ''}</div>
        <div className="search-panel__profile-text"> {props.elem.username}</div>
        <div className="search-panel__profile-city"> {props.elem.city}</div>

    </Link>

}

export default UserCard