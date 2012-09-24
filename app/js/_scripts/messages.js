function handleMessages(messages) {
    messages.forEach(function(message) {
        addMessage(message);
    });
}

function addMessage(message) {
    var channel = getChannel(message.channel);
    if(channel) {
        if(!isChannelInitiated(channel, message.severity)) {
            initChannel(channel, message.severity);
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

function getChannel(channelName) {
    if(isChannelUnique(channelName)) {
        return $('#'+channelName+'Channel');
    } else {
        var channel;
        $('[data-channel-name="'+channelName.slice(1)+'"]').each(function() {
            if(isVisible(this)) {
                channel = $(this);
            }
        });
        return channel;
    }
}

function getChannels() {
    return $('[data-channel-name]');
}

function isChannelUnique(channelName) {
    return !channelName.startsWith('@');
}

function isChannelInitiated(channel, severity) {
    return channel.find('.alert-'+severity.toLowerCase()).length > 0;
}

function initChannel(channel, severity) {
    channel.prepend(getChannelSeverityDiv(severity));
}

function getChannelSeverityDiv(severity) {
    return '<div class="alert alert-block alert-'+severity.toLowerCase()+'"><button type="button" class="close" data-dismiss="alert">×</button><ul></ul></div>';
}

function messageToLi(message) {
    return '<li>'+message.summary+'</li>';
}