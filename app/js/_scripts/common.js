function handleResponse(response) {
    handleMessages(response.messages);
}

$('.modal').on('shown', function() {
    $(this).find('.focus').get(0).focus();
});

$('.modal').on('hidden', function() {
    $(this).find('form').each(function() {
        this.reset();
    });
});

$('form').on('keypress', 'input', function(event) {
    if ((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)) {
        $(this).parents('form').first().find('.default').click();
        return false;
    } else {
        return true;
    }
});


