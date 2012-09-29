function getLoggedInUser() {
    return fromJson(sessionStorage.getItem("loggedInUser") || localStorage.getItem("loggedInUser"));
}

function isLoggedIn() {
    return !!getLoggedInUser();
}

function signin(loggedInUser, rememberMe) {
    if(rememberMe) {
        localStorage.setItem("loggedInUser", toJson(loggedInUser));
        sessionStorage.removeItem("loggedInUser");
    } else {
        sessionStorage.setItem("loggedInUser", toJson(loggedInUser));
        localStorage.removeItem("loggedInUser");
    }
}

function signout() {
    if(navigator.id) {
        navigator.id.logout();
    }
    sessionStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInUser");
}