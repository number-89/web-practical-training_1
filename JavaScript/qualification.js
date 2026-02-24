// 全体
window.addEventListener("scroll", () => {
    // スクロールされたときサイドウィンドウの横幅を計りなおす
    // (ウィンドウがリサイズされたときの挙動を受け取れないため)
    sideWindowWidth = sideWindow.clientWidth;
})

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

// ----------説明文----------
const sideWindow = document.querySelector("#qualification-story")  // サイドメニュー
const closeBtn = document.querySelector("#close-qualification-story"); // ボタン
const qualificationNameList = document.querySelectorAll(".qualification-name span"); // 取得した資格のリスト
const storyTextList = document.querySelectorAll("#qualification-story-text li"); // 説明文のリスト
let sideWindowWidth = sideWindow.clientWidth; // サイドメニューの横幅(px)

let isWindowOpen = false;
closeBtn.onclick = sideWindowClose;

// ウィンドウを閉じる
function sideWindowClose(){
    // fontWeightをnormalに変更
    fontWeightNormal();

    if(isWindowOpen){
        // サイドウィンドウを閉じる
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

        // テキストを非表示にする
        setTimeout(() => {
            sideWindowTextNone();
        }, 250);

        isWindowOpen = false
    }
}

// ウィンドウを開くイベントを付与
qualificationNameList.forEach((e, i) => {
    e.addEventListener("click", () => {
        // すべてのfontWeightをnormalに変更
        fontWeightNormal();

        // クリックされたテキストのfontWeightをboldに変更
        qualificationNameList[i].style.fontWeight = "bold";

        // 閉じているとき
        if(!isWindowOpen){
            // クリックされた資格名に対応するテキストを表示
            storyTextList[i].style.display = "block";

            // サイドウィンドウを開く
            sideWindow.animate(
                {
                    opacity:[0, 1],
                    right:[`${-1 * (sideWindowWidth + 1)}px`, 0]
                },
                {
                    duration:250,
                    fill:"forwards",
                    easing:"ease-out"
                }
            );

            // テキストを表示
            storyTextList[i].animate(
                {
                    opacity:[0, 1]
                },
                {
                    duration:1,
                    fill:"forwards"
                }
            );
        
            // クリックされたテキストに対応するテキストを表示
            isWindowOpen= true;
        } else {
            // 開いているとき
            openSideWindowTextHidden();
            sideWindowTextNone();
            storyTextList[i].style.display = "block";
            storyTextList[i].animate(
                {
                    opacity:[0, 1],
                    translate:["0 10px", 0]
                },
                {
                    duration:200,
                    fill:"forwards"
                }
            );
        }
    });
})

// すべてのfontWeightをnormalに変更
function fontWeightNormal(){
    qualificationNameList.forEach(e => {
        e.style.fontWeight = "normal";
    });
}

// すべてのサイドウィンドウに表示されたテキストを非表示にする
function sideWindowTextNone(){
    storyTextList.forEach((e) => {
        e.style.display = "none"
    })
}

// サイドウィンドウが開いているときのテキストアニメーション
function openSideWindowTextHidden(){
    storyTextList.forEach((e) => {
        e.animate(
            {
                opacity:[1, 0],
                translate:["0 10px", 0]
            },
            {
                duration:200,
                fill:"forwards"
            }
        );
    })
}