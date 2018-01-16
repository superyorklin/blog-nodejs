var page = 1;//initializeDisplay方法显示的是0
var size = 10;//每页显示十条数据

/**
 * jquery
 */
$(document).ready(function () {
    /**
     * 通过后台检查是否登录，若未登录，删除token
     */
    $("#navigator_top_function_btn_login").click(function () {
        if (isLogin()) {
            executeGetWithJson(
                BASE_URL_USER + "/isLogin",
                function (data) {
                    if (data) {
                        if (data.login !== true) {
                            removeCookie("token");
                            window.location.href = "login.html";
                        } else {
                            window.location.href = "user.html";
                        }
                    } else {
                        window.location.href = "login.html";
                    }
                },
                function (data, status) {
                    alert("用户登出失败！ " + status);
                }
            );
        } else {
            window.location.href = "login.html";
        }
    });

    /**
     * 登出
     */
    $("#navigator_top_function_btn_logout").click(function () {
        if (!checkLogin())
            return;
        executeGetWithJson(
            BASE_URL_USER + "/logout",
            function (data) {
                if (data || data === true || data.result === true) {
                    alert("用户登出成功");
                    removeCookie("token");
                    window.location.href = "index.html";
                }
            },
            function (data, status) {
                alert("用户登出失败！ " + status);
            }
        );
    });

    $("#user_nav_modify_password").click(function () {
        clearUserManagePane();
        appendUserManagePane("<form class=\"bs-example bs-example-form\" role=\"form\" disabled=\"true\">\n" +
            "            <div class=\"input-group\">\n" +
            "                <span class=\"input-group-addon\">输入密码</span>\n" +
            "                <input id=\"user_self_modify_input_password\" type=\"password\" class=\"form-control\"\n" +
            "                       placeholder=\"输入修改的用户密码\">\n" +
            "            </div>\n" +
            "            <br>\n" +
            "            <div class=\"input-group\">\n" +
            "                <span class=\"input-group-addon\">确认密码</span>\n" +
            "                <input id=\"user_self_modify_input_password_confirm\" type=\"password\" class=\"form-control\"\n" +
            "                       placeholder=\"确认修改的用户密码\">\n" +
            "            </div>\n" +
            "            <br>\n" +
            "            <div class=\"col-lg-12 col-center-block\">\n" +
            "                <button type=\"button\" class=\"btn btn-default btn-block\" onclick=\"selfModifyPassword()\">提交修改\n" +
            "                </button>\n" +
            "            </div>\n" +
            "        </form>");
    });

    $("#user_nav_modify_other").click(function () {
        clearUserManagePane();
        appendUserManagePane("<form class=\"bs-example bs-example-form\" role=\"form\" disabled=\"true\">\n" +
            "            <div class=\"input-group\">\n" +
            "                <span class=\"input-group-addon\">用户名称</span>\n" +
            "                <input id=\"user_self_modify_input_name\" type=\"text\" class=\"form-control\"\n" +
            "                       placeholder=\"输入修改的用户名称(留空不修改)\">\n" +
            "            </div>\n" +
            "            <br>\n" +
            "            <div class=\"input-group\">\n" +
            "                <span class=\"input-group-addon\">用户电邮</span>\n" +
            "                <input id=\"user_self_modify_input_email\" type=\"text\" class=\"form-control\"\n" +
            "                       placeholder=\"输入修改的用户电邮(留空不修改)\">\n" +
            "            </div>\n" +
            "            <br>\n" +
            "            <div class=\"input-group\">\n" +
            "                <span class=\"input-group-addon\">用户电话</span>\n" +
            "                <input id=\"user_self_modify_input_phoneNum\" type=\"text\" class=\"form-control\"\n" +
            "                       placeholder=\"输入修改的用户电话(留空不修改)\">\n" +
            "            </div>\n" +
            "            <br>\n" +
            "            <div class=\"col-lg-12 col-center-block\">\n" +
            "                <button type=\"button\" class=\"btn btn-default btn-block\" onclick=\"selfModifyOther()\">提交修改\n" +
            "                </button>\n" +
            "            </div>\n" +
            "        </form>");
    });

    $("#user_nav_show_info").click(function () {
        clearUserManagePane();
        selfInfoDisplay();
    });

    $("#user_nav_other_manage").click(function () {
        clearUserManagePane();
        executeGetWithJson(
            BASE_URL_USER + "/info",
            function (data) {
                if (data.roleGroupName == "admin") {
                    refreshUserManagePane();
                } else {
                    alert("没有权限进行用户管理！");
                }
            },
            function (data, status) {
                alert(data.message);
            }
        );
    });
});

