"use strict";
/**
 * Prints a HTML formatted table from a given CSV data
 * @param {String}  selector    selector, target div to insert table
 * @param {String}  data        csv file as string (raw)
 * @param {String}  delimiter   delimiter of the CSV file
 * @param {Boolean} hasHeadline prints headline
 */
function CSV2HTML(selector, data, delimiter, hasHeadline) {
    this.selector    = selector;
    this.data        = data;
    this.delimiter   = delimiter;
    this.hasHeadline = hasHeadline;

    this.lines = this.data.split('\n');

    this.htmlTable = '<table class="csv2html">';
    if (this.hasHeadline) {
        this.headline = this.lines.shift();
        this.htmlTable += '<thead><tr>';
        this.headline.split(this.delimiter).forEach(function(cell) {
            this.htmlTable += '<th>' + cell + '</th>';
        }, this);
        this.htmlTable += '</tr></thead>';
    }
    this.lines.forEach(function(row) {
        this.htmlTable += '<tr>';
        row.split(this.delimiter).forEach(function(cell) {
            this.htmlTable += '<td>' + cell + '</td>';
        }, this);
        this.htmlTable += '</tr>';
    }, this);

    document.querySelector(this.selector).innerHTML = this.htmlTable;
}