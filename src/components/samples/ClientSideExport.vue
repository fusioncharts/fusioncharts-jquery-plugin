<template>
    <div :style="{ display: !showMessage ? 'block' : 'none' }" class="clearfix">
        <div class="chart-viewer">
            <!-- <FrameView :styles="{width: '100%', height: '100%' }" :url="chartIframeURL" /> -->
                <center>
                    <button v-bind:style="{ padding: '5px 10px', background: '#fbfbfb' }" @click="exportToPdf">Export both charts as a single PDF</button>
                </center>
                <fusioncharts
                :options="options"
                :dataSource="dataSource.columnData"
                :style="{ 'text-align': 'center' }"
                ></fusioncharts>
                <fusioncharts
                width="600"
                height="600"
                type="stackedcolumn2d"
                dataFormat="json"
                :dataSource="dataSource.stackedColumnData">
                </fusioncharts>
        </div>
        <div class="code-viewer">
            <TabView border>
            <Tab label="JavaScript" slot='tab'>
                <div class="code-tab-container">
                <div class="code-tab">
                    <CodeWrapper
                    :styles="{width: '100%', height: '100%' }"
                    language="javascript"
                    :code="sourceJS"
                    />
                </div>
                </div>
            </Tab>
            <Tab label="HTML" slot='tab'>
                <div class="code-tab-container">
                <div class="code-tab">
                    <CodeWrapper
                    :styles="{width: '100%', height: '100%' }"
                    language="html"
                    :code="sourceHTML"
                    />
                </div>
                </div>
            </Tab>
            <Tab label="Data" slot='tab'>
                <div class="code-tab-container">
                <div class="code-tab">
                    <CodeWrapper
                    :styles="{width: '100%', height: '100%' }"
                    language="javascript"
                    :code="sourceData"
                    />
                </div>
                </div>
            </Tab>
            </TabView>
        </div>
        <div :styles="{ clear: 'both' }" />
        </div>
</template>

<script>

import TabView from './../TabView';
import Tab from './../Tab'
import CodeWrapper from './../CodeWrapper'
import FusionCharts from 'fusioncharts'

export default {
    name: 'ClientSideExport',
    props:['showMessage'],
    data(){
        return {
        sourceData:
`{
    "columnData":
    {
        "chart": {
            "caption": "Countries With Most Oil Reserves [2017-18]",
            "subCaption": "In MMbbl = One Million barrels",
            "xAxisName": "Country",
            "yAxisName": "Reserves (MMbbl)",
            "numberSuffix": "K",
            "theme": "fusion"
        },
        "data": [{
            "label": "Venezuela",
            "value": "290"
        }, {
            "label": "Saudi",
            "value": "260"
        }, {
            "label": "Canada",
            "value": "180"
        }, {
            "label": "Iran",
            "value": "140"
        }, {
            "label": "Russia",
            "value": "115"
        }, {
            "label": "UAE",
            "value": "100"
        }, {
            "label": "US",
            "value": "30"
        }, {
            "label": "China",
            "value": "30"
        }]
    },
    "stackedColumnData":
    {
      "chart": {
        "caption": "Yearly Energy Production Rate",
        "subCaption": " Top 5 Developed Countries",
        "numbersuffix": " TWh",
        "showSum": "1",
        "plotToolText": "$label produces <b>$dataValue</b> of energy from $seriesName",
        "theme": "fusion"
      },
      "categories": [
        {
          "category": [
            {
              "label": "Canada"
            },
            {
              "label": "China"
            },
            {
              "label": "Russia"
            },
            {
              "label": "Australia"
            },
            {
              "label": "United States"
            },
            {
              "label": "France"
            }
          ]
        }
      ],
      "dataSet": [
        {
          "seriesName": "Coal",
          "data": [
            {
              "value": "400"
            },
            {
              "value": "830"
            },
            {
              "value": "500"
            },
            {
              "value": "420"
            },
            {
              "value": "790"
            },
            {
              "value": "380"
            }
          ]
        },
        {
          "seriesName": "Hydro",
          "data": [
            {
              "value": "350"
            },
            {
              "value": "620"
            },
            {
              "value": "410"
            },
            {
              "value": "370"
            },
            {
              "value": "720"
            },
            {
              "value": "310"
            }
          ]
        },
        {
          "seriesName": "Nuclear",
          "data": [
            {
              "value": "210"
            },
            {
              "value": "400"
            },
            {
              "value": "450"
            },
            {
              "value": "180"
            },
            {
              "value": "570"
            },
            {
              "value": "270"
            }
          ]
        },
        {
          "seriesName": "Gas",
          "data": [
            {
              "value": "180"
            },
            {
              "value": "330"
            },
            {
              "value": "230"
            },
            {
              "value": "160"
            },
            {
              "value": "440"
            },
            {
              "value": "350"
            }
          ]
        },
        {
          "seriesName": "Oil",
          "data": [
            {
              "value": "60"
            },
            {
              "value": "200"
            },
            {
              "value": "200"
            },
            {
              "value": "50"
            },
            {
              "value": "230"
            },
            {
              "value": "150"
            }
          ]
        }
      ]
    }
}`,
    sourceHTML:
`<div id='chart-container1'>
    FusionCharts will render here
</div>
<div id='chart-container2'>
    FusionCharts will render here
</div>
<center><button id='export' style="padding: 5px 10px; background: rgb(251, 251, 251);">Export both charts as a single PDF</button></center>
`,
sourceJS:
`let FusionCharts = require('fusioncharts');
let Charts = require('fusioncharts/fusioncharts.charts');
let FusionTheme = require('fusioncharts/themes/fusioncharts.theme.fusion');
let $ = require('jquery');
let jQFc = require('jquery-fusioncharts');

Charts(FusionCharts);
FusionTheme(FusionCharts);

FusionCharts.ready(function() {
	var btn = document.getElementById('export');
	var columnData = {/* see data tab */ }
	var stackedColumnData = {/* see data tab */ }

    // Handler for export button.
    // Fires an export operation which exports all charts on the page as a PDF.
	btn.addEventListener('click', function() {
		FusionCharts.batchExport({
			exportFormat:'pdf'
		});
	});

  	// Using FusionChart's jQuery method insertFusionCharts() to create FusionCharts.
	$('#chart-container1').insertFusionCharts({
		type: 'column2d',
		width: '500',
		height: '300',
		dataFormat: 'json',
		dataSource: columnData
	});
	$('#chart-container2').insertFusionCharts({
		type: 'stackedcolumn2d',
		width: '500',
		height: '500',
		dataFormat: 'json',
		dataSource: stackedColumnData
	});
});`,
            options: {
                width: '600',
                height: '400',
                type: "column2d",
                dataFormat: "json",
                creditLabel: 'false',
            },
        }
    },
    computed: {
        dataSource: function(){
            return JSON.parse(this.sourceData)
        }
    },
    methods: {
        exportToPdf: function(){
            FusionCharts.batchExport({
                exportFormat:'pdf'
            });
        }
    },
    components:{
        TabView,
        Tab,
        CodeWrapper
    }
}
</script>

<style>

</style>
