/**
 * 本文件定义了所有页面顶部导航栏按钮动作(页面切换)的逻辑代码
 */
$(document).ready(function () {
    $("#btn_back_top").click(function () {
        $('body,html').animate({scrollTop: 0}, 600);//滚动到头部，滚动时间(ms)
    });

    $("#navigator_top_function_btn_message_search").click(function () {
        window.location.href = "messageSearch.html";
    });

    /**
     * 点击message按钮
     */
    $("#navigator_top_function_btn_message").click(function () {
        window.location.href = "message.html";
    });

    /**
     * 点击微博热搜按钮
     */
    $("#navigator_top_function_btn_hot_search").click(function () {
        window.location.href = "hotSearch.html";
    });

    /**
     * 点击脚本按钮
     */
    $("#navigator_top_function_btn_script").click(function () {
        if (checkLogin()) {
            window.location.href = "script.html";
        }
    });
    /**
     * 点击通知按钮
     */
    $("#navigator_top_function_btn_notify").click(function () {
        if (checkLogin()) {
            window.location.href = "notify.html";
        }
    });
});