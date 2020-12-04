import React from 'react';
import Select from 'react-select'

import DatePicker from '../../components/DatePicker';

class ExpensePopup extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            id: -1,
            date: {day:21, month:3, year:2020},
            name: '',
            type: '',
            desc: '',
            selectedTags: []
        }
        
        this.options = [
            { value: 'credit', label: 'CRD' },
            { value: 'debit', label: 'DBT' }
        ]
        
        this.dateEventHanlder = this.dateEventHanlder.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    dateEventHanlder (type, value) {
        let jsonKey = type;
        let date = this.state.date;
        date[jsonKey] = value;
        this.setState({date});
    }

    handleChange (selectedTags) {
        if (selectedTags == null) {
            selectedTags = []
        }
        this.setState({selectedTags});
    }

    render () {
        const {selectedOption} = this.state;
        return (
            <div>
                <div className="form-row">
                    <div style={{width: "100%"}} className="holder">
                        <span className="head">Name</span>
                        <input type="text" value={this.state.name} className="textbox"/>
                    </div>
                </div>
                <div className="form-row">
                    <div style={{width: "30%"}} className="holder">
                        <span className="head">Type</span>
                        <select className="dropdown">
                            <option>CRD</option>
                            <option>DEB</option>
                        </select>
                    </div>
                    <div style={{width: "70%"}} className="holder">
                        <span className="head">Expense</span>
                        <input type="number" className="textbox"/>
                    </div>
                </div>
                <DatePicker date={this.state.date}/>
                <div className="form-row">
                    <div style={{width: "100%"}} className="holder">
                        <span className="head">Description</span>
                        <textarea></textarea>
                    </div>
                </div>
                <div className="form-row">
                    <div style={{width: "100%"}} className="holder">
                        <span className="head">Tags</span>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            isMulti
                            options={this.options}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpensePopup;