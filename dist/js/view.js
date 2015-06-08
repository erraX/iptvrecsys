/*global $,_,Backbone */
/*jshint undef: false, unused: false */

/**
 * 改进点：
 * 1. 展示推荐的结果的时候，可以把推荐结果分开渲染，不要一次render全部
 */

var app = app || {};

function sortByRate(playList) {
  var playListCopy = JSON.parse(JSON.stringify(playList));
  return playListCopy.sort(function(a, b) {
    return b.Rate - a.Rate;
  });
}

var TablePagerView = Backbone.View.extend({
  initialize: function() {
    this.model = this.model || new DataList();
    this.currentPage = new app.Pager({'page': 1, 'max': 1});
    this.$pageNum = this.$('.pager li label');
    this.$pageInput = this.$('.pager input');
    this.$pageInput.val(this.currentPage.get("page"));
    // 一页最大的条目数
    this.maxItemNum = 15;
    this.listenTo(this.model, 'reset', this.renderAndReset);
    this.listenTo(this.currentPage, 'change:page', this.renderWithoutPager);
  },

  events: {
    'click nav .pager': 'naviPage',
    'keypress nav .pager input': 'pageOnEnter',
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
    Logger.debug("Test: " + this.$el.attr('class'));
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
        if (inputPageValue <= this.currentPage.get('max') && inputPageValue >= 1) {
          this.currentPage.set('page', parseInt(this.$pageInput.val(), 10));
        }
      break;
      case 'previous':
        this.currentPage.previous();
      break;
      case 'next':
        this.currentPage.next();
      break;
    }
  }
});

// 数据集View
var DatasetView = TablePagerView.extend({
  el: '.content.dataset',
  template: _.template($('#dataset-template').html()),
  initialize: function() {
    TablePagerView.prototype.initialize.apply(this, arguments);
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
  },

  events: function() {
    // 从父元素中继承事件、并添加事件
    return _.extend({}, TablePagerView.prototype.events, {
      'click .nav.nav-pills': 'switchDataset',
    });
  },

  fetch: function() {
    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/test.json',
      success: function(data) {
        this.test = data;
        Logger.info("Fetch dataset/test.json successfully!");
      }
    });
    
    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/user.json',
      success: function(data) {
        this.user = data;
        Logger.info("Fetch dataset/user.json successfully!");
      }
    });

    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/video.json',
      success: function(data) {
        this.video = data;
        Logger.info("Fetch dataset/video.json successfully!");
      }
    });
  },

  switchDataset: function(event) {
    event.preventDefault();
    // 高亮和去除高亮导航
    var $currentTarget = $(event.currentTarget);
    var $target = $(event.target);
    if ($target.prop("tagName") === "UL") {
      return;
    }
    $currentTarget.find('.active').removeClass('active');
    $target.parent('li').addClass('active');

    // 重新填充数据
    switch($target.html().toLowerCase()) {
      case "trainset":
        this.model.reset(this.train);
      break;
      case "testset":
        this.model.reset(this.test);
      break;
      case "userinfo":
        this.model.reset(this.user);
      break;
      case "videoinfo":
        this.model.reset(this.video);
      break;
    }
  }
});

