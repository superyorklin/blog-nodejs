/**
 * jquery
 */
$(document).ready(function () {
    /**
     * 下载链接填充
     */
    $("#script_type_nav_btn_message_example_link").attr("href", BASE_URL_MESSAGE + "/script/example");

    /**
     * 提交message文件
     */
    $("#script_message_upload_submit").click(function () {
        if (!$("#script_message_upload_fileName").val()) {
            alert("文件名不能为空！");
            return;
        }
        checkFileNameExist();
        executePostWithForm(
            "#script_message_upload_file_form",
            BASE_URL_MESSAGE + "/script/upload",
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

    $("#script_message_upload_fileName").focusout(function () {
        checkFileNameExist();
    });

    $("#script_type_nav_btn_upload_script").click(function () {
        changeDisplay(0);
    });

    $("#script_type_nav_btn_script_name_list").click(function () {
        changeDisplay(1);
        showScriptListData();
    });

    $("#script_type_nav_messy_code_script_list").click(function () {
        changeDisplay(1);
        showMessyCodeScriptListData();
    });
});

function showMessyCodeScriptListData() {
    $("#script_type_script_name_List").empty();
    executeGetWithJson(
        BASE_URL_MESSAGE + "/script/messyCode",
        function (data) {
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    addScriptNameItem(data[i])
                }
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function showScriptListData() {
    $("#script_type_script_name_List").empty();
    executeGetWithJson(
        BASE_URL_MESSAGE + "/script/names",
        function (data) {
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    addScriptNameItem(data[i])
                }
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function addScriptNameItem(item) {
    $("#script_type_script_name_List").append("<div class=\"list-group\">\n" +
        "\t<a class=\"list-group-item\" href=\"#\">\n" +
        "\t\t<h4 class=\"list-group-item-heading\">" + item.toString() + "</h4>\n" +
        "\t</a>\n" +
        "\t<br>\n" +
        "</div>");
}

function changeDisplay(type) {
    switch (type) {
        case 0:
            $("#script_type_bread_info").text("上传脚本");
            $("#script_type_upload").removeAttr("style");
            $("#script_type_script_name_List").attr("style", "display: none;");
            break;
        case 1:
            $("#script_type_bread_info").text("脚本列表");
            $("#script_type_upload").attr("style", "display: none;");
            $("#script_type_script_name_List").removeAttr("style");
            break;
    }
}

/**
 * 检查文件名是否重复
 */
function checkFileNameExist() {
    var fileName = $("#script_message_upload_fileName").val();
    if (fileName) {
        if (fileName.indexOf(".groovy") < 0)
            fileName = fileName + ".groovy";
        $("#script_message_upload_fileName").val(fileName);
        executeGetWithJson(
            BASE_URL_MESSAGE + "/script/upload/" + fileName + "/exists",
            function (data) {
                if (data === true) {
                    alert("文件名为【" + fileName + "】的脚本文件已经存在！");
                    $("#script_message_upload_fileName").val();
                }
            },
            function (data, status) {
                alert(data.message);
            }
        );
    }
}