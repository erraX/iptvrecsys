define([
  'jquery', 
  'underscore',
  'backbone',
  'logger',
  'views/tablePagerView',
  ], function($, _, Backbone, Logger, TablePagerView) {
  // 数据集View
  var DatasetView = TablePagerView.extend({
    el: '.content.dataset',
    template: _.template($('#dataset-template').html()),
    initialize: function() {
      TablePagerView.prototype.initialize.apply(this, arguments);
      this.train = [];
      this.test = [];
      this.user = [];
      this.video = [];
      this.fetch();

      // 默认显示训练集标签
      $.ajax({
        context: this,
        type: 'get',
        url: 'dataset/train.json',
        success: function(data) {
          this.train = data;
          this.model.reset(data);
        }
      });
    },

    events: function() {
      // 从父元素中继承事件、并添加事件
      return _.extend({}, TablePagerView.prototype.events, {
        'click .nav.nav-pills': 'switchDataset',
      });
    },

    fetch: function() {
      $.ajax({
        context: this,
        type: 'get',
        url: 'dataset/test.json',
        success: function(data) {
          this.test = data;
          Logger.info("Fetch dataset/test.json successfully!");
        }
      });
      
      $.ajax({
        context: this,
        type: 'get',
        url: 'dataset/user.json',
        success: function(data) {
          this.user = data;
          Logger.info("Fetch dataset/user.json successfully!");
        }
      });

      $.ajax({
        context: this,
        type: 'get',
        url: 'dataset/video.json',
        success: function(data) {
          this.video = data;
          Logger.info("Fetch dataset/video.json successfully!");
        }
      });
    },

    switchDataset: function(event) {
      event.preventDefault();
      // 高亮和去除高亮导航
      var $currentTarget = $(event.currentTarget);
      var $target = $(event.target);
      if ($target.prop("tagName") === "UL") {
        return;
      }
      $currentTarget.find('.active').removeClass('active');
      $target.parent('li').addClass('active');

      // 重新填充数据
      switch($target.html().toLowerCase()) {
        case "trainset":
          this.model.reset(this.train);
        break;
        case "testset":
          this.model.reset(this.test);
        break;
        case "userinfo":
          this.model.reset(this.user);
        break;
        case "videoinfo":
          this.model.reset(this.video);
        break;
      }
    }
  });
  return DatasetView; 
});
