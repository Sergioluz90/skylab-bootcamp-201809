import React from 'react'

function CollapsibleProfile(props) {
    return <div className='container__collapsible-profile'>
    <i className="fas fa-caret-up collapsible__arrow" onClick={props.handleCollapsible}></i>
    <button className='collapsible-profile__link' onClick={props.handleViewProfileClick} >View profile</button>
    <button className='collapsible-profile__link' onClick={props.handleEditProfileClick} >Edit profile</button>
    <button className='collapsible-profile__link' onClick={props.handleLogoutSession} >Logout</button>
    </div>
}

export default CollapsibleProfile