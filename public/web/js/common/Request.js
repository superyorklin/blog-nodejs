var HOST_PORT = "39.106.109.207";
var BASE_URL = "http://" + HOST_PORT + "/";

var BASE_URL_USER = "http://" + HOST_PORT + "/website/rest/v1/user";
var BASE_URL_MESSAGE = "http://" + HOST_PORT + "/website/rest/v1/message";
var BASE_URL_MESSAGE_EMAIL_NOTIFY = "http://" + HOST_PORT + "/website/rest/v1/message/notify";
var BASE_URL_MESSAGE_WEIBO_HOT_SEARCH = "http://" + HOST_PORT + "/website/rest/v1/message/hotSearch/weibo";
var BASE_URL_STOCK = "http://" + HOST_PORT + "/website/rest/v1/stock";
var BASE_URL_STOCK_ANALYSE = "http://" + HOST_PORT + "/website/rest/v1/stock/analyse";

/**
 * 用户是否登录
 *
 * @returns {boolean}
 */
function isLogin() {
    var token = getCookieValue("token");
    if (token) {
        return true;
    } else {
        removeCookie("token");
        return false;
    }
}

/**
 * 检查用户是否登录
 *
 * @returns {boolean}
 */
function checkLogin() {
    var token = getCookieValue("token");
    if (token) {
        return true;
    } else {
        alert("用户未登录，无法使用该功能！前往【主页-功能-用户】进行用户登录。");
        removeCookie("token");
        return false;
    }
}


/**
 * 发送GET ajax请求
 *
 * @param url 请求地址
 * @param succeeded 2回调方法(自定义回调)
 * <pre>
 *     function (data) {
 *     //data是已经通过JSON转换的对象
 *           alert(data);
 *       }
 * </pre>
 * @param failed 回调方法(自定义回调)
 * <pre>
 *     function (data, textCode) {
 *     //data是已经通过JSON转换的对象
 *           alert(data);
 *       }
 * </pre>
 */
function executeGetWithJson(url, succeeded, failed) {
    $.ajax({
        url: url,
        type: "get",
        contentType: "application/json;charset=utf-8",
        //设置可跨域
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            succeeded(data);
        },
        error: function (jqXHR, textStatus) {
            failed(jqXHR.responseJSON, textStatus);
        }
    });
}

/**
 * 发送POST ajax请求(JSON数据格式)
 *
 * @param url 请求地址
 * @param jsonData json格式字串数据
 * @param succeeded 200回调方法(自定义回调)
 * <pre>
 *     function (data) {
 *          //data是已经通过JSON转换的对象
 *       }
 * </pre>
 * @param failed 非200回调方法(自定义回调)
 * <pre>
 *     function (data, textStatus) {
 *          //data是已经通过JSON转换的对象
 *      }
 * </pre>
 */
function executePostWithJson(url, jsonData, succeeded, failed) {
    $.ajax({
        url: url,
        type: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: jsonData,
        //设置可跨域
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            succeeded(data);
        },
        error: function (jqXHR, textStatus) {
            failed(jqXHR.responseJSON, textStatus);
        }
    });
}

/**
 * 发送POST ajax请求(表单数据,接受 JSON 返回)
 *
 * @param formIdSelector 表单ID选择器，格式为 "#id"
 * @param url url 请求地址
 * @param before 提交表单数据前进行操作的方法
 * @param succeeded succeeded 200回调方法(自定义回调)
 * <pre>
 *     function (data) {
 *          //data是已经通过JSON转换的对象
 *       }
 * </pre>
 * @param failed failed 回调方法(自定义回调)
 * <pre>
 *     function (data, textCode) {
 *     //data是已经通过JSON转换的对象
 *           alert(data);
 *       }
 * </pre>
 */
function executePostWithForm(formIdSelector, url, before, succeeded, failed) {
    $(formIdSelector).ajaxSubmit({
        url: url,
        type: "POST",
        dataType: "html",
        contentType: "multipart/form-data",
        clearForm: false,
        resetForm: false,
        timeout: 30000,
        beforeSubmit: function () {
            before();
        },
        success: function (data) {
            succeeded(JSON.parse(data));
        },
        error: function (jqXHR, textStatus) {
            var data = JSON.parse(jqXHR.responseText);
            failed(data, textStatus);
        }
    });
}