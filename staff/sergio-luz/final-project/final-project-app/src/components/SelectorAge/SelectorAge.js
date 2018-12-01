import React, { Component } from 'react'


function SelectorAge(props) {
    const { title, onSelectMinAge, onSelectMaxAge, selectedMinAge, selectedMaxAge,  list } = props

    return <div >

        <h3>{title}</h3>
        <div>
            <select className='profile__select' onChange={onSelectMinAge}>
                {selectedMinAge ? <option value={selectedMinAge}>Selected: {selectedMinAge}</option> : <option value={null}> Minimum age:</option>}
                {selectedMinAge && <option value={null}>No min age</option>}
                {list && list.map((age, index) => {
                    if (selectedMaxAge == null || selectedMaxAge >= age)
                        return <option key={index} value={age}>{age}</option>
                    else
                        return
                })}
            </select>
            <br></br>
            <select className='profile__select' onChange={onSelectMaxAge}>
                {selectedMaxAge ? <option value={selectedMaxAge}>Selected:{selectedMaxAge}</option> : <option value={null}> Maximum age:</option>}
                {selectedMaxAge && <option value={null}>No max age</option>}
                {list && list.map((age, index) => {
                    if (selectedMinAge == null || selectedMinAge <= age)
                        return <option key={index} value={age}>{age}</option>
                    else
                        return
                })}
            </select>
        </div>

    </div>
}
export default SelectorAge