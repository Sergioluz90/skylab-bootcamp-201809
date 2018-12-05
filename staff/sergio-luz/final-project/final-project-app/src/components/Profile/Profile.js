import React, { Component } from 'react'
import Message from '../Message/Message'
import logic from '../../logic'
import { Link } from 'react-router-dom'



class Profile extends Component {

    state = {
        user_info: null,
        show_big_image: false,
        show_send_message: false
    }

    componentDidMount() {

        this.setState({ user_info: this.props.user_info })
        this.props.retrieveUserInfo(this.props.id)
    }

    componentWillReceiveProps(props) {
        // 
        if (this.user_info != props.user_info)
            this.setState({ user_info: props.user_info }, () => {
                console.log(this.state.user_info.toString(), this.props.id)
                // 
                if (this.state.user_info.id.toString() !== this.props.id) this.props.retrieveUserInfo(this.props.id)
            })
    }

    handleShowProfileImageBig = () => {
        let flag = !this.state.show_big_image
        this.setState({ show_big_image: flag })
    }

    handleChatClick = this.handleChatClick.bind(this)
    handleChatClick(event) {
        event.preventDefault()
        
        logic.checkExisitingConversation(this.props.user_info.id)
            .then(res => {

                if (!res)
                    this.setState({ show_send_message: true })
                else
                    this.props.history.push(`/conversations/${this.props.my_info.id}/${this.props.user_info.id}`)
            })

    }


    render() {
        const { user_info, show_big_image, show_send_message } = this.state

        if (this.props.user_info) {
            return <main className="initial__profile">

                {!show_big_image && <section className="container__profile">
                    <div className="container">
                        <div className="container--column ">
                            <div className="spacer--20"></div>

                            <div>
                                <img className="profile__cover-image" src="https://image.freepik.com/free-photo/wall-wallpaper-concrete-colored-painted-textured-concept_53876-31799.jpg" alt='It did not load...'></img>

                                <div className='container__image--profile'>
                                    <div className='profile__image-box'>
                                        {user_info && <img src={user_info.profileImage ? user_info.profileImage : 'https://res.cloudinary.com/db2aaxmvg/image/upload/v1543488064/nobody_m.original.jpg'} alt="It did not load..."
                                            className='profile__image'
                                            onClick={this.handleShowProfileImageBig}
                                        />}
                                    </div>
                                </div>
                                <div className='profile__username'>
                                    <h2>{user_info && user_info.username}</h2>
                                    {user_info && !!user_info.city && <div className='profile__data-container'>
                                        <p>City: {user_info.city}</p>
                                    </div>}
                                </div>
                            </div>

                            {user_info && !!user_info.searching[0] && (<div className="component__profile profile__margin--bottom">
                                <h2>Looking for..</h2>
                                <div className='tags__container'>
                                    {user_info.searching.map((lenguage, index) => {
                                        return <p key={index} className='tags'>{lenguage}</p>
                                    })}
                                </div>
                            </div>)}

                            <div className="component__profile profile__margin--bottom">
                                <h2>Profile</h2>
                                {user_info && !!user_info.name && <div className='profile__data-container'>
                                    <h3>Name:</h3>
                                    <p>{user_info.name}</p>
                                </div>}
                                {user_info && !!user_info.email && <div className='profile__data-container'>
                                    <h3>Email:</h3>
                                    <p>{user_info.email}</p>
                                </div>}
                                {user_info && !!user_info.skype && <div className='profile__data-container'>
                                    <h3>Skype:</h3>
                                    <p>{user_info.skype}</p>
                                </div>}

                                {user_info && !!user_info.gender && <div className='profile__data-container'>
                                    <h3>Gender:</h3>
                                    <p>{user_info.gender}</p>
                                </div>}
                                {user_info && !!user_info.age && <div className='profile__data-container'>
                                    <h3>Age:</h3>
                                    <p>{user_info.age} years</p>
                                </div>}
                                {user_info && !!user_info.height && <div className='profile__data-container'>
                                    <h3>Height:</h3>
                                    <p>{user_info.height} cm</p>
                                </div>}
                                {user_info && !!user_info.weight && <div className='profile__data-container'>
                                    <h3>Weight:</h3>
                                    <p>{user_info.weight} kg</p>
                                </div>}
                            </div>
                            {user_info && !!(user_info.description || user_info.smoker) && <div className="component__profile profile__margin--bottom">
                                <h2>About me</h2>
                                {user_info && !!user_info.description && <div>

                                    <h3>Description:</h3>
                                    <p>{user_info.description}</p>
                                </div>}
                                {user_info && !!user_info.smoker && <div className='profile__data-container'>
                                    <h3>Smoker:</h3>
                                    <p>{user_info.smoker ? 'yes' : 'no'}</p>
                                </div>}
                            </div>}

                            {user_info && !!user_info.offer[0] && <div className="component__profile profile__margin--bottom">
                                <h2>My language knowledges</h2>
                                <div className='tags__container'>
                                    {user_info.offer.map((lenguage) => {
                                        return <p className='tags'>{lenguage}</p>
                                    })}
                                </div>
                            </div>}

                        </div>
                    </div>

                    {(this.props.id!==this.props.my_info.id.toString()) && <button
                        className='bttn bttn--chat-profile'
                        onClick={this.handleChatClick}
                    >Chat</button>}

                </section>}


                {show_big_image && <div className='container__image--big'>
                    <button className='bttn__close-image' onClick={this.handleShowProfileImageBig} >X</button>
                    <div className='profile__image-big'>
                        {user_info && <img src={user_info.profileImage ? user_info.profileImage : 'https://res.cloudinary.com/db2aaxmvg/image/upload/v1543488064/nobody_m.original.jpg'} alt="It did not load..."
                            className='profile__image'
                        />}
                    </div>
                </div>}

                {show_send_message && <Message
                    id={user_info.id}
                    username={user_info.username}
                    history={this.props.history}
                    my_info={this.props.my_info}
                />}



            </main>


        } else {
            return null
        }
    }

}


export default Profile