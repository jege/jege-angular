function signin(userid, rememberMe) {
    if(rememberMe) {
        localStorage.setItem("userid", userid);
    } else {
        sessionStorage.setItem("userid", userid);
    }
}

function signout() {
    sessionStorage.removeItem("userid");
    localStorage.removeItem("userid");
}