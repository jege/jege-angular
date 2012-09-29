var messageSeverities = new Array('error', 'warning', 'info', 'success');

function handleMessages(messages) {
    messages.forEach(function(message) {
        addMessage(message);
    });
}

function addMessage(message) {
    var channel = getChannel(message.type.toLowerCase());
    if(channel && channel.data('channel-type')) {
        if(!isChannelInitiated(channel)) {
            initChannel(channel);
        }
        if(!isChannelSeverityInitiated(channel, message.severity.toLowerCase())) {
            initChannelSeverity(channel, message.severity.toLowerCase());
        }
        var messagesList = channel.find('.alert-'+message.severity.toLowerCase()+' > ul');
        messagesList.append(messageToLi(message));
    }
}

function clearChannel(channelName) {
    getChannel(channelName).children().remove();
}

function clearChannels() {
    getChannels().children().remove();
}

function getChannel(channelType) {
    if(channelType == 'debug') {
        return $('#debugChannel');
    } else if(channelType == 'notify') {
        
    } else {
        if(currentModal) {
            return currentModal.find('[data-channel-type]').first();
        } else {
            return $('#globalChannel');
        }
    }
}

function getChannels() {
    return $('[data-channel-type]');
}

function isChannelInitiated(channel) {
    return channel.children().length > 0;
}

function isChannelSeverityInitiated(channel, severity) {
    return !channel.find('.alert-'+severity).hasClass('hide');
}

function initChannel(channel) {
    channel.prepend(getChannelSeverityDivs());
}

function initChannelSeverity(channel, severity) {
    return channel.find('.alert-'+severity).removeClass('hide');
}

function getChannelSeverityDivs() {
    var divs = '';
    
    messageSeverities.forEach(function(severity) {
        divs += '<div class="alert alert-block alert-'+severity+' hide"><button type="button" class="close" data-dismiss="alert">×</button><ul></ul></div>';
    });
    
    return divs;
}

function messageToLi(message) {
    if(message.detail) {
        return '<li><strong>'+message.summary+':</strong> '+message.detail+'</li>';
    }
    else {
        return '<li>'+message.summary+'</li>';
    }
}

function notify(message) {
    noty({text: message.summary});
}
