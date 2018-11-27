import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UserCard extends Component {
    render() {
        return <Link to={`/profile/${this.props.elem.id}`}>
            <div className="container__image"></div>
            <div className="search-panel__profile-info">{this.props.elem.description ? this.props.elem.description : ''}</div>
            <div className="search-panel__profile-text"> {this.props.elem.username}</div>
        </Link>





    }
}

export default UserCard