import React, { Component } from 'react'


function Selector(props) {
    const { title, firstOption, onSelect, selected, list } = props

    return <div >

        <h3>{title}</h3>
        <div>
            <select className='profile__select' onChange={onSelect}>
                {selected ? <option value={selected}>Selected: {selected}</option> : <option value={null}>{firstOption}</option>}
                {selected && <option value={null}>It doesn't matter</option>}
                {list && list.map((elem, index) => {

                    return <option key={index} value={elem}>{elem}</option>

                })}
            </select>
           
        </div>

    </div>
}
export default Selector