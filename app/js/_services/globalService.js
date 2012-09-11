servicesModule.factory('Global', function($resource) {
    return $resource('#{site.api_resource_url}/:_action', {port : ':#{site.api_resource_port}'}, 
        {
            signin: {method: 'POST', params: { _action: 'signin' }}
        });
});