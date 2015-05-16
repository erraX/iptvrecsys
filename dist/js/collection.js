/*global $,jQuery,_,Backbone */

var app = app || {};

var DataList = Backbone.Collection.extend({
  model: app.DataEntry,
});
