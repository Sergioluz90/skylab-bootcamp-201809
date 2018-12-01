import React from 'react'

function Error(props) {
    return <div className='form__error'>
        <div className='error__container'>
            <p className='error__text'>{props.message}</p>
            <button className='error__accept-bttn' onClick={props.handleAcceptError} >Accept</button>
        </div>
    </div>
}

export default Error