function UserCtrl($scope, User) {
    $scope.users = User.query();
}