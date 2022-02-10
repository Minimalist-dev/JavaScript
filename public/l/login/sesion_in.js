const ID = sessionStorage.getItem("id");

window.onload = function() {
    ID === '' || ID === null ? window.history.back() : console.log("Sesion.");
};

