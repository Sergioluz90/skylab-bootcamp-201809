import React, { Component } from 'react'
import logic from '../../logic'


class Message extends Component {

    state={
        message_text:null
    }

    hanldeText=event=>{
        event.preventDefault()

        this.setState({message_text:event.target.value})
    }

    sendFirstMessage=event=>{
        event.preventDefault()

        logic.sendMessage(this.props.id, this.state.message_text)
        .then(res=>{
            
            this.props.history.push(`/conversations/${this.props.my_info.id}/${this.props.id}`)
        })

    }

    render() {

        const {username}=this.props

        return <div className='form__error'>
            <div className='error__container'>
                <p className='error__text'>Send your first message to {username}</p>
                <input onChange={this.hanldeText} placeholder='write your message here..'></input>
                <button className='error__accept-bttn' onClick={this.sendFirstMessage} >Send</button>
            </div>
        </div>
    }
}

export default Message