function AppCtrl($scope) {
    $scope.isLoggedIn = function() {
        return isLoggedIn();
    }
}
;
function InscriptionCtrl($scope, $cookies, User) {
    $scope.newUser = new User();
    
    $scope.create = function() {
        var newUserId = getUuid();
        $scope.newUser.id = newUserId;
        
        User.create({}, $scope.newUser,
            function(response) {
                signin($scope.newUser.id);
                window.location = "//jege.github.com/jege-angular";
        });
    }
}

function SigninCtrl($scope, User) {
    $scope.credentials = {};
    
    $scope.signin = function() {
        User.signin({}, $scope.credentials,
            function(response) {
                signin(response.body, $scope.credentials.rememberMe);
                $('#signinModal').modal('hide');
                window.location.reload();
                handleResponse(response);
            },
            function() {
                handleResponse(response);
            }
        );
    }
    
    $scope.signout = function() {
        signout();
    }
}

function ProfileCtrl($scope, User) {
    User.get({_param1: getLoggedInUser().id}, function(response) {
        $scope.user = response.body;
    });
    
    $scope.update = function() {
        User.update({_param1: $scope.user.id}, $scope.user);
    }
}
;
function UserCtrl($scope, User) {
    User.get({}, function(response) {
        $scope.users = response.body;
        handleResponse(response);
    });
}
;
