var page = 1;//initializeDisplay方法显示的是0
var size = 10;//每页显示十条数据
var messageType = "finance";

/**
 * jquery
 */
$(document).ready(function () {
    initializeDisplay();

    /**
     * 点击获取更多按钮
     */
    $("#message_btn_getMore").click(function () {
        getHistoryData(messageType, page, size);
        page++;
    });

    $("#message_btn_news_history").click(function () {
        page = 1;
        messageType = "finance";
        changeNavHeaderInfo("财经");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_fund_history").click(function () {
        page = 1;
        messageType = "fund";
        changeNavHeaderInfo("基金");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_stock_history").click(function () {
        page = 1;
        messageType = "stock";
        changeNavHeaderInfo("股票");
        clearList();
        initializeDisplay();
    });
});

/**
 * 页面初始化数据展示
 */
function initializeDisplay() {
    getHistoryData(messageType, 0, size);
}

/**
 * 获取历史数据
 *
 * @param messageType
 * @param page
 * @param size
 */
function getHistoryData(messageType, page, size) {
    switch (messageType) {
        case "finance":
            executeGetWithJson(
                BASE_URL_MESSAGE + "/finance/page?page=" + page + "&size=" + size,
                function (data) {
                    displayResults(data);
                },
                function (data, code) {
                    alert(data.message);
                }
            );
            break;
        case "stock":
            executeGetWithJson(
                BASE_URL_MESSAGE + "/stock/page?page=" + page + "&size=" + size,
                function (data) {
                    displayResults(data);
                },
                function (data, code) {
                    alert(data.message);
                }
            );
            break;
        case "fund":
            executeGetWithJson(
                BASE_URL_MESSAGE + "/fund/page?page=" + page + "&size=" + size,
                function (data) {
                    displayResults(data);
                },
                function (data, code) {
                    alert(data.message);
                }
            );
            break;
    }
}

function displayResults(datas) {
    if (datas.length == 0)
        addListNoMoreMessage();
    for (var i = 0; i < datas.length; i++) {
        var data = datas[i];
        var tags = "";
        for (var j = 0; j < data.tags.length; j++) {
            var tag = data.tags[j];
            tags += (tag + "  ");
        }
        addListNode(data.headLine, data.content, data.href, data.source, tags, formatDateTime(data.time));
    }
}

/**
 * 清空列表数据
 */
function clearList() {
    $("#messageList").empty();
}

/**
 * message列表添加一条元素
 */
function addListNode(headLine, content, href, source, tags, time) {
    $("#messageList").append("<div class=\"list-group\">\n" +
        "<a class=\"list-group-item active\" href=\"" + href + "\" target=\"_blank\">\n" +
        "<h4 class=\"list-group-item-heading\">\n" +
        "" + "【点击查看详情】" + headLine + ":\n" +
        "</h4>\n" +
        "</a>\n" +
        "<a class=\"list-group-item\">\n" +
        "<h5 class=\"list-group-item-text\">\n" +
        "" + content + "\n" +
        "</h5>\n" +
        "<br>\n" +
        "<h5>\n" +
        "" + source + "\n" +
        "</h5>\n" +
        "<h5>\n" +
        "" + tags + "\n" +
        "</h5>\n" +
        "<h6>\n" +
        "爬取时间:" + time + "\n" +
        "</h6>\n" +
        "</a>\n" +
        "</div>");
}

function addListNoMoreMessage() {
    $("#messageList").append("<div class=\"col-lg-6 col-center-block\"><p>没有更多了 ......</p></div>");
}

function changeNavHeaderInfo(type) {
    $("#message_bread_info_type").text(type);
    switch (type) {
        case "财经":
            $("#message_btn_news_history").attr("class", "active");
            $("#message_btn_stock_history").removeAttr("class");
            $("#message_btn_fund_history").removeAttr("class");
            break;
        case "股票":
            $("#message_btn_news_history").removeAttr("class");
            $("#message_btn_stock_history").attr("class", "active");
            $("#message_btn_fund_history").removeAttr("class");
            break;
        case "基金":
            $("#message_btn_news_history").removeAttr("class");
            $("#message_btn_stock_history").removeAttr("class");
            $("#message_btn_fund_history").attr("class", "active");
            break;
    }
}