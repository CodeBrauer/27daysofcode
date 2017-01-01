"use strict";

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
    this.lines.forEach(function(cell) {
        this.htmlTable += '<tr>';
        cell.split(this.delimiter).forEach(function(el) {
            this.htmlTable += '<td>' + el + '</td>';
        }, this);
        this.htmlTable += '</tr>';
    }, this);

    document.querySelector(this.selector).innerHTML = this.htmlTable;
}