import React, { Component } from 'react'
import './informationPanel.css'

class InformationPanel extends Component {

    handleOkButton=this.handleOkButton.bind(this)
    handleOkButton(){
        this.props.handleAcceptError()
    }

    render() {
        const {error}=this.props

        return <div className='wrapper-panel'>
            <div className='panel'>
            <div className='panel__content'>
                <p className='content__text'>{error}</p>

                </div>
                <button onClick={this.handleOkButton} className='panel__bttn-ok'>Ok</button>
            </div>
        </div>
    }
}

export default InformationPanel