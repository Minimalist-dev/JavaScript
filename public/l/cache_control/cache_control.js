let cambiar = document.querySelector("#cambiar");
let h1      = document.querySelector("h1");

cambiar.onclick = function() {
    if(h1.style.textDecoration === "underline") {
        h1.style.textDecoration = "none";
        h1.style.textTransform = "none";
    } else {
        h1.style.textDecoration = "underline";
        h1.style.textTransform = "uppercase";
    }
};