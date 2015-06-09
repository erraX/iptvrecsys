define([
  'backbone',
  'logger',
  'views/datasetView',
  'views/timetagView',
  'views/comparisonView',
  'views/evaluationView'], function(Backbone, Logger, DatasetView, TimetagView, ComparisonView, EvaluationView) {
  var AppView = Backbone.View.extend({
    el: '.container',

    initialize: function() {
      this.datasetView = new DatasetView();
      this.timetagView = new TimetagView();
      this.comparisonView = new ComparisonView();
      this.evalView = new EvaluationView();
    }
  });

  return AppView;
});
