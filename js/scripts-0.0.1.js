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
;
navigator.id.watch({
  onlogin: function(assertion) {
    console.log("Persona onlogin");
    if(isLoggedIn()) {
        console.log("Persona already logged in");
    } else {
        console.log("Persona start verify");
        var servicesInjector = angular.injector(['jege.services']);
        
        servicesInjector.invoke(function(User) {
            User.verify({}, assertion,
                function(response) {
                    console.log("Persona verify success");
                    signin(response.body);
                    window.location.reload();
                },
                function() {
                    console.log("Persona verify failure");
                }
            );
        });
    }
  },
  onlogout: function() {
      console.log("Persona onlogout");
  }
});
function getLoggedInUser() {
    return fromJson(sessionStorage.getItem("loggedInUser") || localStorage.getItem("loggedInUser"));
}

function isLoggedIn() {
    return !!getLoggedInUser();
}

function signin(loggedInUser, rememberMe) {
    if(rememberMe) {
        localStorage.setItem("loggedInUser", toJson(loggedInUser));
        sessionStorage.removeItem("loggedInUser");
    } else {
        sessionStorage.setItem("loggedInUser", toJson(loggedInUser));
        localStorage.removeItem("loggedInUser");
    }
}

function signout() {
    if(navigator.id) {
        navigator.id.logout();
    }
    sessionStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInUser");
}
;
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
;
