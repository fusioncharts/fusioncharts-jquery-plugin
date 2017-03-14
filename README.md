# jquery-fusioncharts
The FusionCharts Suite XT `jquery-fusioncharts` allows you to use jQuery syntax to render and manipulate your charts and graphs seamlessly across all browsers and devices.

It helps you add interactive JavaScript charts to your web and mobile applications, combining the delight and comprehensiveness of the FusionCharts Suite XT with the easy-to-use jQuery syntax.

## Installation

The easiest way to use `jquery-fusioncharts` plugin is to install it from `npm` and include it in your own build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/) etc).

```
npm install jquery-fusioncharts --save
```
## Usage
jQuery needs to be imported before the `jquery-fusioncharts` plugin is included in the project. Note that in order to support IE 6/7/8, jQuery 1.x versions need to be used.

### Render the charts using jquery-fusioncharts plugin
```
var jQuery = require('jquery');
var FusionCharts = require('jquery-fusioncharts');
// Load charts module to render Column2D chart
var Charts = require('fusioncharts/fusioncharts.charts');

jQuery('document').ready(function () {
    // Once the window with a document is ready, execute the Chart module
    // and pass FusionCharts as a dependency
    Charts(FusionCharts);

    // Render the chart using `insertFusionCharts` method
    $("#chart-container").insertFusionCharts({
        type: "column2d",
        width: "500",
        height: "300",
        dataFormat: "json",
        dataSource: {
            "chart": {
                "caption": "Monthly revenue",
                "subCaption": "Last Year",
                "xAxisName": "Month",
                "yAxisName": "Revenues",
                "numberPrefix": "$",
                "theme": "fint"
            },
            "data": [{
                "label": "Jan",
                "value": "420000"
            }, {
                "label": "Feb",
                "value": "810000"
            }, {
                "label": "Mar",
                "value": "720000"
            }, {
                "label": "Apr",
                "value": "550000"
            }, {
                "label": "May",
                "value": "910000"
            }, {
                "label": "Jun",
                "value": "510000"
            }, {
                "label": "Jul",
                "value": "680000"
            }, {
                "label": "Aug",
                "value": "620000"
            }, {
                "label": "Sep",
                "value": "610000"
            }, {
                "label": "Oct",
                "value": "490000"
            }, {
                "label": "Nov",
                "value": "900000"
            }, {
                "label": "Dec",
                "value": "730000"
            }]
        }
    });
});
```

You can also use the standalone build by including `package/jquery-fusioncharts.js` in your page. If you use this, make sure you have included jQuery, FusionCharts and FusionCharts charts module.

## Setting up the FusionCharts jQuery Plugin

To set up the FusionCharts jQuery plugin, follow the steps given below:

* Include jquery.min.js to enable jQuery in your project:

```
<script type="text/javascript" src="jquery.min.js"></script>
```
jQuery needs to be imported before the FusionCharts jQuery plugin is included in the project. Note that in order to support IE 6/7/8, jQuery 1.x versions need to be used.

* Copy fusioncharts.js and fusioncharts.jqueryplugin.js from the FusionCharts Download Package > js folder in your project
* Add references to the required JavaScript files in your code:
```
<script type="text/javascript" src="fusioncharts.js"></script>
<script type="text/javascript" src="fusioncharts.jqueryplugin.js"></script>
```

This completes the setup and you are now ready to begin using the FusionCharts jQuery plugin.


```
<!DOCTYPE html>
<html>
<head>
    <title>jQuery FusionCharts Plugin Sample</title>
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.js"></script>
    <script type="text/javascript" src="https://unpkg.com/fusioncharts@3.12.0/fusioncharts.js"></script>
    <script type="text/javascript" src="https://unpkg.com/fusioncharts@3.12.0/fusioncharts.charts.js"></script>
    <script type="text/javascript" src="https://unpkg.com/fusioncharts@3.12.0/themes/fusioncharts.theme.fint.js"></script>
    <script type="text/javascript" src="https://rawgit.com/fusioncharts/fusioncharts-jquery-plugin/feature/node-commonjs-support/package/fusioncharts-jquery-plugin.js"></script>
</head>
<body>

    <div id="chart-container">FusionCharts will render here...</div>
    
    <script type="text/javascript">
        jQuery('document').ready(function () {
            $("#chart-container").insertFusionCharts({
                type: "column2d",
                width: "500",
                height: "300",
                dataFormat: "json",
                dataSource: {
                    "chart": {
                        "caption": "Yearly revenue",
                        "xAxisName": "Year",
                        "yAxisName": "Revenues",
                        "numberPrefix": "$",
                        "theme": "fint"
                    },
                    "data": [{
                        "label": "2015",
                        "value": "5548900"
                    }, {
                        "label": "2016",
                        "value": "8100000"
                    }, {
                        "label": "2017",
                        "value": "7200000"
                    }]
                }
            });
        });     
    </script>
</body>
</html>
```


