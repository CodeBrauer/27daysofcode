/**
 * results array:
 * 0 = host
 * 1 = username
 * 2 = passwort
 * 3 = database
 *
 * Thanks to http://regexr.com/ !
 */
 module.exports = {
    checkForMySQLString: function(str) {
        if (str.substr(0, 5) == 'mysql') {
            var results = [];
            results[0] = str.match(/-h\s?[^\s]+/)[0].replace('-h', '').trim();
            results[1] = str.match(/-u\s?[A-z0-9_-]+/)[0].replace('-u', '').trim();
            results[2] = str.match(/-p[^\s]+/)[0].replace('-p', '').trim();
            results[3] = str.match(/(\w+)$/)[0].trim();
            return results;
        }
        return false;
    },
    checkForWordpressConfig: function(copied) {
        if (!/DB_HOST|DB_NAME|DB_USER|DB_PASSWORD/.test(copied)) {
            return false;
        }
        var results = [];
        // remove comment blocks
        copied = copied.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
        copied = copied.split('\n');
        copied.forEach(function(row, index) { // remove empty lines
            if (row.trim().length == 0) { copied.splice(index, 2); }
        });
        copied.forEach(function(row, index) {
            var _row = copied[index] // remove PHP syntax wrap
            .replace(/define\(('|")DB_/i, '')
            .replace(/('|")\s?,\s?('|")/i, '__:!:__') // unique seperator for pw
            .replace(/('|")\);/, '');
            _row = _row.split('__:!:__');
            var mappingStr = { HOST:0, USER:1, PASSWORD:2, NAME:3 };
            var key = _row[0].replace(/NAME|USER|PASSWORD|HOST/gi, function(matched){
                return mappingStr[matched];
            });
            results[key] = _row[1];
        });
        return results;
    }
};