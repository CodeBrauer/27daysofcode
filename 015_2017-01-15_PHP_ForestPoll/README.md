# #015 2017-01-15: CSS Experiment #1

Built a [Strawpoll](http://strawpoll.me) clone in PHP.

## Demo

<https://codebrauer.github.io/100daysofcode/015_2017-01-15_PHP_ForestPoll/>

## Installation

I have not tested it with PHP 5.6 so PHP 7.0 should be the minimum.

1.) Create a `.env` file in the base dir.<br>
2.) The contents of this file should look like this:

```
DB_HOST=127.0.0.1
DB_NAME=ForestPoll
DB_USER=root
DB_PASS=root
```

 3.) Import this SQL structure in your database:
 
 ```sql
 CREATE TABLE `entries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `poll` int(11) NOT NULL,
  `answer` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `polls` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `multiple_answers` tinyint(1) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `answers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `poll` int(11) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 
 ```
 
 4.) Run `composer install`<br>
 5.) Should be ready to go!