/**
 * 设置Cookie键值对
 *
 * @param name 名称
 * @param value 值
 * @param domain 作用域
 */
function setCookie(name, value, domain) {
    var now = new Date();
    now.setMonth(now.getMonth() + 6);
    var expires = now.toUTCString();
    document.cookie = name + "=" + value;
    document.cookie = "expires=" + expires;
    document.cookie = "path=/";
    document.cookie = "domain=" + domain;
}

/**
 * 删除cookie
 *
 * @param name
 */
function removeCookie(name) {
    if (!hasCookie(name))
        return;
    document.cookie = name + "=";
}

/**
 * 通过name判断是否存在该cookie
 *
 * @param name
 * @returns {boolean}
 */
function hasCookie(name) {
    var cookie = document.cookie;
    if (cookie.indexOf(name) == -1)
        return false;
    return true;
}

/**
 * 根据name获取cookie值value
 *
 * @param name
 * @returns {*}
 */
function getCookieValue(name) {
    var cookie = document.cookie;
    var start = cookie.indexOf(name);
    if (start == -1)
        return null;
    var end = cookie.indexOf(";", start);
    if (end == -1)
        end = cookie.length;
    var keyValue = cookie.substring(start, end);
    return keyValue.substring(keyValue.indexOf("=") + 1, keyValue.length);
}

/**
 * 根据name获取cookie(键值对key=value)
 *
 * @param name
 */
function getCookie(name) {
    var cookie = document.cookie;
    var start = cookie.indexOf(name);
    if (start == -1)
        return null;
    var end = cookie.indexOf(";", start);
    if (end == -1)
        end = cookie.length;
    return cookie.substring(start, end);
}