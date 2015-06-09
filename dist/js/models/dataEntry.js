define([
  'backbone'
], function(Backbone) {
  var DataEntry = Backbone.Model.extend({
    defaults: {
      Rate: '0',
    },

    setHit: function() {
      this.set('hit', true);
    },

    addDefault: function() {
      this.set('Rate', 0);
      this.set('hit', false);
    },
  });

  return DataEntry;
});
