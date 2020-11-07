import React from 'react';

import ExpensePopup from './ExpensePopup.js';
import ExpenseDataBlock from '../../components/ExpenseDataBlock';
import { GlobalScopeHandler, GlobalScopeModule } from '../../GlobalScopeHandler';
import {Popup, PopupType} from '../../components/Popup';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Home extends React.Component {
   constructor (props) {
      super(props);
      this.state = {};
      this.handleClick = this.handleClick.bind(this);
   }

   handleClick () {
      let popupScope = GlobalScopeHandler.getScope(GlobalScopeModule.POPUP);
      popupScope.setState({isEnabled: true});
   }

   render() {
      return (
         <div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
               <h1 style={{marginTop:"0px"}}>Expenses</h1>
               <div style={{paddingTop:"10px"}} onClick={this.handleClick}><FontAwesomeIcon icon={faPlus} /></div>
            </div>
            <ExpenseDataBlock data={[{id:"1",name:"Rent",expense:"8500",type:"debit"}, {id:"2",name:"Rent",expense:"8500",type:"credit"}]} date="Thursday, 22nd July 2020"/>
            <ExpenseDataBlock data={[{id:"3",name:"Rent",expense:"8500",type:"debit"}]} date="Saturday, 26th July 2020"/>
            <Popup 
               type={PopupType.FORM} 
               component={ExpensePopup} 
               heading="Create Expense" 
               responseHandler={this.popupResponseHandler} />
         </div>
      )
   }
 }

 export default Home;