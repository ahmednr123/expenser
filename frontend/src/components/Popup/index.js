import React from 'react';

import {GlobalScopeModule, GlobalScopeHandler} from '../../GlobalScopeHandler.js';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.styl';

const PopupType = {
    FORM: "form",
    INFO: "info"
}

class Popup extends React.Component {
    constructor (props) {
        super(props);

        this.state = {isEnabled: false, heading: props.heading};
        this.type = props.type;
        this.component = props.component;
        this.attributes = props.attributes;
        
        this.fetchData = props.fetchData;
        this.responseHandler = props.responseHandler;

        GlobalScopeHandler.addScope(GlobalScopeModule.POPUP, this);

        let self = this;
        this.closePopup = function () {
            self.setState({isEnabled: false});
        };
    }

    render () {
        let InnerBody = this.component;
        let bottomFrame = null;
        switch (this.type) {
            case PopupType.FORM:
                bottomFrame = (<div style={{display:"flex",justifyContent:"center", marginTop:"30px"}}>
                    <button>Submit</button>
                </div>);
                break;
            case PopupType.INFO:
                bottomFrame = (<div>
                    <button>Okay</button>
                </div>);
                break;
        }

        if (this.state.isEnabled) {
            return (
                <div className="popup-container">
                    <div className="popup">
                        <div className="header">
                            <b>{this.state.heading}</b>
                            <div style={{color:'red'}} onClick={this.closePopup}><FontAwesomeIcon icon={faTimes} /></div>
                        </div>
                        <InnerBody />
                        {bottomFrame}
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

export {Popup, PopupType};