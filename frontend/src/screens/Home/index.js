import React from 'react';

import ExpenseDataBlock from '../../components/ExpenseDataBlock';

class Home extends React.Component {
   constructor (props) {
      super(props);
   }

   render() {
      return (
         <div>
            <h1>Home</h1>
            <ExpenseDataBlock data={[{name:"Rent",expense:"8500",type:"debit"}, {name:"Rent",expense:"8500",type:"credit"}]} date="Thursday, 22nd July 2020"/>
            <ExpenseDataBlock data={[{name:"Rent",expense:"8500",type:"debit"}]} date="Saturday, 26th July 2020"/>
         </div>
      )
   }
 }

 export default Home;