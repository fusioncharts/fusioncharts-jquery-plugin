global.jQuery = require('jquery');
global.FusionCharts = require('fusioncharts/fusioncharts');
global.Charts = require('fusioncharts/fusioncharts.charts')(global.FusionCharts);
require('../dist/fusioncharts.jqueryplugin.js');

var FusionCharts = global.FusionCharts;
var jQuery = global.jQuery;

describe("jQuery FusionCharts", function() {
    it("renders using jquery plugin", function(done) {
        // Create the container dom element to render the chart
        jQuery('body').append('<div id="chart-container" />');
        // Render a Column2D chart using jquery plugin
        var dataSource = {
                chart: {
                    caption: "Sample Chart",
          animation: "0"
                },
                data: [{
                    value: 500,
                    label: '2015'
                }, {
                    value: 300,
                    label: '2016'
                }, {
                    value: 300,
                    label: '2017'
                }]
            },
            chart = jQuery('#chart-container').insertFusionCharts({
                type: "Column2D",
                dataFormat: 'json',
                id: 'myChart',
                dataSource: dataSource
            }),
            chartObj = FusionCharts.items['myChart'];

      FusionCharts.addEventListener('rendercomplete', function() {
        expect(chartObj.hasRendered()).toBe(true);
        done();
      }, 1000);
    });

    it("Update the chart data", function(done) {
        var dataSource = {chart: {}, data: [{value: 5781127, label: 'Jan'}]},
            dataFromChart;
        jQuery('#chart-container').updateFusionCharts({
            dataSource: dataSource
        });
      FusionCharts.addEventListener('rendercomplete', function() {
        dataFromChart = FusionCharts.items['myChart'].getJSONData();
        expect(dataFromChart.data[0].value).toBe(5781127);
        done();
      }, 1000);
    });

    it("Update chart type using updateFusionCharts method", function(done) {
        jQuery('#chart-container').updateFusionCharts({
            type: 'Pie3D'
        });
      FusionCharts.addEventListener('rendercomplete', function() {
        expect(FusionCharts.items['myChart'].chartType()).toBe('pie3d');
        done();
      }, 1000);
    });

    it("Update caption using `attrFusionCharts` method", function(done) {
        jQuery('#chart-container').attrFusionCharts({
            caption: "Modified caption using attrFusionCharts method"
        });
      FusionCharts.addEventListener('rendercomplete', function() {
        expect(FusionCharts.items['myChart'].getChartAttribute('caption')).toBe('Modified caption using attrFusionCharts method');
        done();
      }, 1000);
    });
});

