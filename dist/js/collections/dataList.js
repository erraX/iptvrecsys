define([
  'backbone',
  'models/dataEntry'
], function(Backbone, DataEntry) {
  var DataList = Backbone.Collection.extend({
    model: DataEntry,
  });
  return DataList;
});

