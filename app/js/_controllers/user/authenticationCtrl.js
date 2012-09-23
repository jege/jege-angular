function InscriptionCtrl($scope, $cookies, User) {
    $scope.newUser = new User();
    
    $scope.create = function() {
        var newUserId = getUuid();
        $scope.newUser.id = newUserId;
        
        User.create({}, $scope.newUser,
            function(response) {
                signin($scope.newUser.id);
                window.location = "#{site.base_url}";
        });
    }
}

function SigninCtrl($scope, User) {
    $scope.credentials = {};
    
    $scope.signin = function() {
        User.signin({}, $scope.credentials,
            function(response) {
                signin(response.body.userid);
                $('#signinModal').modal('hide');
                window.location.reload();
            },
            function() {
            }
        );
    }
    
    $scope.signout = function() {
        signout();
    }
}

function ProfileCtrl($scope, User) {
    User.get({_param1: $scope.userid}, function(response) {
        $scope.user = response.body;
    });
    
    $scope.update = function() {
        User.update({_param1: $scope.user.id}, $scope.user);
    }
}