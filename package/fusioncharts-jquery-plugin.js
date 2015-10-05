/**!
 * @license FusionCharts JavaScript Library jQuery Plugin v1.0.4
 * Copyright FusionCharts Technologies LLP
 * License Information at <http://www.fusioncharts.com/license>
 *
 * @author FusionCharts Technologies LLP
 */
/**
 * HTMLTable Data Handler
 * This module maps chart type alias with particular FusionCharts object.
 * @private
 *
 * @module fusioncharts.transcoder.htmltable
 */
FusionCharts.register('module', ['private', 'HTMLTableDataHandler', function () {

    var global = this,
        win = global.window,
        doc = win.document,
        /**
         *  Used to remove all textNodes in an array of nodes. Textnodes get created
         *  inadvertently, when the table HTML has newline and space. Returns an
         *  array of nodes that is not an HTMLCollection and has only the non-text
         *  nodes in it.
         *
         *  @param {array} nodeArr Contains the array of nodes that have to be
         *  sanitized.
         */
        sanitizeNodesArray = function (nodeArr) {
            var l, i, sanitizedArr = [];
            for (i = 0, l = nodeArr.length; i < l; i += 1) {
                // if nodeType != 3 then the node is not a text node.
                if (nodeArr[i].nodeType !== 3) {
                    sanitizedArr.push(nodeArr[i]);
                }
            }
            return sanitizedArr;
        },


        /**
         * Used to merge two JSON objects. The copy is a deep copy and not a
         * reference copy.
         *
         * @param: {object} srcJSON, the source json.
         *
         * @param: {object} targetJSON, that json that needs to be merged with the
         * source json.
         *
         */
        mergeJSON = function (srcJSON, targetJSON) {
            var i,
                len,
                item;

            if (targetJSON instanceof Array) {
                for (i = 0, len = targetJSON.length; i < len; i++) {
                    if (targetJSON[i] instanceof Array) {
                        if (srcJSON[i] === undefined) {
                            srcJSON[i] = [];
                        }
                        mergeJSON(srcJSON[i], targetJSON[i]);
                    } else if (typeof targetJSON[i] === 'object') {
                        if (typeof srcJSON[i] === 'undefined') {
                            srcJSON[i] = {};
                        }
                        mergeJSON(srcJSON[i], targetJSON[i]);
                    } else {
                        srcJSON[i] = targetJSON[i];
                    }
                }
            } else if (typeof targetJSON === 'object') {
                for (item in targetJSON) {
                    if (typeof srcJSON[item] === 'undefined') {
                        if (targetJSON[item] instanceof Array) {
                            srcJSON[item] = [];
                            mergeJSON(srcJSON[item], targetJSON[item]);
                        } else if (typeof srcJSON[item] === 'object') {
                            srcJSON[i] = {};
                            mergeJSON(srcJSON[i], targetJSON[i]);
                        } else {
                            srcJSON[i] = targetJSON[i];
                        }
                    }
                }
            }

            return srcJSON;
        },

        /**
         *  Returns the <tbody> element of the table. In order to support W3C
         *  non-compliant HTML, wherein the table does not have a <tbody> containing
         *  the <tr> & <td> elements, the table itself is returned.
         *
         *  @param {object} tbl Is the table whose tbody needs to fetched.
         *
         */
        getTbody = function (tbl) {
            var tbodyArr = sanitizeNodesArray(tbl.childNodes);

            // Checking if the table's childNode is a tbody or not
            if (tbodyArr.length) {
                if (tbodyArr[0].nodeName === 'TBODY') {
                    return tbodyArr[0];
                }
                else if (tbodyArr[0].nodeName === 'THEAD' && tbodyArr[1] && tbodyArr[1].nodeName === 'TBODY') {
                    return tbodyArr[1];
                }
            }
            return tbl;
        },

        /**
         *  Returns an array containing the <td> in the <thead> tag.
         *
         *  @param {object} tbl Is the table whose tbody needs to fetched.
         *
         */
        getThead = function (tbl) {
            var tbodyArr = sanitizeNodesArray(tbl.childNodes);

            // Checking if the table's childNode is a tbody or not
            if (tbodyArr.length) {
                if (tbodyArr[0].nodeName === 'THEAD' && tbodyArr[1] && tbodyArr[1].nodeName === 'TBODY') {
                    return tbodyArr[0].childNodes;
                }
            }
            return [];
        },

        /**
         *  Used to return the text in a given Element. Needed as firefox does not
         *  support 'innerText', which is a W3C standard and instead uses
         *  textContent attribute to store the text.
         *
         *  @param {object} nodeEle The HTML element whose text is needed.
         */
        getTextFromNode = function (nodeEle) {
            return (nodeEle.innerText !== undefined) ? nodeEle.innerText : nodeEle.textContent;
        },

        /**
         *  Used to convert an array of rows into an array of corresponding columns.
         *
         *  @param {array} rowArr The array of table rows that has to be transposed
         *  into an array of columns.
         */
        getColumnArr = function (rowArr) {

            var i,
                j,
                l,
                len,
                cellArr,
                rowSpanInc,
                colSpan = 1,
                columnArrIdx,
                rowSpan = {},
                returnObj = [];

            for (i = 0, l = rowArr.length; i < l; i += 1) {

                // get all the cells of the row
                cellArr = sanitizeNodesArray(rowArr[i].childNodes);
                colSpan = 1;
                rowSpanInc = 0;
                for (j = 0, len = cellArr.length; j < len; j += 1) {

                    // if a previous row had a cell with a rowspan then this
                    // rowspan needs to be taken into account while creating
                    // column array.
                    columnArrIdx = j + colSpan + rowSpanInc - 1;
                    if (rowSpan[columnArrIdx] &&
                            ((i - rowSpan[columnArrIdx].rowNum) < rowSpan[columnArrIdx].row)) {
                        rowSpanInc += rowSpan[columnArrIdx].col;
                        columnArrIdx += rowSpan[columnArrIdx].col;
                    }

                    if (parseInt(cellArr[j].getAttribute('rowspan'), 10) > 1) {
                        if (!rowSpan[columnArrIdx]) {
                            rowSpan[columnArrIdx] = {};
                        }
                        rowSpan[columnArrIdx].rowNum = i;
                        rowSpan[columnArrIdx].row = parseInt(cellArr[j].getAttribute('rowspan'), 10);
                        // If the cell has both a rowspan and a colspan then they
                        // both need to be taken into consideration while calculating
                        // the column of cells in the susequent rows
                        if (parseInt(cellArr[j].getAttribute('colspan'), 10) > 1) {
                            rowSpan[columnArrIdx].col = parseInt(cellArr[j].getAttribute('colspan'), 10);
                        } else {
                            rowSpan[columnArrIdx].col = 1;
                        }
                    }

                    // The previous cells colspan, and the previous rows rowspans
                    // also needs to be added to the current cells index to get the
                    // proper column index.
                    while (returnObj.length <= columnArrIdx) {
                        returnObj.push({childNodes: []});
                    }
                    returnObj[columnArrIdx].childNodes.push(cellArr[j]);

                    // Adding the current cells colspan for subsequent cells in the
                    // current row.
                    if (parseInt(cellArr[j].getAttribute('colspan'), 10) > 1) {
                        colSpan += parseInt(cellArr[j].getAttribute('colspan'), 10) - 1;
                    }
                }
            }

            return returnObj;
        },

        /**
         * Used to check if an item is present in an array or not.
         *
         * @param {array} arr The array which has to be checked
         *
         * @param {string|number|object} item The item which needs be checked if
         * present in array arr or not.
         */
        arrayContains = function (arr, item) {
            var i = arr.length;
            // Using a decrementing while loop (optimization) since the order in which the
            // array is traversed doesn't matter.
            while (i) {
                i -= 1;
                if (arr[i] === item) {
                    return true;
                }
            }
            return false;
        },

        /**
         * Used to check if a particular row or column has all non numeric (or blank)
         * content. If so, then that particular row/column must be ignored.
         *
         * @param {array} nodeArr Is an array of all the rows/columns of the table.
         *
         * @param {number} index of the row/column that is not to be analysed as it
         * has already been set aside as the label row/column.
         *
         * @param {number} j is the cell index at which we have to check for the
         * presence of numeric data in all the other rows and columns.
         */

        checkData = function (nodeArr, j, index) {

            var i,
                l,
                childArr = sanitizeNodesArray(nodeArr[j].childNodes),
                text;

            for (i = 0, l = childArr.length; i < l; i += 1) {
                if (i !== index) {
                    text = getTextFromNode(childArr[i]);
                    if (parseFloat(text) === text) {
                        return true;
                    }
                }
            }
            return false;
        },

        _blankString = '__fcBLANK__',
        _blankNo = 0,
        /**
         * Used to get the table row that has the labels (categories or legend) and
         * extract the label details from the corresponding row.
         *
         * @param {array} nodeArr Is an array of all the rows/columns of the table.
         *
         * @param {array} ignoreArr Is an array of all the indexes in the nodeArr
         * that need to be ignored. The items of this array can be negative as well.
         *
         * @param {string} index If the label row/column details have been given by
         * the user then this will contain the index which has the labels.
         *
         */
        getLabels = function (nodeArr, ignoreArr, index, opts) {

            var len, l, i, j, childArr, mostEmptyCellRow = null, internalLabel = [],
                emptyCellCount = [], textCellCount = 0, temp, returnObj = {},
                spanTotal = 0, spanLen, isRowLabel, maxIdx, spanLength, totalSpanLength = 0, tLabels;


            if (typeof index === 'undefined') {
            // Checking if the user has provided the index. If index has not been
            // passed then we assume that the user does not want to give a label row
            // or column.

                // Creating custom labels for all cells in the first row/column.
                childArr = sanitizeNodesArray(nodeArr[0].childNodes);
                for (j = 0, len = childArr.length; j < len; j += 1) {
                    spanLen = j + spanTotal;
                    internalLabel[spanLen] = _blankString + (spanLen + 1);

                    temp = parseInt(childArr[j].colSpan, 10);
                    temp = (temp > 1) ? temp : parseInt(childArr[j].rowSpan, 10);
                    if (temp > 1) {
                        for (l = 1; l < temp; l += 1) {
                            internalLabel[spanLen + l] = _blankString + (spanLen + l + 1);
                        }
                        spanTotal += (temp - 1);
                    }
                }

                // Deleting the labels for the rows/columns that the user wants to
                // ignore.
                for (i = 0, l = (j + spanTotal), len = ignoreArr.length; i < len; i += 1) {
                    if (ignoreArr[i] > 0) {
                        delete internalLabel[ignoreArr[i] - 1];
                    } else {
                        delete internalLabel[l + ignoreArr[i]];
                    }
                }

                return {'index': -1, 'labelObj': internalLabel};

            } else if (index === 0) {
                // Checking if the user has provided the index. Since we expect row/column
                // indices starting from 1, if index is 0 then we use our internal logic
                // to find the label array from the given nodeArr.
                for (i = 0, l = nodeArr.length; i < l; i += 1) {
                    childArr = sanitizeNodesArray(nodeArr[i].childNodes);
                    emptyCellCount[i] = 0;
                    textCellCount = 0;

                    if(opts && opts._extractByHeaderTag){
                        for (j = 0, len = childArr.length; j < len; j += 1) {
                            if(childArr[j].nodeName.toLowerCase() != 'th'){
                                continue;
                            }
                            tLabels = getLabels(nodeArr, ignoreArr, i + 1);
                            delete tLabels.labelObj[opts._rowLabelIndex];
                            return tLabels;
                        }
                    }else{
                        for (j = 0, len = childArr.length; j < len; j += 1) {
                            if (arrayContains(ignoreArr, (j + 1)) ||
                                    arrayContains(ignoreArr, (j - len))) {
                                continue;
                            }
                            temp = getTextFromNode(childArr[j]);
                            // Checking if the cell is emtpy.
                            if (temp.replace(/^\s*/, '').replace(/\s*$/, '') === '') {
                                emptyCellCount[i] += 1;
                                continue;
                            }
                            // Checking if the cell has a non-number content
                            if (parseFloat(temp) != temp) {
                                textCellCount += 1;
                                // If there are at least 2 cells that have non-number
                                // content then we assume that they contain labels and
                                // fetch the labels from this array of nodes.
                                if (textCellCount > 1) {
                                    return getLabels(nodeArr, ignoreArr, i + 1);
                                }
                            }
                        }
                    }
                    // If there are empty cells then we assume that the array with
                    // the most number of empty cells must be the label array.
                    if (i > 0) {
                        if (emptyCellCount[i - 1] > emptyCellCount[i]) {
                            mostEmptyCellRow = i - 1;
                        } else if (emptyCellCount[i - 1] < emptyCellCount[i]) {
                            mostEmptyCellRow = i;
                        }
                    }
                }
                if (mostEmptyCellRow !== null) {
                    return getLabels(nodeArr, ignoreArr, mostEmptyCellRow + 1);
                } else {
                    return getLabels(nodeArr, ignoreArr);
                }
            }

            // If this is a negative number then, calulate the index from the
            // end of the table. e.g -1 would imply the last row.
            if (index < 0) {
                index += nodeArr.length;
            } else if (index > 0) {
                index -= 1;
            }

            /**
             * Once we have the index of the row/column that contains the labels we
             * go through only that row/column and extract the labels.
             */
            childArr = sanitizeNodesArray(nodeArr[index].childNodes);

            isRowLabel = (nodeArr[0].nodeType !== undefined) ? true : false;
            for (j = 0, len = childArr.length; j < len; j += 1) {
                spanLength = 0;
                if (isRowLabel) {
                    if (childArr[j].colSpan !== '1') {
                        spanLength = parseInt(childArr[j].colSpan, 10);
                    }
                } else if (childArr[j].rowSpan !== '1') {
                    spanLength = parseInt(childArr[j].rowSpan, 10);
                }
                spanLength = (spanLength > 1) ? spanLength : 0;
                temp = getTextFromNode(childArr[j]);
                if (temp.replace(/^\s*/, '').replace(/\s*$/, '') !== '') {
                    returnObj[j + totalSpanLength] = temp;
                } else if (checkData(getColumnArr(nodeArr), j, index)) {
                    // if the label text is missing in one of the cells of the labels
                    // row/column we check for the presence of numeric data in other
                    // cells of the corresponding column/row.

                    returnObj[j + totalSpanLength] = _blankString + _blankNo;
                    _blankNo += 1;
                }

                if (spanLength > 1) {
                    // If the spanLength > 1, then we create additional labels for
                    // rows/columns pertaining to the rowspan or colspan.
                    temp = returnObj[j + totalSpanLength];
                    for (i = 1; i < spanLength; i += 1) {
                        returnObj[j + totalSpanLength + i] = temp + ' (' + i + ')';
                    }

                    // totalSpanLength is used to adjust the indices of the
                    // subsequent cells using the rowspan/colspan of the current
                    // cell.
                    totalSpanLength += (spanLength - 1);
                }
            }

            // Deleting the rows/columns that the user wants to ignore.
            maxIdx = len + totalSpanLength;
            for (i = 0, len = ignoreArr.length; i < len; i += 1) {
                if (ignoreArr[i] > 0) {
                    delete returnObj[ignoreArr[i] - 1];
                } else {
                    delete returnObj[maxIdx + ignoreArr[i]];
                }
            }

            return {'labelObj': returnObj, 'index': index};
        },

        extractDataFromTable = function (tbl, opts) {

            if (typeof tbl === 'string') {
                tbl = doc.getElementById(tbl);
            }

            if ((typeof win.jQuery !== 'undefined') && (tbl instanceof win.jQuery)) { // jshint ignore: line
                tbl = tbl.get(0);
            }

            if (!tbl) {
                return {data: null};
            }

            if (opts.hideTable) {
                tbl.style.display = 'none';
            }

            var i,
                j,
                rowCells,
                cellText,
                dataMap = {},
                mapColumnIdx,
                columnSpan,
                len,
                item,
                rowSpan,
                cellEle,
                columnSpanObj = {},
                rowSpanObj = {},
                tableRows = sanitizeNodesArray(getThead(tbl)).concat(sanitizeNodesArray(getTbody(tbl).childNodes)),
                l = tableRows.length,
                dataRows = 0,
                dataColumns = 0,
                tempColumn = 0,
                rowLabelMap,
                m,
                k = 0,
                columnLabelMap,
                isSingleSeries = false,
                chartType = opts.chartType,
                tempMap,

                singleSeriesCharts = ['column2d', 'column3d', 'pie3d', 'pie2d',
                                        'line', 'bar2d', 'area2d', 'doughnut2d',
                                        'doughnut3d', 'pareto2d', 'pareto3d'];


            if(singleSeriesCharts.indexOf(chartType) !== -1){
                isSingleSeries = true;
            }



            // use rowLabelSource and colLabelSource to avoid confusion
            opts.rowLabelSource = parseInt(opts.labelSource, 10);
            opts.colLabelSource = parseInt(opts.legendSource, 10);
            // Create the labels objects for the chart.

            if (opts.major === 'column') {
                rowLabelMap = opts.useLabels ?
                    getLabels(tableRows, opts.ignoreCols, opts.rowLabelSource) :
                    getLabels(tableRows, opts.ignoreCols);

                columnLabelMap = opts.useLegend ?
                    getLabels(getColumnArr(tableRows), opts.ignoreRows, opts.colLabelSource) :
                    getLabels(getColumnArr(tableRows), opts.ignoreRows);
            }else{
                tempMap = getLabels(getColumnArr(tableRows), opts.ignoreRows, opts.rowLabelSource);
                if(!opts.useLabels){
                    rowLabelMap = getLabels(getColumnArr(tableRows), opts.ignoreRows);
                }else{
                    rowLabelMap = tempMap;
                }
                
                opts._rowLabelIndex = tempMap.index;
                opts._extractByHeaderTag = true;
                
                columnLabelMap = opts.useLegend ?
                    getLabels(tableRows, opts.ignoreCols, opts.colLabelSource, opts) :
                    getLabels(tableRows, opts.ignoreCols);

                delete opts._extractByHeaderTag;

                tempMap = rowLabelMap;
                rowLabelMap = columnLabelMap;
                columnLabelMap = tempMap;
            }

            delete rowLabelMap.labelObj[columnLabelMap.index];
            delete columnLabelMap.labelObj[rowLabelMap.index];

            // Creating the 2d map depending on whether the rows are the primary
            // keys or the columns.
            if (opts.major === 'row') {
                for (item in columnLabelMap.labelObj) {
                    dataMap[item] = {};
                }
            } else {
                for (item in rowLabelMap.labelObj) {
                    dataMap[item] = {};
                }
            }

            // Populating the dataMap.
            for (i = 0; i < l; i += 1) {
                if (rowLabelMap.index === i ||
                        (columnLabelMap.labelObj[i] === undefined)) {
                    continue;
                }

                dataRows += 1;
                rowCells = sanitizeNodesArray(tableRows[i].childNodes);

                // columnSpanObj maintains the number of colspans in the current
                // row.
                // rowSpanObj maintains the number of rowspans in a rows x columns
                // map.
                columnSpanObj[i] = 0;
                rowSpanObj[i] = {};

                for (j = 0, len = rowCells.length; j < len; j += 1) {

                    cellEle = rowCells[j];

                    columnSpan = parseInt(cellEle.getAttribute('colspan'), 10);
                    rowSpan = parseInt(cellEle.getAttribute('rowspan'), 10);

                    mapColumnIdx = j + columnSpanObj[i];

                    // Calculating the position of the current cell in the dataMap.
                    while (k < i) {
                        if (rowSpanObj[k]) {
                            for (m in rowSpanObj[k]) {
                                if (m > mapColumnIdx) {
                                    break;
                                }

                                if ((i - k) <= rowSpanObj[k][m].row) {
                                    mapColumnIdx += rowSpanObj[k][m].col;
                                }
                            }
                        }
                        k += 1;
                    }

                    if (columnSpan > 1) {
                        columnSpanObj[i] += (columnSpan - 1);
                    }

                    if (rowSpan > 1) {
                        if (columnSpan > 1) {
                            rowSpanObj[i][mapColumnIdx] = {
                                row: (rowSpan - 1),
                                col: columnSpan
                            };
                        } else {
                            rowSpanObj[i][mapColumnIdx] = {
                                row: (rowSpan - 1),
                                col: 1
                            };
                        }
                    }
                    if (columnLabelMap.index === mapColumnIdx ||
                        (rowLabelMap.labelObj[mapColumnIdx] === undefined)) {

                        continue;
                    }

                    tempColumn += 1;
                    cellText = getTextFromNode(cellEle);
                    // If the cell does not have any text then we covert it by
                    // default to 0 or to an parameterized option set by user.
                    if (cellText.replace(/^\s*/, '').replace(/\s*$/, '') === '') {
                        if (opts.convertBlankTo) {
                            cellText = opts.convertBlankTo;
                        } else {
                            continue;
                        }
                    }

                    // Filling up the dataMap based on the rowspan, colspan and
                    // position(row=i, column=mapColumnIdx) information of the
                    // table cell.
                    columnSpan = (columnSpan > 1) ? columnSpan : 1;
                    rowSpan = (rowSpan > 1) ? rowSpan : 1;

                    if (opts.major === 'row') {
                        k = 0;
                        while (k < columnSpan) {
                            m = 0;
                            while (m < rowSpan) {
                                dataMap[i + m][mapColumnIdx + k] = parseFloat(cellText);
                                m += 1;
                            }
                            k += 1;
                        }
                    }
                    else {
                        k = 0;
                        while (k < columnSpan) {
                            m = 0;
                            while (m < rowSpan) {
                                dataMap[mapColumnIdx + k][i + m] = parseFloat(cellText);
                                m += 1;
                            }
                            k += 1;
                        }
                    }
                }
                if (tempColumn > dataColumns) {
                    dataColumns = tempColumn;
                }
            }

            return {
                data: dataMap,
                chartType: chartType ? (!isSingleSeries ? 'multi' : 'single') : 
                    ((dataRows > 1 && dataColumns > 1) ? 'multi' : 'single'),
                labelMap: columnLabelMap,
                legendMap: rowLabelMap
            };
        },

        createChartFromTable = function (data, obj, config) {

            // Default configuration for HTMLTable data-handler
            var opts = {
                chartAttributes: { },

                major: 'row',
                useLabels: true,
                useLegend: true,
                labelSource: 0,
                legendSource: 0,
                ignoreCols: [],
                ignoreRows: [],
                showLabels: true,
                showLegend: true,
                seriesColors: [],
                convertBlankTo: '0',
                hideTable: false,
                chartType: obj.chartType && obj.chartType(),

                // Private Variables
                labels: [],
                legend: [],
                data: []
            }, i, item1, item2, categoryArr, datasetArr, chartJSON = {},
            datasets = {}, dataObj, dataMap, labelMap, legendMap;

            global.extend(opts, config);

            dataObj = extractDataFromTable(data, opts);
            dataMap = dataObj.data;

            if (opts.major !== 'row') {
                labelMap = dataObj.legendMap,
                legendMap = dataObj.labelMap;
            } else {
                labelMap = dataObj.labelMap,
                legendMap = dataObj.legendMap;
            }

            // chartAttributes should contain the configuration attributes for the chart
            // e.g caption, xAxisName, yAxisName etc.
            chartJSON.chart = global.extend({}, opts.chartAttributes);

            if (dataObj.chartType === 'multi') {
                chartJSON.categories = [{'category': []}];
                chartJSON.dataset = [];

                categoryArr = chartJSON.categories[0].category;
                datasetArr = chartJSON.dataset;

                i = 0;
                for (item1 in dataMap) {

                    if (opts.showLabels === true) {
                        // If the user has provided custom labels then those should be
                        // shown instead of the extracted labels.
                        categoryArr.push(global.extend({
                            label: (labelMap.labelObj[item1].indexOf(_blankString) != -1) ?
                                '' : labelMap.labelObj[item1]
                        },
                        opts.labels[i]));
                    } else {
                        categoryArr.push({'label': ''});
                    }
                    i += 1;
                    for (item2 in dataMap[item1]) {
                        if (typeof datasets[item2] === 'undefined') {
                            datasets[item2] = [];
                        }
                        datasets[item2].push({'value': dataMap[item1][item2]});
                    }
                }

                i = 0;
                for (item1 in datasets) {
                    if (opts.showLegend === true) {
                        // If the user has provided custom labels then those should be
                        // shown instead of the extracted labels.
                        datasetArr.push(global.extend({
                            'seriesname': ((legendMap.labelObj[item1].indexOf(_blankString) !== -1) ?
                                '' : legendMap.labelObj[item1]),
                            'data': datasets[item1]
                        }, opts.legend[i]));
                    } else {
                        datasetArr.push({
                            'seriesname': '',
                            'data': datasets[item1]
                        });
                    }
                    i += 1;
                }
            } else if (dataObj.chartType === 'single') {
                chartJSON.data = [];
                datasetArr = chartJSON.data;

                i = 0;
                if (opts.showLabels) {
                    for (item1 in dataMap) {
                        for (item2 in dataMap[item1]) {
                            datasetArr.push(global.extend({
                                    label: ((labelMap.labelObj[item1].indexOf(_blankString) !== -1) ?
                                        '' : labelMap.labelObj[item1]),
                                    value: dataMap[item1][item2]
                                },
                                opts.labels[i])
                            );

                            i += 1;
                        }
                    }
                } else {
                    for (item1 in dataMap) {
                        for (item2 in dataMap[item1]) {
                            datasetArr.push({'value': dataMap[item1][item2]});
                        }
                    }
                }
            }

            return {
                data: global.core.transcodeData(chartJSON, 'JSON', 'XML'),
                error: undefined
            };
        };

    global.addDataHandler('HTMLTable', {
        encode: function (data, obj, config) {
            return createChartFromTable(data, obj, config);
        },
        decode: function (data, obj) {
            /**
             * @private
             *
             * @typedef {RuntimeException} Error-07101734
             * @memberOf FusionCharts.debugger
             * @group debugger-error
             */
            global.raiseError(obj, '07101734', 'run', '::HTMLTableDataHandler.decode()',
                'FusionCharts HTMLTable data-handler only supports decoding of data.');
            throw new Error('FeatureNotSupportedException()');
        },
        transportable: false
    });
}]);
/**
 * @module fusioncharts.jqueryplugin
 * @private
 * @requires fusioncharts.transcoder.htmltable
 *
 * @export fusioncharts.jqueryplugin.js
 */
