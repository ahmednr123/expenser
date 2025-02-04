import Express from 'express';
import {UserAuth} from '../module/Middleware.js';

import ExpenseModel from '../model/Expense.js';
import ModelController from '../db/controller/Model.js';

const Router = Express.Router();
Router.use(UserAuth);

Router.get('/', async (req, res) => {
    let jsonData = await ModelController.getExpenses(req.session.userId, null, 10, req.query.offset ? req.query.offset : 0);
    res.end(JSON.stringify(jsonData));
});

Router.post('/', (req, res) => {
    let expense = {};
    expense[ExpenseModel.Column.Name] = req.body.name;
    expense[ExpenseModel.Column.Amount] = req.body.amount;
    expense[ExpenseModel.Column.Date] = new Date(req.body.date);
    expense[ExpenseModel.Column.Type] = req.body.type;
    expense[ExpenseModel.Column.Desc] = req.body.desc;
    console.log(req.body.date);
    console.log(expense[ExpenseModel.Column.Date]);
    ModelController.submitExpense(req.session.userId, expense, JSON.parse(req.body.tags), false, (id) => {
        res.end(id);
    })
});

Router.get('/:expenseId', async (req, res) => {
    let jsonData = await ModelController.getExpenses(req.session.userId, req.params.expenseId, null, null);
    res.end(JSON.stringify(jsonData));
});

Router.put('/:expenseId', (req, res) => {
    let expense = {};
    expense[ExpenseModel.Column.ID] = req.body.id;
    expense[ExpenseModel.Column.Name] = req.body.name;
    expense[ExpenseModel.Column.Amount] = req.body.amount;
    expense[ExpenseModel.Column.Date] = new Date(req.body.date);
    expense[ExpenseModel.Column.Type] = req.body.type;
    expense[ExpenseModel.Column.Desc] = req.body.desc;
    ModelController.submitExpense(req.session.userId, expense, null, true, (id) => {
        res.end(id);
    })
});

export default Router;