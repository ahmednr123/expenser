import Express from 'express';
import {UserAuth} from '../module/Middleware.js';

import TagModel from '../model/Tag.js';
import ModelController from '../db/controller/Model.js';

const Router = Express.Router();
Router.use(UserAuth);

Router.get('/', async (req, res) => {
    let jsonData = await ModelController.getTags(req.session.userId, null, 10, req.body.offset);
    res.end(JSON.stringify(jsonData));
});

Router.post('/', (req, res) => {
    let tag = {};
    tag[TagModel.Column.Name] = req.body.name;
    tag[TagModel.Column.Color] = req.body.color;
    ModelController.submitTag(req.session.userId, tag, false, (id) => {
        res.end(id);
    });
});

Router.get('/:tagId', async (req, res) => {
    let jsonData = await ModelController.getTags(req.session.userId, req.params.tagId, null, null);
    res.end(JSON.stringify(jsonData));
});

Router.put('/:tagId', (req, res) => {
    let tag = {};
    tag[TagModel.Column.ID] = req.body.id;
    tag[TagModel.Column.Name] = req.body.name;
    tag[TagModel.Column.Color] = req.body.color;
    ModelController.submitTag(req.session.userId, tag, true, (id) => {
        res.end(id);
    });
});

export default Router;