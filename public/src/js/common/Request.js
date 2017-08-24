/**
 * 发送GET ajax请求
 *
 * @param url 请求地址
 * @param succeeded 200回调方法(自定义回调)
 * <pre>
 *     function (data) {
 *     //data是已经通过JSON转换的对象
 *           alert(data);
 *       }
 * </pre>
 * @param failed 非200回调方法(自定义回调)
 * <pre>
 *     function (code, data) {
 *     //data是已经通过JSON转换的对象
 *           alert(data);
 *       }
 * </pre>
 */
function executeGET(url, succeeded, failed) {
    var request = null;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (!request)
        return;
    request.open("GET", url, true);
    request.withCredentials = true;
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            succeeded(request.responseJSON);
        } else if (request.status == 500) {
            failed(request.status, request.responseJSON);
        }
    }
}

/**
 * 发送POST ajax请求(JSON数据格式)
 *
 * @param url 请求地址
 * @param jsonData json格式字串数据
 * @param succeeded 200回调方法(自定义回调)
 * <pre>
 *     function (data, textStatus) {
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
        crossDomain: true,
        success: function (data, textStatus) {
            succeeded(data, textStatus);
        },
        error: function (jqXHR, textStatus) {
            failed(jqXHR.responseJSON, textStatus);
        }
    });
}