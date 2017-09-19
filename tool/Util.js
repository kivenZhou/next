//  毫秒 -> 时间
const formatDate = function(str){
    if(str){
        var date = new Date(str)
        var localDate = date.toLocaleString().substring(0, 11)
        return localDate
    }
}
//  存储
const localItem = function (key, value) {
    if (arguments.length == 1) {
        return localStorage.getItem(key)
    } else {
        return localStorage.setItem(key, value)
    }
};
//  删除存储
const removeLocalItem = function (key) {
    if (key) {
        return localStorage.removeItem(key)
    }
    return localStorage.removeItem()
};
//  获取cookie中的值
const getCookie = function(cookiename){ 
    if (process.browser){
        let cookiestring = document.cookie
        let start = cookiestring.indexOf(cookiename + '=') 
        if(start == -1){
            return null
        }   //   找不到 
        start += cookiename.length + 1;
        let end = cookiestring.indexOf("; ",start)
        if(end == -1){
            return unescape(cookiestring.substring(start))
        }    
        return unescape(cookiestring.substring(start, end))
    }
}
//  删除cookie中的值
const delCookie = (name)=> {
    var exp = new Date()
    exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000))
    var cval = getCookie(name)
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString()
}

//  获取url中？后面的参数
const getQueryString = (name)=> { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return decodeURI(r[2]); return null; 
} 

export { formatDate, localItem, removeLocalItem, getCookie, delCookie, getQueryString }