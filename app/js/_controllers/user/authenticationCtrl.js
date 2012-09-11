function InscriptionCtrl($scope, $cookies, User) {
    $scope.newUser = new User();
    
    $scope.create = function() {
        var newUserId = getUuid();
        console.log(newUserId);
        $scope.newUser.id = newUserId;
        
        User.create({}, $scope.newUser,
            function() {
                console.log("Inscript success");
                console.log(newUserId);
                console.log("Set cookie");
                $cookies.userid = newUserId;
                window.location = "#{site.base_url}";
        });
    }
}

function SigninCtrl($scope, $cookies, User) {
    $scope.credentials = {};
    
    $scope.signin = function() {
        User.signin({}, $scope.credentials,
            function(responseBody) {
                $cookies.userid = responseBody.userid;
                $('#signinModal').modal('hide');
                window.location.reload();
            },
            function() {
            }
        );
    }
    
    $scope.signout = function() {
        $cookies.userid = "";
    }
}

function ProfileCtrl($scope, User) {
    $scope.user = User.get({_param1: $scope.cookies.userid});
    
    $scope.update = function() {
        User.update({_param1: $scope.user.id}, $scope.user);
    }
}