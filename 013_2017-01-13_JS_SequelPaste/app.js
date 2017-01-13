var ncp    = require("copy-paste");
var checks = require("./checks.js");
var robot  = require("robotjs");

var copied = ncp.paste().trim();
var paste  = [];

// run checks - what could be in my clipboard?
Object.keys(checks).forEach(function(key) {
    var check = checks[key](copied);
    if (check !== false) {
        paste = check;
        return;
    }
});

console.log(paste);

// if one check has passed - now paste it into Sequel/Querious
if (paste.length >= 3) {
    Object.keys(paste).forEach(function(key) {
        setTimeout(function() {
            robot.typeString(paste[key].replace('localhost', '127.0.0.1'));
            robot.keyTap('tab');
        }, 20); // small delay, for slow apps :)
    });
}
