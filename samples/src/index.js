FusionCharts = require('fusioncharts');

JQFusionCharts = require('../../lib/jquery-fusioncharts');

Charts = require('fusioncharts/fusioncharts.charts');
$ = require('jquery');

Charts(FusionCharts);

$('document').ready(function() {
	$('#chart-container').insertFusionCharts({
		type: "Column2D",
		dataFormat: 'json',
		dataSource: { data: [{value: 500}, {value: 300}, {value: 300}]}
	})
})

