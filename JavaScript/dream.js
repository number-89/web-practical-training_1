// load
const loadBackground = document.querySelector(".load-background");
window.addEventListener("load",() => {
    loadBackground.style.opacity = 0;
    loadBackground.style.visibility = "hidden";
})

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

// カーソルを合わせたものが落下する。
// 落下するアイテムをまとめた配列
let fallItemList = [];

// 落下させる要素を受け取り配列に追加する。

// ロゴ
const headerLogo = document.querySelector("#header-logo");
fallItemList.push(headerLogo);

// ハンバーガー
// 上で宣言済み
fallItemList.push(menu);

// ハンバーガー内のテキスト
const menuTexts = document.querySelectorAll("#blackout li");
menuTexts.forEach((e) => {
    fallItemList.push(e);
});

// galleryの上のテキスト
const sectionTitle = document.querySelector(".section-title");
fallItemList.push(sectionTitle);

// galleryのitem6つ
const galleryImages = document.querySelectorAll("#gallery-image-list li");
galleryImages.forEach((e) => {
    fallItemList.push(e);
});

// footerの文字
const footer = document.querySelector("#footer");
let stopElem = footer.getBoundingClientRect();
window.addEventListener("scroll", () => {
    stopElem = footer.getBoundingClientRect();
})

// ホバーしたものを下に落とす。
// 一番下に到達したら止める。
const documentHeight = document.documentElement.scrollHeight;

// タイマーを保存する配列
let fallTimerList = [];

fallItemList.forEach((e, i) => {
    e.isAddEvent = false;
    e.translateY = 0;

    e.addEventListener("mouseover", () => {
        if(e.isAddEvent == false){
            fallTimerList[i] = setInterval(() => {
                if(e.translateY < documentHeight)
                {
                    e.style.translate = `0 ${e.translateY}px`;
                    e.translateY += 5;
                }
                if(e.getBoundingClientRect().bottom > stopElem.top || e.translateY > documentHeight){
                    clearInterval(fallTimerList[i]);
                }
                console.log("mo")
            }, 10);

            e.isAddEvent = true;
        }
    })
})