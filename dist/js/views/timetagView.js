define([
  'jquery', 
  'underscore',
  'backbone',
  'highchart',
  'logger'
  ], function($, _, Backbone, highCharts, Logger) {
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
  return TimetagView;
});

