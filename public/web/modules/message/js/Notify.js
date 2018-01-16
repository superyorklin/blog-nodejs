/**
 * jquery
 */
$(document).ready(function () {
    changePage(1);

    $("#notify_email_watch_email").click(function () {
        changePage(1);
    });

    $("#notify_email_add_email").click(function () {
        changePage(2);
    });

    /**
     * 添加推送邮件信息点击提交
     */
    $("#notify_email_add_form_submit").click(function () {
        var address = $("#notify_email_add_address").val();
        if (!address) {
            alert("邮件地址不能为空！");
            return;
        }
        var typeRaw = $("#notify_email_add_type").val();
        var type = typeEn(typeRaw);
        var rangeRaw = $("#notify_email_add_message_range").val();
        var range = rangeEn(rangeRaw);
        var notifyDayRaw = $("#notify_email_add_notify_day").val();
        var notifyDay = dayEn(notifyDayRaw);
        var notifyHour = $("#notify_email_add_notify_hour").val();
        var notifyMinute = $("#notify_email_add_notify_minute").val();

        executePostWithJson(
            BASE_URL_MESSAGE_EMAIL_NOTIFY + "/save",
            JSON.stringify({
                "address": address,
                "messageType": type,
                "messageRange": range,
                "notifyDay": notifyDay,
                "notifyHour": notifyHour,
                "notifyMinute": notifyMinute
            }),
            function (data) {
                if (data) {
                    alert("添加成功！");
                    changePage(1);
                } else {
                    alert("添加失败！");
                }
            },
            function (data, status) {
                alert(data.message);
            }
        );
    });

    /**
     * 检查邮件地址合法性
     */
    $("#notify_email_add_address").focusout(function () {
        var address = $("#notify_email_add_address").val();
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
});

/**
 * 获取中文推送时间(天)
 *
 * @param dayEn
 */
function dayCh(dayEn) {
    var day;
    switch (dayEn) {
        case "everyDay":
            day = "每天";
            break;
        case "weekend":
            day = "周末";
            break;
        case "weekDay":
            day = "工作日";
            break;
    }
    return day;
}

/**
 * 获取英文推送时间(天)
 *
 * @param dayCh
 */
function dayEn(dayCh) {
    var day;
    switch (dayCh) {
        case "每天":
            day = "everyDay";
            break;
        case "周末":
            day = "weekend";
            break;
        case "工作日":
            day = "weekDay";
            break;
    }
    return day;
}

/**
 * 获取中文时间段
 *
 * @param rangeEn
 * @returns {*}
 */
function rangeCh(rangeEn) {
    var range;
    switch (rangeEn) {
        case "last_one_hour":
            range = "最近一小时";
            break;
        case "last_two_hours":
            range = "最近二小时";
            break;
        case "last_five_hours":
            range = "最近五小时";
            break;
        case "last_ten_hours":
            range = "最近十小时";
            break;
        case "last_twelve_hours":
            range = "最近十二小时";
            break;
        case "last_one_day":
            range = "最近一天";
            break;
        default:
            range = "最近一天";
            break;
    }
    return range;
}

/**
 * 获取英文时间段
 *
 * @param rangeCh
 * @returns {*}
 */
function rangeEn(rangeCh) {
    var range;
    switch (rangeCh) {
        case "最近一小时":
            range = "last_one_hour";
            break;
        case "最近二小时":
            range = "last_two_hours";
            break;
        case "最近五小时":
            range = "last_five_hours";
            break;
        case "最近十小时":
            range = "last_ten_hours";
            break;
        case "最近十二小时":
            range = "last_twelve_hours";
            break;
        case "最近一天":
            range = "last_one_day";
            break;
        default:
            range = "last_one_day";
            break;
    }
    return range;
}

/**
 * 获取type对应的英文
 *
 * @param typeEn
 */
function typeEn(typeEn) {
    var type;
    switch (typeEn) {
        case "科技":
            type = "technology";
            break;
        case "视频":
            type = "video";
            break;
        case "娱乐":
            type = "entertainment";
            break;
        case "军事":
            type = "military";
            break;
        case "社会":
            type = "society";
            break;
        case "健康":
            type = "physical";
            break;
        case "国际":
            type = "international";
            break;
        case "电影":
            type = "movie";
            break;
        case "图片":
            type = "photo";
            break;
        case "财经":
            type = "finance";
            break;
        case "股票":
            type = "stock";
            break;
        case "基金":
            type = "fund";
            break;
        case "时尚":
            type = "fashion";
            break;
        case "汽车":
            type = "car";
            break;
        case "房产":
            type = "house";
            break;
        case "游戏":
            type = "game";
            break;
        default:
            type = "technology";
            break;
    }
    return type;
}

/**
 * 获取type对应的中文
 *
 * @param typeCh
 */
function typeCh(typeCh) {
    var type;
    switch (typeCh) {
        case "technology":
            type = "科技";
            break;
        case "video":
            type = "视频";
            break;
        case "entertainment":
            type = "娱乐";
            break;
        case "military":
            type = "军事";
            break;
        case "society":
            type = "社会";
            break;
        case "physical":
            type = "健康";
            break;
        case "international":
            type = "国际";
            break;
        case "movie":
            type = "电影";
            break;
        case "photo":
            type = "图片";
            break;
        case "finance":
            type = "财经";
            break;
        case "stock":
            type = "股票";
            break;
        case "fund":
            type = "基金";
            break;
        case "fashion":
            type = "时尚";
            break;
        case "car":
            type = "汽车";
            break;
        case "house":
            type = "房产";
            break;
        case "game":
            type = "游戏";
            break;
        default:
            type = "科技";
            break;
    }
    return type;
}

function getNotifyEmails() {
    if (!$("#notify_Email_List"))
        return;
    $("#notify_Email_List").empty();
    executeGetWithJson(
        BASE_URL_MESSAGE_EMAIL_NOTIFY + "/all",
        function (data) {
            showData(data);
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function showData(data) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var address = item.address;
        var type = typeCh(item.messageType);
        var id = item.id;
        var range = rangeCh(item.messageRange);
        var notifyDay = dayCh(item.notifyDay);
        var notifyHour = item.notifyHour;
        var notifyMinute = item.notifyMinute;
        $("#notify_Email_List").append("<div class=\"list-group\">\n" +
            "<div href=\"#\" class=\"list-group-item active\">\n" +
            "<h4 class=\"list-group-item-heading\">\n" +
            "【推送邮件地址】 " + address + "\n" +
            "</h4>\n" +
            "</div>\n" +
            "<div href=\"#\" class=\"list-group-item\">\n" +
            "<h5>\n" +
            "【推送消息类型】 " + type + "\n" +
            "</h5>\n" +
            "\n" +
            "<h5>\n" +
            "【消息时间范围】 " + range + "\n" +
            "</h5>\n" +
            "\n" +
            "<h5>\n" +
            "【推送时间规则】 " + notifyDay + "  " + notifyHour + ":" + notifyMinute + ":00" + "\n" +
            "</h5>\n" +
            "\n" +
            "<div>\n" +
            "<button class=\"btn btn-link\"><a onclick='deleteNotifyEmail(\"" + id + "\")'>删除该推送任务</a></button>\n" +
            "</div>\n" +
            "</div>\n" +
            "</div>");
    }
}

function deleteNotifyEmail(id) {
    if (id) {
        executeGetWithJson(
            BASE_URL_MESSAGE_EMAIL_NOTIFY + "/" + id + "/delete",
            function (data) {
                if (data || data === true || data.result === true) {
                    alert("删除成功");
                    changePage(1);
                } else {
                    alert("删除失败");
                }
            },
            function (data, status) {
                alert(data.message);
            }
        );
    }
}

function changePage(page) {
    switch (page) {
        case 1:
            $("#notify_email_add_email_page").attr("style", "display: none;");
            $("#notify_email_watch_email_page").removeAttr("style");
            $("#notify_bread_info_type").text("我的推送任务");
            getNotifyEmails();
            break;
        case 2:
            $("#notify_email_add_email_page").removeAttr("style");
            $("#notify_email_watch_email_page").attr("style", "display: none;");
            $("#notify_bread_info_type").text("添加推送任务");
            break;
    }
}