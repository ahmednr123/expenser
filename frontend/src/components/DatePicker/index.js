import React from 'react';

class DatePicker extends React.Component {
    constructor (props) {
        super(props);
        //this.state = {selectedColor:"red"}
        //this.clickEvent = this.clickEvent.bind(this);
    }

    render () {
        return (
            <div className="form-row">
                <div style={{width: "25%"}} className="holder">
                    <span className="head">Day</span>
                    <select className="dropdown">
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
                <div style={{width: "25%"}} className="holder">
                    <span className="head">Month</span>
                    <select className="dropdown">
                        <option>12</option>
                        <option>1</option>
                    </select>
                </div>
                <div style={{width: "50%"}} className="holder">
                    <span className="head">Year</span>
                    <select className="dropdown">
                        <option>2020</option>
                        <option>1</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default DatePicker;