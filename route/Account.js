import Express from 'express';

import AccountModel from '../model/Account.js';
import AccountController from '../db/controller/Account.js';

//const Express = require('express');
const Router = Express.Router();

let userAuth = function (req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.end('false');
    }
};

Router.post('/authenticate', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let userId = AccountController.getUserId(username, password);
    if (userId) {
        req.session.userId = userId;
        res.end('true');
    } else {
        res.end('false');
    }
});

Router.get('/', userAuth, (req, res) => {
    res.end(AccountController.getUserDetails(req.session.userId));
});

Router.post('/', userAuth, (req, res) => {
    let userData = {};
    userData[AccountModel.Column.Username] = req.body.username;
    userData[AccountModel.Column.Email] = req.body.email;
    userData[AccountModel.Column.Password] = req.body.password;
    userData[AccountModel.Column.Phone] = req.body.phone;

    AccountController.createUser(userData, (userId) => {
        if (!userId) {
            res.end('ERROR');
            return;
        }
        
        res.end(userId);
    });
});

Router.put('/', userAuth, (req, res) => {
    let userData = {};
    userData[AccountModel.Column.Username] = req.body.username;
    userData[AccountModel.Column.Email] = req.body.email;
    userData[AccountModel.Column.Password] = req.body.password;
    userData[AccountModel.Column.Phone] = req.body.phone;

    AccountController.updateUser(success, (userId) => {
        if (!success) {
            res.end('ERROR');
            return;
        }
        
        res.end(success);
    });
});

export default Router;