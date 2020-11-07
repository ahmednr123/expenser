import React from 'react';

import SelectColor from '../../components/SelectColor';

class TagPopup extends React.Component {
    constructor (props) {
        super(props);
        this.state = {selectedColor:"red"}
        this.clickEvent = this.clickEvent.bind(this);
    }

    clickEvent (evt) {
        console.log(this.state.selectedColor);
        this.setState({selectedColor: evt.target.getAttribute('color')})
    }

    render () {
        return (
            <div>
                <div className="form-row">
                    <div style={{width: "100%"}} className="holder">
                        <span className="head">Name</span>
                        <input type="text" className="textbox"/>
                    </div>
                </div>
                <div className="form-row">
                    <div style={{width: "100%"}} className="holder">
                        <span className="head">Color</span>
                        <SelectColor
                            clickEvent={this.clickEvent} 
                            selected={this.state.selectedColor}
                            colors={[
                                {hex:"#ff0000", color:"red"}, 
                                {hex:"#00ff00", color:"green"}, 
                                {hex:"#0000ff", color:"blue"}
                            ]} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TagPopup;