global.jQuery = require('jquery');
global.FusionCharts = require('fusioncharts/fusioncharts');
global.Charts = require('fusioncharts/fusioncharts.charts')(global.FusionCharts);
require('../dist/jquery.fusioncharts.js')(global.FusionCharts);

var FusionCharts = global.FusionCharts;
var jQuery = global.jQuery;

function waitFor(predicate, done, timeoutMs) {
  var start = Date.now();
  var timeout = timeoutMs || 8000;

  function tick() {
    try {
      if (predicate()) {
        done();
        return;
      }
    } catch (err) {
      if (done.fail) {
        done.fail(err);
      } else {
        done(err);
      }
      return;
    }

    if (Date.now() - start > timeout) {
      var err = new Error('Timeout waiting for condition');
      if (done.fail) {
        done.fail(err);
      } else {
        done(err);
      }
      return;
    }
    setTimeout(tick, 50);
  }

  tick();
}

describe('jQuery FusionCharts', function () {
  it('renders using jquery plugin', function (done) {
    // Create the container dom element to render the chart
    jQuery('body').append('<div id="chart-container" />');
    // Render a Column2D chart using jquery plugin
    var dataSource = {
        chart: {
          caption: 'Sample Chart',
          animation: '0',
        },
        data: [
          {
            value: 500,
            label: '2015',
          },
          {
            value: 300,
            label: '2016',
          },
          {
            value: 300,
            label: '2017',
          },
        ],
      },
      chart = jQuery('#chart-container').insertFusionCharts({
        type: 'Column2D',
        dataFormat: 'json',
        id: 'myChart',
        dataSource: dataSource,
      });

    waitFor(function () {
      var chartObj = FusionCharts.items['myChart'];
      return chartObj && chartObj.hasRendered && chartObj.hasRendered();
    }, done);
  });

  it('Update the chart data', function (done) {
    var dataSource = { chart: {}, data: [{ value: 5781127, label: 'Jan' }] },
      dataFromChart;
    jQuery('#chart-container').updateFusionCharts({
      dataSource: dataSource,
    });
    waitFor(function () {
      dataFromChart = FusionCharts.items['myChart'].getJSONData();
      return dataFromChart && dataFromChart.data &&
        dataFromChart.data[0] &&
        dataFromChart.data[0].value === 5781127;
    }, function () {
      expect(dataFromChart.data[0].value).toBe(5781127);
      done();
    });
  });

  it('Update chart type using updateFusionCharts method', function (done) {
    jQuery('#chart-container').updateFusionCharts({
      type: 'Pie3D',
    });
    waitFor(function () {
      return FusionCharts.items['myChart'].chartType() === 'pie3d';
    }, function () {
      expect(FusionCharts.items['myChart'].chartType()).toBe('pie3d');
      done();
    });
  });

  it('Update caption using `attrFusionCharts` method', function (done) {
    jQuery('#chart-container').attrFusionCharts({
      caption: 'Modified caption using attrFusionCharts method',
    });
    waitFor(function () {
      return FusionCharts.items['myChart'].getChartAttribute('caption') ===
        'Modified caption using attrFusionCharts method';
    }, function () {
      expect(FusionCharts.items['myChart'].getChartAttribute('caption')).toBe(
        'Modified caption using attrFusionCharts method',
      );
      done();
    });
  });
});
