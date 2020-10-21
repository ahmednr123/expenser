import Express from 'express';
import {UserAuth} from '../module/Middleware.js';

import ModelController from '../db/controller/Model.js';

const Router = Express.Router();
Router.use(UserAuth);

Router.get('/', (req, res) => {
    res.end(ModelController.getExpenses(req.session.userId, null, 10, req.query.offset));
});

Router.post('/', (req, res) => {
    let document = {};
});

Router.get('/:expenseId', (req, res) => {

});

Router.put('/:expenseId', (req, res) => {

});

export default Router;