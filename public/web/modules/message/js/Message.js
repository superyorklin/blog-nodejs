var page = 1;//initializeDisplay方法显示的是0
var size = 10;//每页显示十条数据
var messageType = "technology";

/**
 * jquery
 */
$(document).ready(function () {
    initializeDisplay();

    /**
     * 点击获取更多按钮
     */
    $("#message_btn_getMore").click(function () {
        getData(messageType, page, size);
        page++;
    });

    $("#message_btn_news_technology").click(function () {
        page = 1;
        messageType = "technology";
        changeNavHeaderDisplayInfo("科技");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_video").click(function () {
        page = 1;
        messageType = "video";
        changeNavHeaderDisplayInfo("视频");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_entertainment").click(function () {
        page = 1;
        messageType = "entertainment";
        changeNavHeaderDisplayInfo("娱乐");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_military").click(function () {
        page = 1;
        messageType = "military";
        changeNavHeaderDisplayInfo("军事");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_society").click(function () {
        page = 1;
        messageType = "society";
        changeNavHeaderDisplayInfo("社会");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_physical").click(function () {
        page = 1;
        messageType = "physical";
        changeNavHeaderDisplayInfo("健康");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_international").click(function () {
        page = 1;
        messageType = "international";
        changeNavHeaderDisplayInfo("国际");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_movie").click(function () {
        page = 1;
        messageType = "movie";
        changeNavHeaderDisplayInfo("电影");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_photo").click(function () {
        page = 1;
        messageType = "photo";
        changeNavHeaderDisplayInfo("图片");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_finance").click(function () {
        page = 1;
        messageType = "finance";
        changeNavHeaderDisplayInfo("财经");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_stock").click(function () {
        page = 1;
        messageType = "stock";
        changeNavHeaderDisplayInfo("股票");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_fund").click(function () {
        page = 1;
        messageType = "fund";
        changeNavHeaderDisplayInfo("基金");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_fashion").click(function () {
        page = 1;
        messageType = "fashion";
        changeNavHeaderDisplayInfo("时尚");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_car").click(function () {
        page = 1;
        messageType = "car";
        changeNavHeaderDisplayInfo("汽车");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_house").click(function () {
        page = 1;
        messageType = "house";
        changeNavHeaderDisplayInfo("房产");
        clearList();
        initializeDisplay();
    });

    $("#message_btn_news_game").click(function () {
        page = 1;
        messageType = "game";
        changeNavHeaderDisplayInfo("游戏");
        clearList();
        initializeDisplay();
    });
});

/**
 * 页面初始化数据展示
 */
function initializeDisplay() {
    getData(messageType, 0, size);
}

/**
 * 获取历史数据
 *
 * @param messageType
 * @param page
 * @param size
 */
function getData(messageType, page, size) {
    executeGetWithJson(
        BASE_URL_MESSAGE + "/" + messageType + "/page?page=" + page + "&size=" + size,
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

function changeNavHeaderDisplayInfo(type) {
    $("#message_bread_info_type").text(type);
    switch (type) {
        case "科技":
            $("#message_btn_news_technology").attr("class", "active");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "视频":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").attr("class", "active");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "娱乐":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").attr("class", "active");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "军事":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").attr("class", "active");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "社会":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").attr("class", "active");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "健康":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").attr("class", "active");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "国际":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").attr("class", "active");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "电影":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").attr("class", "active");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "图片":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").attr("class", "active");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "财经":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").attr("class", "active");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "股票":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").attr("class", "active");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "基金":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").attr("class", "active");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "时尚":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").attr("class", "active");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "汽车":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").attr("class", "active");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "房产":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").attr("class", "active");
            $("#message_btn_news_game").removeAttr("class");
            break;
        case "游戏":
            $("#message_btn_news_technology").removeAttr("class");
            $("#message_btn_news_video").removeAttr("class");
            $("#message_btn_news_entertainment").removeAttr("class");
            $("#message_btn_news_military").removeAttr("class");
            $("#message_btn_news_society").removeAttr("class");
            $("#message_btn_news_physical").removeAttr("class");
            $("#message_btn_news_international").removeAttr("class");
            $("#message_btn_news_movie").removeAttr("class");
            $("#message_btn_news_photo").removeAttr("class");
            $("#message_btn_news_finance").removeAttr("class");
            $("#message_btn_news_stock").removeAttr("class");
            $("#message_btn_news_fund").removeAttr("class");
            $("#message_btn_news_fashion").removeAttr("class");
            $("#message_btn_news_car").removeAttr("class");
            $("#message_btn_news_house").removeAttr("class");
            $("#message_btn_news_game").attr("class", "active");
            break;
    }
}