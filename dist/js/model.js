/*global $,jQuery,_,Backbone */

var app = app || {};

app.TrainEntry = Backbone.Model.extend({
  default: {
    eID: '',
    contentID: '',
    className: '',
    startTime: '',
    endTime: '',
    timeSpan: '',
    recordDate: '',
    userID: '',
    tagTime: '',
    etagTime: '',
  },
});

app.TestEntry = Backbone.Model.extend({
  default: {
    eID: '',
    contentID: '',
    className: '',
    startTime: '',
    endTime: '',
    timeSpan: '',
    recordDate: '',
    userID: '',
    tagTime: '',
    etagTime: '',
  }
});

app.UserInfo = Backbone.Model.extend({
  default: {
    eID: '',
    userID: '',
    userCity: '',
    userSex: '',
    userBirthday: '',
    userAge: '',
    userMarriage: '',
    userCreateDate: '',
    userInterest: '',
  }
});

app.VideoInfo = Backbone.Model.extend({
  default: {
    eID: '',
    contentID: '',
    contentName: '',
    vodName: '',
    description: '',
    userAge: '',
    userMarriage: '',
    userCreateDate: '',
    userInterest: '',
  }
});
