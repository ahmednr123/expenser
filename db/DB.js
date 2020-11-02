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
	getColumnValueString: function (document, modelColumns) {
		let columns = [];
		let values = [];
		for (let column in modelColumns) {
			if (document[column]) {
				columns.push(`\`${column}\``);
				if (column.toLocaleLowerCase() == 'date')
					values.push(`'${document[column].getUTCDate()}-${document[column].getUTCMonth() + 1}-${document[column].getUTCFullYear()}'`);
				else 
					values.push(`'${document[column]}'`);
			}
		}
		return `(${columns.join(',')}) VALUES (${values.join(',')})`;
	},

	getUpdateValuesString: function (document, modelColumns) {
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