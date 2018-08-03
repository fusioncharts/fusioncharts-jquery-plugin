var chartJSON = {
    "chart": {
        "caption": "Top Global Oil Reserves",
        "subCaption": "[2015-16]",
        "xAxisName": "MMbbl= One Million barrels",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "K",
        "showValues": "0",
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
};

var jsonCode = CodeMirror(document.getElementById("chartCode"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "javascript"
});

var step1command1 = CodeMirror(document.getElementById("c1"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "xml",
    viewportMargin: Infinity
});

step1command1.setValue("<script type=\"text/javascript\" src=\"path/to/local/jquery.min.js\"></script>");

var step1command2 = CodeMirror(document.getElementById("c2"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "xml",
    viewportMargin: Infinity
});

step1command2.setValue("<script type=\"text/javascript\" src=\"path/to/local/fusioncharts.js\"></script>");

var step2command1 = CodeMirror(document.getElementById("c3"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "xml",
    viewportMargin: Infinity
});

step2command1.setValue("<script type=\"text/javascript\" src=\"path/to/local/fusioncharts.jqueryplugin.js\"></script>");

var step2command2 = CodeMirror(document.getElementById("c4"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "javascript",
    viewportMargin: Infinity
});

step2command2.setValue("<script type=\"text/javascript\" src=\"path/to/local/fusioncharts.theme.fusion.js\"></script>");

var step3command1 = CodeMirror(document.getElementById("c5"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "javascript"
});
var c5Code = "$('#chart-container').insertFusionCharts({\n  type: 'hlineargauge',\n  width: '400',\n  height: '150',\n  dataFormat: 'json',\n  dataSource: {\n    \"chart\": {\n      ...\n    },\n    \"colorRange\": {\n      \"color\": [\n        ...\n      ]\n    },\n    \"pointers\": {\n      \"pointer\": [\n        ...\n      ]\n    }\n  }\n});";
step3command1.setValue(c5Code);

var step3command2 = CodeMirror(document.getElementById("c6"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "javascript"
});
var c6Code = "$('#chart-container').insertFusionCharts({\n  type: 'pie2d',\n  width: '450',\n  height: '300',\n  dataFormat: 'json',\n  dataSource: {\n    \"chart\": {\n    ...\n  },\n  \"data\": [...]\n  }\n});\n\n$('#btnClone').click(function() {\n  // Clone the chart to create a column chart representation of the same data\n  $('#chart-container').cloneFusionCharts(function() {\n    // Append the cloned chart to the same chart container\n    $('#chart-container').appendFusionCharts(this[0]);\n  }, {\n    'id': 'chart-clone',\n    'type': 'column2d'\n  });\n});";
step3command2.setValue(c6Code);

var step3command3 = CodeMirror(document.getElementById("c7"), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: "dracula",
    mode: "javascript"
});
var c7Code = "$('#chart-container').insertFusionCharts({\n  type: 'pie2d',\n  width: '450',\n  height: '300',\n  dataFormat: 'json',\n  dataSource: {\n    \"chart\": {\n        ...\n    },\n    \"data\": [\n      ...\n    ]\n  }\n});\n\n$('#btnClone').click(function() {\n  // Clone the chart to create a column chart representation of the same data\n  $('#chart-container').cloneFusionCharts(function() {\n    // Prepend the cloned chart to the same chart container\n    $('#chart-container').prependFusionCharts(this[0]);\n  }, {\n    'id': 'chart-clone',\n    'type': 'column2d'\n  });\n});";
step3command3.setValue(c7Code);

var modal = document.getElementById("myModal");
var btn = document.getElementById("mobileChart-selector");

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Samples
// Change the code snippet to default
jsonCode.setValue(sampleConfig["simple-chart"]["code"]);
document.getElementById("chart-container").src = window.location.href + "samples/simple-chart/";
document.getElementById("chart-container").classList.add("simple-chart");

var tabMode = {
  "code": "javascript",
  "html": "xml",
  "data": "javascript"
};

Array.from(document.querySelectorAll(".side-nav .nav-item")).forEach(
  item => {
    item.onclick = function(event) {
      // Get the tab ID and Chart ID
      var tabID = (event.currentTarget.getAttribute("data-id"));

      // Get the active button
      var activeBtnID = document.querySelector(".code-nav-btns button.selected").getAttribute("data-id");

      if (tabID && activeBtnID) {
        // Switch the selected tab
        document.querySelector(".side-nav .nav-item.selected").classList.remove("selected");
        event.currentTarget.classList.add("selected");

        // Change the sample iframe src
        document.getElementById("chart-container").src = window.location.href + "/samples/" + tabID + "/";
        document.getElementById("chart-container").className = '';
        document.getElementById("chart-container").classList.add(tabID);

        // Change the code snippet js/html/data
        jsonCode.setValue(sampleConfig[tabID][activeBtnID]);
        if (tabID === "fetch-data-from-xml-url" && activeBtnID === "data") {
          jsonCode.setOption("mode", "xml");
        } else {
          jsonCode.setOption("mode", tabMode[activeBtnID]);
        }
      }
    }
  }
)
Array.from(document.querySelectorAll(".code-nav-btns button")).forEach(
  item => {
    item.onclick = function(event) {
      // Get the button ID
      var btnID = (event.currentTarget.getAttribute("data-id"));

      // Get the active tab
      var activeTabID = document.querySelector(".side-nav .nav-item.selected").getAttribute("data-id");

      if (btnID && activeTabID) {
        // Switch the selected button
        document.querySelector(".code-nav-btns button.selected").classList.remove("selected");
        event.currentTarget.classList.add("selected");

        // Change the code snippet js/html/data
        jsonCode.setValue(sampleConfig[activeTabID][btnID]);
        if (activeTabID === "fetch-data-from-xml-url" && btnID === "data") {
          jsonCode.setOption("mode", "xml");
        } else {
          jsonCode.setOption("mode", tabMode[btnID]);
        }
      }
    }
  }
)
