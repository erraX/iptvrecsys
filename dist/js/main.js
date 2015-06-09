require.config({
  shim: {
    underscore: {
     exports: '_'
    },

    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },

    bootstrap: {
      deps: [
        'jquery'
      ],
      exports: 'bootstrap'
    },

    flatUI: {
      deps: [
        'jquery'
      ],
      exports: 'flatUI'
    },

    highchart: {
      deps: [
        'jquery'
      ],
      exports: 'highchart'
    }
  },

  paths: {
    underscore: 'http://cdn.bootcss.com/underscore.js/1.8.3/underscore',
    jquery: 'http://cdn.bootcss.com/jquery/2.1.4/jquery.min',
    backbone: 'http://cdn.bootcss.com/backbone.js/1.1.2/backbone-min',
    bootstrap: 'http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min',
    highchart: 'http://cdn.bootcss.com/highcharts/4.1.5/highcharts',
    flatUI: 'lib/flat-ui.min',
    logger: 'lib/logger',
    util: 'lib/util',
  }
});

require([
  'jquery',
  'backbone',
  'util',
  'views/app',
], function ($, Backbone, Util, AppView) {
  $.fn.addSliderSegments = function (amount, orientation) {
    return this.each(function () {
      if (orientation == "vertical") {
        var output = '', i;
        for (i = 1; i <= amount - 2; i++) {
          output += '<div class="ui-slider-segment" style="top:' + 100 / (amount - 1) * i + '%;"></div>';
        }
        $(this).prepend(output);
      } else {
        var segmentGap = 100 / (amount - 1) + "%";
        var segment = '<div class="ui-slider-segment" style="margin-left: ' + segmentGap + ';"></div>';
        // $(this).prepend(segment.repeat(amount - 2));
        $(this).prepend(Util.stringRepeat(segment, amount - 2));
      }
    });
  };

  new AppView();
});
