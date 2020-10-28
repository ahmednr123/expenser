-- expense.Account definition

CREATE TABLE `Account` (
  `Id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Phone` varchar(100) DEFAULT NULL,
  `Password` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Account_UN` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- expense.Expense definition

CREATE TABLE `Expense` (
  `Id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Type` varchar(8) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Date` date NOT NULL,
  `Desc` mediumtext DEFAULT NULL,
  `Amount` bigint(20) unsigned NOT NULL,
  `UserId` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Expense_FK` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- expense.Tag definition

CREATE TABLE `Tag` (
  `Id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Color` varchar(100) NOT NULL DEFAULT '#d2d2d2',
  `UserId` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Tag_FK` (`UserId`),
  CONSTRAINT `Tag_FK` FOREIGN KEY (`UserId`) REFERENCES `Account` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- expense.ExpenseToTagsMapping definition

CREATE TABLE `ExpenseToTagsMapping` (
  `ExpenseId` bigint(20) unsigned NOT NULL,
  `TagId` bigint(20) unsigned NOT NULL,
  KEY `ExpenseToTagsMapping_FK_1` (`ExpenseId`),
  KEY `ExpenseToTagsMapping_FK_2` (`TagId`),
  CONSTRAINT `ExpenseToTagsMapping_FK_1` FOREIGN KEY (`ExpenseId`) REFERENCES `Expense` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `ExpenseToTagsMapping_FK_2` FOREIGN KEY (`TagId`) REFERENCES `Tag` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;