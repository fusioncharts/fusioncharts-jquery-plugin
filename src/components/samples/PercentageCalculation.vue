<template>
    <div :style="{ display: !showMessage ? 'block' : 'none' }" class="clearfix">
        <div class="chart-viewer">
            <!-- <FrameView :styles="{width: '100%', height: '100%' }" :url="chartIframeURL" /> -->
                <fusioncharts
                :options="options"
                :dataSource="dataSource"
                :total="total"
                :style="{ 'text-align': 'center' }"
                ></fusioncharts>
                <p v-bind:style="{ padding: '10px', background: '#f5f2f0'}">{{ displayValue }}</p>
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

export default {
    name: 'TriggerEventFromChart',
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
`<div id='chart-container'>
    FusionCharts will render here
</div>
<p style="padding: 10px; background: rgb(245, 242, 240);" id='message'>
    Hover on the plot to see the value along with the label
</p>`,
sourceJS:
`let FusionCharts = require('fusioncharts');
let Charts = require('fusioncharts/fusioncharts.charts');
let FusionTheme = require('fusioncharts/themes/fusioncharts.theme.fusion');
let $ = require('jquery');
let jQFc = require('jquery-fusioncharts');

Charts(FusionCharts);
FusionTheme(FusionCharts);

let dataSource = {/* see data tab */ };
let total = dataSource.data.reduce((p,c)=>p+Number(c.value), 0);

$('#chart-container').insertFusionCharts({
    type: 'column2d',
    width: '600',
    height: '400',
    dataFormat: 'json',
    dataSource: dataSource,
});

// Event callback binding for 'dataplotRollOver'.
// Shows the percentage of the hovered plot on the page.
$('#chart-container').bind('fusionchartsdataplotrollover', function(event, args) {
    let value = (args.value / total * 100).toFixed(2);
    $('#message').text(args.categoryLabel + " is " + value + "% of the total");
});`,
        options: {
            width: '600',
            height: '400',
            type: "column2d",
            dataFormat: "json",
            creditLabel: 'false',
            events: {
                dataplotRollover: null
            }
        },
        displayValue:'Hover on the plot to see the value along with the label',
        }
    },
    computed: {
        dataSource: function(){
            return JSON.parse(this.sourceData)
        },
        total: function() {
        	return JSON.parse(this.sourceData).data.reduce((p,c)=>p+Number(c.value), 0);
        }
    },
    created: function(){
        this.options.events.dataplotRollover = (e, arg)=>{
    		let value = (arg.value / this.total * 100).toFixed(2);
            this.displayValue = arg.categoryLabel + ' is ' + value + '% of the total';
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
