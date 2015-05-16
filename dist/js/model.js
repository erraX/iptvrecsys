/*global $,jQuery,_,Backbone */

var app = app || {};

app.DataEntry = Backbone.Model.extend({
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

app.Pager = Backbone.Model.extend({
  default: {
    page: 1,
    max: 1
  },

  reset: function() {
    this.set('page', 1);
  },

  next: function() {
    var page = this.get('page');
    if (page < this.get('max'))  {
       this.set('page', page + 1);
    }
  },

  previous: function() {
    var page = this.get('page');
    if (page > 1) {
       this.set('page', page - 1);
    }
  }
});

// app.TestEntry = Backbone.Model.extend({
//   default: {
//     eID: '',
//     contentID: '',
//     className: '',
//     startTime: '',
//     endTime: '',
//     timeSpan: '',
//     recordDate: '',
//     userID: '',
//     tagTime: '',
//     etagTime: '',
//   }
// });
//
// app.UserInfo = Backbone.Model.extend({
//   default: {
//     eID: '',
//     userID: '',
//     userCity: '',
//     userSex: '',
//     userBirthday: '',
//     userAge: '',
//     userMarriage: '',
//     userCreateDate: '',
//     userInterest: '',
//   }
// });
//
// app.VideoInfo = Backbone.Model.extend({
//   default: {
//     eID: '',
//     contentID: '',
//     contentName: '',
//     vodName: '',
//     description: '',
//     userAge: '',
//     userMarriage: '',
//     userCreateDate: '',
//     userInterest: '',
//   }
// });