var EvaluationChart = Backbone.View.extend({
  initialize: function(opts) {
    this.data = opts.data;
    this.render();
  },

  highChart: function() {
    // Highcharts.setOptions({
    // colors: ["#F24B6A", "#2CA4BF", "#4BBF5C", "#F2B950", "#D96941", "#34495e", "#f39c12"]
    // });
    var axisLabelStyle = {color: "#000", fontSize: '1.2em'};
    var axisTitleStyle = {color: "#000", fontSize:'1.2em'};
    var legendStyle = {color: "#000", fontSize:'1em', fontWeight: '200'};
    this.$el.highcharts({
      chart: { type: 'column', backgroundColor: '#ebe7df',style: {fontFamily: 'Coda', fontWeight: 200}},
      title: { text: this.data.title, style: {color: '#000', fontSize:'3em'} },
      credits: { enabled: false },
      // colors: [ '#FF8C78', '#8CD6B5', '#FFD661', '#FFF2B5' ],
      colors: [ '#0067A6', '#00ABD8', '#008972', '#00B597' ],
      exporting: { enabled: false },
      xAxis: { categories: [ '1', '2', '3', '4', '5'], title: {margin: 20, text: 'K', style: axisTitleStyle}, labels: {style: axisLabelStyle}, crosshair: true },
      yAxis: { min: 0, max: this.data.max, labels: {style: axisLabelStyle}, title: {margin: 20, text: this.data.type, style: axisTitleStyle} },
      tooltip: { enabled: true, pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.y}',},
      plotOptions: { column: { groupPadding: 0.1, pointPadding: 0, borderWidth: 0, pointWidth: 33 } },
      legend: { layout: 'horizontal', align: 'right', verticalAlign: 'top', itemStyle: legendStyle},
      series: [{
          name: 'ATGUI_UCF',
          data: this.data.atguiUCF,
          dataLabels: {
              enabled: true,
              allowOverlap: true,
              rotation: 0,
              color: '#000',
              align: 'center',
              // format: '{point.y:.3f}',
              y: 0, // 10 pixels down from the top
              style: {
                  fontSize: '12px',
                  fontFamily: 'Coda',
                  fontWeight: 200,
              }
          }
      }, {
          name: 'UCF',
          data: this.data.UCF,
            dataLabels: {
              enabled: true,
              allowOverlap: true,
              rotation: 0,
              color: '#000',
              align: 'center',
              // format: '{point.y:.3f}',
              y: 0, // 10 pixels down from the top
              style: {
                  fontSize: '12px',
                  fontFamily: 'Coda',
                  fontWeight: 200,
                  textShadow: 'none'
              }
          }

      }, {
          name: 'ATGUI_ICF',
          data: this.data.atguiICF,
            dataLabels: {
              enabled: true,
              allowOverlap: true,
              rotation: 0,
              color: '#000',
              align: 'center',
              // format: '{point.y:.3f}',
              y: 0, // 10 pixels down from the top
              style: {
                  fontSize: '12px',
                  fontFamily: 'Coda',
                  fontWeight: 200,
                  textShadow: 'none'
              }
          }

      }, {
          name: 'ICF',
          data: this.data.ICF,
            dataLabels: {
              enabled: true,
              allowOverlap: true,
              rotation: 0,
              color: '#000',
              align: 'center',
              // format: '{point.y:.3f}',
              y: 0, // 10 pixels down from the top
              style: {
                  fontSize: '12px',
                  fontFamily: 'Coda',
                  fontWeight: 200,
                  textShadow: 'none'
              }
          }

      }]
    });
  },

  render: function() {
    this.highChart();
  },
});

