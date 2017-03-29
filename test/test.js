var jQuery = require('jquery');
var FusionCharts = require('fusioncharts');
var Charts = require('fusioncharts/fusioncharts.charts');
var jqFusionCharts = require('../lib/jquery-fusioncharts');

Charts(FusionCharts);


describe("jQuery FusionCharts", function() {
  	it("renders using jquery plugin", function() {
  		// Create the container dom element to render the chart
  		jQuery('body').append('<div id="chart-container" />');
  		// Render a Column2D chart using jquery plugin
  		var dataSource = {
				chart: {
					caption: "Sample Chart"
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
			chartObj = FusionCharts('myChart');

	    expect(chartObj.hasRendered()).toBe(true);
  	});

  	it("Update the chart data", function() {
  		var dataSource = {chart: {}, data: [{value: 5781127, label: 'Jan'}]},
  			dataFromChart;
  		jQuery('#chart-container').updateFusionCharts({
  			dataSource: dataSource
  		});
  		dataFromChart = FusionCharts('myChart').getJSONData();
	    expect(dataFromChart.data[0].value).toBe(5781127);
  	});

  	it("Update chart type using updateFusionCharts method", function() {
  		jQuery('#chart-container').updateFusionCharts({
  			type: 'Pie3D'
  		});
	    expect(FusionCharts('myChart').chartType()).toBe('pie3d');
  	});

  	it("Update caption using `attrFusionCharts` method", function() {
  		jQuery('#chart-container').attrFusionCharts({
  			caption: "Modified caption using attrFusionCharts method"
  		});
	    expect(FusionCharts('myChart').getChartAttribute('caption')).toBe('Modified caption using attrFusionCharts method');
  	});
});

