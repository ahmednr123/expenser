import Express from 'express';
import Config from './Configuration.js';

import TagRoute from './route/Tag.js';
import ExpenseRoute from './route/Expense.js';
import AccountRoute from './route/Account.js';

import BodyParser from 'body-parser';
import Session from 'express-session';
import MySQLSession from 'express-mysql-session';

const MySQLStore = MySQLSession(Session);
const SessionStore = new MySQLStore(Config.mysql);

const App = Express();

App.use(Session({
    key: Config.SESSION.key,
    secret: Config.SESSION.secret, 
    store: SessionStore, 
    saveUninitialized: false, 
    resave: false
}));

App.use(Express.static('public'));
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());

App.use('/expenses', ExpenseRoute);
App.use('/tags', TagRoute);
App.use('/account', AccountRoute);

App.listen(Config.PORT);