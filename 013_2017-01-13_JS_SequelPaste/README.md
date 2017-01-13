# #013 2017-01-13: SequelPaste

I hated to copy 4 fields every time seperatly into the correct fields of [Sequel](https://www.sequelpro.com/)/[Querious](https://www.araelium.com/querious/). So what the thing developers love? We automate everything! So now I can copy the MySQL connect string (most hosting providers provide this in their control panel) and my script parses it and writes it to the correct fields with [robotjs](http://robotjs.io/). To run the script I just added a Script Keyword Workflow in [Alfred](https://www.alfredapp.com/).

So it reads the clipboard - checks what type of mysql-formatted string it could be - and formats it if there is a match. After this it just writes it into the fields and presses tab to jump to the next field.

Also I've built the script a bit modular so other copy/paste sources can be added.

I just added an experimental wordpress-wp-config.php file parser.

**Demo:**

![screencast](https://cloud.githubusercontent.com/assets/2059754/21941566/a25d0736-d9c9-11e6-98ee-1f906dfdcc27.gif)
