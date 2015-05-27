/*global $,jQuery,_,Backbone */

var app = app || {};

var DataList = Backbone.Collection.extend({
  model: app.DataEntry,
});

// 传入推荐的结果，在已有的属性上加上Rate值
// 增加hit: true 代表推荐的结果
// {'videoID': 'V1511011100043', videoName: '摘星之旅', videoClass: '偶像剧', 'rate': '10', 'hit': true}
// var TestEntry = Backbone.Collection.extend({
//   model: app.DataEntry,
// });
var TestEntry = Backbone.Collection.extend({
  model: app.DataEntry,

  comparator: function(item) {
      return -item.get("Rate");
  },

  getHitNum: function() {
    return this.where({hit: true}).length;
  },

  getTotal: function() {
    return this.length;
  },

  getUnhitNum: function() {
    return this.where({hit: false}).length;
  },

  findAndSetClassHit: function(viewedList) {
    var keys = Object.keys(viewedList);
    _.each(this.models, function(element) {
      // Add: rate:0, hit: false
      element.addDefault();
      var className = element.get('videoClass');
      if (_.contains(keys, className)) {
        element.setHit();
        element.set('Rate', viewedList[className]);
      }
    });
  },

  findAndSetVideoHit: function(viewedList) {
    var keys = Object.keys(viewedList);
    _.each(this.models, function(element) {
      // Add: rate:0, hit: false
      element.addDefault();
      var videoID = element.get('videoID');
      if (_.contains(keys, videoID)) {
        element.setHit();
        element.set('Rate', viewedList[videoID]);
      }
    });
  }
});
