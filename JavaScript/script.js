// ----------all----------
let windowY = 0;

// load
const loadBackground = document.querySelector(".load-background");
window.addEventListener("load",() => {
    loadBackground.style.opacity = 0;
    loadBackground.style.visibility = "hidden";
})


// ----------ヘッダー----------
// windowが隠れているか
let isHeaderHidden = false;

// headerを取得
const header = document.querySelector("#header").parentNode;
const headerOpenAnimeDuration = {duration:250,fill:"forwards"};
const headerCloseAnimeDuration = {duration:100,fill:"forwards",delay:200};

 // mainを取得
const main = document.querySelector("#main");

window.addEventListener("scroll", () => {
    let currentWindowY = window.scrollY;
    // console.log(currentWindowY);
    if(currentWindowY > windowY && !isHeaderHidden){
        // 下スクロールしたとき
        // ヘッダーを非表示
        header.animate(
            {
                translate:"0 -3.2rem"
            },
            headerOpenAnimeDuration
        );
        // headerとmainの隙間を埋める
        main.animate(
            {
                translate:"0 -3.2rem"
            },
            headerOpenAnimeDuration
        );

        // menuを一瞬隠す
        menu.animate(
            {
                translate:[0, "0 -3.2rem", 0],
                opacity:[1, 0, 0]
            },
            {
                duration:250,
                fill:"forwards"
            }
        );

        menu.animate(
            {
                opacity:[0, 1],
            },
            {
                duration:400,
                fill:"forwards",
                delay:300
            }
        );
        isHeaderHidden = true;
    } else if(currentWindowY < windowY && isHeaderHidden) {
        // 上スクロールしたとき
        // メニューを一瞬隠す
        menu.animate(
            {
                opacity:[1, 0]
            },
            {
                duration:100,
                fill:"forwards"
            }
        );
        menu.animate(
            {
                translate:["0 -3.2rem", 0],
                opacity:[0, 1]
            },
            {
                duration:100,
                fill:"forwards",
                delay:200
            }
        );

        // ヘッダーを表示
        header.animate(
            {
                translate:0
            },
            headerCloseAnimeDuration
        );
        // headerとmainの隙間を作る
        main.animate(
            {
                translate:0
            },
            headerCloseAnimeDuration
        );


        isHeaderHidden = false;
    }

    windowY = currentWindowY;
});

// ----------ハンバーガーメニュー----------
const menu = document.querySelector(".menu");
const menuSpan = document.querySelectorAll(".menu span");
const blackout = document.querySelector("#blackout");

menu.addEventListener("click", () => {
    if(menu.id == "open-menu"){
        menu.id = "close-menu";
        blackout.style.visibility = "hidden";

        menuSpan.forEach(e => {
            e.style.backgroundColor = "black";
        });
    } else {
        menu.id ="open-menu";
        blackout.style.visibility = "visible";

        menuSpan.forEach(e => {
            e.style.backgroundColor = "white";
        });
    }
});