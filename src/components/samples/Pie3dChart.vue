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
    name: 'Pie3dChart',
    props:['showMessage'],
    data(){
        return {
        sourceData:
`{
    "chart": {
        "caption": "Recommended Portfolio Split",
        "subCaption" : "For a net-worth of $1M",
        "showValues":"1",
        "showPercentInTooltip" : "0",
        "numberPrefix" : "$",
        "enableMultiSlicing":"1",
        "theme": "fusion"
    },
    "data": [{
        "label": "Equity",
        "value": "300000"
    }, {
        "label": "Debt",
        "value": "230000"
    }, {
        "label": "Bullion",
        "value": "180000"
    }, {
        "label": "Real-estate",
        "value": "270000"
    }, {
        "label": "Insurance",
        "value": "20000"
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
    type: "pie3d",
    width: "600",
    height: "400",
    dataFormat: "json",
    dataSource: {/* see data tab */ },
}`,
        options: {
                type: "pie3d",
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
