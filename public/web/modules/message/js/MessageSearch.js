var page = 0;
var size = 10;
var contains;

/**
 * Jquery
 */
$(document).ready(function () {
    /**
     * 点击搜索
     */
    $("#message_search_query_input_btn_query").click(function () {
        contains = $("#message_search_query_input_contains").val();
        if (contains === null || contains === "")
            return;
        clearList();
        page = 0;
        getData(contains, page, size);
    });

    $("#message_search_query_input_contains").keydown(function (event) {
        if (event.which === 13) {
            contains = $("#message_search_query_input_contains").val();
            if (contains === null || contains === "")
                return;
            clearList();
            page = 0;
            getData(contains, page, size);
        }
    });

    /**
     * 点击加载更多
     */
    $("#message_search_btn_getMore").click(function () {
        if (contains === null || contains === "")
            return;
        page++;
        getData(contains, page, size);
    });
});

function getData(contains, page, size) {
    executeGetWithJson(
        BASE_URL_MESSAGE + "/history/page/headLine?contains=" + contains + "&page=" + page + "&size=" + size,
        function (data) {
            displayResults(data);
        },
        function (data, code) {
            alert(data.message);
        }
    );
}

function displayResults(datas) {
    if (datas.length === 0)
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

function addListNoMoreMessage() {
    $("#messageSearchList").append("<div class=\"col-lg-6 col-center-block\"><p>没有更多了 ......</p></div>");
}

/**
 * 清空列表数据
 */
function clearList() {
    $("#messageSearchList").empty();
}

/**
 * message列表添加一条元素
 */
function addListNode(headLine, content, href, source, tags, time) {
    $("#messageSearchList").append("<div class=\"list-group\">\n" +
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

