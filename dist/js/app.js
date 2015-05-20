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
  // $("#name").typeahead({ source:["item1", "item2", "item3"] });
  //example_collection.json
  // ["item1","item2","item3"]
});
