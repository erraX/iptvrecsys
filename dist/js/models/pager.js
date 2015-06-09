define([
  'backbone'
], function(Backbone) {
  var Pager = Backbone.Model.extend({
    defaults: {
      page: 1,
      max: 1
    },

    reset: function() {
      this.set('page', 1);
    },

    next: function() {
      var page = this.get('page');
      if (page < this.get('max'))  {
        this.set('page', page + 1);
      }
    },

    previous: function() {
      var page = this.get('page');
      if (page > 1) {
        this.set('page', page - 1);
      }
    }
  });
  return Pager;
});
