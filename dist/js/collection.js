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
