/*global $,jQuery,_,Backbone */

var app = app || {};

app.DataEntry = Backbone.Model.extend({
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

app.kParam = Backbone.Model.extend({
  defaults: {
    k: 5
  }
});

app.Pager = Backbone.Model.extend({
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
