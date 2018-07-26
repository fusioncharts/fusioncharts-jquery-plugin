<template>
    <div :style="{ display: !showMessage ? 'block' : 'none' }" class="clearfix">
        <div class="chart-viewer">
            <!-- <FrameView :styles="{width: '100%', height: '100%' }" :url="chartIframeURL" /> -->
                <fusioncharts
                :options="options"
                :dataSource="dataSource"
                :style="{ 'text-align': 'center' }"
                ref='fc'
                ></fusioncharts>
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
    name: 'DrillDownChart',
    props:['showMessage'],
    data(){
        return {
        sourceData:
`{
    "chart": {
        "caption": "Sales of top 3 juice flavors last year",
        "subcaption": "Click on a column to see details",
        "xaxisname": "Flavor",
        "yaxisname": "Amount (In USD)",
        "numberprefix": "$",
        "theme": "fusion",
        "rotateValues": "0"
    },
    "data": [
        {
            "label": "Apple",
            "value": "810000",
            "link": "newchart-xml-apple"
        },
        {
            "label": "Cranberry",
            "value": "620000",
            "link": "newchart-xml-cranberry"
        },
        {
            "label": "Grape",
            "value": "350000",
            "link": "newchart-xml-grape"
        }],
        "linkeddata": [
            {
                "id": "apple",
                "linkedchart": {
                "chart": {
                    "caption": "Apple Juice - Quarterly Sales",
                    "subcaption": "Last year",
                    "numberprefix": "$",
                    "theme": "fusion",
                    "rotateValues": "0",
                    "plottooltext": "$label, $dataValue,  $percentValue"
                },
                "data": [{
                    "label": "Q1",
                    "value": "157000",
                    "displayValue": "Q1, $157K"
                }, {
                    "label": "Q2",
                    "value": "172000",
                    "displayValue": "Q2, $172K"
                }, {
                    "label": "Q3",
                    "value": "206000",
                    "displayValue": "Q3, $206K"
                }, {
                    "label": "Q4",
                    "value": "275000",
                    "displayValue": "Q4, $275K"
                }]
                }
            },
            {
                "id": "cranberry",
                "linkedchart": {
                "chart": {
                    "caption": "Cranberry Juice - Quarterly Sales",
                    "subcaption": "Last year",
                    "numberprefix": "$",
                    "theme": "fusion",
                    "plottooltext": "$label, $dataValue,  $percentValue"
                },
                "data": [
                    {
                    "label": "Q1",
                    "value": "102000",
                    "displayValue": "Q1, $102K"
                    },
                    {
                    "label": "Q2",
                    "value": "142000",
                    "displayValue": "Q2, $142K"
                    },
                    {
                    "label": "Q3",
                    "value": "187000",
                    "displayValue": "Q3, $187K"
                    },
                    {
                    "label": "Q4",
                    "value": "189000",
                    "displayValue": "Q4, $189K"
                    }
                ]
                }
            },
            {
                "id": "grape",
                "linkedchart": {
                "chart": {
                    "caption": "Grape Juice - Quarterly Sales",
                    "subcaption": "Last year",
                    "numberprefix": "$",
                    "theme": "fusion",
                    "rotateValues": "0",
                    "plottooltext": "$label, $dataValue,  $percentValue"
                },
                "data": [{
                    "label": "Q1",
                    "value": "45000",
                    "displayValue": "Q1, $45K"
                }, {
                    "label": "Q2",
                    "value": "72000",
                    "displayValue": "Q2, $72K"
                }, {
                    "label": "Q3",
                    "value": "95000",
                    "displayValue": "Q3, $95K"
                }, {
                    "label": "Q4",
                    "value": "108000",
                    "displayValue": "Q4, $108K"
                }]
                }
            }
        ]
}`,
    sourceHTML:
`<div id='chart-container'>
    FusionCharts will render here
</div>`,
sourceJS:
`let FusionCharts = require('fusioncharts');
let Charts = require('fusioncharts/fusioncharts.charts');
let FusionTheme = require('fusioncharts/themes/fusioncharts.theme.fusion');
let $ = require('jquery');
let jQFc = require('jquery-fusioncharts');

Charts(FusionCharts);
FusionTheme(FusionCharts);

$('#chart-container').insertFusionCharts({
	id: 'drill-down-chart',
	type: 'column2d',
	width: '600',
	height: '400',
	dataFormat: 'json',
	dataSource: {/* see data tab */ },
});

// Trigerred when chart is rendered.
// Configures the linked charts.
$('#chart-container').bind('fusionchartsrendered', function(event, args) {
	FusionCharts.items['drill-down-chart'].configureLink({
		type: 'pie2d',
		width: '500',
		overlayButton: {
		  message: 'Back',
		  fontColor: '880000',
		  bgColor: 'FFEEEE',
		  borderColor: '660000',
		},
	}, 0);
});`,
        options: {
            width: '600',
            height: '400',
            type: "column2d",
            dataFormat: "json",
            creditLabel: 'false',
            events: {
                initialized: null
            }
            }
        }
    },
    computed: {
        dataSource: function(){
            return JSON.parse(this.sourceData)
        }
    },
    methods: {
        configureLink: function(chart){
            this.chartInstance = chart; // Save it for further use

            // Configure Drilldown attributes
            // See this : https://www.fusioncharts.com/dev/api/fusioncharts/fusioncharts-methods#configureLink
            this.chartInstance.configureLink({
                type: "pie2d",
                width: '500',
                overlayButton: {
                    message: 'Back',
                    fontColor: '880000',
                    bgColor: 'FFEEEE',
                    borderColor: '660000'
                }
            },0)
        }
    },
    mounted: function(){
        this.configureLink(this.$refs.fc.chartObj);
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
