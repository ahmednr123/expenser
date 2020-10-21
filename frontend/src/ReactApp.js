import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";

import Home from './screens/Home';
import Search from './screens/Search';
import Tags from './screens/Tags';
import Account from './screens/Account';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faTags, faUser } from '@fortawesome/free-solid-svg-icons';

import '../style/main.styl';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = { matches: window.matchMedia("(min-width: 500px)").matches }
    }

    componentDidMount () {
        const handler = e => this.setState({matches: e.matches});
        window.matchMedia("(min-width: 500px)").addListener(handler);
    }

    render () {
        if (this.state.matches) {
            return (<div style={{width:"100%",textAlign:"center",marginTop:"200px"}}>Coming Soon...</div>);
        } else {
            return (
                <Router>
                    <main style={{margin:"20px"}}>
                        <Route path="/">
                            <Redirect to="/home"/>
                        </Route>
                        <Route path="/home" exact component={Home} />
                        <Route path="/search"  component={Search} />
                        <Route path="/tags"  component={Tags} />
                        <Route path="/account"  component={Account} />
                    </main>
                    <nav>
                        <NavLink activeClassName='is-active' className="nav-link" to="/home"><FontAwesomeIcon icon={faHome}/></NavLink>
                        <NavLink activeClassName='is-active' className="nav-link" to="/search"><FontAwesomeIcon icon={faSearch}/></NavLink>
                        <NavLink activeClassName='is-active' className="nav-link" to="/tags"><FontAwesomeIcon icon={faTags}/></NavLink>
                        <NavLink activeClassName='is-active' className="nav-link" to="/account"><FontAwesomeIcon icon={faUser}/></NavLink>
                    </nav>
                </Router>
            );
        }
    }
}

export default App;