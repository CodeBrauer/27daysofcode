const Nightmare = require('nightmare');       
const moment    = require('moment');
const fs        = require('fs');

const nightmare = Nightmare();

nightmare.goto('http://pxls.space').wait('#board').wait(500).evaluate(() =>  {
    return document.querySelector('#board').toDataURL();
}).end().then((dataURI) => {
    var filename = 'savedImages/' + moment().format('YYYY-MM-DD_HH-mm-ss') + '.png';
    var base64Data = dataURI.replace(/^data:image\/png;base64,/, '');

    fs.writeFile(filename, base64Data, 'base64', (err) => {
        console.error(err);
    });
}).catch((error) => {
    console.error('Failed to load:', error);
});