var TimetagView = Backbone.View.extend({
  el: '.content.timetag',

  initialize: function() {
    this.$before = this.$('#before');
    this.$after = this.$('#after');
    this.$final = this.$('#final');
    this.$pie = this.$('#pie');
    this.$inputUser = this.$('#userid-timetag');

    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/timetag.json',
      success: function(data) {
        this.data = data;
        this.currentUser = '00034CB01B51';
        this.render();
      }
    });

    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/timetag_after.json',
      success: function(data) {
        this.finalData = data;
        this.render();
      }
    });

    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/pie.json',
      success: function(data) {
        this.pieData = data;
        this.render();
      }
    });
  },

  events: {
    'click #query-timetag': 'renderCharts',
    'keypress #userid-timetag': 'renderCharts'
  },

  render: function() {
    if (!this.data || !this.finalData || !this.pieData) {
      return;
    }
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

  highChart: function(container, userid, subtitle, yMax, series) {
    var axisLabelStyle = {color: "#000", fontSize: '1.2em'};
    var axisTitleStyle = {color: "#000", fontSize:'1.2em'};
    var legendStyle = {color: "#000", fontSize:'1em', fontWeight: '200'};
    Highcharts.setOptions({
    colors: ["#F24B6A", "#2CA4BF", "#4BBF5C", "#F2B950", "#D96941", "#34495e", "#f39c12"]
    });
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

  pieChart: function(container, userid, subtitle, data) {
    var legendStyle = {color: "#000", fontSize:'1em', fontWeight: '200'};
    Highcharts.setOptions({
    colors: ["#F24B6A", "#2CA4BF", "#4BBF5C", "#F2B950", "#D96941", "#34495e", "#f39c12"]
    });
    container.highcharts({
          chart: { spacingTop: 50, spacingRight: 20, width: 455, backgroundColor: '#ebe7df', style: {fontFamily: 'Coda'}, plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false},
          title: { text: userid, x:20 ,y: -10,style: {fontSize: '2em', color: '#000'} },
          subtitle: { text: subtitle, x:20 ,y: 30,style: {fontSize: '1.5em', color: '#000'} },
          tooltip: { pointFormat: '{series.name}: {point.y}min', style: {color: "#000", fontSize:'1em', fontWeight: '200'} },
          credits: { enabled: false },
          legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom', itemStyle: legendStyle},
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  borderWidth: 2,
                  borderColor: '#ebe7df',
                  size:'100%',
                  cursor: 'pointer',
                  showInLegend: true,
                  dataLabels: {
                      enabled: true,
                      format: '{point.name}: {point.y}min',
                      style: {
                          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                          fontSize: '12px',
                          fontWeight: '200',
                          textShadow: 'none'
                      }
                  }
              }
          },
          // series: [{ type: 'pie', name: 'Timespan', data: [ ['Tag1', 480], ['Tag2', 780], ['Tag3', 180], ] }]
          series: [{ type: 'pie', name: 'Timespan', data: data }]
      });
  },

  generateAreaPoint: function(interval, yMax, series) {
    // var colors = ["#98FF72", "#65D97D", "#42A881", "#1F8784", "#00697D"];
    var colors = ["#F24B6A", "#2CA4BF", "#4BBF5C", "#F2B950", "#D96941", "#34495e", "#f39c12"];
    _.each(interval, function(inter, idx) {
      var areaData = [];
      areaData.push([inter[0], 0]);
      areaData.push([inter[0], yMax]);
      areaData.push([inter[1], yMax]);
      areaData.push([inter[1], 0]);
      series.push({type: 'area', name:'Tag' + (idx + 1), lineWidth: 0, color: colors[idx % colors.length], data: areaData});
    });
  },

  generateAreaPointFinal: function(interval, yMax, series) {
    // var colors = ["#98FF72", "#65D97D", "#42A881", "#1F8784", "#00697D"];
    var colors = ["#F24B6A", "#2CA4BF", "#4BBF5C", "#F2B950", "#D96941", "#34495e", "#f39c12"];
    _.each(interval, function(inter, i) {
      _.each(inter, function(inner, j) {
        var areaData = [];
        areaData.push([inner[0], 0]);
        areaData.push([inner[0], yMax]);
        areaData.push([inner[1], yMax]);
        areaData.push([inner[1], 0]);
        series.push({type: 'area', name:'Tag' + (i + 1), lineWidth: 0, color: colors[i % colors.length], data: areaData});
      });
    });
  },

  generatePieData: function(userid) {
    var data = this.pieData[userid];
    var result = [];
    var max = data.indexOf(_.max(data, function(d) {
      return d;
    }));
    _.each(data, function(s, i) {
      if (i === max) {
        result.push({ name: 'Tag' + (i+1), y: s, sliced: true, selected: true });
      } else {
        result.push(['Tag' + (i+1), s]);
      }
    });
    return result;
  },

  getCharts: function(userid) {
    var coord = this.data[userid].coord,
        interval = this.data[userid].interval,
        beforeSeries = [{name: 'Play', data: coord, lineWidth: 3}],
        afterSeries = [{name: 'Play', data: coord, lineWidth: 3}],
        finalSeries = [{name: 'Play', data: coord, lineWidth: 3}],
        yMax = _.max(coord, function(value) {
      return value;
    });

    this.generateAreaPoint(interval, yMax, afterSeries);
    this.generateAreaPointFinal(this.finalData[userid].interval, yMax, finalSeries);
    this.highChart(this.$before, userid, 'Before time tag', yMax, beforeSeries);
    this.highChart(this.$after, userid, 'After time tag', yMax, afterSeries);
    this.highChart(this.$final, userid, 'Merged tag', yMax, finalSeries);
    this.pieChart(this.$pie, userid, 'Time tag distribution', this.generatePieData(userid));
  },
});

