import MySQL from 'mysql';
import Util from 'util';
import Config from '../Configuration.js';

const DB = MySQL.createConnection({
	host: Config.MYSQL.host,
	user: Config.MYSQL.user,
	password: Config.MYSQL.password,
	database: Config.MYSQL.database
});

const DBSync = Util.promisify(DB.query).bind(DB);

const DBUtil = {
	getColumnValueString: function (modelColumns) {
		let columns = [];
		let values = [];
		for (let column in modelColumns) {
			if (document[column]) {
				columns.push(column);
				values.push(`'${document[column]}'`);
			}
		}
		return `(${columns.concat(',')}) VALUES (${values.concat(',')})`;
	},

	getUpdateValuesString: function (modelColumns) {
		let updatedValues = '';
		for (let column in modelColumns) {
			if (document[column]) {
				updatedValues += `${column} = '${document[column]}' `;
			}
		}
		return updatedValues;
	}
}

export {
	DBSync, DB, DBUtil
};