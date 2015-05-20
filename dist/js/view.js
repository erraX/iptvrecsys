/*global $,jQuery,_,Backbone */

var app = app || {};

var DatasetView = Backbone.View.extend({
  el: '.content.dataset',

  template: _.template($('#dataset-template').html()),

  initialize: function() {
    this.model = new DataList();
    this.currentPage = new app.Pager({'page': 1, 'max': 1});
    this.$pageNum = this.$('.pager li label');
    this.$pageInput = this.$('.pager input');
    this.$pageInput.val(this.currentPage.get("page"));
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
    console.log("rendered");
    // 重新填充数据
    this.$('table').html('');
    var templateData = this.makeTemplateData();
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
