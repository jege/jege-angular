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


