if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}

function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function isVisible(obj)
{
    if (obj == document) return true;
    
    if (!obj) return false;
    if (!obj.parentNode) return false;
    if (obj.style) {
        if (obj.style.display == 'none') return false;
        if (obj.style.visibility == 'hidden') return false;
    }
    
    //Try the computed style in a standard way
    if (window.getComputedStyle) {
        var style = window.getComputedStyle(obj, "");
        if (style.display == 'none') return false;
        if (style.visibility == 'hidden') return false;
    }
    
    //Or get the computed style using IE's silly proprietary way
    var style = obj.currentStyle
    if (style) {
        if (style['display'] == 'none') return false;
        if (style['visibility'] == 'hidden') return false;
    }
    
    return isVisible(obj.parentNode);
}