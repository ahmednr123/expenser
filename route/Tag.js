import Express from 'express';
import {UserAuth} from '../module/Middleware.js';

import ModelController from '../db/controller/Model.js';

const Router = Express.Router();
Router.use(UserAuth);

Router.get('/', () => {
    
});

Router.post('/', () => {
    
});

Router.get('/:tagId', () => {
    
});

Router.put('/:tagId', () => {
    
});

export default Router;