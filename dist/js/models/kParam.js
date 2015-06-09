define([
  'backbone'
], function(Backbone) {
  var kParam = Backbone.Model.extend({
    defaults: {
      k: 5
    }
  });
  return kParam;
});
