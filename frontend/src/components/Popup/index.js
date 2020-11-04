import React from 'react';

import FormPopup from './FormPopup';
import InfoPopup from './InfoPopup';
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
        this.attributes = props.attributes;
        this.responseHandler = props.responseHandler;

        GlobalScopeHandler.addScope(GlobalScopeModule.POPUP, this);

        let self = this;
        this.closePopup = function () {
            self.setState({isEnabled: false});
        };
    }

    render () {
        let popupInnerFrame = null;
        switch (this.type) {
            case PopupType.FORM:
                popupInnerFrame = (<FormPopup />);
                break;
            case PopupType.INFO:
                popupInnerFrame = (<InfoPopup />);
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
                        {popupInnerFrame}
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}

export {Popup, PopupType};