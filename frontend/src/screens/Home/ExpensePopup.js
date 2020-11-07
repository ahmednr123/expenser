import React from 'react';

export default () => (
    <div>
        <div className="form-row">
            <div style={{width: "24%"}} className="holder">
                <span className="head">Type</span>
                <select className="dropdown">
                    <option>CRD</option>
                    <option>DEB</option>
                </select>
            </div>
            <div style={{width: "76%"}} className="holder">
                <span className="head">Expense</span>
                <input type="text" className="textbox"/>
            </div>
        </div>
        <div className="form-row">
            <div style={{width: "50%"}} className="holder">
                <span className="head">Name</span>
                <input type="text" className="textbox"/>
            </div>
            <div style={{width: "50%"}} className="holder">
                <span className="head">Age</span>
                <input type="text" className="textbox"/>
            </div>
        </div>
    </div>
);