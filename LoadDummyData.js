import Crypt from './module/Crypt.js';
import { DB } from './db/DB.js';

/*
-- Transaction
INSERT INTO `Expense` (`Type`,`Date`,`Desc`,`Amount`,`UserId`) VALUES (type, date, desc, amount, userId)
INSERT INTO `ExpenseToTagsMapping` (`ExpenseId`,`TagId`, `UserId`) VALUES (LAST_INSERT_ID(), tagId, userId)
-- End Transaction

INSERT INTO `Tag` (`Name`,`Color`,`UserId`) VALUES (name, color, userId)

INSERT INTO `Account` (`Username`,`Email`,`Phone`,`Password`) VALUES (username, email, phone, password)
*/

let userId = null;
let tags = {};

addAccount('ahmed', 'ahmednr123@gmail.com', '8710073068', Crypt.genPassword('1234'));

function TAGS () {
    addTag('office','#ff0000', userId);
    addTag('rent','#00ff00', userId);
    addTag('home','#d2d2d2', userId);
    addTag('groceries','#0000ff', userId);
    addTag('miscelinous','#ff00ff', userId);
    addTag('fun','#d2d2d2', userId);
}

setTimeout(EXPENSES, 5000);

function EXPENSES () {
    addExpense('Rent', 'credit', new Date('2020-10-25'), '42000', userId, [tags['office']]);
    addExpense('Stuff for biryani', 'debit', new Date('2020-10-25'), '200', userId, [tags['home'],tags['groceries']]);
    addExpense('Out with mehul', 'debit', new Date('2020-10-25'), '800', userId, [tags['fun']]);
    addExpense('Biscuit', 'credit', new Date('2020-10-25'), '10', userId, [tags['miscelinous']]);

    addExpense('Laptop Repair', 'debit', new Date('2020-10-26'), '800', userId, [tags['office']]);
    addExpense('Game on steam', 'debit', new Date('2020-10-26'), '800', userId, [tags['fun']]);

    addExpense('Board Game', 'debit', new Date('2020-10-27'), '800', userId, [tags['fun']]);

    addExpense('Weekly stuff', 'debit', new Date('2020-10-28'), '251', userId, [tags['home'],tags['groceries']]);

    addExpense('Eggs', 'debit', new Date('2020-10-29'), '333', userId, [tags['home'],tags['groceries']]);

    addExpense('Stuff', 'debit', new Date('2020-10-30'), '20', userId, [tags['miscelinous']]);

    addExpense('RT Nagar 3rd floor', 'due', new Date('2020-10-31'), '8500', userId, [tags['home'],tags['rent']]);
    addExpense('RT Nagar Ground floor', 'due', new Date('2020-10-31'), '13000', userId, [tags['home'],tags['rent']]);
    addExpense('BTM Ground floor', 'due', new Date('2020-10-31'), '9200', userId, [tags['rent']]);
}

function addAccount (username, email, phone, password) {
    DB.query('INSERT INTO `Account` (`Username`,`Email`,`Phone`,`Password`) VALUES (?, ?, ?, ?)', [username, email, phone, password], function (err, res) {
        if (err) throw err;
        userId = res.insertId;
        console.log(res.insertId + ' USER ADDED');
        TAGS();
    });
}

function addTag (name, color, userId) {
    DB.query('INSERT INTO `Tag` (`Name`,`Color`,`UserId`) VALUES (?, ?, ?)', [name, color, userId], function (err, res) {
        if (err) throw err;
        tags[name] = res.insertId;
        console.log(res.insertId + ' TAG ADDED');
    });
}

function addExpense (name, type, date, amount, userId, tags) {
    DB.beginTransaction(function(err) {
        if (err) throw err;
        DB.query('INSERT INTO `Expense` (`Name`, `Type`,`Date`,`Amount`,`UserId`) VALUES (?, ?, ?, ?, ?)', [name, type, date, amount, userId], function (err, res, fields) {
            if (err) {
                return connection.rollback(function() {
                  throw err;
                });
            }

            console.log(res.insertId + ' EXPENSE ADDED');

            for (let tag of tags) {
                DB.query('INSERT INTO `ExpenseToTagsMapping` (`ExpenseId`,`TagId`) VALUES (?, ?)', [res.insertId, tag], function (err, res, fields) {
                    if (err) {
                        return DB.rollback(function() {
                          throw err;
                        });
                    }

                    console.log('EXPENSE MAPPING ADDED');

                    DB.commit(function(err) {
                        if (err) {
                            return DB.rollback(function() {
                                throw err;
                            });
                        }
                        console.log('Success!');
                    });
                })
            }
        
        });
    })
}

