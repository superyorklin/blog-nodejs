/**
 * jquery
 */
$(document).ready(function () {
    setCookie("language", "zh_CN", BASE_URL);

    /**
     * 点击登录按钮
     */
    $("#login_input_btn_login").click(function () {
        login();
    });

    /**
     * 密码输入框绑定enter键监听
     */
    $("#login_input_password").keydown(function (event) {
        if (event.which === 13) {
            login();
        }
    });

    /**
     * 验证用户名是否重复
     */
    $("#register_input_name").focusout(function () {
        var name = $("#register_input_name").val();
        if (!name)
            return;
        //检查name是否已经存在
        executeGetWithJson(
            BASE_URL_USER + name + "/exists",
            function (data) {
                if (data.exist == true) {
                    alert("用户名已经存在！请换一个试试。")
                    $("#register_input_name").val("");
                }
            },
            function (code, data) {
                alert(data.message);
            }
        );
    });

    /**
     * 重新输入密码是否正确
     */
    $("#register_input_password_verify").focusout(function () {
        var password = $("#register_input_password").val();
        var passwordVerify = $("#register_input_password_verify").val();
        if (passwordVerify) {
            if (passwordVerify != password) {
                alert("重新输入密码与原密码不符！");
                $("#register_input_password_verify").val("");
            }
        }
    });

    /**
     * 点击注册按钮
     */
    $("#register_input_btn_register").click(function () {
        var name = $("#register_input_name").val();
        var password = $("#register_input_password").val();
        var passwordVerify = $("#register_input_password_verify").val();
        var email = $("#register_input_email").val();
        var phone = $("#register_input_phone").val();
        if (!name || !password || !email) {
            alert("用户名或者用户密码不能为空！");
            return;
        }
        if (password != passwordVerify) {
            alert("重新输入密码与原密码不符！");
            return;
        }

        executePostWithJson(
            BASE_URL_USER + "/register",
            JSON.stringify({"name": name, "password": password, "email": email, "phoneNum": phone}),
            function (object) {
                if (object == true) {
                    alert("注册成功！请前往邮箱验证。");
                } else {
                    alert("注册失败！点击重新验证重试。");
                }
            },
            function (object) {
                alert(object.message)
            });
    });

    /**
     * 重发验证信息
     *
     */
    $("#register_input_btn_register_again").click(function () {
        var name = $("#register_input_name").val();
        var email = $("#register_input_email").val();
        var phone = $("#register_input_phone").val();
        if (!name || !email) {
            alert("用户名或者密码不能为空！");
            return;
        }
        executePostWithJson(
            BASE_URL_USER + "/register/changeVerificationCode",
            JSON.stringify({"name": name, "email": email, "phoneNum": phone}),
            function (object) {
                if (object == true) {
                    alert("注册成功！请前往邮箱验证。");
                } else {
                    alert("注册失败！点击重新验证重试。");
                }
            },
            function (object) {
                alert(object.message)
            }
        );
    });
});

/**
 * 用户登录方法
 */
function login() {
    var name = $("#login_input_name").val();
    var password = $("#login_input_password").val();
    if (!name || !password) {
        alert("用户名或者密码不能为空！");
        return;
    }

    executePostWithJson(
        BASE_URL_USER + "/login",
        JSON.stringify({"name": name, "password": password}),
        function (object) {
            if (object.token) {
                setCookie("token", object.token, BASE_URL);
                window.location.href = "index.html";
            } else {
                alert("登录失败！");
            }
        },
        function (object) {
            alert(object.message);
        }
    );
}