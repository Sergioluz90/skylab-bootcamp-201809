import React, { Component } from 'react'


function Input(props) {
    const { title, placeholder, onChange } = props

    return <div >

        <h3 className='margin--left'>{title}</h3>

        <input
            type='text'
            placeholder={placeholder}
            className=' search-bar component'
            onChange={onChange}
        />

    </div>
}
export default Input