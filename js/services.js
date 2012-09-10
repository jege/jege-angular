'use strict';

/* Services */
angular.module('jege.services', ['ngResource']).
    factory('Global',
        function($resource) {
            return $resource('http://service-jege.rhcloud.com:port/api/1/:_action', {
                port : ':80'
            }, {
                signin: {method: 'POST', params: { _action: 'signin' }}
            });
    }).
    factory('User', function($resource) {
        return $resource('http://service-jege.rhcloud.com:port/api/1/users/:_param1', {port: ':80'}, {
          query: {method: 'GET', isArray: true},
          create: {method: 'POST'},
          update: {method: 'PUT'},
          signin: {method: 'POST', params: { _param1: 'signin' }}
    });
});
