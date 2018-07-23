<template>
    <div :style="{ display: !showMessage ? 'block' : 'none' }" class="clearfix">
        <div class="chart-viewer">
            <!-- <FrameView :styles="{width: '100%', height: '100%' }" :url="chartIframeURL" /> -->
                <fusioncharts
                :options="options"
                :dataSource="dataSource"
                :style="{ 'text-align': 'center' }"
                ></fusioncharts>
                <br />
                <button @click="changeBackground">Change Chart Background</button>
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
import extend from 'extend'

export default {
    name: 'UpdateChartAttribute',
    props:['showMessage'],
    data(){
        return {
        sourceData:
`{
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
}`,
    sourceHTML:
`<div id="chart-container">
    FusionCharts will render here
</div>
<button id='update'>Change Chart Background</button>`,
sourceJS:
`let FusionCharts = require('fusioncharts');
let Charts = require('fusioncharts/fusioncharts.charts');
let $ = require('jquery');
let jQFc = require('jquery-fusioncharts');

Charts(FusionCharts);

FusionCharts.ready(function() {
	var btn = document.getElementById("update");
	var dataSource = {/* see data tab */ };

	btn.addEventListener("click", function() {
		var dataArrayNew = $.extend({}, dataSource);
		dataArrayNew.chart.bgColor = "#efefef";
		$("#chart-container").updateFusionCharts({
			dataFormat: "json",
			dataSource: dataArrayNew
		});
	});

  // Using FusionChart"s jQuery method insertFusionCharts() to create FusionCharts.
	$("#chart-container").insertFusionCharts({
		type: "column2d",
		width: "500",
		height: "300",
		dataFormat: "json",
		dataSource: dataSource
	})
});`,
        options: {
            width: '600',
            height: '400',
            type: "column2d",
            dataFormat: "json",
            creditLabel: 'false',
        },
        dataSource: null
        }
    },
    created: function(){
        this.dataSource = JSON.parse(this.sourceData)

    },
    watch: {
        changeBackground: function(){
            console.log('changeBackground')
        }
    },
    methods:{
        changeBackground: function(){
            const data = extend({}, this.dataSource);
            data.chart.bgColor = "#efefef";
            this.dataSource = data;
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
