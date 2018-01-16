var refresh;

/**
 * jquery
 */
$(document).ready(function () {
    refresh = false;

    /**
     * 3s定时执行刷新
     */
    window.setInterval(function () {
        if (refresh === true) {
            refreshEnable();
        }
    }, 3000);

    /**
     * 定时刷新按钮
     */
    $("#stock_stock_data_query_input_btn_refresh").click(function () {
        if (refresh === false) {
            refresh = true;
            $("#stock_stock_data_query_input_btn_refresh").text("关闭定时刷新");
        } else {
            refresh = false;
            $("#stock_stock_data_query_input_btn_refresh").text("开启定时刷新");
        }
    });

    $("#stock_stock_data_latest_query_input_stockCode").keydown(function (event) {
        var keyCode = event.which;
        if (keyCode === 13) {//回车键
            var searchValue = $("#stock_stock_data_latest_query_input_stockCode").val();
            if (searchValue) {
                var reg = new RegExp("^[0-9]{6}$");
                if (reg.test(searchValue) === true) {
                    refreshData(searchValue);
                }
            }
        }
    });

    $("#stock_stock_data_query_input_btn_query").click(function () {
        var searchValue = $("#stock_stock_data_latest_query_input_stockCode").val();
        if (searchValue != "")
            refreshData(searchValue);
    });

    $("#stock_stock_data_latest_query_input_stockCode").focusout(function () {
        var code = $("#stock_stock_data_latest_query_input_stockCode").val();
        if (code) {
            var reg = new RegExp("^[0-9]{6}$");
            if (reg.test(code) === true) {
                return;
            } else {
                alert("股票代码格式不正确！");
                $("#stock_stock_data_latest_query_input_stockCode").val("");
            }
        }
    });
});

function refreshEnable() {
    var searchValue = $("#stock_stock_data_latest_query_input_stockCode").val();
    if (searchValue) {
        var reg = new RegExp("^[0-9]{6}$");
        if (reg.test(searchValue) === true) {
            refreshData(searchValue);
        }
    }
}

function refreshData(stockCode) {
    $("#stock_stock_data_latest_pane").empty();
    executeGetWithJson(
        BASE_URL_STOCK + "/data/latest/" + stockCode,
        function (data) {
            addStockDataListItem(data);
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function addStockDataListItem(data) {
    $("#stock_stock_data_latest_pane").append("<div class=\"list-group\">\n" +
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