var RecResultView = Backbone.View.extend({
  template: _.template($('#dataset-template').html()),

  initialize: function(opts) {
    this.$slider = this.$('.slider');
    this.$eval = this.$('.eval');
    this.k = opts.k;
    this.test = opts.test;
    var that = this;
    this.$slider.slider({
        min: 1,
        max: 5,
        value: 5,
        orientation: "horizontal",
        range: "min",
        change: function(event, ui) {
          that.k.set("k", ui.value);
        }
      }).addSliderSegments(this.$slider.slider("option").max);
    this.listenTo(this.model, 'reset', this.render);
  },

  makeTemplateData: function() {
    var data = this.model.toJSON(),
        headers = _.keys(data[0]),

        templateData = {
        headers: headers,
        data: sortByRate(data).slice(0, 5)
    };
    return templateData;
  },

  render: function() {
    this.$eval.find('.value:eq(0)').html('  ' + this.k.get('k'));
    this.$eval.find('.value:eq(1)').html('  ' + this.test.getHitNum());
    this.$eval.find('.value:eq(2)').html('  ' + (this.test.getHitNum() / this.k.get('k')).toFixed(2));
    this.$eval.find('.value:eq(3)').html('  ' + (this.test.getHitNum() / this.test.getTotal()).toFixed(2));
    this.$('table').html('');
    var templateData = this.makeTemplateData();
    this.$('table').append(this.template(templateData));
    return this;
  }
});

var RecTestView = TablePagerView.extend({
  template: _.template($('#testdata-template').html()),

  initialize: function() {
    TablePagerView.prototype.initialize.apply(this, arguments);
    this.listenTo(this.model, 'sort', this.render);
  }
});

