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

#### Using require syntax:

```
var $ = require('jquery');
var FusionCharts = require('fusioncharts');
// Load charts module to render Column2D chart
var Charts = require('fusioncharts/fusioncharts.charts');
require('jquery-fusioncharts');

$('document').ready(function () {
    // Once the window with a document is ready, execute the Chart module
    // and pass FusionCharts as a dependency
    Charts(FusionCharts);

    // Render the chart using `insertFusionCharts` method
    $("#chart-container").insertFusionCharts({
        type: "column2d",
        width: "600",
        height: "400",
        dataFormat: "json",
        dataSource: {
            "chart": {
                "caption": "Countries With Most Oil Reserves [2017-18]",
                "subCaption": "In MMbbl = One Million barrels",
                "xAxisName": "Country",
                "yAxisName": "Reserves (MMbbl)",
                "numberSuffix": "K"
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
        }
    });
});
```

#### Using import syntax:

```
import $ from 'jquery';
import FusionCharts from 'fusioncharts';
// Load charts module to render Column2D chart
import Charts from 'fusioncharts/fusioncharts.charts';
import 'jquery-fusioncharts';

$('document').ready(function () {
    // Once the window with a document is ready, execute the Chart module
    // and pass FusionCharts as a dependency
    Charts(FusionCharts);

    // Render the chart using `insertFusionCharts` method
    $("#chart-container").insertFusionCharts({
        type: "column2d",
        width: "600",
        height: "400",
        dataFormat: "json",
        dataSource: {
            "chart": {
                "caption": "Countries With Most Oil Reserves [2017-18]",
                "subCaption": "In MMbbl = One Million barrels",
                "xAxisName": "Country",
                "yAxisName": "Reserves (MMbbl)",
                "numberSuffix": "K"
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
        }
    });
});
```



You can also use the standalone build by including `package/jquery-fusioncharts.js` in your page. If you use this, make sure you have included jQuery, FusionCharts and FusionCharts charts module.

## Setting up the FusionCharts jQuery Plugin

To set up the FusionCharts jQuery plugin, follow the steps given below:

#### Step 1: Include jquery.min.js to enable jQuery in your project:
```
<script type="text/javascript" src="path/to/local/jquery.min.js"></script>
```
jQuery needs to be imported before the FusionCharts jQuery plugin is included in the project. Note that in order to support IE 6/7/8, jQuery 1.x versions need to be used.

#### Step 2: Include the FusionCharts package
* Copy fusioncharts.js from the FusionCharts Download Package > js folder in your project
* Add reference to the file in your code
```
<script type="text/javascript" src="path/to/local/fusioncharts.js"></script>
```

#### Step 3: Include the jquery-fusioncharts module
* Copy fusioncharts.jqueryplugin.js from the FusionCharts Download Package > js folder in your project
* Add reference to the file in your code
```
<script type="text/javascript" src="path/to/local/fusioncharts.theme.fusion.js"></script>
```

#### Step 4 (optional): Include the theme file.
This step is optional, the chart will render with the default theme even if the theme file is not included.
```
<script type="text/javascript" src="path/to/local/fusioncharts.jqueryplugin.js"></script>
```

This completes the setup and you are now ready to begin using the FusionCharts jQuery plugin.

In addition to using all the existing features, the jQuery plugin lets you do the following:

* Render jQuery charts that work across PCs (including IE6/7/8), Macs, iPads, iPhones, and Android devices seamlessly
* Update chart type, data, and individual cosmetic properties at run-time
* Insert, prepend, and append multiple charts in an existing chart container
* Customize the look and feel of all elements on the chart
* Plot charts from data contained in HTML tables


