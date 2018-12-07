import React, { Component } from 'react'
import Error from '../Error/Error'
import logic from '../../logic'
import './conversations.css'
import * as ReactDOM from 'react-dom';


class Conversations extends Component {

    state = {
        conversations_list: null,
        receiver_id: null,
        list_messages: null,
        text: null
    }

    componentDidMount = () => {

        try {
            logic.listConversations()
                .then(res => {

                    if (res.length) this.setState({ conversations_list: res }, () => {
                        if (this.props.receiver_id) {
                            logic.listChats(this.props.receiver_id)
                                .then(list_messages => {
                                    this.setState({ list_messages }, () => {
                                        this.scrollChat()

                                        this.refreshChat()
                                    })
                                })
                        }
                    })
                })
                .catch(err => {
                    this.props.handleSetError(err.message)
                })
        } catch (err) {
            this.props.handleSetError(err.message)
        }
    }

    scrollChat = () => {
        const { conversationSpace } = this.refs;
        const scrollHeight = conversationSpace.scrollHeight;
        const height = conversationSpace.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(conversationSpace).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentWillReceiveProps(props) {


        if (this.state.receiver_id != props.receiver_id)
            this.setState({ receiver_id: props.receiver_id }, () => {

                if (props.receiver_id) {
                    logic.listChats(props.receiver_id)

                        .then(list_messages => {

                            if (list_messages !== this.state.list_messages)
                                this.setState({ list_messages }, () => {
                                    this.scrollChat()
                                })
                        })
                }
            })
    }

    refreshChat = () => {

        try {
            logic.listChats(this.props.receiver_id)
                .then(list => {
                    if (list !== this.state.list_messages)
                        this.setState({ list_messages: list })
                })
                .then(() => setTimeout(this.refreshChat, 2000))
                .catch(err => {
                    this.props.handleSetError(err.message)
                })
        } catch (err) {
            this.props.handleSetError(err.message)
        }
    }

    onSendMessage = this.onSendMessage.bind(this)
    onSendMessage(event) {
        event.preventDefault()

        this.refs.textInput.value = ""
        try {
            logic.sendMessage(this.props.receiver_id, this.state.text)
                .then(res => {
                    logic.listChats(this.props.receiver_id)
                        .then(list_messages => {

                            this.setState({ list_messages, text: null })

                        })
                })
                .catch(err => {
                    this.props.handleSetError(err.message)
                })
        } catch (err) {
            this.props.handleSetError(err.message)
        }
    }

    handleTextChange = event => {
        event.preventDefault()

        this.setState({ text: event.target.value })
    }

    handleOpenChat = (event) => {
        event.preventDefault()

        this.props.history.push(`/conversations/${this.props.id}/${event.target.id}`)
    }

    render() {

        const { id, receiver_id } = this.props
        const { conversations_list, list_messages } = this.state

        return <div className='conversation-block'>
            <div className='conversation-block__structure'>
                <div className='users-block'>
                    {conversations_list && conversations_list.map((elem, index) => {
                        let key
                        ((elem.user2_id.toString() === id) ? key = elem.user1_id : key = elem.user2_id)
                        return <div className='user-block__user' key={key} id={key} onClick={this.handleOpenChat}>
                            <div className='image-box' onClick={this.handleOpenChat} id={key} >
                                <img
                                    id={key}
                                    className="profile-image__Nav"
                                    src={elem.profileImage ? elem.profileImage : 'https://res.cloudinary.com/db2aaxmvg/image/upload/v1543488064/nobody_m.original.jpg'}
                                    alt="profile_image_in_navbar"
                                />
                            </div>
                            <h3 id={key}  onClick={this.handleOpenChat}>{elem.user2_username} </h3>
                        </div>
                    })}
                </div>

                <div className='chat-block'>

                    <div className='conversation-space' ref='conversationSpace'>

                        {conversations_list && conversations_list.map((elem, index) => {

                            if (elem.user2_id.toString() === receiver_id) {
                                return <div className='conversation-space__first-message'><p>You are speaking with {elem.user2_username}</p></div>
                            }
                            else { return }
                        })}

                        {receiver_id && list_messages && list_messages.map((elem, index) => {
                            let rd
                            elem.read ? rd = 'fas fa-check-double' : rd = 'fas fa-check'

                            if (elem.sender_id.toString() !== id) {
                                return <div className='message-received'>
                                    <div className='bubble bubble--received'>
                                        {elem.text}
                                        <div className='flex--row'>
                                            {/* <i class={rd}></i> */}
                                            <div className='timestamp'>{elem.createdAt}</div>
                                        </div>

                                    </div>
                                </div>
                            } else {
                                return <div className='message-sent'>
                                    <div className='bubble bubble--sent'>
                                        {elem.text}
                                        <div className='flex--row'>
                                            <div className='timestamp'>{elem.createdAt}</div>
                                            <i class={rd}></i>
                                        </div>
                                    </div>
                                </div>
                            }
                        })}

                    </div>
                    <form onSubmit={this.onSendMessage} className='messaging-area '>
                        <input onChange={this.handleTextChange} value={this.state.text} ref='textInput'></input>
                        <a className='send' onClick={this.onSendMessage} >
                            <i class="fas fa-check-circle"></i>
                        </a>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default Conversations