/**
 * 用户管理面板添加元素
 *
 * @param code
 */
function appendUserManagePane(code) {
    $("#user_managePane").append(code);
}

/**
 * 清空用户管理面板
 */
function clearUserManagePane() {
    $("#user_managePane").empty();
}

/**
 * 用户信息查看
 */
function selfInfoDisplay() {
    executeGetWithJson(
        BASE_URL_USER + "/info",
        function (data) {
            var id = data.id;
            var name = data.name;
            var phoneNum = data.phoneNum;
            var email = data.email;
            appendUserManagePane("<table class=\"table\">\n" +
                "            <caption>用户信息</caption>\n" +
                "            <tbody>\n" +
                "            <tr>\n" +
                "                <td>用户名称</td>\n" +
                "                <td id=\"user_info_name\">" + name + "</td>\n" +
                "            </tr>\n" +
                "            <tr>\n" +
                "                <td>用户ID</td>\n" +
                "                <td id=\"user_info_id\">" + id + "</td>\n" +
                "            </tr>\n" +
                "            <tr>\n" +
                "                <td>用户电邮</td>\n" +
                "                <td id=\"user_info_email\">" + email + "</td>\n" +
                "            </tr>\n" +
                "            <tr>\n" +
                "                <td>用户电话</td>\n" +
                "                <td id=\"user_info_phone\">" + phoneNum + "</td>\n" +
                "            </tr>\n" +
                "            </tbody>\n" +
                "        </table>");
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

/**
 * 自修改密码
 */
function selfModifyPassword() {
    var pass = $("#user_self_modify_input_password").val();
    var passAgain = $("#user_self_modify_input_password_confirm").val();
    if (!pass || !passAgain) {
        alert("修改的密码不能为空。");
        return;
    }
    if (pass != passAgain) {
        alert("确认密码输入错误，请重新输入");
        $("#user_self_modify_input_password").val("");
        $("#user_self_modify_input_password_confirm").val("");
        return;
    }

    executeGetWithJson(//先获取自己的用户信息
        BASE_URL_USER + "/info",
        function (data) {
            var name = data.name;
            var phoneNum = data.phoneNum;
            var email = data.email;
            executePostWithJson(//收到用户自己信息后修改信息
                BASE_URL_USER + "/update",
                JSON.stringify({"name": name, "password": pass, "phoneNum": phoneNum, "email": email}),
                function (data) {
                    if (data === true) {
                        alert("修改成功！");
                        clearUserManagePane();
                    } else {
                        alert("修改失败！");
                    }
                },
                function (data, status) {
                    alert(data.message);
                }
            );
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

/**
 * 自修改其他信息
 */
function selfModifyOther() {
    var nameM = $("#user_self_modify_input_name").val();
    var emailM = $("#user_self_modify_input_email").val();
    var phoneNumM = $("#user_self_modify_input_phoneNum").val();
    executeGetWithJson(//先获取自己的用户信息
        BASE_URL_USER + "/info",
        function (data) {
            var name = data.name;
            var phoneNum = data.phoneNum;
            var email = data.email;
            var pass = data.password;
            if (nameM)
                name = nameM;
            if (phoneNumM)
                phoneNum = phoneNumM;
            if (emailM)
                email = emailM;
            executePostWithJson(//收到用户自己信息后修改信息
                BASE_URL_USER + "/update",
                JSON.stringify({"name": name, "password": pass, "phoneNum": phoneNum, "email": email}),
                function (data) {
                    if (data === true) {
                        alert("修改成功！");
                        clearUserManagePane();
                    } else {
                        alert("修改失败！");
                    }
                },
                function (data, status) {
                    alert(data.message);
                }
            );
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

/**
 * 用户管理面板添加获取更多按钮
 */
function addUserManagePaneGetMoreButton() {
    $("#user_managePane").append("<div id=\"user_manage_btn_getMore\" class=\"col-lg-6 col-center-block\" style=\"padding-bottom: 2em\">\n" +
        "            <button type=\"button\" class=\"btn btn-default btn-block\" onclick=\"getMoreUserPage()\">\n" +
        "                点击加载更多用户信息 ......\n" +
        "            </button>\n" +
        "        </div>");
}

/**
 * 用户管理面板去除获取更多按钮
 */
function removeUserManagePaneGetMoreButton() {
    if ($("#user_manage_btn_getMore")) {
        $("#user_manage_btn_getMore").remove();
    }
}

/**
 * 用户列表添加元素
 *
 * @param name
 * @param email
 * @param phoneNum
 */
function addUserNodeIntoUserInfoPane(name, email, phoneNum, roleGroupName) {
    if (!$("#user_info_pane"))
        return;
    $("#user_info_pane").append("<div class=\"list-group\">\n" +
        "                <div href=\"#\" class=\"list-group-item active\">\n" +
        "                    <h4 class=\"list-group-item-heading\">\n" +
        "                        【" + name + "】 " + email + "   " + phoneNum + "   【" + roleGroupName + "】\n" +
        "                    </h4>\n" +
        "                </div>\n" +
        "                <div href=\"#\" class=\"list-group-item\">\n" +
        "                    <div>\n" +
        "                        <button class=\"btn btn-link\"><a onclick='changeUserRoleGroupUser(\"" + name + "\")'>更换角色组·用户【user】</a></button>\n" +
        "                    </div>\n" +
        "                    <br>\n" +
        "                    <div>\n" +
        "                        <button class=\"btn btn-link\"><a onclick='changeUserRoleGroupAdvancedUser(\"" + name + "\")'>更换角色组·高级用户【advanced user】</a></button>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>")
}

function getUserInfoByPage(page, size) {
    executeGetWithJson(
        BASE_URL_USER + "/infoByAdmin/list?page=" + page + "&size=" + size,
        function (datas) {
            if (datas.length == 0) {
                addPaneNoMoreUserMessage();
                return;
            }
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var name = data.name;
                var email = data.email;
                var phoneNum = data.phoneNum;
                var roleGroupName = data.roleGroupName;
                addUserNodeIntoUserInfoPane(name, email, phoneNum, roleGroupName);
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function changeUserRoleGroupUser(name) {
    executeGetWithJson(
        BASE_URL_USER + "/roleGroup/change?userName=" + name + "&roleGroupName=user",
        function (data) {
            if (data === true) {
                refreshUserManagePane();
            } else {
                alert("修改失败！");
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function changeUserRoleGroupAdvancedUser(name) {
    executeGetWithJson(
        BASE_URL_USER + "/roleGroup/change?userName=" + name + "&roleGroupName=advancedUser",
        function (data) {
            if (data === true) {
                refreshUserManagePane();
            } else {
                alert("修改失败！");
            }
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function refreshUserManagePane() {
    clearUserManagePane();
    appendUserManagePane("<div>\n" +
        "            <form class=\"bs-example bs-example-form\" role=\"form\">\n" +
        "                <div class=\"input-group\">\n" +
        "                    <input id=\"user_list_search_name\" type=\"text\" class=\"form-control\" placeholder=\"输入用户名\">\n" +
        "                    <input id=\"hiddenText\" type=\"text\" style=\"display:none\" />\n" +
        "                    <span class=\"input-group-addon\"><a onclick=\"searchUser()\">搜索</a></span>\n" +
        "                </div>\n" +
        "            </form>\n" +
        "        </div>\n" +
        "        <br>\n" +
        "        <div id=\"user_info_pane\">\n" +
        "        </div>");
    page = 1;
    getUserInfoByPage(0, size);
    addUserManagePaneGetMoreButton();
}

function getMoreUserPage() {
    getUserInfoByPage(page, size);
    page++;
}

function clearUserList() {
    if (!$("#user_info_pane"))
        return;
    $("#user_info_pane").empty();
}

function searchUser() {
    var name = $("#user_list_search_name").val();
    if (!name)
        return;
    clearUserList();
    removeUserManagePaneGetMoreButton();
    executeGetWithJson(
        BASE_URL_USER + "/infoByAdmin?userName=" + name,
        function (data) {
            if (!data)
                return;
            addUserNodeIntoUserInfoPane(data.name, data.email, data.phoneNum, data.roleGroupName);
        },
        function (data, status) {
            alert(data.message);
        }
    );
}

function addPaneNoMoreUserMessage() {
    if (!$("#user_info_pane"))
        return;
    $("#user_info_pane").append("<div class=\"col-lg-6 col-center-block\"><p>没有更多了 ......</p></div>");
}