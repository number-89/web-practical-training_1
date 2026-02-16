// ハンバーガーメニュー
const menu = document.querySelector(".menu");
const menuSpan = document.querySelectorAll(".menu span");
const blackout = document.querySelector("#blackout");

menu.addEventListener("click", () => {
    if(menu.id == "open-menu"){
        menu.id = "close-menu";
        isMenuOpen = !isMenuOpen;
        blackout.style.visibility = "hidden";
    } else {
        menu.id ="open-menu";
        blackout.style.visibility = "visible";
        isMenuOpen = !isMenuOpen;

        menuSpan.forEach(e => {
            // e.style.backgroundColor = "white";
        })
    }
})