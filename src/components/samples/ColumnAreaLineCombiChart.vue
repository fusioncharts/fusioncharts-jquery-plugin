<template>
    <div :style="{ display: !showMessage ? 'block' : 'none' }" class="clearfix">
        <div class="chart-viewer">
            <!-- <FrameView :styles="{width: '100%', height: '100%' }" :url="chartIframeURL" /> -->
                <fusioncharts
                :options="options"
                :dataSource="dataSource"
                :style="{ 'text-align': 'center' }"
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

export default {
    name: 'ColumnAreaLineCombiChart',
    props:['showMessage'],
    data(){
        return {
        sourceData:
`{
    "chart": {
        "caption": "Expense Analysis",
        "subCaption": "ACME Inc.",
        "xAxisname": "Region",
        "yAxisName": "Amount (In USD)",
        "numberPrefix": "$",
        "exportenabled": "1",
        "theme": "fusion"
    },
    "categories": [{
        "category": [{
        "label": "East"
        }, {
        "label": "West"
        }, {
        "label": "South"
        }, {
        "label": "North"
        }]
    }],
    "dataset": [{
        "seriesName": "Actual Expenses",
        "data": [{
        "value": "1441290"
        }, {
        "value": "855912"
        }, {
        "value": "911404"
        }, {
        "value": "648136"
        }]
    }, {
        "seriesName": "Budgeted Expenses",
        "renderAs": "line",
        "data": [{
        "value": "1297430"
        }, {
        "value": "776485"
        }, {
        "value": "685352"
        }, {
        "value": "726791"
        }]
    }, {
        "seriesName": "Unknown liabilities",
        "renderAs": "area",
        "showAnchors" : "0",
        "data": [{
        "value": "143860"
        }, {
        "value": "79427"
        }, {
        "value": "226052"
        }, {
        "value": "78655"
        }]
    }]
}`,
    sourceHTML:
`<div id="chart-container">
    FusionCharts will render here
</div>`,
sourceJS:
`let FusionCharts = require('fusioncharts');
let Charts = require('fusioncharts/fusioncharts.charts');
let $ = require('jquery');
let jQFc = require('jquery-fusioncharts');

Charts(FusionCharts);

$('#chart-container').insertFusionCharts({
    type: "mscombi2d",
    width: "600",
    height: "600",
    dataFormat: "json",
    dataSource: {/* see data tab */ },
}`,
        options: {
                type: "mscombi2d",
                width: "600",
                height: "400",
                dataFormat: "json"
            }
        }
    },
    computed: {
        dataSource: function(){
            return JSON.parse(this.sourceData)
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
