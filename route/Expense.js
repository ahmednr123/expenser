import Express from 'express';
import {UserAuth} from '../module/Middleware.js';

import ExpenseModel from '../model/Expense.js';
import ModelController from '../db/controller/Model.js';

const Router = Express.Router();
Router.use(UserAuth);

Router.get('/', (req, res) => {
    res.end(ModelController.getExpenses(req.session.userId, null, 10, req.query.offset ? req.query.offset : 0));
});

Router.post('/', (req, res) => {
    let expense = {};
    expense[ExpenseModel.Column.Name] = req.body.name;
    expense[ExpenseModel.Column.Amount] = req.body.amount;
    expense[ExpenseModel.Column.Date] = new Date(req.body.date);
    expense[ExpenseModel.Column.Type] = req.body.type;
    expense[ExpenseModel.Column.Desc] = req.body.desc;
    ModelController.submitExpense(req.session.userId, expense, false, (id) => {
        res.end(id);
    })
});

Router.get('/:expenseId', (req, res) => {
    res.end(ModelController.getExpenses(req.session.userId, req.params.expenseId, null, null));
});

Router.put('/:expenseId', (req, res) => {
    let expense = {};
    expense[ExpenseModel.Column.ID] = req.body.id;
    expense[ExpenseModel.Column.Name] = req.body.name;
    expense[ExpenseModel.Column.Amount] = req.body.amount;
    expense[ExpenseModel.Column.Date] = new Date(req.body.date);
    expense[ExpenseModel.Column.Type] = req.body.type;
    expense[ExpenseModel.Column.Desc] = req.body.desc;
    ModelController.submitExpense(req.session.userId, expense, true, (id) => {
        res.end(id);
    })
});

export default Router;