var ComparisonView = Backbone.View.extend({
  el: '.content.comparison',

  initialize: function() {
    this.$inputUser = this.$('#userid-comparison');
    this.$inputUser.val('00264C507D6F');
    this.$btnQuery = this.$('#query-comparison');
    this.currentType = 'class';
    this.icfBeforeSlider = this.$(".icf-before-slider");
    this.icfAfterSlider = this.$(".icf-after-slider");
    this.ucfBeforeSlider = this.$(".ucf-before-slider");
    this.ucfAfterSlider = this.$(".ucf-after-slider");
    this.ucfBK = new app.kParam();
    this.ucfAK = new app.kParam();
    this.icfBK = new app.kParam();
    this.icfAK = new app.kParam();

    // 保存推荐的结果
    this.icfBeforeModel = new DataList();
    this.icfAfterModel = new DataList();
    this.ucfBeforeModel = new DataList();
    this.ucfAfterModel = new DataList();

    // 保存测试集中用户观看的列表
    this.icfTestBeforeModel = new TestEntry();
    this.icfTestAfterModel = new TestEntry();
    this.ucfTestBeforeModel = new TestEntry();
    this.ucfTestAfterModel = new TestEntry();

    this.icfRecBeforeView = new RecResultView({el:'.icf-rec-list-before', model:this.icfBeforeModel, k:this.icfBK, test:this.icfTestBeforeModel});
    this.icfRecAfterView = new RecResultView({el:'.icf-rec-list-after', model:this.icfAfterModel, k:this.icfAK, test:this.icfTestAfterModel});
    this.ucfRecBeforeView = new RecResultView({el:'.ucf-rec-list-before', model:this.ucfBeforeModel, k:this.ucfBK, test:this.ucfTestBeforeModel});
    this.ucfRecAfterView = new RecResultView({el:'.ucf-rec-list-after', model:this.ucfAfterModel, k:this.ucfAK, test:this.ucfTestAfterModel});

    this.icfTestBeforeView = new RecTestView({el:'.icf-test-list-before', model:this.icfTestBeforeModel});
    this.icfTestAfterView = new RecTestView({el:'.icf-test-list-after', model:this.icfTestAfterModel});
    this.ucfTestBeforeView = new RecTestView({el:'.ucf-test-list-before', model:this.ucfTestBeforeModel});
    this.ucfTestAfterView = new RecTestView({el:'.ucf-test-list-after', model:this.ucfTestAfterModel});

    this.listenTo(this.ucfBK, 'change', this.render);
    this.listenTo(this.ucfAK, 'change', this.render);
    this.listenTo(this.icfBK, 'change', this.render);
    this.listenTo(this.icfAK, 'change', this.render);

    this.fetch();
    this.render();
  },

  events: {
    'click #query-comparison': 'render',
    'keypress #userid-comparison': 'render',
    'click .nav.nav-pills': 'naviRecResultClass',
  },

  loadJsonSuccess: function() {
    return this.recResult && this.testPlay;
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
    if ($target.prop("tagName") === "UL") {
      return;
    }
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
        Logger.info("Fetch dataset/recResult.json successfully!");
        this.render();
      }
    });

    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/rand2TestPlay.json',
      success: function(data) {
        this.testPlay = data;
        Logger.info("Fetch dataset/rand2TestPlay.json successfully!");
        this.render();
      }
    });
  },

  filterTest: function(test) {
    var result = [];
    var uniqKeys = [];
    _.each(test, function(e) {
      if (!_.contains(uniqKeys, e.videoClass)) {
        result.push({'videoClass': e.videoClass});
        uniqKeys.push(e.videoClass);
      }
    });
    return result;
  },

  generateRecOption: function(recModel, key) {
    var result = {};
    _.each(recModel, function(e) {
      result[e[key]] = e.Rate;
    });
    return result;
  },

  render: function() {
    if (!this.loadJsonSuccess()) {
      return;
    }
    var userModel = this.loadUserModel();
    var userIcfBefore = userModel.userIcfBefore.slice(0, this.icfBK.get('k'));
    var userIcfAfter = userModel.userIcfAfter.slice(0, this.icfAK.get('k'));
    var userUcfBefore = userModel.userUcfBefore.slice(0, this.ucfBK.get('k'));
    var userUcfAfter = userModel.userUcfAfter.slice(0, this.ucfAK.get('k'));
    var test = userModel.test;

    if (this.currentType === 'class') {
      test = this.filterTest(test);
    }

    this.icfTestBeforeModel.reset(test);
    this.icfTestAfterModel.reset(test);
    this.ucfTestBeforeModel.reset(test);
    this.ucfTestAfterModel.reset(test);

    if (this.currentType === 'video') {
      this.icfTestBeforeModel.findAndSetVideoHit(this.generateRecOption(userIcfBefore, 'videoID'));
      this.ucfTestBeforeModel.findAndSetVideoHit(this.generateRecOption(userUcfBefore, 'videoID'));
      this.icfTestAfterModel.findAndSetVideoHit(this.generateRecOption(userIcfAfter, 'videoID'));
      this.ucfTestAfterModel.findAndSetVideoHit(this.generateRecOption(userUcfAfter, 'videoID'));
      this.icfTestBeforeModel.sort();
      this.ucfTestBeforeModel.sort();
      this.icfTestAfterModel.sort();
      this.ucfTestAfterModel.sort();
    } else if (this.currentType === 'class') {
      this.icfTestBeforeModel.findAndSetClassHit(this.generateRecOption(userIcfBefore, 'videoClass'));
      this.ucfTestBeforeModel.findAndSetClassHit(this.generateRecOption(userUcfBefore, 'videoClass'));
      this.icfTestAfterModel.findAndSetClassHit(this.generateRecOption(userIcfAfter, 'videoClass'));
      this.ucfTestAfterModel.findAndSetClassHit(this.generateRecOption(userUcfAfter, 'videoClass'));
      this.icfTestBeforeModel.sort();
      this.ucfTestBeforeModel.sort();
      this.icfTestAfterModel.sort();
      this.ucfTestAfterModel.sort();
    }

    this.icfBeforeModel.reset(userIcfBefore);
    this.icfAfterModel.reset(userIcfAfter);
    this.ucfBeforeModel.reset(userUcfBefore);
    this.ucfAfterModel.reset(userUcfAfter);
  }
});

var EvaluationView = Backbone.View.extend({
  el: '.content.evaluation',

  initialize: function() {
    this.fetch();
  },
  
  fetch: function() {
    $.ajax({
      context: this,
      type: 'get',
      url: 'dataset/evaluation.json',
      success: function(data) {
        this.evalData = data;
        this.vPreChart = new EvaluationChart({el:'.videoPrecision', data: this.evalData.videoPrecision});
        this.vRecallChart = new EvaluationChart({el:'.videoRecall', data: this.evalData.videoRecall});
        this.cPreChart = new EvaluationChart({el:'.classPrecision', data: this.evalData.classPrecision});
        this.cRecallChart = new EvaluationChart({el:'.classRecall', data: this.evalData.classRecall});
      }
    });
  }
});
