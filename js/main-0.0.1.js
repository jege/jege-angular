'use strict';
// Declare app level module which depends on filters, and services
angular.module('jege', ['ngCookies', 'jege.filters', 'jege.services', 'jege.directives']).
    config(['$routeProvider', function($routeProvider) {
//        $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
//        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
//        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);
var servicesModule = angular.module('jege.services', ['ngResource']);
servicesModule.factory('Global', function($resource) {
    return $resource('//service-jege.rhcloud.com:port/api/1/:_action', {port : ':80'}, 
        {
            signin: {method: 'POST', params: { _action: 'signin' }}
        });
});
servicesModule.factory('User', function($resource) {
    return $resource('//service-jege.rhcloud.com:port/api/1/users/:_param1', {port: ':80'}, {
        get: {method: 'GET'},
        create: {method: 'POST'},
        update: {method: 'PUT'},
        signin: {method: 'POST', params: { _param1: 'signin' }},
        verify: {method: 'POST', params: { _param1: 'verify' }}
  });
});


function AppCtrl($scope) {
    $scope.isLoggedIn = function() {
        return isLoggedIn();
    }
}
;
function InscriptionCtrl($scope, $cookies, User) {
    $scope.newUser = new User();
    
    $scope.create = function() {
        var newUserId = getUuid();
        $scope.newUser.id = newUserId;
        
        User.create({}, $scope.newUser,
            function(response) {
                signin($scope.newUser.id);
                window.location = "//jege.github.com/jege-angular";
        });
    }
}

function SigninCtrl($scope, User) {
    $scope.credentials = {};
    
    $scope.signin = function() {
        User.signin({}, $scope.credentials,
            function(response) {
                signin(response.body, $scope.credentials.rememberMe);
                $('#signinModal').modal('hide');
                window.location.reload();
                handleResponse(response);
            },
            function() {
                handleResponse(response);
            }
        );
    }
    
    $scope.signout = function() {
        signout();
    }
}

function ProfileCtrl($scope, User) {
    User.get({_param1: getLoggedInUser().id}, function(response) {
        $scope.user = response.body;
    });
    
    $scope.update = function() {
        User.update({_param1: $scope.user.id}, $scope.user);
    }
}
;
function UserCtrl($scope, User) {
    User.get({}, function(response) {
        $scope.users = response.body;
        handleResponse(response);
    });
}
;
var filtersModule = angular.module('jege.filters', []);


var directivesModule = angular.module('jege.directives', []);


// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

;
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








