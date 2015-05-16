/*global $,jQuery,_,Backbone */

var app = app || {};

var DataList = Backbone.Collection.extend({
  model: app.DataEntry,
});

// var TestList = Backbone.Collection.extend({
//   model: app.TrainEntry
// });
// var UserInfoList = Backbone.Collection.extend({
//   model: app.TrainEntry
// });
//
// var VideoInfoList = Backbone.Collection.extend({
//   model: app.TrainEntry
// });
//
// app.Trains = new TrainList();
// app.Tests = new TestList();
// app.Users = new UserInfoList();
// app.Videos = new VideoInfoList();