FusionCharts.register('module', ['private', 'extensions.jQueryPlugin', function () {

    var global = this,
        win = global.window,
        lib = global.hcLib,
        doc = win.document,
        jQ = win.jQuery,
        renderFusionCharts,
        captureAllFusionChartsEvents,
        getChartObjectsFromSelection,
        configureLinkedCharts,
        math = win.Math,
        mathMin = math.min,
        isArray = lib.isArray,
        realtimeCommandMap = {
            feed: 'feedData',
            setdata: 'setData',
            setdataforid: 'setDataForId',
            getdata: 'getData',
            getdataforid: 'getDataForId',
            clear: 'clearChart',
            stop: 'stopUpdate',
            start: 'restartUpdate'
        },
        optionsParser = {
            feedData: function (options) {
                if (typeof options === 'string') {
                    return [options];
                }
                else if (typeof options === 'object' && options.stream) {
                    return [options.stream];
                }
                else {
                    return false;
                }
            },
            getData: function (options) {
                // index is passed in case of multivalue charts.
                if (!isNaN(options)) {
                    return [options];
                }
                else if (typeof options === 'object' && options.index) {
                    return [options.index];
                }
                else {
                    return [];
                }
            },
            getDataForId: function (options) {
                // index is passed in case of multivalue charts.
                if (typeof options === 'string') {
                    return [options];
                }
                else if (typeof options === 'object' && options.id) {
                    return [options.id];
                }
                else {
                    return [];
                }
            },
            setData: function (options, value, label) {
                var arr = [];
                if (typeof options !== 'object') {
                    arr = [options, value, label];
                }
                else {
                    options.value && arr.push(options.value);
                    options.label && arr.push(options.label);
                }

                return arr;
            },
            setDataForId: function (options, value, label) {
                var arr = [];
                if (typeof options === 'string' || typeof value === 'string' ||
                        typeof label === 'string') {
                    arr = [options, value, label];
                }
                else if (typeof options === 'object') {
                    options.value && arr.push(options.value);
                    options.label && arr.push(options.label);
                }

                return arr;
            },
            clearChart: function (options) {
                return [options];
            },
            stopUpdate: function (options) {
                return [options];
            },
            restartUpdate: function (options) {
                return [options];
            }
        };

    // Assign FusionCharts object to global jQuery object for easy use.
    jQ.FusionCharts = global.core;

    /**
     * Used purely for rendering the FusionCharts.
     * Acts as a common method that is invoked by all the APIs that create a
     * FusionChart object
     *
     * @param {array} elemList is a list of all the HTML elements that
     * are selected using the jQuery selectors
     *
     * @param {object} chartOptions is the options that are to be passed to
     * the FusionCharts contructor.
     */

    renderFusionCharts = function (elemList, chartOptions) {
        var i,
            l,
            cO,
            chartObj,
            scriptElement;

        if (isArray(chartOptions) || chartOptions instanceof jQ) {
            l = mathMin(elemList.length, chartOptions.length);
        }
        else {
            l = elemList.length;
        }

        for (i = 0; i < l; i += 1) {

            // One-to-one mapping with the HTML elements in case of
            // multiple option objects.
            if (isArray(chartOptions) || chartOptions instanceof jQ) {
                cO = chartOptions[i];
            } else {
                cO = chartOptions;
            }

            // check if the element is appended to the window document or not.
            if (elemList[i].parentNode) {
                // Adding the renderAt option to the chartOptions tells the
                // constructor where to render the FusionCharts object.
                global.core.render(jQ.extend({}, cO, {
                    renderAt: elemList[i]
                }));
            } else {
                chartObj = new FusionCharts(jQ.extend({}, cO, {
                    renderAt: elemList[i]
                }));

                if (!jQ.FusionCharts.delayedRender) {
                    jQ.FusionCharts.delayedRender = {};
                }
                jQ.FusionCharts.delayedRender[chartObj.id] = elemList[i];

                scriptElement = doc.createElement('script');
                scriptElement.setAttribute('type', 'text/javascript');

                if (/msie/i.test(win.navigator.userAgent) && !win.opera) {
                    scriptElement.text = 'FusionCharts.items[\'' + chartObj.id + '\'].render();';
                } else {
                    scriptElement.appendChild(
                        doc.createTextNode('FusionCharts.items[\'' + chartObj.id + '\'].render()')
                    );
                }
                elemList[i].appendChild(scriptElement);
            }
        }
        return elemList;
    };

    /**
     *  Using jQuery's event model for attaching handlers to FusionCharts events.
     *  This is achieved by listening to the FusionCharts "*" event and then
     *  triggering a jQuery event on the associated DOM element.
     */
    captureAllFusionChartsEvents = function (event, args) {
        var containerElement;

        // Extending our event with the jQuery event model for proper
        // delegation and bubbling.
        jQ.extend(event, jQ.Event('fusioncharts' + event.eventType));

        // Checking if there is an associated DOM object
        if (event.sender && event.sender.options) {
            containerElement = event.sender.options.containerElement ||
                event.sender.options.containerElementId;

            if (typeof containerElement === 'object') {
                jQ(containerElement).trigger(event, args);
            }
            else if (jQ('#' + containerElement).length) {
                jQ('#' + containerElement).trigger(event, args);
            }
            else {
                jQ(doc).trigger(event, args);
            }
        } else {
            // If there is no DOM object associated with the FusionCharts object
            // then triggering the event on the document itself for any possible
            // global handlers that might want to capture it.
            jQ(doc).trigger(event, args);
        }
    };

    global.addEventListener('*', captureAllFusionChartsEvents);

    /**
     * Used to select all the HTML object/embed elements that have been created
     * using the FusionCharts constructor
     *
     * @param {jQuery} obj, the selection of elements that need to be processed.
     *
     */
    getChartObjectsFromSelection = function (obj) {

        // The HTML object/embed may be part of the current selection or a
        // child of the current selection. Need to take both cases into account.
        // @note If the FusionCharts object has not been rendered yet, e.g in
        // case the container is not appended to the document, then 'find' for
        // that element will NOT return the corresponding FusionCharts object.
        return obj.filter(':FusionCharts').add(obj.find(':FusionCharts'));
    };

    /**
     *  Used to configure the links at various levels in a linked chart.
     *
     *  @param {jQuery} chartObjects The FusionCharts objects for which the link
     *  has to be configured.
     *
     *  @param {object} linkConfigObj contains the configuration details of the
     *  linked chart like swfUrl, height, width etc.
     *
     *  @param {string} level contains the level at which the user wants to
     *  configure the link.
     *
     */
    configureLinkedCharts = function (chartObjects, linkConfigObj, level) {

        if (typeof linkConfigObj === 'object') {
            chartObjects.each(function () {
                this.configureLink(linkConfigObj, level);
            });
        }
    };

    /**
     * @id: jQuery.fn.insertFusionCharts
     * @id: $.fn.insertFusionCharts
     *
     * @param {object} options contains the parameters that need to be passed
     * to the FusionCharts constructor
     *
     * Inserts the FusionCharts objects in the HTML elements that are selected
     * by the jQuery selector.
     */
    jQ.fn.insertFusionCharts = function (options) {
        return renderFusionCharts(this, options);

    };

    /**
     * @id: jQuery.fn.appendFusionCharts
     * @id: $.fn.appendFusionCharts
     *
     * @param {object} options contains that parameters that need to be passed
     * to the FusionCharts constructor
     *
     * Appends the FusionCharts objects immediately after the HTML elements
     * that are selected by the jQuery selector.
     */
    jQ.fn.appendFusionCharts = function (options) {
        options.insertMode = 'append';
        return renderFusionCharts(this, options);
    };

    /**
     * @id: jQuery.fn.prependFusionCharts
     * @id: $.fn.prependFusionCharts
     *
     * @param {object} options contains the parameters that need to be passed
     * to the FusionCharts constructor
     *
     *  Prepends the FusionCharts objects before the HTML elements that are
     *  selected by the jQuery selector.
     */
    jQ.fn.prependFusionCharts = function (options) {
        options.insertMode = 'prepend';
        return renderFusionCharts(this, options);
    };

    /**
     * @id: jQuery.fn.attrFusionCharts
     * @id: $.fn.attrFusionCharts
     *
     * @param {object|string} attr, If this is a string then it contains
     * the FusionCharts object's attribute that needs to be set or fetched.
     * If it is an object then, it contains the attributes along with the
     * corresponding values that need to be set on the FusionCharts object
     *
     * @param {string} attrVal, To be used if attr is a string. Contains the
     * value that needs to be set for the attribute that attr corresponds to.
     *
     *  Used to set or get the attribute(s) of the FusionCharts object.
     */
    jQ.fn.attrFusionCharts = function (attr, attrVal) {

        /**
         * @ignore
         * @todo Remove ignore
         *
         * @var {jQuery} chartsObjects stores the FusionCharts objects in
         * the selected HTML elements.
         * @var {object} transfer Holds all atttributes to be returned to the
         * callee Function.
         */
        var transfer = [],
            chartObjects = getChartObjectsFromSelection(this);

        if (attrVal !== undefined) {
            // Set the charts attribute attr with value attrVal.

            chartObjects.each(function () {
                this.FusionCharts.setChartAttribute(attr, attrVal);
            });
            return this;
        }
        if (typeof attr === 'object') {
             // Set the charts attributes, in the passed object's keys with
             // the corresponding values.

            chartObjects.each(function () {
                this.FusionCharts.setChartAttribute(attr);
            });
            return this;
        }

        // If both the above cases fail, user is trying to, in accordance with the
        // jQuery paradigm, get the value of the arrtibute.
        chartObjects.each(function () {
            transfer.push(
                this.FusionCharts.getChartAttribute(attr)
            );
        });
        return transfer;
    };

    /**
     * @id jQuery.fn.updateFusionCharts
     * @id $.fn.updateFusionCharts
     *
     * @param {object} options Contains the new options that the FusionCharts
     * objects need to update themselves with. Currently, using this interface
     * the dataType, data, width, height, debugMode and swfUrl can be updated.
     */
    jQ.fn.updateFusionCharts = function (options) {

        var filterOpts = {},
            chartObjects = getChartObjectsFromSelection(this),
            updateOptions = [
                ['swfUrl', false],
                ['type', false],
                ['height', false],
                ['width', false],
                ['containerBackgroundColor', true],
                ['containerBackgroundAlpha', true],
                ['dataFormat', false],
                ['dataSource', false]
            ],
            i,
            l,
            fcChart,
            renderFlag,
            optStr,
            newChart;

        for (i = 0, l = updateOptions.length; i < l; i += 1) {
            optStr = updateOptions[i][0];
            filterOpts.type = filterOpts.type || filterOpts.swfUrl;
            if (options[optStr]) {
                if (updateOptions[i][1]) {
                    renderFlag = true;
                }
                filterOpts[optStr] = options[optStr];
            }
        }

        chartObjects.each(function () {
            // If height and width are given then resize the chart first.
            fcChart = this.FusionCharts;
            if (renderFlag) {
                newChart = fcChart.clone(filterOpts);
                newChart.render();
                return;
            }

            if (filterOpts.dataSource !== undefined || filterOpts.dataFormat !== undefined) {
                if (filterOpts.dataSource === undefined) {
                    fcChart.setChartData(fcChart.args.dataSource, filterOpts.dataFormat);
                } else if (filterOpts.dataFormat === undefined) {
                    fcChart.setChartData(filterOpts.dataSource, fcChart.args.dataFormat);
                } else {
                    fcChart.setChartData(filterOpts.dataSource, filterOpts.dataFormat);
                }
            }
            if (filterOpts.width !== undefined || filterOpts.height !== undefined) {
                fcChart.resizeTo(filterOpts.width, filterOpts.height);
            }
            if (filterOpts.type) {
                fcChart.chartType(filterOpts.type);
            }
        });

        return this;
    };

    /**
     *  @id: jQuery.fn.cloneFusionCharts
     *  @id: $.fn.cloneFusionCharts
     *
     *  @param {object} options The options object that takes the additional
     *  parameters to be passed while cloning the FusionCharts object.
     *
     *  @param {function} callback The callback function that has to be called
     *  once the FusionCharts objects have been cloned. This function will take
     *  the new clone objects as parameter.
     *
     */
    jQ.fn.cloneFusionCharts = function (callback, options) {

        var transfer,
            temp,
            chartObjects;

        // Check if the options parameter, which is not mandatory, has been
        // passed or not. If not, that means that options is the callback function.
        if (typeof callback !== 'function' && typeof options === 'function') {
            temp = callback;
            callback = options;
            options = temp;
        }

        transfer = [];
        chartObjects = getChartObjectsFromSelection(this);

        chartObjects.each(function () {
            transfer.push(this.FusionCharts.clone(options, {}, true));
        });

        callback.call(jQ(transfer), transfer);

        return this;
    };

    /**
     *  @id: jQuery.fn.disposeFusionCharts
     *  @id: $.fn.disposeFusionCharts
     *
     */
    jQ.fn.disposeFusionCharts = function () {

        var chartObjects = getChartObjectsFromSelection(this);

        chartObjects.each(function () {
            // Execute dispose on charts.
            this.FusionCharts.dispose();

            // Remove identifier reference variable
            delete this.FusionCharts;

            // cleanup any static objects pertaining to FusionCharts.
            if (this._fcDrillDownLevel === 0) {
                delete this._fcDrillDownLevel;
            }
        });

        return this;
    };

    /**
     * @id jQuery.fn.covertToFusionCharts
     * @id $.fn.convertToFusionCharts
     *
     * @param {object} chartOpts Configuration options to generate FusionCharts.
     * See documentation to get the list.
     *
     * @param {object} convertOpts Configuration options to convert the table
     * into a FusionCharts object.
     * See documentation to get the list.
     *
     */
    jQ.fn.convertToFusionCharts = function (chartOpts, convertOpts) {

        var transferObj = [];

        if (typeof chartOpts.dataConfiguration === 'undefined') {
            chartOpts.dataConfiguration = {};
        }

        jQ.extend(true, chartOpts.dataConfiguration, convertOpts);

        if (!chartOpts.dataSource) {
            chartOpts.dataSource = this.get(0);
        }

        if (!chartOpts.renderAt) {
            this.each(function () {
                transferObj.push(jQ('<div></div>')
                    .insertBefore(this)
                    .insertFusionCharts(chartOpts).get(0)
                );
            });
        }
        else {
            if (typeof chartOpts.renderAt === 'string') {
                transferObj.push(jQ('#' + chartOpts.renderAt)
                    .insertFusionCharts(chartOpts).get(0)
                );
            }
            else if (typeof chartOpts.renderAt === 'object') {
                transferObj.push(jQ(chartOpts.renderAt)
                    .insertFusionCharts(chartOpts).get(0)
                );
            }
        }

        return jQ(transferObj);
    };

    /**
     * @id jQuery.fn.drillDownFusionChartsTo
     * @id $.fn.drillDownFusionChartsTo
     *
     * Used to set multi-level configurations of linked FusionCharts objects.
     * The levels are iterated depending on the number of configuration objects
     * in a single jQuery chain.
     *
     * To set the configuration at a specific level please refer to docs.
     */
    jQ.fn.drillDownFusionChartsTo = function () {
        var chartObjects = getChartObjectsFromSelection(this),
            j,
            len,
            i,
            l,
            configureOpts;


        // hack to support chaining of multiple drillDowns in a single chain
        if (typeof this._fcDrillDownLevel === 'undefined') {
            this._fcDrillDownLevel = 0;
        }

        for (j = 0, len = arguments.length; j < len; j += 1) {
            configureOpts = arguments[j];

            if (isArray(configureOpts)) {
                for (i = 0, l = configureOpts.length; i < l; i += 1) {
                    configureLinkedCharts(chartObjects, configureOpts[i], this._fcDrillDownLevel);
                    this._fcDrillDownLevel += 1;
                }
            } else {
                configureLinkedCharts(chartObjects, configureOpts, this._fcDrillDownLevel);
                this._fcDrillDownLevel += 1;
            }
        }
        return this;
    };

    /**
     * @id jQuery.fn.streamFusionChartsData
     * @id $.fn.streamFusionChartsData
     *
     * @param {string} command. Contains the type of operation to be performed on
     * the realtime charts. If not provided, by default the command would be 'feed'
     * that invokes the feedData method of the chart and passes the options to it.
     *
     * @param {object} options. Contains the options that has to be parsed (if it is a js object)
     * and passed to the chart method (corresponding to command).
     * If not an object, it is passed as is to the chart method.
     *
     * @param {object} value. To make the API morph the data setter methods (setData, setDataForId),
     * it can also be passed the same parameters as the setter functions.
     *
     * @param {object} label. To make the API morph the data setter methods (setData, setDataForId),
     * it can also be passed the same parameters as the setter functions.
    **/

    jQ.fn.streamFusionChartsData = function (command, options, value, label) {

        var chartObjects = getChartObjectsFromSelection(this),
            transfer = [],
            fcChart,
            method,
            params;

        // Convert the command to lower case and fetch the proper chart method name.
        method = realtimeCommandMap[command && command.toLowerCase()];

        // Check if the command provided is valid or not.
        if (method === undefined) {
            // this means the command is not a getter. which in turn means that
            // the command is a data stream string and has to be handled accordingly.
            if (arguments.length === 1) {
                params = [command];
                method = realtimeCommandMap.feed;
            }
            else {
                return this;
            }
        }
        else if (arguments.length === 1) {
            // command is to invoke a method without any parameters..
            params = [];
        }
        else {
            // optionsParser returns an array of parameters to be passed to the
            // chart method.
            params = optionsParser[method](options, value, label);
        }

        if (method === 'getData' || method === 'getDataForId') {
            chartObjects.each(function () {
                fcChart = this.FusionCharts;
                if (typeof fcChart[method] === 'function') {
                    transfer.push(fcChart[method].apply(fcChart, params));
                }
            });
            return transfer;
        }
        else {
            chartObjects.each(function () {
                fcChart = this.FusionCharts;
                if (typeof fcChart[method] === 'function') {
                    fcChart[method].apply(fcChart, params);
                }
            });
            return this;
        }
    };

    jQ.extend(jQ.expr[':'], {
        /**
         *  Extending the jQuery selector to select all object/embed elements that
         *  have been created using the FusionCharts constructor i.e that are an
         *  instance of FusionCharts.
         *
         *  @param {object} obj, Is the HTML element that is currently being
         *  checked.
         */
        FusionCharts: function (obj) {
            return (obj.FusionCharts instanceof global.core);
        }
    });

}]);