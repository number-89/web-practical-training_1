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

// ----------説明文----------
const sideWindow = document.querySelector("#qualification-story")  // サイドメニュー
const closeBtn = document.querySelector("#close-qualification-story"); // ボタン
const qualificationNameList = document.querySelectorAll(".qualification-name"); // 取得した資格のリスト
const storyTextList = document.querySelectorAll("#qualification-story-text li p"); // 説明文のリスト
let sideWindowWidth = sideWindow.clientWidth; // サイドメニューの横幅(px)

let isWindowOpen = false;
closeBtn.onclick = sideWindowClose;

// ウィンドウを閉じる
function sideWindowClose(){
    if(isWindowOpen){
        sideWindow.animate(
            {
                right:[0, `${-1 * (sideWindowWidth + 1)}px`]
            },
            {
                duration:250,
                fill:"forwards",
                easing:"ease-out"
            }
        );

        isWindowOpen = false
    }
}

// ウィンドウを開くイベントを付与
qualificationNameList.forEach((e, i) => {
    e.onclick = sideWindowOpen;
})

function sideWindowOpen(){
    // 閉じているとき
    if(!isWindowOpen){
        sideWindow.animate(
            {
                right:[`${-1 * (sideWindowWidth + 1)}px`, 0]
            },
            {
                duration:250,
                fill:"forwards",
                easing:"ease-out"
            }
        );

        isWindowOpen= true;
    } else {
        // 開いているとき
    }
}