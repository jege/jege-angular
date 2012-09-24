function UserCtrl($scope, User) {
    User.get({}, function(response) {
        $scope.users = response.body;
        handleResponse(response);
    });
}