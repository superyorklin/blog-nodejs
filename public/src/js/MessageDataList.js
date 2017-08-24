/**
 * jquery
 */
$(document).ready(function () {
    var baseURL = "http://42.96.169.172/assistance/rest/v1/message";

    var page = 0;
    var size = 10;//每页显示十条数据
    var messageType = "news";
    var hisOrLatest = "history";

    initPagination(10);//分页按钮初始化 TODO

    /**
     *
     */
    $("#messageList").ready(function () {
        for (var i = 0; i < 4; i++) {
            addListNode("测试headLine", "测试Content", "https://www.baidu.com/", "测试source", "tag1, tag2, tag3");
        }
    });

    /**
     * 获取最新数据
     *
     * @param messageType
     * @param page
     * @param size
     */
    function getLatestData(messageType, page, size) {

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
            case "news":
                var URL = baseURL + "/history/news/page?page=" + page + "&size=" + size;
                $.cookie("language", "zh_CN");
                $.cookie("token", "uvaw68qm1ryifmogiaj6");
                $.ajax({
                    url: URL,
                    contentType: "application/json",
                    success: function (res) {
                        alert(res.toString());
                    }
                });
                break;
            case "stock":
                var URL = baseURL + "/history/stock/page?page=" + page + "&size=" + size;
                break;
            case "fund":
                var URL = baseURL + "/history/fund/page?page=" + page + "&size=" + size;
                break;
        }
    }

    /**
     * message列表添加一条元素
     */
    function addListNode(headLine, content, href, source, tags) {
        $("#messageList").append("<div class=\"list-group\">\n" +
            "<a class=\"list-group-item active\" href=\"" + href + "\">\n" +
            "<h3 class=\"list-group-item-heading\">\n" +
            "" + headLine + ":\n" +
            "</h3>\n" +
            "</a>\n" +
            "<a class=\"list-group-item\">\n" +
            "<h3 class=\"list-group-item-text\">\n" +
            "" + content + "\n" +
            "</h3>\n" +
            "<br>\n" +
            "<h4>\n" +
            "" + source + "\n" +
            "</h4>\n" +
            "<h4>\n" +
            "" + tags + "\n" +
            "</h4>\n" +
            "</a>\n" +
            "</div>");
    }

    /**
     * 添加数据列表页数
     *
     * @param pages
     */
    function initPagination(pages) {
        $("#messageListPagination").append("<li><a href=\"#\">&laquo;</a></li>");
        for (var i = 0; i < pages; i++) {
            $("#messageListPagination").append("<li><a href=\"#\">" + (i + 1) + "</a></li>");
        }
        $("#messageListPagination").append("<li><a href=\"#\">&raquo;</a></li>");
    }
});