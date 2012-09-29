function handleResponse(response) {
    handleMessages(response.messages);
}

function toJson(obj) {
    return JSON.stringify(obj);
}

function fromJson(json) {
    return JSON.parse(json);
}

var currentModal;

$('.modal').on('shown', function() {
    currentModal = $(this);
    currentModal.find('.focus').get(0).focus();
});

$('.modal').on('hidden', function() {
    currentModal.find('form').each(function() {
        this.reset();
    });
    currentModal = undefined;
});

$('form').on('keypress', 'input', function(event) {
    if ((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)) {
        $(this).parents('form').first().find('.default').click();
        return false;
    } else {
        return true;
    }
});


