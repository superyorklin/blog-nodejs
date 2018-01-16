/**
 * jquery
 */
$(document).ready(function () {
    /**
     * 下载脚本示例链接填充
     */
    $("#script_type_nav_btn_stock_analyse_example_link").attr("href", BASE_URL_STOCK_ANALYSE + "/script/example");

    /**
     * 提交analyse stock 文件
     */
    $("#script_stock_analyse_upload_submit").click(function () {
        if (!checkLogin())
            return;
        executePostWithForm(
            "#script_stock_analyse_upload_file_form",
            BASE_URL_STOCK_ANALYSE + "/script/upload",
            function () {
            },
            function (data) {
                var test = data.test === true ? "成功" : "失败";
                var upload = data.upload === true ? "成功" : "失败";
                alert("上传结果 【" + upload + "】   测试结果 【" + test + "】");
            },
            function (data, status) {
                alert(data.message);
            }
        );
    });

    /**
     * 检查stock analyse文件名知否重复
     */
    $("#script_stock_analyse_upload_fileName").focusout(function () {
        var fileName = $("#script_stock_analyse_upload_fileName").val();
        if (fileName) {
            if (fileName.indexOf(".groovy") < 0)
                fileName = fileName + ".groovy";
            $("#script_stock_analyse_upload_fileName").val(fileName);
            executeGetWithJson(
                BASE_URL_STOCK_ANALYSE + "/script/upload/" + fileName + "/exists",
                function (data) {
                    if (data === true) {
                        alert("文件名为【" + fileName + "】的脚本文件已经存在！");
                        $("#script_stock_analyse_upload_fileName").val();
                    }
                },
                function (data, status) {
                    alert(data.message);
                }
            );
        }
    });

    /**
     * 检查Stock code 合法性
     */
    $("#script_stock_analyse_upload_testStockCode").focusout(function () {
        var code = $("#script_stock_analyse_upload_testStockCode").val();
        if (code) {
            var reg = new RegExp("^[0-9]{6}$");
            if (reg.test(code) === true) {
                return;
            } else {
                alert("股票代码格式不正确！");
                $("#script_stock_analyse_upload_testStockCode").val("");
            }
        }
    });
});