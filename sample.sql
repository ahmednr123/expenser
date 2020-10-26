-- Transaction
INSERT INTO `Expense` (`Type`,`Date`,`Desc`,`Amount`,`UserId`) VALUES (type, date, desc, amount, userId)
INSERT INTO `ExpenseToTagsMapping` (`ExpenseId`,`TagId`, `UserId`) VALUES (LAST_INSERT_ID(), tagId, userId)
-- End Transaction

INSERT INTO `Tag` (`Name`,`Color`,`UserId`) VALUES (name, color, userId)

INSERT INTO `Account` (`Username`,`Email`,`Phone`,`Password`) VALUES (username, email, phone, password)

select e.id as '' from Expense e
INNER JOIN ExpenseToTagsMapping ettm ON ettm.ExpenseId = e.Id
INNER JOIN Tag t ON t.Id = ettm.TagId
WHERE e.Id = 5;

SELECT t.id, t.name, t.color FROM Tag t, Expense e
INNER JOIN ExpenseToTagsMapping ettm ON ettm.ExpenseId = e.Id
WHERE t.Id = ettm.TagId AND e.Id = 1;