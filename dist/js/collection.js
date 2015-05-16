/*global $,jQuery,_,Backbone */

var app = app || {};

var TrainList = Backbone.Collection.extend({
  model: app.TrainEntry,

  getData: function() {
    var tmpTrainData = [
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 221775, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' }
    ];
    return  tmpTrainData;
  }
});

var TestList = Backbone.Collection.extend({
  model: app.TrainEntry
});
var UserInfoList = Backbone.Collection.extend({
  model: app.TrainEntry
});

var VideoInfoList = Backbone.Collection.extend({
  model: app.TrainEntry
});

app.Trains = new TrainList();
app.Tests = new TestList();
app.Users = new UserInfoList();
app.Videos = new VideoInfoList();
