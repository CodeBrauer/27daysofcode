# #025 2017-03-25: PHP IMAP Test

Wanted to test how hard it is to receive emails with PHP from an IMAP server.

## What it does/Setup

Basically this script looks for unseen emails in the main inbox and saves the email into a MySQL database. The field "flag" is taken from the `to`-email-address. For this I setup a regex catchall on my email-hosting-provier. The prefix in this case was `imap_test_`. So everything after this prefix will be saved as the flag.

## Demo

Hosting a demo is a way to big for such a small project, so here are screenshots how it works:

#### (1) New emails in a test mailbox:
![screenshot1](https://cloud.githubusercontent.com/assets/2059754/23592819/a7a2e8d6-0206-11e7-8989-592d56207cae.png)

#### (2) Receive emails, insert to DB, mark as seen:
![screenshot2](https://cloud.githubusercontent.com/assets/2059754/23592821/a7a42a66-0206-11e7-90b4-26aaae0fbc90.png)
#### (3) Emails are marked as seen:
![screenshot3](https://cloud.githubusercontent.com/assets/2059754/23592820/a7a3cde6-0206-11e7-9073-9997221c3467.png)
#### (4) New emails saved in database:
![screenshot4](https://cloud.githubusercontent.com/assets/2059754/23592822/a7b5e404-0206-11e7-8dc4-00edb4473e61.png)

## SQL schema
```sql
CREATE TABLE `tickets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `flag` varchar(255) NOT NULL DEFAULT '',
  `from` varchar(255) NOT NULL DEFAULT '',
  `subject` varchar(255) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  `sent` datetime NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
```


_Many thanks to [migadu](https://www.migadu.com/) a great email hosting provider!_