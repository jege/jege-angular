navigator.id.watch({
  onlogin: function(assertion) {
    console.log("Persona onlogin");
    if(isLoggedIn()) {
        console.log("Persona already logged in");
    } else {
        console.log("Persona start verify");
        var servicesInjector = angular.injector(['jege.services']);
        
        servicesInjector.invoke(function(User) {
            User.verify({}, assertion,
                function(response) {
                    console.log("Persona verify success");
                    signin(response.body);
                    window.location.reload();
                },
                function() {
                    console.log("Persona verify failure");
                }
            );
        });
    }
  },
  onlogout: function() {
      console.log("Persona onlogout");
  }
});