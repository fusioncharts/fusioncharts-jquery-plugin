# jQuery FusionCharts

**jquery-fusioncharts** wrapper allows you to render and manipulate FusionCharts using familiar jQuery syntax. It provides a thin integration layer between FusionCharts and jQuery for easy chart creation, updates, and event handling across browsers and devices.

Demo: <https://fusioncharts.github.io/fusioncharts-jquery-plugin/>

## Documentation
For complete documentation on events, API methods, configuration options, and advanced examples, please refer to the official FusionCharts documentation: <https://www.fusioncharts.com/dev/getting-started/jquery/your-first-chart-using-jquery>

## Resources
- FusionCharts Website <https://www.fusioncharts.com/>
- FusionCharts NPM Package <https://www.npmjs.com/package/fusioncharts>
- Documentation <https://www.fusioncharts.com/dev/getting-started/jquery/your-first-chart-using-jquery>
- Data Stories <https://www.fusioncharts.com/datastories>
- GitHub Repository <https://github.com/fusioncharts/fusioncharts-jquery-plugin>
- Support <https://www.fusioncharts.com/contact-support>
- Issues <https://github.com/fusioncharts/fusioncharts-jquery-plugin/issues>

## Table of Contents

- [Getting Started](#getting-started)
- [Requirements](#requirements)
- [Installation](#installation)
- [Quick Start](#quick-start-using-es-modules)
- [Working with Events](#working-with-events)
- [Working with APIs](#working-with-apis)
- [FusionTime Integrations](#fusiontime-integration)
- [Licensing](#licensing)

## Getting Started

### Requirements

- **Node.js**, **NPM/Yarn** installed globally in your OS.
- **FusionCharts** installed in your project, as detailed below:
- jQuery (must be loaded before this plugin)
- ⚠️ For legacy IE 6/7/8 support, use jQuery 1.x.

### Installation
Install via npm:

```
npm install jquery-fusioncharts --save
```

## Quick Start (Using ES Modules)

```js
import $ from 'jquery';
import FusionCharts from 'fusioncharts';
// Load charts module to render Column2D chart
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionChartsJquery from 'jquery-fusioncharts';

$('document').ready(function() {
  // Once the window with a document is ready, execute the Chart module
  // and pass FusionCharts as a dependency
  Charts(FusionCharts);
  FusionChartsJquery(FusionCharts)

  // Render the chart using `insertFusionCharts` method
  $('#chart-container').insertFusionCharts({
    type: 'column2d',
    width: '600',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Countries With Most Oil Reserves [2017-18]',
        subCaption: 'In MMbbl = One Million barrels',
        xAxisName: 'Country',
        yAxisName: 'Reserves (MMbbl)',
        numberSuffix: 'K'
      },
      data: [ 
        { label: 'Venezuela', value: '290' },
        { label: 'Saudi', value: '260' },
        { label: 'Canada', value: '180' },
      ]
    }
  });
});
```

## Using CommonJS (Legacy / Node-based Bundlers)
The following examples assume you are using a module bundler (Webpack, Browserify, etc.). For direct browser usage, see the CDN section below.

```js
var $ = require('jquery');
var FusionCharts = require('fusioncharts');
// Load charts module to render Column2D chart
var Charts = require('fusioncharts/fusioncharts.charts');
var FusionTheme = require('fusioncharts/themes/fusioncharts.theme.fusion');
var jQueryFusionCharts = require('jquery-fusioncharts');

$('document').ready(function() {
  // Once the window with a document is ready, execute the Chart module
  // and pass FusionCharts as a dependency
  Charts(FusionCharts);
  FusionTheme(FusionCharts);
  jQueryFusionCharts(FusionCharts);

  // Render the chart using `insertFusionCharts` method
  $('#chart-container').insertFusionCharts({
    type: 'column2d',
    width: '600',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Countries With Most Oil Reserves [2017-18]',
        subCaption: 'In MMbbl = One Million barrels',
        xAxisName: 'Country',
        yAxisName: 'Reserves (MMbbl)',
        numberSuffix: 'K'
      },
      data: [ 
        { label: 'Venezuela', value: '290' },
        { label: 'Saudi', value: '260' },
        { label: 'Canada', value: '180' },
      ]
    }
  });
});
```

## Standalone (CDN) Usage
Include scripts in this order:

```js
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js"></script>
<script src="https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.fusion.js"></script>
<script src="https://cdn.fusioncharts.com/jquery-fusioncharts/latest/jquery.fusioncharts.min.js"></script>
```

Then:

```html
<div id="chart-container"></div>

<script>
  $(function () {
    $('#chart-container').insertFusionCharts({
      type: 'column2d',
      width: '500',
      height: '300',
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: 'Yearly Revenue',
          numberPrefix: '$',
          theme: 'fusion'
        },
        data: [
          { label: '2015', value: '5548900' },
          { label: '2016', value: '8100000' }
        ]
      }
    });
  });
</script>
```

## Rendering Charts

The plugin provides jQuery methods:
- insertFusionCharts
- appendFusionCharts
- prependFusionCharts

### insertFusionCharts
Replaces selected element contents with the chart.

```js
$('#chart-container').insertFusionCharts({
  type: 'pie2d',
  width: '450',
  height: '300',
  dataFormat: 'json',
  dataSource: {
    chart: { caption: 'Sales Distribution' },
    data: [...]
  }
});
```

### appendFusionCharts
Appends a chart to the selected container without replacing existing content.

```js
$('#chart-container').insertFusionCharts({
    type: 'pie2d',
    width: '450',
    height: '300',
    dataFormat: 'json',
    dataSource: {
        "chart": {
                ...
        },
        "data": [...]
    }
});

$('#btnClone').click(function() {
    // Clone the chart to create a column chart representation of the same data
    $('#chart-container').cloneFusionCharts(function() {
        // Append the cloned chart to the same chart container
        $('#chart-container').appendFusionCharts(this[0]);
    }, {
        'id': 'chart-clone',
        'type': 'column2d'
    });
});
```

### prependFusionCharts

Prepends a chart to the selected container.

```js
$('#chart-container').insertFusionCharts({
    type: 'pie2d',
    width: '450',
    height: '300',
    dataFormat: 'json',
    dataSource: {
        "chart": {
            ...
        },
        "data": [
            ...
        ]
    }
});

$('#btnClone').click(function() {
    // Clone the chart to create a column chart representation of the same data
    $('#chart-container').cloneFusionCharts(function() {
        // Prepend the cloned chart to the same chart container
        $('#chart-container').prependFusionCharts(this[0]);
    }, {
        'id': 'chart-clone',
        'type': 'column2d'
    });
});
```

## Working with Events

To attach events to FusionCharts element, you can use bind or on with jQuery selectors.

The event name string should be of the pattern 'fusioncharts[event name in lowercase]', eg. to attach an event listener to dataplotRollOver, the string will be 'fusionchartsdataplotrollover'.

```javascript
$("#chart-container").on('fusioncharts[event name in lowercase]', function(eventObj, dataObj) {
    [code goes here]
});
```

### Tracks Hover Events on a Data Plot

```javascript
<!DOCTYPE html>
<html>
    <head>
        <title>jQuery FusionCharts Plugin Sample</title>
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js"></script>
        <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.fusion.js"></script>
        <script type="text/javascript" src="https://cdn.fusioncharts.com/jquery-fusioncharts/latest/jquery.fusioncharts.min.js"></script>
    </head>
    <body>
        <div id="chart-container">FusionCharts will render here...</div>
        <p style="padding: 10px;background: #f5f2f0;text-align: center;">Hover on the plot to see the value along with the label</p>
        <script type="text/javascript">
            $('document').ready(function () {
                $("#chart-container").insertFusionCharts({
                    type: "column2d",
                    width: "500",
                    height: "300",
                    dataFormat: "json",
                    dataSource: {
                        "chart": {
                            "caption": "Countries With Most Oil Reserves [2017-18]",
                            "subCaption": "In MMbbl = One Million barrels",
                            "xAxisName": "Country",
                            "yAxisName": "Reserves (MMbbl)",
                            "numberSuffix": "K",
                            "theme": "fusion"
                        },
                        "data": [
                            { "label": "Venezuela", "value": "290" },
                            { "label": "Saudi", "value": "260" },
                        ]
                    }
                });
                $("#chart-container").on('fusionchartsdataplotrollover', function(eventObj, dataObj) {
                    $('body p').text('You’re are currently hovering over ' + dataObj.categoryLabel + ' whose value is ' + dataObj.displayValue);
                });
            });
        </script>
    </body>
</html>
```

## Working with APIs

To interact with a rendered chart, you need access to its FusionCharts instance.

Use the getFusionCharts() method on a jQuery selector to retrieve all chart instances inside the selected element. The method returns an array of chart objects.

Once retrieved, you can invoke any supported FusionCharts API on those instances.

```js
var charts = $('#chart-container').getFusionCharts();
charts.forEach(function (chart) {
  chart.<FusionCharts API>();
});
```

### Example: Change Chart Type Dynamically
The example below renders a Column 2D chart and converts it to a Pie 2D chart after 5 seconds.

```js
<!DOCTYPE html>
<html>
  <head>
    <title>FusionCharts jQuery API Example</title>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js"></script>
    <script src="https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.fusion.js"></script>
    <script src="https://cdn.fusioncharts.com/jquery-fusioncharts/latest/jquery.fusioncharts.min.js"></script>
  </head>
  <body>

    <div id="chart-container"></div>

    <script>
      $(function () {
        $('#chart-container').insertFusionCharts({
          type: 'column2d',
          width: '500',
          height: '300',
          dataFormat: 'json',
          dataSource: {
            chart: {
              caption: 'Countries With Most Oil Reserves',
              numberSuffix: 'K',
              theme: 'fusion'
            },
            data: [
              { label: 'Venezuela', value: '290' },
              { label: 'Saudi', value: '260' },
              { label: 'Canada', value: '180' }
            ]
          }
        });

        // Change chart type after 5 seconds
        setTimeout(function () {
          var charts = $('#chart-container').getFusionCharts();
          charts.forEach(function (chart) {
            chart.chartType('pie2d');
          });
        }, 5000);
      });
    </script>

  </body>
</html>
```

## FusionTime Integration
Starting from `fusioncharts@3.13.3-sr.1`, you can render time-series visualizations using FusionTime with the jQuery plugin.
FusionTime enables advanced time-series capabilities such as:
- Continuous time axes
- Zoom and scroll
- Large dataset handling
- Multi-axis plots

Learn more about FusionTime: <https://www.fusioncharts.com/fusiontime>

### Example: Rendering a Time-Series Chart

The following example demonstrates how to render a FusionTime chart using npm-installed dependencies.

```js
// Required modules
var FusionCharts = require('fusioncharts');
var TimeSeries = require('fusioncharts/fusioncharts.timeseries');
var $ = require('jquery');
var jQueryFusionCharts = require('jquery-fusioncharts');

// Register dependencies
TimeSeries(FusionCharts);
jQueryFusionCharts(FusionCharts);

// Fetch sample data and schema
var jsonify = res => res.json();

var dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
).then(jsonify);

var schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
).then(jsonify);

Promise.all([dataFetch, schemaFetch]).then(function (res) {
  var data = res[0];
  var schema = res[1];

  // Create DataStore and DataTable
  var fusionDataStore = new FusionCharts.DataStore();
  var fusionTable = fusionDataStore.createDataTable(data, schema);

  $(function () {
    $('#chart-container').insertFusionCharts({
      type: 'timeseries',
      width: '600',
      height: '400',
      dataFormat: 'json',
      dataSource: {
        data: fusionTable,
        caption: { text: 'Sales Analysis' },
        subcaption: { text: 'Grocery' },
        yAxis: [{
          plot: {
            value: 'Grocery Sales Value',
            type: 'line'
          },
          format: { prefix: '$' },
          title: 'Sale Value'
        }]
      }
    });
  });
});
```

Note:
If using a downloaded FusionCharts package instead of npm, reference the local files accordingly:

```js
var FusionCharts = require('/path/to/fusioncharts/fusioncharts.js');
var TimeSeries = require('/path/to/fusioncharts/fusioncharts.timeseries.js');
```

## Need More Details?
For complete documentation on events, API methods, configuration options, and advanced examples, please refer to the official FusionCharts documentation: <https://www.fusioncharts.com/dev/getting-started/jquery/your-first-chart-using-jquery>

## Licensing

The FusionCharts JQuery integration component is open-source and distributed under the terms of the MIT/X11 License. However, you will need to download and include FusionCharts library in your page separately, which has a [separate license](https://www.fusioncharts.com/buy).
