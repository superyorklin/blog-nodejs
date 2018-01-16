var page = 0;
var size = 30;

/**
 * Jquery
 */
$(document).ready(function () {
    changeDispaly(0);

    /**
     * 最新
     */
    $("#nav_btn_hotSearch_latest").click(function () {
        changeDispaly(0);
    });

    /**
     * 历史
     */
    $("#nav_btn_hotSearch_history").click(function () {
        changeDispaly(1);
    });

    /**
     * 获取更多按钮
     */
    $("#hot_search_message_btn_getMore").click(function () {
        page++;
        getHistoryData(page, size);
    })
});

/**
 * 数据列表显示清空
 */
function clearDataList() {
    $("#hotSearchMessageList").empty();
}

function changeDispaly(type) {
    switch (type) {
        case 0:
            $("#message_bread_info_hotSearch_type").text("最新热搜");
            $("#hotSearchMessageTagChosenDisplay").removeAttr("style");
            getTags();
            clearDataList();
            getLatestData();
            break;
        case 1:
            page = 0;
            $("#message_bread_info_hotSearch_type").text("历史热搜");
            $("#hotSearchMessageTagChosenDisplay").attr("style", "display: none;");
            clearDataList();
            getHistoryData(page, size);
            break;
    }
}

function addListNoMoreMessage() {
    $("#hotSearchMessageList").append("<div class=\"col-lg-6 col-center-block\"><p>没有更多了 ......</p></div>");
}

/**
 * message列表添加一条元素
 */
function addListNodeItem(rank, keyword, tag, index, heatDegree, href, updateTime) {
    var tagStr = "";
    if (tag) {
        tagStr = "*" + tag + "*";
    }

    $("#hotSearchMessageList").append("<div class=\"list-group\">\n" +
        "\t<a class=\"list-group-item active\" href=\"" + href + "\" target=\"_blank\">\n" +
        "\t\t<h5 class=\"list-group-item-heading\">【" + rank + "】    " + keyword + "  " + tagStr + "</h5>\n" +
        "\t</a>\n" +
        "\t<a class=\"list-group-item\">\n" +
        "\t\t<h6 class=\"list-group-item-text\">搜索指数：" + index + "</h6>\n" +
        "\t\t<h6 class=\"list-group-item-text\">搜索热度：" + heatDegree + "</h6>\n" +
        "\t\t<h6 class=\"list-group-item-text\">更新时间：" + updateTime + "</h6>\n" +
        "\t</a>\n" +
        "</div>");
}

function displayResults(datas) {
    if (datas.length === 0)
        addListNoMoreMessage();
    for (var i = 0; i < datas.length; i++) {
        var data = datas[i];
        addListNodeItem(data.rank, data.keyword, data.tag, data.index, data.heatDegree, data.href, data.updateTime);
    }
}

function getLatestData() {
    executeGetWithJson(
        BASE_URL_MESSAGE_WEIBO_HOT_SEARCH + "/latest",
        function (data) {
            displayResults(data);
        },
        function (data, code) {
            alert(data.message);
        }
    );
}

function getLatestFilteringData(tag) {
    executeGetWithJson(
        BASE_URL_MESSAGE_WEIBO_HOT_SEARCH + "/latest/" + tag,
        function (data) {
            displayResults(data);
        },
        function (data, code) {
            alert(data.message);
        }
    );
}

function getHistoryData(page, size) {
    executeGetWithJson(
        BASE_URL_MESSAGE_WEIBO_HOT_SEARCH + "/history?page=" + page + "&size=" + size,
        function (data) {
            displayResults(data);
        },
        function (data, code) {
            alert(data.message);
        }
    );
}

function getTags() {
    $("#hotSearchMessageTagChosen_tag").empty();
    $("#hotSearchMessageTagChosen_tag").append("<option>不过滤</option>");
    executeGetWithJson(
        BASE_URL_MESSAGE_WEIBO_HOT_SEARCH + "/tags",
        function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $("#hotSearchMessageTagChosen_tag").append("<option>" + data[i] + "</option>");
                }
            }
        },
        function (data, code) {
            alert(data.message);
        }
    );
}

function tagFilter() {
    var tag = $("#hotSearchMessageTagChosen_tag").val();
    switch (tag) {
        case "不过滤":
            clearDataList();
            getLatestData();
            break;
        default:
            clearDataList();
            getLatestFilteringData(tag);
            break;
    }
}