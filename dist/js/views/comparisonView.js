define([
  'jquery', 
  'underscore',
  'backbone',
  'logger',
  'views/recResultView',
  'views/recTestView',
  'collections/dataList',
  'collections/testEntry',
  'models/kParam',
  ], function($, _, Backbone, Logger, RecResultView, RecTestView, DataList, TestEntry, kParam) {
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
      this.ucfBK = new kParam();
      this.ucfAK = new kParam();
      this.icfBK = new kParam();
      this.icfAK = new kParam();

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
  return ComparisonView;
});

