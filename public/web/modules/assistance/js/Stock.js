var page = 1;
var size = 10;

/**
 * jquery
 */
$(document).ready(function () {
    getStocks(0, size);//初始执行

    //-------------------------------------------------------------------- stock

    $("#stock_btn_query").click(function () {
        page = 1;
        clearStockList();
        $("#stock_bread_info_one").text("查询");
        changeDisplay(1);
        getStocks(0, size);
    });

    $("#stock_stock_query_btn_getMore").click(function () {
        getStocks(page, size);
        page++;
    });

    $("#stock_stock_query_input_btn_query").click(function () {
        clearStockList();
        var searchValue = $("#stock_stock_query_input_stockCode").val();
        if (searchValue != "") {
            searchStocks(searchValue);
        } else {
            page = 1;
            getStocks(0, size);
        }
    });

    $("#stock_stock_query_input_stockCode").keydown(function (event) {
        if (event.which === 13) {
            clearStockList();
            var searchValue = $("#stock_stock_query_input_stockCode").val();
            if (searchValue != "") {
                searchStocks(searchValue);
            } else {
                page = 1;
                getStocks(0, size);
            }
        }
    });

    //-------------------------------------------------------------------- stock data

    $("#stock_btn_data_query").click(function () {
        page = 1;
        clearStockDataList();
        $("#stock_bread_info_one").text("数据");
        changeDisplay(2);
    });

    $("#stock_stock_data_query_btn_getMore").click(function () {
        var searchValue = $("#stock_stock_data_query_input_stockCode").val();
        if (searchValue != "") {
            searchStockDatas(searchValue, page, size);
            page++;
        }
    });

    $("#stock_stock_data_query_input_btn_query").click(function () {
        clearStockDataList();
        var searchValue = $("#stock_stock_data_query_input_stockCode").val();
        if (searchValue != "")
            searchStockDatas(searchValue, 0, size);
        page = 1;
    });

    $("#stock_stock_data_query_input_stockCode").keydown(function (event) {
        if (event.which === 13) {
            clearStockDataList();
            var searchValue = $("#stock_stock_data_query_input_stockCode").val();
            if (searchValue != "")
                searchStockDatas(searchValue, 0, size);
            page = 1;
        }
    });

    //-------------------------------------------------------------------- scriptNames display

    $("#stock_btn_analyse_scriptNames").click(function () {
        page = 1;
        clearScriptNameList();
        $("#stock_bread_info_one").text("分析");
        $("#stock_bread_info_two").text("脚本名称展示");
        changeDisplay(3);
        getScriptNames();
    });

    //-------------------------------------------------------------------- stock analyse code positive

    $("#stock_btn_analyse_stockCode_positive").click(function () {
        page = 1;
        clearStockCodeAnalysePositiveList();
        $("#stock_bread_info_one").text("分析");
        $("#stock_bread_info_two").text("代码·积极结果");
        changeDisplay(4);
    });

    $("#stock_analyse_stockCode_positive_query_btn_getMore").click(function () {
        var code = $("#stock_analyse_stockCode_positive_query_input_stockCode").val();
        if (code != "") {
            searchStockAnalyseCodePositiveDatas(code, page, size);
            page++;
        }
    });

    $("#stock_analyse_stockCode_positive_query_input_btn_query").click(function () {
        clearStockCodeAnalysePositiveList();
        var code = $("#stock_analyse_stockCode_positive_query_input_stockCode").val();
        if (code != "")
            searchStockAnalyseCodePositiveDatas(code, 0, size);
        page = 1;
    });

    $("#stock_analyse_stockCode_positive_query_input_stockCode").keydown(function (event) {
        if (event.which === 13) {
            clearStockCodeAnalysePositiveList();
            var code = $("#stock_analyse_stockCode_positive_query_input_stockCode").val();
            if (code != "")
                searchStockAnalyseCodePositiveDatas(code, 0, size);
            page = 1;
        }
    });

    //-------------------------------------------------------------------- stock analyse code negative

    $("#stock_btn_analyse_stockCode_negative").click(function () {
        page = 1;
        clearStockCodeAnalyseNegativeList();
        $("#stock_bread_info_one").text("分析");
        $("#stock_bread_info_two").text("代码·消极结果");
        changeDisplay(5);
    });

    $("#stock_analyse_stockCode_negative_query_btn_getMore").click(function () {
        var code = $("#stock_analyse_stockCode_negative_query_input_stockCode").val();
        if (code != "") {
            searchStockAnalyseCodeNegativeDatas(code, page, size);
            page++;
        }
    });

    $("#stock_analyse_stockCode_negative_query_input_btn_query").click(function () {
        clearStockCodeAnalyseNegativeList();
        var code = $("#stock_analyse_stockCode_negative_query_input_stockCode").val();
        if (code != "")
            searchStockAnalyseCodeNegativeDatas(code, 0, size);
        page = 1;
    });

    $("#stock_analyse_stockCode_negative_query_input_stockCode").keydown(function (event) {
        if (event.which === 13) {
            clearStockCodeAnalyseNegativeList();
            var code = $("#stock_analyse_stockCode_negative_query_input_stockCode").val();
            if (code != "")
                searchStockAnalyseCodeNegativeDatas(code, 0, size);
            page = 1;
        }
    });

    //-------------------------------------------------------------------- stock analyse script name positive

    $("#stock_btn_analyse_scriptName_positive").click(function () {
        page = 1;
        clearScriptNameAnalysePositiveList();
        $("#stock_bread_info_one").text("分析");
        $("#stock_bread_info_two").text("脚本·积极结果");
        changeDisplay(6);
    });

    $("#stock_analyse_scriptName_positive_query_btn_getMore").click(function () {
        var name = $("#stock_analyse_scriptName_positive_query_input_scriptName").val();
        if (name != "") {
            searchScriptNameAnalysePositiveDatas(name, page, size);
            page++;
        }
    });

    $("#stock_analyse_scriptName_positive_query_input_btn_query").click(function () {
        clearScriptNameAnalysePositiveList();
        var name = $("#stock_analyse_scriptName_positive_query_input_scriptName").val();
        if (name != "")
            searchScriptNameAnalysePositiveDatas(name, 0, size);
        page = 1;
    });

    $("#stock_analyse_scriptName_positive_query_input_scriptName").keydown(function (event) {
        if (event.which === 13) {
            clearScriptNameAnalysePositiveList();
            var name = $("#stock_analyse_scriptName_positive_query_input_scriptName").val();
            if (name != "")
                searchScriptNameAnalysePositiveDatas(name, 0, size);
            page = 1;
        }
    });

    //-------------------------------------------------------------------- stock analyse script name negative

    $("#stock_btn_analyse_scriptName_negative").click(function () {
        page = 1;
        clearScriptNameAnalyseNegativeList();
        $("#stock_bread_info_one").text("分析");
        $("#stock_bread_info_two").text("脚本·消极结果");
        changeDisplay(7);
    });

    $("#stock_analyse_scriptName_negative_query_btn_getMore").click(function () {
        var name = $("#stock_analyse_scriptName_negative_query_input_scriptName").val();
        if (name != "") {
            searchScriptNameAnalyseNegativeDatas(name, page, size);
            page++;
        }
    });

    $("#stock_analyse_scriptName_negative_query_input_btn_query").click(function () {
        clearScriptNameAnalyseNegativeList();
        var name = $("#stock_analyse_scriptName_negative_query_input_scriptName").val();
        if (name != "")
            searchScriptNameAnalyseNegativeDatas(name, 0, size);
        page = 1;
    });

    $("#stock_analyse_scriptName_negative_query_input_scriptName").keydown(function (event) {
        if (event.which === 13) {
            clearScriptNameAnalyseNegativeList();
            var name = $("#stock_analyse_scriptName_negative_query_input_scriptName").val();
            if (name != "")
                searchScriptNameAnalyseNegativeDatas(name, 0, size);
            page = 1;
        }
    });

    //-----检测股票代码的合法性
    $("#stock_stock_query_input_stockCode").focusout(function () {
        var code = $("#stock_stock_query_input_stockCode").val();
        if (code) {
            var reg = new RegExp("^[0-9]{6}$");
            if (reg.test(code) === true) {
                return;
            } else {
                alert("股票代码格式不正确！");
                $("#stock_stock_query_input_stockCode").val("");
            }
        }
    });

    $("#stock_stock_data_query_input_stockCode").focusout(function () {
        var code = $("#stock_stock_data_query_input_stockCode").val();
        if (code) {
            var reg = new RegExp("^[0-9]{6}$");
            if (reg.test(code) === true) {
                return;
            } else {
                alert("股票代码格式不正确！");
                $("#stock_stock_data_query_input_stockCode").val("");
            }
        }
    });

    $("#stock_analyse_stockCode_positive_query_input_stockCode").focusout(function () {
        var code = $("#stock_analyse_stockCode_positive_query_input_stockCode").val();
        if (code) {
            var reg = new RegExp("^[0-9]{6}$");
            if (reg.test(code) === true) {
                return;
            } else {
                alert("股票代码格式不正确！");
                $("#stock_analyse_stockCode_positive_query_input_stockCode").val("");
            }
        }
    });

    $("#stock_analyse_stockCode_negative_query_input_stockCode").focusout(function () {
        var code = $("#stock_analyse_stockCode_negative_query_input_stockCode").val();
        if (code) {
            var reg = new RegExp("^[0-9]{6}$");
            if (reg.test(code) === true) {
                return;
            } else {
                alert("股票代码格式不正确！");
                $("#stock_analyse_stockCode_negative_query_input_stockCode").val("");
            }
        }
    });

    //-------------------------------------------------------------------- stock analyse email notify (query & add)

    $("#stock_btn_analyse_email_notify_query").click(function () {
        $("#stock_bread_info_one").text("分析结果");
        $("#stock_bread_info_two").text("查看分析结果邮件通知");
        changeDisplay(8);
        getEmailNotifyData();
    });

    $("#stock_btn_analyse_email_notify_add").click(function () {
        $("#stock_bread_info_one").text("分析结果");
        $("#stock_bread_info_two").text("添加分析结果邮件通知");
        changeDisplay(9);
    });

    $("#stock_analyse_notify_email_add_address").focusout(function () {
        var address = $("#stock_analyse_notify_email_add_address").val();
        if (address) {
            var reg = new RegExp("^.*@.*\\..*$");
            if (reg.test(address) === true) {
                return;
            } else {
                alert("邮件地址格式不正确！");
                $("#notify_email_add_address").val("");
            }
        }
    });

    $("#stock_analyse_notify_email_add_form_submit").click(function () {
        var address = $("#stock_analyse_notify_email_add_address").val();
        if (address) {
            executePostWithJson(
                BASE_URL_STOCK_ANALYSE + "/notify/save",
                JSON.stringify({
                    "address": address
                }),
                function (data) {
                    if (data) {
                        alert("添加成功！");
                        changeDisplay(8);
                        getEmailNotifyData();
                    } else {
                        alert("添加失败！");
                    }
                },
                function (data, status) {
                    alert(data.message);
                }
            );
        }
    });
});

