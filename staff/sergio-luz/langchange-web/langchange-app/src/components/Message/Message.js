import React, { Component } from 'react'
import logic from '../../logic'
import './message.css'


class Message extends Component {

    state = {
        message_text: null
    }

    hanldeText = event => {
        event.preventDefault()

        this.setState({ message_text: event.target.value })
    }

    handleClose = () => {
        
        this.setState({ message_text: null }, () => {
            this.props.handleHiddeSendMessage()
        })
    }
    sendFirstMessage = event => {
        event.preventDefault()

        
        try {
            
            logic.sendMessage(this.props.id, this.state.message_text)
                .then(res => {

                    
                    this.props.history.push(`/conversations/${this.props.my_info.id}/${this.props.id}`)
                })
                .catch(err => {
                    
                    this.props.handleSetError(err.message)
                })
        } catch (err) {
            
            this.props.handleSetError(err.message)
        }
    }

    render() {

        const { username } = this.props

        return <div className='form__error'>
            <form onSubmit={this.sendFirstMessage} className='error__container'>
                <p className='message__text'>Send your first message to {username}</p>
                <input className='message__input' onChange={this.hanldeText} placeholder='write your message here..'></input>
                <button className='message__send-bttn' onClick={this.sendFirstMessage} >Send</button>
            </form>
            <button onClick={this.handleClose} className='close-bttn'>X</button>
        </div>
    }
}

export default Message