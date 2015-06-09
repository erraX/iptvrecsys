define([
  'jquery',
  'underscore',
  'backbone',
  'logger',
  'views/tablePagerView',
  ], function($, _, Backbone, Logger, TablePagerView) {
  var RecTestView = TablePagerView.extend({
    template: _.template($('#testdata-template').html()),

    initialize: function() {
      TablePagerView.prototype.initialize.apply(this, arguments);
      this.listenTo(this.model, 'sort', this.render);
    }
  });
  return RecTestView;
});