//-------------------------------------------------------------------- stock

function clearStockList() {
    $("#stock_stock_stockList").empty();
}

function getStocks(page, size) {
    executeGetWithJson(
        BASE_URL_STOCK + "/info/page?page=" + page + "&size=" + size,
        function (datas) {
            if (datas.length === 0) {
                addStockListNoMoreMessage();
                return;
            }
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var code = data.code;
                var name = data.name;
                var location = data.location;
                addStockListItem(code, name, location);
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function searchStocks(code) {
    executeGetWithJson(
        BASE_URL_STOCK + "/code/" + code + "/info",
        function (data) {
            if (data) {
                addStockListItem(data.code, data.name, data.location);
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function addStockListItem(code, name, location) {
    $("#stock_stock_stockList").append("<div class=\"list-group\">\n" +
        "                    <a class=\"list-group-item active\">\n" +
        "                    <h4>\n" +
        "                        " + code + "\n" +
        "                    </h4>\n" +
        "                    </a>\n" +
        "                    <a class=\"list-group-item\">\n" +
        "                        <h4>\n" +
        "                            " + name + "    " + location + "\n" +
        "                        </h4>\n" +
        "                    </a>\n" +
        "                </div>");
}

function addStockListNoMoreMessage() {
    $("#stock_stock_stockList").append("<div class=\"col-lg-6 col-center-block\"><p>没有更多了 ......</p></div>");
}

//-------------------------------------------------------------------- stock data

function clearStockDataList() {
    $("#stock_stock_data_stockList").empty();
}

function searchStockDatas(code, page, size) {
    executeGetWithJson(
        BASE_URL_STOCK + "/data/" + code + "/page?page=" + page + "&size=" + size,
        function (datas) {
            if (datas.length === 0) {
                addStockDataListNoMoreMessage();
                return;
            }
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                addStockDataListItem(data);
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function addStockDataListItem(data) {
    $("#stock_stock_data_stockList").append("<div class=\"list-group\">\n" +
        "                    <a class=\"list-group-item active\">\n" +
        "                        <h4>\n" +
        "                            " + data.stockCode + " - " + formatDate(data.date) + "\n" +
        "                        </h4>\n" +
        "                    </a>\n" +
        "                    <a class=\"list-group-item\">\n" +
        "                        <h4>\n" +
        "                            当前价格 - [" + data.currentPrice + "] - \n" +
        "                        </h4>\n" +
        "                        <h5>\n" +
        "                            今日开盘[" + data.todayStartPrice + "]  今日最高[" + data.todayMaxPrice + "] 今日最低[" + data.todayMinPrice + "]\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            昨日收盘[" + data.yesterdayEndPrice + "]  当前竞购[" + data.competitivePrice + "]  当前竞卖[" + data.reservePrice + "]\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            成交量[" + data.traceNumber + "]  成交额[" + data.traceAmount + "]\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            卖五:  [" + data.sellFivePrice + " - " + data.sellFive + "]\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            卖四:  [" + data.sellFourPrice + " - " + data.sellFour + "]\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            卖三:  [" + data.sellThreePrice + " - " + data.sellThree + "]\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            卖二:  [" + data.sellTwoPrice + " - " + data.sellTwo + "]\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            卖一:  [" + data.sellOnePrice + " - " + data.sellOne + "]\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            ---------------------------------" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            买一:  [" + data.buyOnePrice + " - " + data.buyOne + "]\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            买二:  [" + data.buyTwoPrice + " - " + data.buyTwo + "]\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            买三:  [" + data.buyThreePrice + " - " + data.buyThree + "]\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            买四:  [" + data.buyFourPrice + " - " + data.buyFour + "]\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            买五:  [" + data.buyFivePrice + " - " + data.buyFive + "]\n" +
        "                        </h5>\n" +
        "                    </a>\n" +
        "                </div>");
}

function addStockDataListNoMoreMessage() {
    $("#stock_stock_data_stockList").append("<div class=\"col-lg-6 col-center-block\"><p>没有更多了 ......</p></div>");
}

//-------------------------------------------------------------------- scriptNames display

function clearScriptNameList() {
    $("#stock_analyse_scriptNames_List").empty();
}

function getScriptNames() {
    executeGetWithJson(
        BASE_URL_STOCK_ANALYSE + "/scriptNames",
        function (datas) {
            if (datas.length === 0) {
                addScriptNameListNoMoreMessage();
                return;
            }
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                addScriptNameListItem(data);
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function addScriptNameListItem(data) {
    $("#stock_analyse_scriptNames_List").append("<div class=\"list-group\">\n" +
        "                    <a class=\"list-group-item active\">\n" +
        "                        <h5>\n" +
        "                            " + data + "\n" +
        "                        </h5>\n" +
        "                    </a>\n" +
        "                </div>");
}

function addScriptNameListNoMoreMessage() {
    $("#stock_analyse_scriptNames_List").append("<div class=\"col-lg-6 col-center-block\"><p>没有更多了 ......</p></div>");
}

//-------------------------------------------------------------------- stock analyse code positive

function clearStockCodeAnalysePositiveList() {
    $("#stock_analyse_stockCode_positive_List").empty();
}

function searchStockAnalyseCodePositiveDatas(code, page, size) {
    executeGetWithJson(
        BASE_URL_STOCK_ANALYSE + "/" + code + "/results/positive?page=" + page + "&size=" + size,
        function (datas) {
            if (datas.length === 0) {
                addStockAnalyseCodePositiveListNoMoreMessage();
                return;
            }
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                addStockAnalyseCodePositiveListItem(data);
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function addStockAnalyseCodePositiveListItem(data) {
    $("#stock_analyse_stockCode_positive_List").append("<div class=\"list-group\">\n" +
        "                    <a class=\"list-group-item active\">\n" +
        "                        <h3>\n" +
        "                            " + data.stockCode + "  -  " + data.analyseDate + "  - " + data.resultCode + "\n" +
        "                        </h3>\n" +
        "                    </a>\n" +
        "                    <a class=\"list-group-item\">\n" +
        "                        <h3>\n" +
        "                            脚本名称: " + data.scriptName + "\n" +
        "                        </h3>\n" +
        "                        <h4>\n" +
        "                            脚本描述: " + data.scriptDescription + "\n" +
        "                        </h4>\n" +
        "                        <br>\n" +
        "                        <h5>\n" +
        "                            分析时间段: 【" + data.analyseRangeStart + "  -  " + data.analyseRangeEnd + "】\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            结果文本描述: " + data.resultText + "\n" +
        "                        </h5>\n" +
        "                    </a>\n" +
        "                </div>");
}

function addStockAnalyseCodePositiveListNoMoreMessage() {
    $("#stock_analyse_stockCode_positive_List").append("<div class=\"col-lg-6 col-center-block\"><p>没有更多了 ......</p></div>");
}

//-------------------------------------------------------------------- stock analyse code negative

function clearStockCodeAnalyseNegativeList() {
    $("#stock_analyse_stockCode_negative_List").empty();
}

function searchStockAnalyseCodeNegativeDatas(code, page, size) {
    executeGetWithJson(
        BASE_URL_STOCK_ANALYSE + "/" + code + "/results/negative?page=" + page + "&size=" + size,
        function (datas) {
            if (datas.length === 0) {
                addStockAnalyseCodeNegativeListNoMoreMessage();
                return;
            }
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                addStockAnalyseCodeNegativeListItem(data);
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function addStockAnalyseCodeNegativeListItem(data) {
    $("#stock_analyse_stockCode_negative_List").append("<div class=\"list-group\">\n" +
        "                    <a class=\"list-group-item active\">\n" +
        "                        <h3>\n" +
        "                            " + data.stockCode + "  -  " + data.analyseDate + "  - " + data.resultCode + "\n" +
        "                        </h3>\n" +
        "                    </a>\n" +
        "                    <a class=\"list-group-item\">\n" +
        "                        <h3>\n" +
        "                            脚本名称: " + data.scriptName + "\n" +
        "                        </h3>\n" +
        "                        <h4>\n" +
        "                            脚本描述: " + data.scriptDescription + "\n" +
        "                        </h4>\n" +
        "                        <br>\n" +
        "                        <h5>\n" +
        "                            分析时间段: 【" + data.analyseRangeStart + "  -  " + data.analyseRangeEnd + "】\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            结果文本描述: " + data.resultText + "\n" +
        "                        </h5>\n" +
        "                    </a>\n" +
        "                </div>");
}

function addStockAnalyseCodeNegativeListNoMoreMessage() {
    $("#stock_analyse_stockCode_negative_List").append("<div class=\"col-lg-6 col-center-block\"><p>没有更多了 ......</p></div>");
}

//-------------------------------------------------------------------- stock analyse script name positive

function clearScriptNameAnalysePositiveList() {
    $("#stock_analyse_scriptName_positive_List").empty();
}

function searchScriptNameAnalysePositiveDatas(name, page, size) {
    executeGetWithJson(
        BASE_URL_STOCK_ANALYSE + "/scriptName/" + name + "/results/positive?page=" + page + "&size=" + size,
        function (datas) {
            if (datas.length === 0) {
                addScriptNameAnalysePositiveListNoMoreMessage();
                return;
            }
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                addScriptNameAnalysePositiveListItem(data);
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function addScriptNameAnalysePositiveListItem(data) {
    $("#stock_analyse_scriptName_positive_List").append("<div class=\"list-group\">\n" +
        "                    <a class=\"list-group-item active\">\n" +
        "                        <h3>\n" +
        "                            " + data.stockCode + "  -  " + data.analyseDate + "  - " + data.resultCode + "\n" +
        "                        </h3>\n" +
        "                    </a>\n" +
        "                    <a class=\"list-group-item\">\n" +
        "                        <h3>\n" +
        "                            脚本名称: " + data.scriptName + "\n" +
        "                        </h3>\n" +
        "                        <h4>\n" +
        "                            脚本描述: " + data.scriptDescription + "\n" +
        "                        </h4>\n" +
        "                        <br>\n" +
        "                        <h5>\n" +
        "                            分析时间段: 【" + data.analyseRangeStart + "  -  " + data.analyseRangeEnd + "】\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            结果文本描述: " + data.resultText + "\n" +
        "                        </h5>\n" +
        "                    </a>\n" +
        "                </div>");
}

function addScriptNameAnalysePositiveListNoMoreMessage() {
    $("#stock_analyse_scriptName_positive_List").append("<div class=\"col-lg-6 col-center-block\"><p>没有更多了 ......</p></div>");
}

//-------------------------------------------------------------------- stock analyse script name negative

function clearScriptNameAnalyseNegativeList() {
    $("#stock_analyse_scriptName_negative_List").empty();
}

function searchScriptNameAnalyseNegativeDatas(name, page, size) {
    executeGetWithJson(
        BASE_URL_STOCK_ANALYSE + "/scriptName/" + name + "/results/negative?page=" + page + "&size=" + size,
        function (datas) {
            if (datas.length === 0) {
                addScriptNameAnalyseNegativeListNoMoreMessage();
                return;
            }
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                addScriptNameAnalyseNegativeListItem(data);
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function addScriptNameAnalyseNegativeListItem(data) {
    $("#stock_analyse_scriptName_negative_List").append("<div class=\"list-group\">\n" +
        "                    <a class=\"list-group-item active\">\n" +
        "                        <h3>\n" +
        "                            " + data.stockCode + "  -  " + data.analyseDate + "  - " + data.resultCode + "\n" +
        "                        </h3>\n" +
        "                    </a>\n" +
        "                    <a class=\"list-group-item\">\n" +
        "                        <h3>\n" +
        "                            脚本名称: " + data.scriptName + "\n" +
        "                        </h3>\n" +
        "                        <h4>\n" +
        "                            脚本描述: " + data.scriptDescription + "\n" +
        "                        </h4>\n" +
        "                        <br>\n" +
        "                        <h5>\n" +
        "                            分析时间段: 【" + data.analyseRangeStart + "  -  " + data.analyseRangeEnd + "】\n" +
        "                        </h5>\n" +
        "                        <h5>\n" +
        "                            结果文本描述: " + data.resultText + "\n" +
        "                        </h5>\n" +
        "                    </a>\n" +
        "                </div>");
}

function addScriptNameAnalyseNegativeListNoMoreMessage() {
    $("#stock_analyse_scriptName_negative_List").append("<div class=\"col-lg-6 col-center-block\"><p>没有更多了 ......</p></div>");
}

//-------------------------------------------------------------------- stock analyse email notify (query & add)

function getEmailNotifyData() {
    $("#stock_analyse_notify_Email_List").empty();
    executeGetWithJson(
        BASE_URL_STOCK_ANALYSE + "/notify/all",
        function (datas) {
            if (datas.length === 0) {
                return;
            }
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var id = data.id;
                var address = data.address;
                $("#stock_analyse_notify_Email_List").append("<div class=\"list-group\">\n" +
                    "\t<div href=\"#\" class=\"list-group-item active\">\n" +
                    "\t\t<h4 class=\"list-group-item-heading\">\n" +
                    "\t\t【推送邮件地址】  " + address + "\n" +
                    "\t\t</h4>\n" +
                    "\t</div>\n" +
                    "\t\n" +
                    "\t<div href=\"#\" class=\"list-group-item\">\n" +
                    "\t\t<div>\n" +
                    "\t\t<button class=\"btn btn-link\"><a onclick='deleteStockAnalyseNotifyEmail(\"" + id + "\")'>删除该推送任务</a></button>\n" +
                    "\t\t</div>\n" +
                    "\t</div>\n" +
                    "</div>");
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function deleteStockAnalyseNotifyEmail(id) {
    executeGetWithJson(
        BASE_URL_STOCK_ANALYSE + "/notify/" + id + "/delete",
        function (data) {
            if (data || data === true || data.result === true) {
                alert("删除成功");
                getEmailNotifyData();
            } else {
                alert("删除失败");
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

/**
 * 切换显示界面
 *
 * @param position
 */
function changeDisplay(position) {
    switch (position) {
        case 1:
            $("#stock_stock_query").removeAttr("style");
            $("#stock_stock_data_query").attr("style", "display: none;");
            $("#stock_analyse_scriptNames").attr("style", "display: none;");
            $("#stock_analyse_stockCode_positive").attr("style", "display: none;");
            $("#stock_analyse_stockCode_negative").attr("style", "display: none;");
            $("#stock_analyse_scriptName_positive").attr("style", "display: none;");
            $("#stock_analyse_scriptName_negative").attr("style", "display: none;");
            $("#stock_analyse_email_notify_query").attr("style", "display: none;");
            $("#stock_analyse_email_notify_add").attr("style", "display: none;");
            break;
        case 2:
            $("#stock_stock_query").attr("style", "display: none;");
            $("#stock_stock_data_query").removeAttr("style");
            $("#stock_analyse_scriptNames").attr("style", "display: none;");
            $("#stock_analyse_stockCode_positive").attr("style", "display: none;");
            $("#stock_analyse_stockCode_negative").attr("style", "display: none;");
            $("#stock_analyse_scriptName_positive").attr("style", "display: none;");
            $("#stock_analyse_scriptName_negative").attr("style", "display: none;");
            $("#stock_analyse_email_notify_query").attr("style", "display: none;");
            $("#stock_analyse_email_notify_add").attr("style", "display: none;");
            break;
        case 3:
            $("#stock_stock_query").attr("style", "display: none;");
            $("#stock_stock_data_query").attr("style", "display: none;");
            $("#stock_analyse_scriptNames").removeAttr("style");
            $("#stock_analyse_stockCode_positive").attr("style", "display: none;");
            $("#stock_analyse_stockCode_negative").attr("style", "display: none;");
            $("#stock_analyse_scriptName_positive").attr("style", "display: none;");
            $("#stock_analyse_scriptName_negative").attr("style", "display: none;");
            $("#stock_analyse_email_notify_query").attr("style", "display: none;");
            $("#stock_analyse_email_notify_add").attr("style", "display: none;");
            break;
        case 4:
            $("#stock_stock_query").attr("style", "display: none;");
            $("#stock_stock_data_query").attr("style", "display: none;");
            $("#stock_analyse_scriptNames").attr("style", "display: none;");
            $("#stock_analyse_stockCode_positive").removeAttr("style");
            $("#stock_analyse_stockCode_negative").attr("style", "display: none;");
            $("#stock_analyse_scriptName_positive").attr("style", "display: none;");
            $("#stock_analyse_scriptName_negative").attr("style", "display: none;");
            $("#stock_analyse_email_notify_query").attr("style", "display: none;");
            $("#stock_analyse_email_notify_add").attr("style", "display: none;");
            break;
        case 5:
            $("#stock_stock_query").attr("style", "display: none;");
            $("#stock_stock_data_query").attr("style", "display: none;");
            $("#stock_analyse_scriptNames").attr("style", "display: none;");
            $("#stock_analyse_stockCode_positive").attr("style", "display: none;");
            $("#stock_analyse_stockCode_negative").removeAttr("style");
            $("#stock_analyse_scriptName_positive").attr("style", "display: none;");
            $("#stock_analyse_scriptName_negative").attr("style", "display: none;");
            $("#stock_analyse_email_notify_query").attr("style", "display: none;");
            $("#stock_analyse_email_notify_add").attr("style", "display: none;");
            break;
        case 6:
            $("#stock_stock_query").attr("style", "display: none;");
            $("#stock_stock_data_query").attr("style", "display: none;");
            $("#stock_analyse_scriptNames").attr("style", "display: none;");
            $("#stock_analyse_stockCode_positive").attr("style", "display: none;");
            $("#stock_analyse_stockCode_negative").attr("style", "display: none;");
            $("#stock_analyse_scriptName_positive").removeAttr("style");
            $("#stock_analyse_scriptName_negative").attr("style", "display: none;");
            $("#stock_analyse_email_notify_query").attr("style", "display: none;");
            $("#stock_analyse_email_notify_add").attr("style", "display: none;");
            break;
        case 7:
            $("#stock_stock_query").attr("style", "display: none;");
            $("#stock_stock_data_query").attr("style", "display: none;");
            $("#stock_analyse_scriptNames").attr("style", "display: none;");
            $("#stock_analyse_stockCode_positive").attr("style", "display: none;");
            $("#stock_analyse_stockCode_negative").attr("style", "display: none;");
            $("#stock_analyse_scriptName_positive").attr("style", "display: none;");
            $("#stock_analyse_scriptName_negative").removeAttr("style");
            $("#stock_analyse_email_notify_query").attr("style", "display: none;");
            $("#stock_analyse_email_notify_add").attr("style", "display: none;");
            break;
        case 8:
            $("#stock_stock_query").attr("style", "display: none;");
            $("#stock_stock_data_query").attr("style", "display: none;");
            $("#stock_analyse_scriptNames").attr("style", "display: none;");
            $("#stock_analyse_stockCode_positive").attr("style", "display: none;");
            $("#stock_analyse_stockCode_negative").attr("style", "display: none;");
            $("#stock_analyse_scriptName_positive").attr("style", "display: none;");
            $("#stock_analyse_scriptName_negative").attr("style", "display: none;");
            $("#stock_analyse_email_notify_query").removeAttr("style");
            $("#stock_analyse_email_notify_add").attr("style", "display: none;");
            break;
        case 9:
            $("#stock_stock_query").attr("style", "display: none;");
            $("#stock_stock_data_query").attr("style", "display: none;");
            $("#stock_analyse_scriptNames").attr("style", "display: none;");
            $("#stock_analyse_stockCode_positive").attr("style", "display: none;");
            $("#stock_analyse_stockCode_negative").attr("style", "display: none;");
            $("#stock_analyse_scriptName_positive").attr("style", "display: none;");
            $("#stock_analyse_scriptName_negative").attr("style", "display: none;");
            $("#stock_analyse_email_notify_query").attr("style", "display: none;");
            $("#stock_analyse_email_notify_add").removeAttr("style");
            break;
    }
}