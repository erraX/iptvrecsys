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
  // $('.header').addClass('show');
  setTimeout(function() {
    new app.AppView();
  }, 1000);
  // new app.AppView();
});
