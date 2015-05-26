/*global $,jQuery,_,Backbone */

var app = app || {};

var DataList = Backbone.Collection.extend({
  model: app.DataEntry,
});

// 传入推荐的结果，在已有的属性上加上Rate值
// 增加hit: true 代表推荐的结果
// {'videoID': 'V1511011100043', videoName: '摘星之旅', videoClass: '偶像剧', 'rate': '10', 'hit': true}
var TestEntry = Backbone.Collection.extend({
  model: app.DataEntry,
});

var TestClasses = Backbone.Collection.extend({
  model: app.TestClassEntry,

  getHitNum: function() {
    return this.where({hit: true}).length;
  },

  getTotal: function() {
    return this.length;
  },

  getUnhitNum: function() {
    return this.where({hit: false}).length;
  },

  findAndSetHit: function(viewedList) {
    _.each(this.model, function(element) {
      if (_.contains(viewedList, element.get('videoClass'))) {
        element.setHit();
      }
    });
  },
});

var TestVideos = Backbone.Collection.extend({
  model: app.TestVideoEntry,

  getHitNum: function() {
    return this.where({hit: true}).length;
  },

  getTotal: function() {
    return this.length;
  },

  getUnhitNum: function() {
    return this.where({hit: false}).length;
  },

  findAndSetHit: function(viewedList) {
    console.log(viewedList);
    console.log(this.models);
    _.each(this.model, function(element) {
      console.log(element);
      if (_.contains(viewedList, element.get('videoID'))) {
        element.setHit();
      }
    });
  },
});
