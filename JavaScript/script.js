let isMenuOpen = false;
const menu = document.querySelector(".menu");
menu.addEventListener("click", () => {
    if(isMenuOpen){
        menu.id = "close-menu";
        isMenuOpen = !isMenuOpen;
    } else {
        menu.id ="open-menu";
        isMenuOpen = !isMenuOpen;
    }
})