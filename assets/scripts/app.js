var chartJSON = {
  chart: {
    caption: 'Top Global Oil Reserves',
    subCaption: '[2015-16]',
    xAxisName: 'MMbbl= One Million barrels',
    yAxisName: 'Reserves (MMbbl)',
    numberSuffix: 'K',
    showValues: '0',
    theme: 'fusion'
  },
  data: [
    {
      label: 'Venezuela',
      value: '290'
    },
    {
      label: 'Saudi',
      value: '260'
    },
    {
      label: 'Canada',
      value: '180'
    },
    {
      label: 'Iran',
      value: '140'
    },
    {
      label: 'Russia',
      value: '115'
    },
    {
      label: 'UAE',
      value: '100'
    },
    {
      label: 'US',
      value: '30'
    },
    {
      label: 'China',
      value: '30'
    }
  ]
};

var jsonCode = CodeMirror(document.getElementById('chartCode'), {
  tabSize: '4',
  smartIndent: true,
  lineNumbers: true,
  readOnly: true,
  theme: 'dracula',
  mode: 'javascript'
});

var step1command1 = CodeMirror(document.getElementById('c1'), {
  tabSize: '4',
  smartIndent: true,
  lineNumbers: true,
  readOnly: true,
  theme: 'dracula',
  mode: 'xml',
  viewportMargin: Infinity
});

step1command1.setValue(
  '<script type="text/javascript" src="path/to/local/jquery.min.js"></script>'
);

var step1command2 = CodeMirror(document.getElementById('c2'), {
  tabSize: '4',
  smartIndent: true,
  lineNumbers: true,
  readOnly: true,
  theme: 'dracula',
  mode: 'xml',
  viewportMargin: Infinity
});

step1command2.setValue(
  '<script type="text/javascript" src="path/to/local/fusioncharts.js"></script>'
);

var step2command1 = CodeMirror(document.getElementById('c3'), {
  tabSize: '4',
  smartIndent: true,
  lineNumbers: true,
  readOnly: true,
  theme: 'dracula',
  mode: 'xml',
  viewportMargin: Infinity
});

step2command1.setValue(
  '<script type="text/javascript" src="path/to/local/fusioncharts.jqueryplugin.js"></script>'
);

var step2command2 = CodeMirror(document.getElementById('c4'), {
  tabSize: '4',
  smartIndent: true,
  lineNumbers: true,
  readOnly: true,
  theme: 'dracula',
  mode: 'javascript',
  viewportMargin: Infinity
});

step2command2.setValue(
  '<script type="text/javascript" src="path/to/local/fusioncharts.theme.fusion.js"></script>'
);

var step3command1 = CodeMirror(document.getElementById('c5'), {
  tabSize: '4',
  smartIndent: true,
  lineNumbers: true,
  readOnly: true,
  theme: 'dracula',
  mode: 'javascript'
});
var c5Code =
  '$(\'#chart-container\').insertFusionCharts({\n  type: \'hlineargauge\',\n  width: \'400\',\n  height: \'150\',\n  dataFormat: \'json\',\n  dataSource: {\n    "chart": {\n      ...\n    },\n    "colorRange": {\n      "color": [\n        ...\n      ]\n    },\n    "pointers": {\n      "pointer": [\n        ...\n      ]\n    }\n  }\n});';
step3command1.setValue(c5Code);

var step3command2 = CodeMirror(document.getElementById('c6'), {
  tabSize: '4',
  smartIndent: true,
  lineNumbers: true,
  readOnly: true,
  theme: 'dracula',
  mode: 'javascript'
});
var c6Code =
  "$('#chart-container').insertFusionCharts({\n  type: 'pie2d',\n  width: '450',\n  height: '300',\n  dataFormat: 'json',\n  dataSource: {\n    \"chart\": {\n    ...\n  },\n  \"data\": [...]\n  }\n});\n\n$('#btnClone').click(function() {\n  // Clone the chart to create a column chart representation of the same data\n  $('#chart-container').cloneFusionCharts(function() {\n    // Append the cloned chart to the same chart container\n    $('#chart-container').appendFusionCharts(this[0]);\n  }, {\n    'id': 'chart-clone',\n    'type': 'column2d'\n  });\n});";
step3command2.setValue(c6Code);

var step3command3 = CodeMirror(document.getElementById('c7'), {
  tabSize: '4',
  smartIndent: true,
  lineNumbers: true,
  readOnly: true,
  theme: 'dracula',
  mode: 'javascript'
});
var c7Code =
  "$('#chart-container').insertFusionCharts({\n  type: 'pie2d',\n  width: '450',\n  height: '300',\n  dataFormat: 'json',\n  dataSource: {\n    \"chart\": {\n        ...\n    },\n    \"data\": [\n      ...\n    ]\n  }\n});\n\n$('#btnClone').click(function() {\n  // Clone the chart to create a column chart representation of the same data\n  $('#chart-container').cloneFusionCharts(function() {\n    // Prepend the cloned chart to the same chart container\n    $('#chart-container').prependFusionCharts(this[0]);\n  }, {\n    'id': 'chart-clone',\n    'type': 'column2d'\n  });\n});";
step3command3.setValue(c7Code);

