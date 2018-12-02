import React, { Component } from 'react'


function Selector(props) {
    const { title, firstOption, onSelect, selected, list, classNameTitle, classNameDiv, classNameSelect, tag } = props

    return <div className={classNameDiv ? classNameDiv:''}>

        <h3 className={classNameTitle ? classNameTitle:''}>{title}</h3>
        <div>
            <select className={classNameSelect ? classNameSelect:'profile__select'} onChange={onSelect}>
                {selected ? <option value={selected}>Selected: {selected}</option> : <option value={null}>{firstOption}</option>}
                {selected && <option value={null}>It doesn't matter</option>}
                {list && list.map((elem, index) => {

                    return <option key={index} value={elem}>{elem} {tag}</option>

                })}
            </select>
           
        </div>

    </div>
}
export default Selector