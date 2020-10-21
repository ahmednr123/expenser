import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './style.styl';

class Search extends React.Component {
    render() {
       return (
          <div style={{display:"flex"}}>
            <div className="search-input-wrapper">
               <input type="text" className="search-input" placeholder="Search"/>
               <div className="search-input-icon"><FontAwesomeIcon icon={faSearch}/></div>
            </div>
          </div>
       )
    }
 }

 export default Search;