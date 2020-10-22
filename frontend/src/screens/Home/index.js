import React from 'react';

import ExpenseDataBlock from '../../components/ExpenseDataBlock';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Home extends React.Component {
   constructor (props) {
      super(props);
   }

   render() {
      return (
         <div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
               <h1>Expenses</h1>
               <div><FontAwesomeIcon icon={faPlus} /></div>
            </div>
            <ExpenseDataBlock data={[{name:"Rent",expense:"8500",type:"debit"}, {name:"Rent",expense:"8500",type:"credit"}]} date="Thursday, 22nd July 2020"/>
            <ExpenseDataBlock data={[{name:"Rent",expense:"8500",type:"debit"}]} date="Saturday, 26th July 2020"/>
         </div>
      )
   }
 }

 export default Home;