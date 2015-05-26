/*global $,jQuery,_,Backbone */

var app = app || {};
// var eventTransfer = _.extend({}, Backbone.Events);
// eventTransfer.on('tomatoClicked', this.onTomatoClicked, this);
// eventTransfer.trigger('tomatoClicked', { 'title' : title});

// 打印Array信息
function log(l) {
  _.each(l, function(d) {
    console.log(d);
  });
}

function sortByRate(playList) {
  var playListCopy = JSON.parse(JSON.stringify(playList));
  return playListCopy.sort(function(a, b) {
    return b.Rate - a.Rate;
  });
}

// 数据集View
var DatasetView = Backbone.View.extend({
  el: '.content.dataset',

  template: _.template($('#dataset-template').html()),

  initialize: function() {
    this.model = new DataList();
    this.currentPage = new app.Pager({'page': 1, 'max': 1});
    this.$pageNum = this.$('.pager li label');
    this.$pageInput = this.$('.pager input');
    this.$pageInput.val(this.currentPage.get("page"));

    // 一页最大的条目数
    this.maxItemNum = 15;
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

    this.listenTo(this.model, 'reset', this.renderAndReset);
    this.listenTo(this.currentPage, 'change:page', this.renderWithoutPager);
    this.render();
  },

  events: {
    // 切换数据集标签事件
    'click .nav.nav-pills': 'switchDataset',
    'click nav .pager': 'naviPage',
    'keypress nav .pager input': 'pageOnEnter',
  },

  fetch: function() {
    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/test.json',
      success: function(data) {
        this.test = data;
      }
    });
    
    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/user.json',
      success: function(data) {
        this.user = data;
      }
    });

    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/video.json',
      success: function(data) {
        this.video = data;
      }
    });
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
    // console.log("rendered");
    // 重新填充数据
    this.$('table').html('');
    var templateData = this.makeTemplateData();
    // console.log(templateData);
    this.$('table').append(this.template(templateData));
    // 显示一共有多少页数据
    this.$pageNum.html("/" + Math.ceil(this.model.size() / this.maxItemNum));
    // 设置最大页数
    this.currentPage.set('max', Math.ceil(this.model.size() / this.maxItemNum));
  },

  pageOnEnter: function(event) {
    var inputPageValue = this.$pageInput.val();
    if (event.which !== 13 || !inputPageValue || inputPageValue > this.currentPage.get('max') || inputPageValue < 1) {
      return;
    }
    this.currentPage.set('page', parseInt(this.$pageInput.val(), 10));
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
        this.model.reset(this.train);
      break;
      case "testset":
        console.log("click testset");
        this.model.reset(this.test);
      break;
      case "userinfo":
        console.log("click userinfo");
        this.model.reset(this.user);
      break;
      case "videoinfo":
        console.log("click videoinfo");
        this.model.reset(this.video);
      break;
    }
  },

  makeTemplateData: function() {
    var data = this.model.toJSON();
    // [eID, contentID, className, startTime, ...]
    var headers = _.keys(data[0]);
    var templateData = {
        headers: headers,
        data: data.slice((this.currentPage.get('page') - 1) * 10, this.currentPage.get('page') * 10)
    };
    return templateData;
  },

  naviPage: function(event) {
    event.preventDefault();
    var inputPageValue = this.$pageInput.val();
    var $target = $(event.target);
    switch($target.html().toLowerCase()) {
      case 'go':
        console.log('click go');
        if (inputPageValue <= this.currentPage.get('max') && inputPageValue >= 1) {
          this.currentPage.set('page', parseInt(this.$pageInput.val(), 10));
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

var TimetagView = Backbone.View.extend({
  el: '.content.timetag',

  initialize: function() {
    this.$before = this.$('#before');
    this.$after = this.$('#after');
    this.$inputUser = this.$('#userid-timetag');

    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/timetag.json',
      success: function(data) {
        this.data = data;
        this.currentUser = '00034C993EDA';
        this.render();
      }
    });
  },

  events: {
    'click #query-timetag': 'renderCharts',
    'keypress #userid-timetag': 'renderCharts'
  },

  render: function() {
    this.getCharts(this.currentUser);
  },

  renderCharts: function(e) {
    if (!this.$inputUser.val()) {
      return;
    }
    if (e.type === "keypress" && e.which !== 13) {
      return;
    }
    this.currentUser = this.$inputUser.val();
    this.render();
  },

  highchart: function(container, userid, subtitle, yMax, series) {
    var axisLabelStyle = {color: "#000", fontSize: '1.2em'};
    var axisTitleStyle = {color: "#000", fontSize:'1.2em'};
    var legendStyle = {color: "#000", fontSize:'1em', fontWeight: '200'};
    container.highcharts({
      chart: { spacingTop: 50, spacingRight: 20, width: 455, backgroundColor: '#ebe7df', style: {fontFamily: 'Coda'}},
      title: { text: userid, x:20 ,y: -10,style: {fontSize: '2em', color: '#000'} },
      subtitle: { text: subtitle, x:20 ,y: 30,style: {fontSize: '1.5em', color: '#000'} },
      credits: { enabled: false },
      exporting: { enabled: false },
      plotOptions: { series: { marker: { enabled: false }, fillOpacity: 0.4 } },
      xAxis: { categories: ['1', '2', '3' ,'4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], labels: {style: axisLabelStyle }},
      yAxis: { allowDecimals: false, min: 0, max: yMax, labels: {style: axisLabelStyle}, title: { text: 'Play time', rotation: 270, style: axisTitleStyle } },
      tooltip: { enabled: true, valueSuffix: 'times', pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.y}',},
      legend: { layout: 'horizontal', align: 'right', verticalAlign: 'bottom', itemStyle: legendStyle},
      series: series
    });
  },

  generateAreaPoint: function(interval, yMax, series) {
    var colors = ["#98FF72", "#65D97D", "#42A881", "#1F8784", "#00697D"];
    _.each(interval, function(inter, idx) {
      var areaData = [];
      areaData.push([inter[0], 0]);
      areaData.push([inter[0], yMax]);
      areaData.push([inter[1], yMax]);
      areaData.push([inter[1], 0]);
      series.push({type: 'area', name:'Tag' + (idx + 1), lineWidth: 0, color: colors[idx % colors.length], data: areaData});
    });
  },

  getCharts: function(userid) {
    var coord = this.data[userid].coord;
    var interval = this.data[userid].interval;
    var beforeSeries = [{name: 'Play', data: coord, lineWidth: 3}];
    var afterSeries = [{name: 'Play', data: coord, lineWidth: 3}];
    var yMax = _.max(coord, function(value) {
      return value;
    });

    this.generateAreaPoint(interval, yMax, afterSeries);
    this.highchart(this.$before, userid, 'Before time tag', yMax, beforeSeries);
    this.highchart(this.$after, userid, 'After time tag', yMax, afterSeries);
  },
});

var RecResultView = Backbone.View.extend({
  template: _.template($('#dataset-template').html()),
  // template: _.template($('#recClass-template').html()),

  initialize: function() {
    this.listenTo(this.model, 'reset', this.render);
  },

  makeTemplateData: function() {
    var data = this.model.toJSON();
    // [eID, contentID, className, startTime, ...]
    var headers = _.keys(data[0]);
    var templateData = {
        headers: headers,
        data: sortByRate(data).slice(0, 5)
    };
    return templateData;
  },

  render: function() {
    // console.log("Render RecResultView");
    this.$('table').html('');
    var templateData = this.makeTemplateData();
    this.$('table').append(this.template(templateData));
    return this;
  }
});

var RecTestView = Backbone.View.extend({
  template: _.template($('#testdata-template').html()),
  // template: _.template($('#recClass-template').html()),

  initialize: function() {
    this.currentPage = new app.Pager({'page': 1, 'max': 1});
    this.$pageNum = this.$('.pager li label');
    this.$pageInput = this.$('.pager input');
    this.$pageInput.val(this.currentPage.get("page"));
    this.maxItemNum = 10;
    this.listenTo(this.model, 'reset', this.render);
    this.listenTo(this.currentPage, 'change:page', this.renderWithoutPager);
  },

  events: {
    // 切换数据集标签事件
    'click nav .pager': 'naviPage',
    'keypress nav .pager input': 'pageOnEnter',
  },

  makeTemplateData: function() {
    var data = this.model.toJSON();
    // [eID, contentID, className, startTime, ...]
    var headers = _.keys(data[0]);
    var templateData = {
        headers: headers,
        // data: data
        data: data.slice((this.currentPage.get('page') - 1) * 10, this.currentPage.get('page') * 10)
    };
    return templateData;
  },

  naviPage: function(event) {
    event.preventDefault();
    var inputPageValue = this.$pageInput.val();
    var $target = $(event.target);
    switch($target.html().toLowerCase()) {
      case 'go':
        console.log('click go');
        if (inputPageValue <= this.currentPage.get('max') && inputPageValue >= 1) {
          this.currentPage.set('page', parseInt(this.$pageInput.val(), 10));
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
  },

  pageOnEnter: function(event) {
    var inputPageValue = this.$pageInput.val();
    if (event.which !== 13 || !inputPageValue || inputPageValue > this.currentPage.get('max') || inputPageValue < 1) {
      return;
    }
    this.currentPage.set('page', parseInt(this.$pageInput.val(), 10));
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
    // console.log("Render RecTestView");
    this.$('table').html('');
    var templateData = this.makeTemplateData();
    // console.log(templateData);
    this.$('table').append(this.template(templateData));
    // 显示一共有多少页数据
    this.$pageNum.html("/" + Math.ceil(this.model.size() / this.maxItemNum));
    // 设置最大页数
    this.currentPage.set('max', Math.ceil(this.model.size() / this.maxItemNum));
    return this;
  }
});

var ComparisonView = Backbone.View.extend({
  el: '.content.comparison',

  initialize: function() {
    this.$inputUser = this.$('#userid-comparison');
    this.$inputUser.val('00034C989868');
    this.$btnQuery = this.$('#query-comparison');
    this.currentType = 'class';

    // 保存推荐的结果
    this.icfBeforeModel = new DataList();
    this.icfAfterModel = new DataList();
    this.ucfBeforeModel = new DataList();
    this.ucfAfterModel = new DataList();

    // 保存测试集中用户观看的列表
    this.resetModel();

    this.icfRecBeforeView = new RecResultView({el:'.icf-rec-list-before', model:this.icfBeforeModel});
    this.icfRecAfterView = new RecResultView({el:'.icf-rec-list-after', model:this.icfAfterModel});
    this.ucfRecBeforeView = new RecResultView({el:'.ucf-rec-list-before', model:this.ucfBeforeModel});
    this.ucfRecAfterView = new RecResultView({el:'.ucf-rec-list-after', model:this.ucfAfterModel});

    this.icfTestBeforeView = new RecTestView({el:'.icf-test-list-before', model:this.icfTestBeforeModel});
    this.icfTestAfterView = new RecTestView({el:'.icf-test-list-after', model:this.icfTestAfterModel});
    this.ucfTestBeforeView = new RecTestView({el:'.ucf-test-list-before', model:this.ucfTestBeforeModel});
    this.ucfTestAfterView = new RecTestView({el:'.ucf-test-list-after', model:this.ucfTestAfterModel});

    this.fetch();
    this.render();
  },

  events: {
    'click #query-comparison': 'render',
    'keypress #userid-comparison': 'render',
    'click .nav.nav-pills': 'naviRecResultClass',
  },

  resetModel: function() {
    if (this.currentType === 'class') {
      this.icfTestBeforeModel = new TestClasses();
      this.icfTestAfterModel = new TestClasses();
      this.ucfTestBeforeModel = new TestClasses();
      this.ucfTestAfterModel = new TestClasses();
    } else if (this.currentType === 'video') {
      this.icfTestBeforeModel = new TestVideos();
      this.icfTestAfterModel = new TestVideos();
      this.ucfTestBeforeModel = new TestVideos();
      this.ucfTestAfterModel = new TestVideos();
    }
  },

  loadJsonSuccess: function() {
    return this.recResult || this.testPlay;
  },

  loadUserModel: function() {
    if (!this.loadJsonSuccess()) {
      return;
    }
    var userIcfBefore, userIcfAfter, userUcfBefore, userUcfAfter;
    this.currentUserID = this.$inputUser.val();
    var userID = this.currentUserID;
    var test = this.testPlay[userID];
    if (this.currentType === 'class') {
      userIcfBefore = this.recResult.recIcfClassNotag[userID];
      userIcfAfter = this.recResult.recIcfClass[userID];
      userUcfBefore = this.recResult.recUcfClassNotag[userID];
      userUcfAfter = this.recResult.recUcfClass[userID];
    } else if (this.currentType === 'video'){
      userIcfBefore = this.recResult.recIcfVideoNotag[userID];
      userIcfAfter = this.recResult.recIcfVideo[userID];
      userUcfBefore = this.recResult.recUcfVideoNotag[userID];
      userUcfAfter = this.recResult.recUcfVideo[userID];
    }
    return {'userIcfBefore': userIcfBefore, 'userIcfAfter': userIcfAfter, 'userUcfBefore': userUcfBefore, 'userUcfAfter': userUcfAfter, 'test': test};
  },

  naviRecResultClass: function(event) {
    event.preventDefault();
    var $target = $(event.target);
    var $currentTarget = $(event.currentTarget);
    $currentTarget.find('.active').removeClass('active');
    $target.parent('li').addClass('active');

    switch($target.html().toLowerCase()) {
      case 'class':
        this.currentType = 'class';
        this.render();
        break;
      case 'video':
        this.currentType = 'video';
        this.render();
        break;
    }
  },

  fetch: function() {
    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/recResult.json',
      success: function(data) {
        this.recResult = data;
      }
    });

    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/rand2TestPlay.json',
      success: function(data) {
        this.testPlay = data;
      }
    });
  },

  // 传入推荐的结果，在已有的属性上加上Rate值
  // 增加hit: true 代表推荐的结果
  // {'videoID': 'V1511011100043', videoName: '摘星之旅', videoClass: '偶像剧', 'rate': '10', 'hit': true}
  mergeRecVideoToTest: function(rec, test, k) {
    var testCopy = JSON.parse(JSON.stringify(test));
    for (var i=0; i<testCopy.length; i++) {
      testCopy[i].hit = false;
      testCopy[i].rate = 0;
    }

    for (i=0; i<rec.length; i++) {
      var recVideoID = rec[i].videoID;
      var recVideoRate = rec[i].Rate;
      for (var j=0; j<testCopy.length; j++) {
        var testCopyVideoID = testCopy[j].videoID;
        if (testCopyVideoID === recVideoID) {
          testCopy[j].hit = true;
          testCopy[j].rate = recVideoRate.toFixed(1);
        }
      }
    }
    return testCopy;
  },

  mergeRecClassToTest: function(rec, test, k) {
    var testCopy = JSON.parse(JSON.stringify(test));
    for (var i=0; i<testCopy.length; i++) {
      testCopy[i].hit = false;
      testCopy[i].rate = 0;
    }

    for (i=0; i<rec.length; i++) {
      var recVideoClass = rec[i].videoClass;
      var recVideoRate = rec[i].Rate;
      for (var j=0; j<testCopy.length; j++) {
        var testCopyVideoClass = testCopy[j].videoClass;
        if (testCopyVideoClass === recVideoClass) {
          testCopy[j].hit = true;
          testCopy[j].rate = recVideoRate.toFixed(1);
        }
      }
    }
    return testCopy;
  },

  render: function() {
    if (!this.loadJsonSuccess()) {
      return;
    }
    this.resetModel();
    var finalIcfBeforeModel, finalIcfAfterModel, finalUcfBeforeModel, finalUcfAfterModel;
    var userModel = this.loadUserModel();
    var userIcfBefore = userModel.userIcfBefore;
    var userIcfAfter = userModel.userIcfAfter;
    var userUcfBefore = userModel.userUcfBefore;
    var userUcfAfter = userModel.userUcfAfter;
    var test = userModel.test;

    if (this.currentType === 'video') {
      finalIcfBeforeModel = this.mergeRecVideoToTest(userIcfBefore, test);
      finalIcfAfterModel = this.mergeRecVideoToTest(userIcfAfter, test);
      finalUcfBeforeModel = this.mergeRecVideoToTest(userUcfBefore, test);
      finalUcfAfterModel = this.mergeRecVideoToTest(userUcfAfter, test);
    } else {
      finalIcfBeforeModel = this.mergeRecClassToTest(userIcfBefore, test);
      finalIcfAfterModel = this.mergeRecClassToTest(userIcfAfter, test);
      finalUcfBeforeModel = this.mergeRecClassToTest(userUcfBefore, test);
      finalUcfAfterModel = this.mergeRecClassToTest(userUcfAfter, test);
    }

    this.icfTestBeforeModel.reset(finalIcfBeforeModel);
    // console.log(this.icfTestBeforeModel);
    this.icfTestBeforeModel.findAndSetHit(['V1511011100036', 'V1511011100048']);
    this.icfTestAfterModel.reset(finalIcfAfterModel);
    this.ucfTestBeforeModel.reset(finalUcfBeforeModel);
    this.ucfTestAfterModel.reset(finalUcfAfterModel);

    this.icfBeforeModel.reset(userIcfBefore);
    this.icfAfterModel.reset(userIcfAfter);
    this.ucfBeforeModel.reset(userUcfBefore);
    this.ucfAfterModel.reset(userUcfAfter);
  }
});
