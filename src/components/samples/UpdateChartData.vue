<template>
    <div :style="{ display: !showMessage ? 'block' : 'none' }" class="clearfix">
        <div class="chart-viewer">
            <!-- <FrameView :styles="{width: '100%', height: '100%' }" :url="chartIframeURL" /> -->
                <fusioncharts
                :options="options"
                :dataSource="dataSource"
                :style="{ 'text-align': 'center' }"
                ></fusioncharts>
                <br/>
                <button @click="updateData">Click to Update Data</button>
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
    name: 'UpdateChartData',
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
        "theme": "fusion",
        "updateAnimDuration":"0.4"
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
<button id='update'>Click to Update Data</button>`,
sourceJS:
`let FusionCharts = require('fusioncharts');
let Charts = require('fusioncharts/fusioncharts.charts');
let $ = require('jquery');
let jQFc = require('jquery-fusioncharts');

Charts(FusionCharts);

FusionCharts.ready(function() {
	var dataSource = {/* see data tab */ };
	var btn = document.getElementById("update");
	function getRandomNumber() {
		var max = 300, min = 50;
		return Math.round(((max - min) * Math.random()) + min);
	}

	btn.addEventListener("click", function() {
		var dataArrayNew = $.extend({}, dataSource);
		dataArrayNew.data[2].value = getRandomNumber();
		dataArrayNew.data[3].value = getRandomNumber();
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
            type: "Column2D",
            width: "600",
            height: "350",
            dataFormat: "json"
        },
        dataSource: null
        }
    },
    methods:{
        updateData: function(){
            const data = extend({}, this.dataSource);
            data.data[2].label = "This Label is Updated";
            data.data[2].value = this.getRandomNumber();

            data.data[3].label = "This is updated as well";
            data.data[3].value = this.getRandomNumber();
            this.dataSource = data;
        },
        getRandomNumber: function () {
            var max = 300, min = 50;
            return Math.round(((max - min) * Math.random()) + min);
        }
    },
    created: function(){
        this.dataSource = JSON.parse(this.sourceData)
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
