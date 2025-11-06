// const titlu= document.getElementsByClassName("submit-button")[0];
// function changeColor(){
//     titlu.style.background= "red";
// }
// titlu.addEventListener("mouseover", changeColor);

document.addEventListener("DOMContentLoaded", function() {
    const titlu = document.getElementsByClassName("submit-button")[0];
    function changeColor() {
        titlu.style.background = "red";
    }
    titlu.addEventListener("mouseover", changeColor);
});

