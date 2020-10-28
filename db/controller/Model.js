import {DB, DBSync, DBUtil} from '../DB.js';

import ModelType from '../../model/Type.js';
import ExpenseModel from '../../model/Expense.js';
import TagModel from '../../model/Tag.js';

export default {

    getExpenses: async function (userId, expenseId, size, offset) {
        let expense = await this._get(userId, ModelType.Expense, expenseId, size, offset);
        if (expenseId) {
            let query = `SELECT t.id, t.name, t.color FROM Tag t, Expense e
                         INNER JOIN ExpenseToTagsMapping ettm ON ettm.ExpenseId = e.Id
                         WHERE t.Id = ettm.TagId AND e.Id = ${expenseId}`;
            expense.tags = await DBSync.query(query);
        }

        return expense;
    },

    getTags: async function (userId, tagId, size, offset) {
        return await this._get(userId, ModelType.Tag, tagId, size, offset);
    },

    submitExpense: function (userId, expense, isUpdate, callback) {
        if (isUpdate) {
            this._submit(userId, ModelType.Expense, expense, isUpdate, callback);
        } else {
            this._insertExpense(expense.type, expense.date, expense.amount, userId, expense.tags, callback);
        }
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

    _insertExpense: function (type, date, amount, userId, tags) {
        DB.beginTransaction(function (err) {
            if (err) {
                console.log('Error while adding expense: ' + JSON.stringify(err, null, 4));
                return;
            }

            DB.query('INSERT INTO `Expense` (`Type`,`Date`,`Amount`,`UserId`) VALUES (?, ?, ?, ?)', [type, date, amount, userId], function (err, res, fields) {
                if (err) {
                    return connection.rollback(function() {
                      throw err;
                    });
                }
    
                console.log(res.insertId + ' EXPENSE ADDED');
                for (let tag of tags) {
                    DB.query('INSERT INTO `ExpenseToTagsMapping` (`ExpenseId`,`TagId`, `UserId`) VALUES (?, ?, ?)', [res.insertId, tag, userId], function (err, res, fields) {
                        if (err) {
                            console.log('Error while adding expense: ' + JSON.stringify(err, null, 4));
                            return DB.rollback(function() {throw err;});
                        }
    
                        console.log('EXPENSE MAPPING ADDED');
                        DB.commit(function(err) {
                            if (err) {
                                console.log('Error while adding expense: ' + JSON.stringify(err, null, 4));
                                return DB.rollback(function() {throw err;});
                            }
                            console.log('Success!');
                        });
                    })
                }
            });
        });
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