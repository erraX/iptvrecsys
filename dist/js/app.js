/*global $,jQuery,_,Backbone */

var app = app || {};

// Add segments to a slider
$.fn.addSliderSegments = function (amount, orientation) {
  return this.each(function () {
    if (orientation == "vertical") {
      var output = '', i;
      for (i = 1; i <= amount - 2; i++) {
        output += '<div class="ui-slider-segment" style="top:' + 100 / (amount - 1) * i + '%;"></div>';
      }
      $(this).prepend(output);
    } else {
      var segmentGap = 100 / (amount - 1) + "%";
      var segment = '<div class="ui-slider-segment" style="margin-left: ' + segmentGap + ';"></div>';
      $(this).prepend(segment.repeat(amount - 2));
    }
  });
};

app.AppView = Backbone.View.extend({
  el: '.container',

  initialize: function() {
    this.datasetView = new DatasetView();
    this.timetagView = new TimetagView();
    this.comparisonView = new ComparisonView();
    this.evalView = new EvaluationView();
  }
});

$(function() {
  // $('.header').addClass('show');
  // 等待动画结束再加载数据，否则Render会影响动画的执行
  setTimeout(function() {
    new app.AppView();
  }, 1000);
  // new app.AppView();
  var $slider = $(".slider");
  if ($slider.length > 0) {
    $slider.slider({
      min: 1,
      max: 5,
      value: 3,
      orientation: "horizontal",
      range: "min"
    }).addSliderSegments($slider.slider("option").max);
  }
});
