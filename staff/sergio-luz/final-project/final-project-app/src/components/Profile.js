import React, { Component } from 'react'

class Profile extends Component {

    state = {
        user_info: null
    }

    componentDidMount() {

        this.setState({ user_info: this.props.user_info })
        this.props.retrieveUserInfo(this.props.id)
    }

    componentWillReceiveProps(props) {

        this.setState({ user_info: props.user_info })
    }

    render() {

        const { user_info } = this.state

        if (this.props.user_info) {
            return <main className="initial">

                <section className="container__profile">
                    <div className="container">
                        <div className="container--column ">
                            <div className="spacer--20"></div>

                            <div>
                                <img className="profile__cover-image" src="https://image.freepik.com/free-photo/wall-wallpaper-concrete-colored-painted-textured-concept_53876-31799.jpg"></img>

                                <div className='container__image--profile'></div>
                                <div className='profile__username'>
                                    <h2>{user_info && user_info.username}</h2>
                                    {user_info && !!user_info.city && <div className='profile__data-container'>
                                    <p>City: {user_info.city}</p>
                                </div>}
                                </div>
                            </div>

                            {user_info && !!user_info.searching[0] && (<div className="component__profile margin--bottom">
                                <h2>Looking for..</h2>
                                <div>
                                    {user_info.searching.map((lenguage) => {
                                        return <p>{lenguage}</p>
                                    })}
                                </div>
                            </div>)}

                            <div className="component__profile margin--bottom">
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
                                    <p>{user_info.age}</p>
                                </div>}
                                {user_info && !!user_info.height && <div className='profile__data-container'>
                                    <h3>Height:</h3>
                                    <p>{user_info.height}</p>
                                </div>}
                                {user_info && !!user_info.weight && <div className='profile__data-container'>
                                    <h3>Weight:</h3>
                                    <p>{user_info.weight}</p>
                                </div>}
                            </div>
                            {user_info && !!(user_info.description || user_info.smoker) && <div className="component__profile margin--bottom">
                                <h2>About me</h2>
                                {user_info && !!user_info.smoker && <div>

                                    <h3>Description:</h3>
                                    <p>{user_info.description}</p>
                                </div>}
                                {user_info && !!user_info.smoker && <div className='profile__data-container'>
                                    <h3>Smoker:</h3>
                                    <p>{user_info.smoker}</p>
                                </div>}
                            </div>}

                            {user_info && !!user_info.offer[0] && <div className="component__profile margin--bottom">
                                <h2>My language knowledges</h2>
                                <div>
                                    {user_info.offer.map((lenguage) => {
                                        return <p>{lenguage}</p>
                                    })}
                                </div>
                            </div>}
                        </div>
                    </div>
                    <button className='bttn bttn--block-profile'>Block</button>
                </section>
            </main>


        } else {
            return null
        }
    }

}


export default Profile