define([
  'jquery', 
  'backbone',
  'logger',
  'views/evaluationChart',
  ], function($, Backbone, Logger, EvaluationChart) {
  var EvaluationView = Backbone.View.extend({
    el: '.content.evaluation',

    initialize: function() {
      this.fetch();
    },
    
    fetch: function() {
      $.ajax({
        context: this,
        type: 'get',
        url: 'dataset/evaluation.json',
        success: function(data) {
          this.evalData = data;
          this.vPreChart = new EvaluationChart({el:'.videoPrecision', data: this.evalData.videoPrecision});
          this.vRecallChart = new EvaluationChart({el:'.videoRecall', data: this.evalData.videoRecall});
          this.cPreChart = new EvaluationChart({el:'.classPrecision', data: this.evalData.classPrecision});
          this.cRecallChart = new EvaluationChart({el:'.classRecall', data: this.evalData.classRecall});
        }
      });
    }
  });
  return EvaluationView;
});



