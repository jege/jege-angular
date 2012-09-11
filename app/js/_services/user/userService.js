servicesModule.factory('User', function($resource) {
    return $resource('#{site.api_resource_url}/users/:_param1', {port: ':#{site.api_resource_port}'}, {
        query: {method: 'GET', isArray: true},
        create: {method: 'POST'},
        update: {method: 'PUT'},
        signin: {method: 'POST', params: { _param1: 'signin' }}
  });
});