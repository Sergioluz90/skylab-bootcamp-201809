import React, { Component } from 'react'


function Input(props) {
    const { title, placeholder, onChange,classNameDiv, classNameInput , classNameTitle} = props

    return <div className={classNameDiv}>

        <h3 className={classNameTitle ? classNameTitle:'margin--left'}>{title}</h3>

        <input
            type='text'
            placeholder={placeholder}
            className={classNameInput ? classNameInput:' search-bar component' }
            onChange={onChange}
        />

    </div>
}
export default Input