function AppCtrl($scope) {
    if(sessionStorage.getItem("userid")) {
        $scope.userid = sessionStorage.getItem("userid");
    } else if(localStorage.getItem("userid")) {
        $scope.userid = localStorage.getItem("userid");
    }
    
    $scope.isLoggedIn = function() {
        return !!$scope.userid;
    }
}