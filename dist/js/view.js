/*global $,jQuery,_,Backbone */

var app = app || {};

app.tmpTrainData = function() {
  return [
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 221775, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' }
    ];
};

app.tmpTestData = function() {
  return [
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 221775, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' }
    ];
};

app.tmpUserData = function() {
  return [
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 221775, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' }
    ];
};

app.tmpVideoData = function() {
  return [
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 220875, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 221775, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' }
    ];
};
var DatasetView = Backbone.View.extend({
  el: '.content.dataset',

  template: _.template($('#dataset-template').html()),

  initialize: function() {
    // 默认显示训练集标签
    this.model = new TrainList(app.tmpTrainData());
    this.listenTo(this.model, 'reset', this.render);
    this.render();
  },

  events: {
    // 切换数据集标签事件
    'click .nav.nav-pills': 'switchDataset'
  },

  render: function() {
    this.$('table').html('');
    console.log(this.model);
    var templateData = this.makeTemplateData();
    this.$('table').append(this.template(templateData));
  },

  switchDataset: function(event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);
    var $target = $(event.target);
    $currentTarget.find('.active').removeClass('active');
    $target.parent('li').addClass('active');

    switch($target.html()) {
      case "Trainset":
        console.log("Click trianset");
        this.model.reset(app.tmpTrainData());
      break;
      case "Testset":
        console.log("click testset");
        this.model.reset(app.tmpTestData());
      break;
      case "UserInfo":
        console.log("click userinfo");
        this.model.reset(app.tmpUserData());
      break;
      case "VideoInfo":
        console.log("click videoinfo");
        this.model.reset(app.tmpVideoData());
      break;
    }
  },

  makeTemplateData: function() {
    var data = this.model.toJSON();
    // [eID, contentID, className, startTime, ...]
    var headers = _.keys(data[0]);
    var templateData = {
        headers: headers,
        data: data
    };
    return templateData;
  }
});
