import {DB, DBSync, DBUtil} from '../DB.js';

import ModelType from '../../model/Type.js';
import ExpenseModel from '../../model/Expense.js';
import TagModel from '../../model/Tag.js';

export default {

    getExpenses: async function (userId, expenseId, size, offset) {
        return await this._get(userId, ModelType.Expense, expenseId, size, offset);
    },

    getTags: async function (userId, tagId, size, offset) {
        return await this._get(userId, ModelType.Tag, tagId, size, offset);
    },

    submitExpense: function (userId, expense, isUpdate, callback) {
        this._submit(userId, ModelType.Expense, expense, isUpdate, callback);
    },

    submitTag: function (userId, tag, isUpdate, callback) {
        this._submit(userId, ModelType.Tag, tag, isUpdate, callback);
    },

    _get: async function (userId, type, id, size, offset) {
        let ModelColumns = (type == ModelType.Expense) ? ExpenseModel.Column : TagModel.Column;
        let query = `SELECT * FROM ${type} WHERE ${ModelColumns.UserId} = ${userId} `;
        
        if (id) {
            query += `AND id='${id}'`;
        } else {
            query += `LIMIT ${size} ${offset ? `OFFSET ${offset}`: ``}`;
        }
        
        return await DBSync.query(query);
    },

    _submit: function (userId, type, document, isUpdate, callback) {
        let query;
        let ModelColumns = (type == ModelType.Expense) ? ExpenseModel.Column : TagModel.Column;

        document[ModelColumns.UserId] = userId;
        
        if (!isUpdate) {
            query = `INSERT INTO ${type} ${DBUtil.getColumnValueString(ModelColumns)}`
        } else {
            let id = document[ModelColumns.ID];
            document[ModelColumns.ID] = null;

            query = `UPDATE ${type} SET ${DBUtil.getUpdateValuesString(ModelColumns)} WHERE ${ModelColumns.ID} = ${id} AND ${ModelColumns.UserId} = ${userId}`;
        }

        DB.query(query, (err, result) => {
            if (err) {
                console.log(`DB ERROR while ${isUpdate ? 'updating' : 'inserting'} model data: ${JSON.stringify(err, null, 4)}`);
                callback(null);
                return;
            }

            callback(result.insertId);
        })
    }
    
}