var Nightmare = require('nightmare');       
var inquirer  = require('inquirer');
var nightmare = Nightmare(/*{ show: true }*/);
var util = require('util');

inquirer.prompt([{
    type: 'list',
    name: 'language',
    message: 'GitHub Trending Repositories',
    choices: ['All', 'C', 'CSS', 'HTML', 'Unknown', 'JavaScript', 'PHP', 'Python', 'Shell'],
    filter: function (val) { return val.toLowerCase(); }
}, {
    type: 'list',
    name: 'timespan',
    message: 'Time Range?',
    choices: ['Daily', 'Weekly', 'Monthly'],
    filter: function (val) { return val.toLowerCase(); }
}]).then(function (answers) {

    process.stdout.write('Fetching repositories...\r');

    var langParam  = (answers.language == 'all') ? '' : '/' + answers.language;
    var sinceParam = '?since=' + answers.timespan;
    var client = nightmare
    .goto('http://github.com/trending' + langParam + sinceParam)
    .wait('.repo-list')
    .evaluate(function () {
        var result = [];
        [].forEach.call(document.querySelectorAll('ol.repo-list li'), function(row) {
            var rowData = {starsToday: '?', stars: '?', language: 'N/A'};
            rowData.title = row.querySelector('h3').innerText.replace(' / ', '/').trim();
            if (row.querySelector('span[itemprop="programmingLanguage"]') !== null) {
                rowData.language = row.querySelector('span[itemprop="programmingLanguage"]').innerText.trim();
            }
            if (row.querySelector('a[aria-label="Stargazers"]') !== null) {
                rowData.stars = row.querySelector('a[aria-label="Stargazers"]').innerText.trim();
            }
            if (row.querySelector('span.float-right') !== null) {
                rowData.starsToday = row.querySelector('span.float-right').innerText.trim();
            }
            result.push(rowData);
        });
        return result;
    })
    .end().then(function (result) {
        choises = [];
        result.forEach(function(row) {
            console.log('[Stars: \x1b[36m' + row.stars + '\x1b[0m | \x1b[34m'+ row.starsToday +'\x1b[0m] - ' + row.title + ' (\x1b[31m'+ row.language +'\x1b[0m)')
        });
    }).catch(function (error) {
        console.error('Error: ', error);
    });
});