global.jQuery = require('jquery');
global.FusionCharts = require('fusioncharts/fusioncharts');
global.Charts = require('fusioncharts/fusioncharts.charts')(global.FusionCharts);
require('../../dist/fusioncharts.jqueryplugin.js');
var $ = require('jquery');

$('document').ready(function() {
	// Load the chart module and pass FusionCharts as parameter
	// after the window with a document is ready.
	// Charts(FusionCharts);

	// Render chart using insertFusionCharts method
	$('#chart-container').insertFusionCharts({
		type: "Column2D",
		dataFormat: 'json',
		dataSource: { data: [{value: 500}, {value: 300}, {value: 300}]}
	});

	// Convert HTML table to chart using convertToFusionCharts method
	$("#dataTable").convertToFusionCharts({
		    type: "mscolumn2d",
		    width: "700",
		    height: "350",
		    dataFormat: "htmltable",
		    renderAt: "chart-container2"
		}, {
		    "chartAttributes": {
		        caption: "Units sold for last 2 years",
		        xAxisName: "Month",
		        yAxisName: "Units",
		        bgColor: "FFFFFF",
		        theme: "fint"
	    	}
		}
	);

});

