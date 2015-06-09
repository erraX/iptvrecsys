define([
  'jquery', 
  'underscore',
  'backbone',
  'util',
  'flatUI',
  'logger',
  ], function($, _, Backbone, Util, flatUI, Logger) {
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
          data: Util.sortByRate(data).slice(0, 5)
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
  return RecResultView;
});