var ftSampleCode = CodeMirror(document.getElementById('c8'), {
  tabSize: '4',
  smartIndent: true,
  lineNumbers: true,
  readOnly: true,
  theme: 'dracula',
  mode: 'javascript'
});
var c8Code =
  "/*\n Assuming you have installed fusioncharts using npm \n Following code snippet can be used to render chart.\n*/\nvar FusionCharts = require('fusioncharts');\nvar TimeSeries = require('fusioncharts/fusioncharts.timeseries');\nvar $ = require('jquery');\nvar jQueryFusionCharts = require('jquery-fusioncharts');\n\nTimeSeries(FusionCharts); // Resolve Charts as dependency for FusionCharts.\njQueryFusionCharts(FusionCharts); // Resolve FusionCharts as dependency for jqueryFusionCharts.\n\nvar jsonify = res => res.json();\nvar dataFetch = fetch(\n  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'\n).then(jsonify);\nvar schemaFetch = fetch(\n  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'\n).then(jsonify);\n\nPromise.all([dataFetch, schemaFetch]).then(res => {\n  const data = res[0];\n  const schema = res[1];\n  // First we are creating a DataStore\n  const fusionDataStore = new FusionCharts.DataStore();\n  // After that we are creating a DataTable by passing our data and schema as arguments\n  const fusionTable = fusionDataStore.createDataTable(data, schema);\n\n  $('document').ready(function() {\n    $('#chart-container').insertFusionCharts({\n      type: 'timeseries',\n      width: '600',\n      height: '400',\n      dataFormat: 'json',\n      dataSource: {\n        data: fusionTable,\n        caption: {\n          text: 'Sales Analysis'\n        },\n        subcaption: {\n          text: 'Grocery'\n        },\n        yAxis: [\n          {\n            plot: {\n              value: 'Grocery Sales Value',\n              type: 'line'\n            },\n            format: {\n              prefix: '$'\n            },\n            title: 'Sale Value'\n          }\n        ]\n      }\n    });\n  });\n});\n\n/* NOTE:\n * In case you downloaded fusioncharts in zipped format\n * var FusionCharts = require('/path/to/fusioncharts/fusioncharts.js');\n * var TimeSeries = require('/path/to/fusioncharts/fusioncharts.timeseries.js');\n */\n";
ftSampleCode.setValue(c8Code);

var modal = document.getElementById('myModal');
var btn = document.getElementById('mobileChart-selector');

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = 'block';
};

// When the user clicks anywhere outside of the modal, close it
modal.onclick = function(event) {
  // if (event.target == modal) {
  modal.style.display = 'none';
  // }
};

// Samples
// Change the code snippet to default
jsonCode.setValue(sampleConfig['simple-chart']['code']);
document.getElementById('chart-container').src =
  window.location.href + 'samples/simple-chart/';
document.getElementById('chart-container').classList.add('simple-chart');

var tabMode = {
  code: 'javascript',
  html: 'xml',
  data: 'javascript',
  schema: 'javascript'
};

function addRemoveSchemaBtn() {
  var activeTabID = document
    .querySelector('.nav-list .nav-item.selected')
    .getAttribute('data-id');

  var schemaBtn = document.getElementsByClassName('schema-btn');
  if (sampleConfig[activeTabID].schema) {
    schemaBtn[0].classList.remove('hide');
  } else {
    schemaBtn[0].classList.add('hide');
  }
}

function setActiveToCode(activeTabID) {
  jsonCode.setValue(sampleConfig[activeTabID]['code']);
  document.getElementById('chart-container').src =
    window.location.href + 'samples/' + activeTabID + '/';
  document.getElementById('chart-container').classList.add(activeTabID);
}

Array.from(document.querySelectorAll('.nav-list .nav-item')).forEach(item => {
  item.onclick = function(event) {
    // Get the tab ID and Chart ID
    var tabID = event.currentTarget.getAttribute('data-id');

    // Get the active button
    var activeBtnID = document
      .querySelector('.code-nav-btns button.selected')
      .getAttribute('data-id');

    if (tabID && activeBtnID) {
      // Switch the selected tab
      Array.from(
        document.querySelectorAll('.nav-list .nav-item.selected')
      ).forEach(item => {
        item.classList.remove('selected');
      });
      event.currentTarget.classList.add('selected');

      // Change the sample iframe src
      document.getElementById('chart-container').src =
        window.location.href + 'samples/' + tabID + '/';
      document.getElementById('chart-container').className = '';
      document.getElementById('chart-container').classList.add(tabID);

      // Change the code snippet js/html/data
      if (sampleConfig[tabID][activeBtnID]) {
        jsonCode.setValue(sampleConfig[tabID][activeBtnID]);
      } else {
        setActiveToCode(tabID);
      }

      if (tabID === 'fetch-data-from-xml-url' && activeBtnID === 'data') {
        jsonCode.setOption('mode', 'xml');
      } else {
        jsonCode.setOption('mode', tabMode[activeBtnID]);
      }

      // Set the mobile select active title
      document.querySelector('#mobileChart-selector .selector').innerText =
        event.currentTarget.innerText;

      addRemoveSchemaBtn();
    }
  };
});

Array.from(document.querySelectorAll('.code-nav-btns button')).forEach(item => {
  item.onclick = function(event) {
    // Get the button ID
    var btnID = event.currentTarget.getAttribute('data-id');

    // Get the active tab
    var activeTabID = document
      .querySelector('.nav-list .nav-item.selected')
      .getAttribute('data-id');

    if (btnID && activeTabID) {
      // Switch the selected button
      document
        .querySelector('.code-nav-btns button.selected')
        .classList.remove('selected');
      event.currentTarget.classList.add('selected');
      // Change the code snippet js/html/data
      if (sampleConfig[activeTabID][btnID]) {
        jsonCode.setValue(sampleConfig[activeTabID][btnID]);
      } else {
        setActiveToCode(activeTabID);
      }

      if (activeTabID === 'fetch-data-from-xml-url' && btnID === 'data') {
        jsonCode.setOption('mode', 'xml');
      } else {
        jsonCode.setOption('mode', tabMode[btnID]);
      }
    }
  };
});
