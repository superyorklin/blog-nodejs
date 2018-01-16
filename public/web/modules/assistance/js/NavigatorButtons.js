/**
 * 本文件定义了所有页面顶部导航栏按钮动作(页面切换)的逻辑代码
 */
$(document).ready(function () {
    /**
     * 点击message按钮
     */
    $("#navigator_top_function_btn_message").click(function () {
        window.location.href = "message.html";
    });

    $("#navigator_top_function_btn_stock_latest_data").click(function () {
        window.location.href = "singleStockData.html";
    });

    /**
     * 点击stock按钮
     */
    $("#navigator_top_function_btn_stock").click(function () {
        if (!checkLogin())
            return;
        window.location.href = "stock.html";
    });

    /**
     * 点击fund按钮
     */
    $("#navigator_top_function_btn_fund").click(function () {
        if (!checkLogin())
            return;
        //TODO
        alert("还未实现基金功能");
    });

    $("#navigator_top_function_btn_script").click(function () {
        if (!checkLogin())
            return;
        window.location.href = "script.html";
    });

    $("#btn_back_top").click(function () {
        $('body,html').animate({scrollTop: 0}, 600);//滚动到头部，滚动时间(ms)
    });
});