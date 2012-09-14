$(function() {
    var mainScope = angular.element("body").scope();
    
    if(mainScope.cookies.userid) {
        $(".logged-in").css("display", "inherit");
        $(".logged-out").remove();
    } else {
        $(".logged-out").css("display", "inherit")
        $(".logged-in").remove();
    }
})

function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
