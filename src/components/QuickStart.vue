<template>
	<div>
        <h2 id="setting-up-the-fusioncharts-jquery-plugin">Setting up the FusionCharts jQuery Plugin</h2>
        <p>To set up the FusionCharts jQuery plugin, follow the steps given below:</p>
        <ul>
            <li>Include jquery.min.js to enable jQuery in your project:</li>
        </ul>
        <pre class="qs-code language-javascript"><code class="language-javascript">&lt;script type=&quot;text/javascript&quot; src=&quot;jquery.min.js&quot;&gt;&lt;/script&gt;</code></pre>

        <p>jQuery needs to be imported before the FusionCharts jQuery plugin is included in the project. Note that in order to support IE 6/7/8, jQuery 1.x versions need to be used.</p>
        <ul>
            <li>Copy fusioncharts.js and fusioncharts.jqueryplugin.js from the FusionCharts Download Package &gt; js folder in your project</li>
            <li>Add references to the required JavaScript files in your code:
            <pre class="qs-code language-javascript"><code class="language-javascript">&lt;script type=&quot;text/javascript&quot; src=&quot;fusioncharts.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;fusioncharts.jqueryplugin.js&quot;&gt;&lt;/script&gt;</code></pre>
            </li>
        </ul>
        <p>This completes the setup and you are now ready to begin using the FusionCharts jQuery plugin.</p>
        <p>In addition to using all the existing features, the jQuery plugin lets you do the following:</p>
        <ul>
            <li>
                <p>Render jQuery charts that work across PCs (including IE6/7/8), Macs, iPads, iPhones, and Android devices seamlessly</p>
            </li>
            <li>
                <p>Update chart type, data, and individual cosmetic properties at run-time</p>
            </li>
            <li>
                <p>Insert, prepend, and append multiple charts in an existing chart container</p>
            </li>
            <li>
                <p>Customize the look and feel of all elements on the chart</p>
            </li>
            <li>
                <p>Plot charts from data contained in HTML tables</p>
            </li>
        </ul>
        <h2 id="rendering-charts-using-jquery">Rendering charts using jQuery</h2>
        <p>For rendering new charts, you can use the following jQuery methods:</p>
        <ul>
            <li>
                <code>insertFusionCharts</code>
            </li>
            <li>
                <code>appendFusionCharts</code>
            </li>
            <li>
                <code>prependFusionCharts</code>
            </li>
        </ul>

        <h3 id="insertfusioncharts-method-">insertFusionCharts Method:</h3>
        <p>Renders charts inside HTML elements. The HTML elements have to be selected using jQuery selector. In case, multiple HTML
        elements are selected using the jQuery selector, a chart will be rendered inside each selected HTML element. All existing
        elements inside the selected elements will be replaced by the rendered charts. This method returns the jQuery selected
        element to allow chaining with other jQuery methods. </p>
        <p>An object of chart configurations (set of key, value pairs) can be passed as parameter. Click here to view complete list
        of chart configurations.</p>
        <pre class="qs-code language-javascript"><code class="language-javascript">$(&quot;#chart-container&quot;).insertFusionCharts({
    type: &#39;hlineargauge&#39;,
    width: &#39;400&#39;,
    height: &#39;150&#39;,
    dataFormat: &#39;json&#39;,
    dataSource: {
        &quot;chart&quot;: {
            ...
        },
        &quot;colorRange&quot;: {
            &quot;color&quot;: [
                ...
            ]
        },
        &quot;pointers&quot;: {
            &quot;pointer&quot;: [
                ...
            ]
        }
    }
});
        </code></pre>


        <h3 id="appendfusioncharts-method-">appendFusionCharts Method:</h3>
        <p>Renders charts at the end of selected HTML elements. The HTML elements need to be selected using jQuery selector. In case
        multiple HTML elements are selected, chart will be rendered inside each selected HTML element. All existing elements inside
        the selected elements will be preserved. The method returns the original jQuery selection to allow chaining of other jQuery
        methods. </p>
        <p>An object of chart configurations (set of key, value pairs) can be passed as parameter. Click here to view complete list
        of chart configurations.</p>


        <pre class="qs-code language-javascript"><code class="language-javascript">$(&#39;#chart-container&#39;).insertFusionCharts({
    type: &#39;pie2d&#39;,
    width: &#39;450&#39;,
    height: &#39;300&#39;,
    dataFormat: &#39;json&#39;,
    dataSource: {
        &quot;chart&quot;: {
        ...
    },
    &quot;data&quot;: [...]
    }
});

$(&#39;#btnClone&#39;).click(function() {
    // Clone the chart to create a column chart representation of the same data
    $(&#39;#chart-container&#39;).cloneFusionCharts(function() {
        // Append the cloned chart to the same chart container
        $(&#39;#chart-container&#39;).appendFusionCharts(this[0]);
    }, {
        &#39;id&#39;: &#39;chart-clone&#39;,
        &#39;type&#39;: &#39;column2d&#39;
    });
});
</code></pre>


        <p>In the above example, the horizontal linear gauge has been rendered using the insertFusionCharts method. The constructor
        object is passed as an argument to the insertFusionCharts method</p>
        <p>In the above code snippet, the cloneFusionCharts method is used to create a column-chart clone of the existing pie-chart.This
        method finds all the charts in the selected element and returns of list of their clones.</p>
        <p>The cloneFusionCharts method accepts two arguments:</p>
        <ul>
        <li>
        <p>An anonymous callback function: An array of cloned charts (in this Array) is passed to this function for further processing</p>
        </li>
        <li>
        <p>A configuration object: An object containing chart configurations which are applied to each cloned chart</p>
        </li>
        </ul>
        <h3 id="prependfuioncharts-method">prependFuionCharts Method</h3>
        <p>Renders and inserts charts at the beginning of selected HTML elements. The HTML elements need to be selected using jQuery
        selector. In case multiple HTML elements are selected, chart will be rendered inside each selected HTML element. All existing
        elements inside the selected elements will be preserved. The method returns the original jQuery selection to allow chaining
        of other jQuery methods. </p>
        <p>An object of chart configurations (set of key, value pairs) can be passed as parameter. Click here to view complete list
        of chart configurations.</p>


        <pre class="qs-code language-javascript"><code class="language-javascript">$(&#39;#chart-container&#39;).insertFusionCharts({
    type: &#39;pie2d&#39;,
    width: &#39;450&#39;,
    height: &#39;300&#39;,
    dataFormat: &#39;json&#39;,
    dataSource: {
    &quot;chart&quot;: {
        ...
    },
    &quot;data&quot;: [
            ...
            ]
    }
});

$(&#39;#btnClone&#39;).click(function() {
    // Clone the chart to create a column chart representation of the same data
    $(&#39;#chart-container&#39;).cloneFusionCharts(function() {
        // Prepend the cloned chart to the same chart container
        $(&#39;#chart-container&#39;).prependFusionCharts(this[0]);
    }, {
        &#39;id&#39;: &#39;chart-clone&#39;,
        &#39;type&#39;: &#39;column2d&#39;
    });
});
</code></pre>

        <p>Similar to the appendFusionCharts method example, the cloneFusionCharts method is used here to clone the existing pie chart,
        which is then prepended as a column chart.</p>
        <p>There! You have now seen the various methods you can use to render charts using the jQuery plugin.</p>
        <p>More detailed information and documentation can be found
        <a href="http://docs.fusioncharts.com/tutorial-using-with-javascript-libraries-jquery-introduction.html">here</a>.</p>


	</div>
</template>

<script>
  export default {
    name: 'QuickStart'
  }

</script>
