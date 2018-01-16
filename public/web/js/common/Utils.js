/**
 * 将时间戳转换为yy-MM-dd HH:mm:ss格式文本
 *
 * @param inputTime
 * @returns {string}
 */
function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

/**
 * 将时间戳转换为yy-MM-dd格式文本
 *
 * @param inputTime
 * @returns {string}
 */
function formatDate(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}

/**
 * 获取今日时间戳(零点)
 *
 * @returns {number}
 */
function currentDateForTimeStamp() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = now.getDate();
    d = d < 10 ? ('0' + d) : d;
    var today = y + '-' + m + '-' + d + " 00:00:00";
    var todayDate = new Date(today);
    return todayDate.getTime();
}

/**
 * 获取当前时间戳
 *
 * @returns {number}
 */
function currentDateTimeForTimeStamp() {
    return new Date().getTime();
}