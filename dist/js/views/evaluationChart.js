define([
  'jquery', 
  'backbone',
  'highchart',
  'logger'
  ], function($, Backbone, highCharts, Logger) {
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
  return EvaluationChart;
});
