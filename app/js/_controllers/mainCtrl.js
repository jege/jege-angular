function MainCtrl($scope, $cookies) {
    $scope.cookies = {};
    $scope.cookies.userid = $cookies.userid;
}