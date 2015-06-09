define([
  'jquery',
  'underscore',
  'backbone',
  'logger',
  'models/pager',
  'collections/dataList'
  ], function($, _, Backbone, Logger, Pager, DataList) {
  var TablePagerView = Backbone.View.extend({
    initialize: function() {
      this.model = this.model || new DataList();
      this.currentPage = new Pager({'page': 1, 'max': 1});
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
  return TablePagerView;
});
