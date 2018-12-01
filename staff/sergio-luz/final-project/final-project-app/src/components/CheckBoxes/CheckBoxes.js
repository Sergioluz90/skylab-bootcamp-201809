import React, { Component } from 'react'


function CheckBoxes(props) {
    const { title, list, selectedList, onChange } = props

    return <div >

        <div className='margin--left'>
            <h4>{title}</h4>
            {list.map((item, index) => {
                if (selectedList.includes(item))
                    return <div key={index}> <input checked='true' type='checkbox' value={item} onChange={onChange} /> {item}<br /> </div>
                else
                    return <div key={index}> <input type='checkbox' value={item} onChange={onChange} /> {item}<br /> </div>

            })}

        </div>

    </div>
}
export default CheckBoxes