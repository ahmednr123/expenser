import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './style.styl';

class ExpenseDataBlock extends React.Component {
    constructor (props) {
        super(props);
        console.log(JSON.stringify(props));
        this.state = {};
        this.state.date = props.date;
        this.state.data = props.data;
    }

    render () {
        return (
            <div style={{display:"flex", flexDirection:"column", marginBottom:"20px"}}>
                <div className="expense-block-date">{this.state.date}</div>
                <div className="expense-block">
                    {
                        this.state.data.map(json => (
                            <div className="expense-block-section">
                                <span>{getType(json.type)}</span>
                                <div className="expense-block-section-data">
                                    <span>{json.name}</span>
                                    <span>&#x20B9;{json.expense}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

function getType (type) {
    let out, color;
    switch (type) {
        case 'credit':
            out = "CRD";
            color = "green";
            break;
        case 'debit':
            out = "DEB";
            color = "red";
            break;
        case 'due':
            out = "DUE";
            color = "yellow";
            break;
    }

    return (<div style={{color, fontSize:"10px", marginTop:"calc(50% - 1px)", fontFamily:"monospace"}}>{out}</div>);
} 

export default ExpenseDataBlock;