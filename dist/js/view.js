/*global $,jQuery,_,Backbone */

var app = app || {};

app.tmpTrainData = function() {
  return [
      { eID: 1, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 2, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' }
    ];
};

app.tmpTestData = function() {
  return [
      { eID: 1, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 2, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 3, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 4, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 5, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 6, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 7, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' },
      { eID: 8, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' },
      { eID: 9, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' },
      { eID: 10, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' },
      { eID: 12, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' },
      { eID: 13, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' },
      { eID: 14, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' },
      { eID: 15, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' },
      { eID: 16, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' },
      { eID: 17, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' },
      { eID: 18, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' },
      { eID: 19, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' },
      { eID: 20, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' }
    ];
};

app.tmpUserData = function() {
  return [
      { eID: 1, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 2, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 3, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 4, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' }
    ];
};

app.tmpVideoData = function() {
  return [
      { eID: 1, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 2, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 3, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 4, contentID: 'V1511012310033', className: '生活剧', startTime: '19:25', endTime: '19:50', timeSpan: '1588', recordDate: '2011/03/05', userID: '00034C847095', tagTime: '晚上', etagTime: 'T3' },
      { eID: 5, contentID: 'V1511012310034', className: '生活剧', startTime: '19:55', endTime: '20:50', timeSpan: '1780', recordDate: '2011/03/05', userID: '00034C847090', tagTime: '晚上', etagTime: 'T3' }
    ];
};

var DatasetView = Backbone.View.extend({
  el: '.content.dataset',

  template: _.template($('#dataset-template').html()),

  initialize: function() {
    this.currentPage = new app.Pager({'page': 1, 'max': 1});
    this.$pageNum = this.$('.pager li label');
    this.$pageInput = this.$('.pager input');
    this.$pageInput.val(this.currentPage.get("page"));

    // 默认显示训练集标签
    this.model = new DataList(app.tmpTrainData());
    this.render();

    this.listenTo(this.model, 'reset', this.renderAndReset);
    this.listenTo(this.currentPage, 'change:page', this.renderWithoutPager);
  },

  events: {
    // 切换数据集标签事件
    'click .nav.nav-pills': 'switchDataset',
    'click nav .pager': 'naviPage',
  },

  renderWithoutPager: function() {
    this.render();
    this.$pageInput.val(this.currentPage.get("page"));
  },

  renderAndReset: function() {
    this.render();
    // 重置当前页数为1
    // this.currentPage.set('page', 1);
    this.currentPage.reset();
    this.$pageInput.val(this.currentPage.get("page"));
  },

  render: function() {
    console.log("rendered");
    // 重新填充数据
    this.$('table').html('');
    var templateData = this.makeTemplateData();
    this.$('table').append(this.template(templateData));

    // 显示一共有多少页数据
    this.$pageNum.html("/" + Math.ceil(this.model.size() / 3));

    // 设置最大页数
    this.currentPage.set('max', Math.ceil(this.model.size() / 3));

  },

  switchDataset: function(event) {
    event.preventDefault();
    // 高亮和去除高亮导航
    var $currentTarget = $(event.currentTarget);
    var $target = $(event.target);
    $currentTarget.find('.active').removeClass('active');
    $target.parent('li').addClass('active');

    // 重新填充数据
    switch($target.html().toLowerCase()) {
      case "trainset":
        console.log("Click trianset");
        this.model.reset(app.tmpTrainData());
      break;
      case "testset":
        console.log("click testset");
        this.model.reset(app.tmpTestData());
      break;
      case "userinfo":
        console.log("click userinfo");
        this.model.reset(app.tmpUserData());
      break;
      case "videoinfo":
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
        data: data.slice((this.currentPage.get('page') - 1) * 3, this.currentPage.get('page') * 3)
    };
    return templateData;
  },

  naviPage: function(event) {
    event.preventDefault();
    var $target = $(event.target);
    switch($target.html().toLowerCase()) {
      case 'go':
        console.log('click go');
        var inputPageValue = this.$pageInput.val();
        if (inputPageValue <= this.currentPage.get('max') && inputPageValue >= 1) {
          this.currentPage.set('page', this.$pageInput.val());
        }
      break;
      case 'previous':
        this.currentPage.previous();
        console.log('click previous' + this.currentPage.get('page'));
      break;
      case 'next':
        this.currentPage.next();
        console.log('click next' + this.currentPage.get('page'));
      break;
    }
  }
});