```
<!DOCTYPE html>
<html>
    <head>
        <title>jQuery FusionCharts Plugin Sample</title>
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/fusioncharts/fusioncharts.js"></script>
        <script type="text/javascript" src="https://unpkg.com/fusioncharts/themes/fusioncharts.theme.fusion.js"></script>
        <script type="text/javascript" src="https://rawgit.com/fusioncharts/fusioncharts-jquery-plugin/develop/dist/fusioncharts.jqueryplugin.min.js"></script>
    </head>
    <body>

        <div id="chart-container">FusionCharts will render here...</div>

        <script type="text/javascript">
            $('document').ready(function () {
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
                            "theme": "fusion"
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


## Working with Events

To attach events to FusionCharts element, you can use bind or on with jQuery selectors.

The event name string should be of the pattern 'fusioncharts[event name in lowercase]', eg. to attach an event listener to dataplotRollOver, the string will be 'fusionchartsdataplotrollover'.

```javascript
$("#chart-container").on('fusioncharts[event name in lowercase]', function(eventObj, dataObj) {
    [code goes here]
});
```

###### Consider the example below that tracks hover events on a data plot.

```javascript
<!DOCTYPE html>
<html>
    <head>
        <title>jQuery FusionCharts Plugin Sample</title>
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/fusioncharts/fusioncharts.js"></script>
        <script type="text/javascript" src="https://unpkg.com/fusioncharts/themes/fusioncharts.theme.fusion.js"></script>
        <script type="text/javascript" src="https://rawgit.com/fusioncharts/fusioncharts-jquery-plugin/develop/dist/fusioncharts.jqueryplugin.min.js"></script>
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
                            {
                                "label": "Venezuela",
                                "value": "290"
                            },
                            {
                                "label": "Saudi",
                                "value": "260"
                            },
                            {
                                "label": "Canada",
                                "value": "180"
                            },
                            {
                                "label": "Iran",
                                "value": "140"
                            },
                            {
                                "label": "Russia",
                                "value": "115"
                            },
                            {
                                "label": "UAE",
                                "value": "100"
                            },
                            {
                                "label": "US",
                                "value": "30"
                            },
                            {
                                "label": "China",
                                "value": "30"
                            }
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

To call APIs we will need the chart object. To get the chart object, use the method getFusionCharts. It returns an array of all chart objects inside the given selector. Once you have the chart object, you can use any FusionCharts API on it.

```javascript
var chartObjects = $("#chart-container").getFusionCharts();
chartObjects.forEach(function (chart) {
    chart.[API Call]
});
```

###### Consider the example below that converts a Column 2D chart to a Pie 2D chart after 5 seconds.

```javascript
<!DOCTYPE html>
<html>
    <head>
        <title>jQuery FusionCharts Plugin Sample</title>
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/fusioncharts/fusioncharts.js"></script>
        <script type="text/javascript" src="https://unpkg.com/fusioncharts/themes/fusioncharts.theme.fusion.js"></script>
        <script type="text/javascript" src="https://rawgit.com/fusioncharts/fusioncharts-jquery-plugin/develop/dist/fusioncharts.jqueryplugin.min.js"></script>
    </head>
    <body>

        <div id="chart-container">FusionCharts will render here...</div>

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
                            {
                                "label": "Venezuela",
                                "value": "290"
                            },
                            {
                                "label": "Saudi",
                                "value": "260"
                            },
                            {
                                "label": "Canada",
                                "value": "180"
                            },
                            {
                                "label": "Iran",
                                "value": "140"
                            },
                            {
                                "label": "Russia",
                                "value": "115"
                            },
                            {
                                "label": "UAE",
                                "value": "100"
                            },
                            {
                                "label": "US",
                                "value": "30"
                            },
                            {
                                "label": "China",
                                "value": "30"
                            }
                        ]
                    }
                });

                setTimeout(() => {
                    var chartObjects = $("#chart-container").getFusionCharts();
                    chartObjects.forEach(function (chart) {
                        chart.chartType('pie2d');
                    });
                }, 5000);
            });
        </script>
    </body>
</html>
```

## Demo & Examples

Live demo: [fusioncharts.github.io/fusioncharts-jquery-plugin](http://fusioncharts.github.io/fusioncharts-jquery-plugin/)

Run the examples locally:

```
npm install
npm start
```

And then open [`localhost:8080`](http://localhost:8080) in the browser.
