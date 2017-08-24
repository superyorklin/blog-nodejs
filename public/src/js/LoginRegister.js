var BASE_URL = "http://42.96.169.172/assistance/rest/v1";

$(document).ready(function () {
    /**
     * 点击登录按钮
     */
    $("#login_input_btn_login").click(function () {
        var name = $("#login_input_name").val();
        var password = $("#login_input_password").val();
        if (!name || !password) {
            alert("User name and password can not be null!");
            return;
        }

        addCookie("language", "en_US", "42.96.169.172/assistance");
       /* executePostWithJson(
            BASE_URL + "/user/login",
            JSON.stringify({"name": name, "password": password}),
            function (object, textStatus) {
                alert(object.userId + "  " + object.token + "  " + textStatus);
            },
            function (object, textStatus) {
                alert(object.errCode + " " + object.message + " " + textStatus);
            });*/
        fetch(`${BASE_URL}/user/login`,{
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"name": name, "password": password})
        }).then((res) => {
            console.log(res);
        })
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
            alert("User name and password can not be null!");
            return;
        }
        if (password != passwordVerify) {
            alert("Password verify not match!");
            return;
        }

    });
});