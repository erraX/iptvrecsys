/*global $,jQuery,_,Backbone */

var app = app || {};

app.AppView = Backbone.View.extend({
  el: '.container',

  initialize: function() {
    this.datasetView = new DatasetView();
    this.timetagView = new TimetagView();
    this.comparisonView = new ComparisonView();
  }
});

$(function() {
  // $('.header').addClass('show');
  // 等待动画结束再加载数据，否则Render会影响动画的执行
  setTimeout(function() {
    new app.AppView();
  }, 1000);
  // new app.AppView();
});
