import React from 'react';

import TagPopup from './TagPopup.js';
import {Popup, PopupType} from '../../components/Popup';
import { GlobalScopeHandler, GlobalScopeModule } from '../../GlobalScopeHandler';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.styl';

const isColorDark = (hex) => {
   let c = hex.substring(1);    // strip #
   let rgb = parseInt(c, 16);   // convert rrggbb to decimal
   let r = (rgb >> 16) & 0xff;  // extract red
   let g = (rgb >>  8) & 0xff;  // extract green
   let b = (rgb >>  0) & 0xff;  // extract blue

   let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

   console.log("Hex: " + hex + ", Luma: " + luma);
   
   return luma < 60;
}

const tag = (name, color) => {
   let fontColor = "black";

   if (isColorDark(color)) {
      fontColor = "white";
   }
   
   return (<span className="tag" style={{backgroundColor:color, color:fontColor}}>{name}</span>);
} 

class Tags extends React.Component {
   constructor (props) {
      super(props);

      let tags = [{name:"Groceries", color:"#ff0000", id:""}, {name:"Home", color:"#d2d2d2", id:""}, {name:"Home", color:"#d2d2d2", id:""}]

      let self = this;
      this.state = {tags};
      this.handleClick = this.handleClick.bind(this);
      this.popupResponseHandler = function (response) {
         self.setState({isPopup: false});
         console.log("Popup Response: " + response);
      }
   }

   handleClick () {
      let popupScope = GlobalScopeHandler.getScope(GlobalScopeModule.POPUP);
      popupScope.setState({isEnabled: true});
   }

   render() {
      return (
         <div>
            <Popup 
               type={PopupType.FORM} 
               component={TagPopup} 
               heading="Tag" 
               responseHandler={this.popupResponseHandler} />
            <div style={{display:"flex", justifyContent:"space-between"}}>
               <h1 style={{marginTop:"0px"}}>Tags</h1>
               <div style={{paddingTop:"10px"}} onClick={this.handleClick}><FontAwesomeIcon icon={faPlus} /></div>
            </div>
            <div>
               {
                  this.state.tags.map(json => (
                     tag(json.name, json.color)
                  ))
               }
            </div>
         </div>
      )
   }
}

export default Tags;