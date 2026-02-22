// ----------all----------
let windowY = 0;

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

// ----------カルーセル----------
// 画像とテキストの配列
const carouselImageList = document.querySelectorAll("#carousel-img-list li"); // 画像リスト
const carouselTextList = document.querySelectorAll("#carousel-text-list li"); // テキストリスト

// 画像切り替え
const carouselRightArrow = document.querySelector("#carousel-right-arrow"); // 右矢印
const carouselLeftArrow = document.querySelector("#carousel-left-arrow"); // 左矢印

// 下の・を画像の数だけ増やす
const carouselDots = document.querySelector("#carousel-dots");
for(let i = 0; i < carouselImageList.length; i++){
    carouselDots.innerHTML += "<p></p>";
}

// ↑で追加した・を取得
const carouselDotList = document.querySelectorAll("#carousel-dots p");
carouselDotList.forEach((element, index) => {
    // ・がクリックされたとき画像とテキストを切り替える
    element.addEventListener("click", () => {
        // 現在表示されている画像とテキストを非表示にする
        carouselImageList[currentImageIndex].style.display = "none";
        carouselTextList[currentImageIndex].style.display = "none";
        carouselDotList[currentImageIndex].style.backgroundColor = "transparent";

        // クリックされた・に対応する画像とテキストを表示する
        carouselImageList[index].style.display = "block";
        carouselTextList[index].style.display = "block";
        carouselDotList[index].style.backgroundColor = "black";

        currentImageIndex = index;
    });
});

// 今表示している画像のindexを保持する変数
let currentImageIndex = 0;

carouselRightArrow.onclick = carouselRightArrowClicked;
carouselLeftArrow.onclick = carouselLeftArrowClicked;

// 左矢印がクリックされたとき
function carouselRightArrowClicked(){
    currentImageIndex = carouselNextIndex(currentImageIndex);
    carouselChangeImages(currentImageIndex, "before");
    carouselChangeText(currentImageIndex, "before");
}

// 右矢印がクリックされたとき
function carouselLeftArrowClicked(){
    currentImageIndex = carouselPrevIndex(currentImageIndex);
    carouselChangeImages(currentImageIndex, "after");
    carouselChangeText(currentImageIndex, "after")
}

// indexを変更
// 次へ
function carouselNextIndex(index){
    if(index == carouselImageList.length - 1){
        index = 0;
    } else {
        index++;
    }

    return index;
}

// 前へ
function carouselPrevIndex(index){
    if(index == 0){
        index = carouselImageList.length - 1;
    } else {
        index--;
    }

    return index;
}

// 画像切り替え
function carouselChangeImages(index, direction){
    carouselImageList[index].style.display = "block";
    carouselDotList[index].style.backgroundColor = "black";

    if(direction == "before"){
        carouselImageList[carouselPrevIndex(index)].style.display = "none";
        carouselDotList[carouselPrevIndex(index)].style.backgroundColor = "transparent";
    } else {
        carouselImageList[carouselNextIndex(index)].style.display = "none";
        carouselDotList[carouselNextIndex(index)].style.backgroundColor = "transparent";
    }
}

// テキスト切り替え
function carouselChangeText(index, direction){
    carouselTextList[index].style.display = "block";

    if(direction == "before"){
        carouselTextList[carouselPrevIndex(index)].style.display = "none";
    } else {
        carouselTextList[carouselNextIndex(index)].style.display = "none";
    }
}