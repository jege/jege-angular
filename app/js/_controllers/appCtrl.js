function AppCtrl($scope) {
    $scope.isLoggedIn = function() {
        return isLoggedIn();
    }
}