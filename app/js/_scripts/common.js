$('.modal').on('shown', function() {
    $(this).find('.focus').get(0).focus();
})

$('.modal').on('hidden', function() {
    $(this).find('form').each(function() {
        this.reset();
    });
})

$('form').on('keypress', 'input', function(event) {
    if ((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)) {
        $(this).parents('form').first().find('.default').click();
        return false;
    } else {
        return true;
    }
});

function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
