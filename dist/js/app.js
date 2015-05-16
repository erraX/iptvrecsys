/*global $,jQuery,_,Backbone */

var app = app || {};

app.AppView = Backbone.View.extend({
  el: '.container',

  initialize: function() {
    this.dastasetView = new DatasetView();
    this.timetagView = new TimetagView();
  }
});

$(function() {
  new app.AppView();
});
