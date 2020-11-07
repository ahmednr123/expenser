import React from 'react';

import './style.styl';

class SelectColor extends React.Component {
    constructor (props) {
        super(props);
        this.state = {}
        this.state.selected = props.selected;
        this.state.colors = props.colors;
        this.clickEvent = props.clickEvent;
    }

    render () {
        return (
            <div className="select-color">
                {this.state.colors.map((json) =>
                    <div 
                        key={json.color}
                        onClick={this.clickEvent} 
                        style={{backgroundColor:json.hex}} 
                        className={json.color == this.state.selected ? "highlight" : ""}
                        color={json.color}></div>
                )}
            </div>
        );
    }
}

export default SelectColor;