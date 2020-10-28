import {DB, DBSync} from '../DB.js';
import Crypt from '../../module/Crypt.js';

import AccountModel from '../../model/Account.js';

export default {

    getUserId: async function (username, password) {
        let records = await DBSync(`SELECT ${AccountModel.Column.ID},${AccountModel.Column.Password} FROM Account WHERE ${AccountModel.Column.Username} = '${username}'`);
        if (Crypt.checkPassword(password, records[0][AccountModel.Column.Password])) 
            return records[0][AccountModel.Column.ID];
        return false;
    },

    getUserDetails: async function (userId) {
        return await DBSync(`SELECT * FROM Account WHERE ${AccountModel.Column.ID} = ${userId}`);
    },
    
    createUser: function (userData, callback) {
        userData[AccountModel.Column.Password] = Crypt.genPassword(userData[AccountModel.Column.Password]);

        let query = `INSERT INTO Account ${DBUtil.getColumnValueString(AccountModel.Column)}`;
        DB.query(query, (err, result) => {
            if (err) {
                console.log(`DB ERROR while creating user account: ${JSON.stringify(err, null, 4)}`);
                callback(null);
                return;
            }

            callback(result.insertId);
        })
    },

    updateUser: function (userData, callback) {
        let userId = userData[AccountModel.Column.ID];
        userData[AccountModel.Column.ID] = null;
        userData[AccountModel.Column.Password] = null;

        let query = `UPDATE Account SET ${DBUtil.getUpdateValuesString(AccountModel.Column)} WHERE ${AccountModel.Column.ID} = ${userId}`;
        DB.query(query, (err) => {
            if (err) {
                console.log(`DB ERROR while updating user account: ${JSON.stringify(err, null, 4)}`);
                callback(false);
                return;
            }

            callback(true);
        });
    }

}