In addition to using all the existing features, the jQuery plugin lets you do the following:

* Render jQuery charts that work across PCs (including IE6/7/8), Macs, iPads, iPhones, and Android devices seamlessly

* Update chart type, data, and individual cosmetic properties at run-time

* Insert, prepend, and append multiple charts in an existing chart container

* Customize the look and feel of all elements on the chart

* Plot charts from data contained in HTML tables

## Rendering charts using jQuery

For rendering new charts, you can use the following jQuery methods:

* `insertFusionCharts`
* `appendFusionCharts`
* `prependFusionCharts`

### insertFusionCharts Method:

Renders charts inside HTML elements. The HTML elements have to be selected using jQuery selector. In case, multiple HTML elements are selected using the jQuery selector, a chart will be rendered inside each selected HTML element. All existing elements inside the selected elements will be replaced by the rendered charts. This method returns the jQuery selected element to allow chaining with other jQuery methods. 

An object of chart configurations (set of key, value pairs) can be passed as parameter. Click here to view complete list of chart configurations.

```
$("#chart-container").insertFusionCharts({
    type: 'hlineargauge',
    width: '400',
    height: '150',
    dataFormat: 'json',
    dataSource: {
        "chart": {
            ...
        },
        "colorRange": {
            "color": [
                ...
            ]
        },
        "pointers": {
            "pointer": [
                ...
            ]
        }
    }
});
```

### appendFusionCharts Method:

Renders charts at the end of selected HTML elements. The HTML elements need to be selected using jQuery selector. In case multiple HTML elements are selected, chart will be rendered inside each selected HTML element. All existing elements inside the selected elements will be preserved. The method returns the original jQuery selection to allow chaining of other jQuery methods. 

An object of chart configurations (set of key, value pairs) can be passed as parameter. Click here to view complete list of chart configurations.

```
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

In the above example, the horizontal linear gauge has been rendered using the insertFusionCharts method. The constructor object is passed as an argument to the insertFusionCharts method

In the above code snippet, the cloneFusionCharts method is used to create a column-chart clone of the existing pie-chart.This method finds all the charts in the selected element and returns of list of their clones.

The cloneFusionCharts method accepts two arguments:

* An anonymous callback function: An array of cloned charts (in this Array) is passed to this function for further processing

* A configuration object: An object containing chart configurations which are applied to each cloned chart

### prependFuionCharts Method

Renders and inserts charts at the beginning of selected HTML elements. The HTML elements need to be selected using jQuery selector. In case multiple HTML elements are selected, chart will be rendered inside each selected HTML element. All existing elements inside the selected elements will be preserved. The method returns the original jQuery selection to allow chaining of other jQuery methods. 

An object of chart configurations (set of key, value pairs) can be passed as parameter. Click here to view complete list of chart configurations.

```
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

Similar to the appendFusionCharts method example, the cloneFusionCharts method is used here to clone the existing pie chart, which is then prepended as a column chart.

There! You have now seen the various methods you can use to render charts using the jQuery plugin.

More detailed information and documentation can be found [here](http://docs.fusioncharts.com/tutorial-using-with-javascript-libraries-jquery-introduction.html).

## Demo & Examples

Live demo: [fusioncharts.github.io/fusioncharts-jquery-plugin](http://fusioncharts.github.io/fusioncharts-jquery-plugin/)

Run the examples locally:

```
npm install
npm start
```

And then open [`localhost:8080`](http://localhost:8080) in the browser.

