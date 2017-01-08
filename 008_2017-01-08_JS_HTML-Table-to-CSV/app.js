(function(){
    var csvData = '';
    var button = document.querySelector('button.save-as-csv');
    button.addEventListener('click', function(e) {
        [].forEach.call(document.querySelectorAll('table tr'), function(rows) {
            [].forEach.call(rows.children, function(cell) {
                csvData += JSON.stringify(cell.innerText.replace('"', '\''));
                if (cell.nextElementSibling !== null) {
                    csvData += ';';
                }
            });
            csvData += '\n';
        });
        var encodedURI = encodeURI(csvData);
        var dlLink     = document.createElement('a');

        dlLink.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedURI);
        dlLink.setAttribute('download', 'table-data.csv');
        dlLink.style.display = 'none';
        
        document.body.appendChild(dlLink);
        dlLink.click();
    });
})();