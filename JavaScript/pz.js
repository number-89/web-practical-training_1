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


// パズルのテーブルを受け取る
const table = document.querySelector("#puzzle-table");

// マスを管理する配列
let tds = [];
// シャッフルした後の配列を一次元配列として保持する配列
let flatArray;

// 入れ替え回数
let swapCount = 0;
const swapCountText = document.querySelector("#swap-count");

// クリアテキスト
const clearText = document.querySelector("#clear-text");
const clearAry = ["C","L","E","A","R"];
const midTds = [];

// スタートボタン
const startBtn = document.querySelector("#start-btn");

// ゲームが開始されているか管理する変数
let isInGame = false;

// タイマー
const timerText = document.querySelector("#time-count");
let gameTimer;
let second = 0;
let minute = 0;
let hour = 0;

let resultSecond = "";
let resultMinute = "";

// パズルテーブルを作成
for(let i=0;i<5;i++){
    // trタグを作成
    const tr = document.createElement('tr');
    tr.row = i;
    for(let j=0;j<5;j++){
        // tdタグを作成
        const td = document.createElement('td');
        td.onclick = tdClicked;
        td.innerText = i * 5 + j + 1;
        td.num = i * 5 + j + 1;
        td.positionX = j;
        td.positionY = i;

        if((i * 5 + j + 1) == 25){
            td.innerText = "";
        } else if(i == 2){
            midTds.push(td);
        }
        tr.appendChild(td);

        // tdを配列で管理
        tds.push(td);
    }
    table.appendChild(tr);
}

// tdがクリックされたときのイベント
function tdClicked(e){
    // ゲーム中
    if(isInGame){
        const H = e.target.positionY;
        const W = e.target.positionX;
        // console.log(`${e.target.num}がクリックされました`);

        // 上下左右を確かめ、移動出来たら移動する
        if(check(testArray, H, W) != "none"){
            const splitcheck = check(testArray, H, W).split(' ');
            const direction = splitcheck[0];
            const distance = Number(splitcheck[1]);
            
            swap(testArray, H, W, direction, distance);
            swapCountUp();
        }
    
        // クリアしたとき
        if(completeCheck()){
            gameCleared();
        }
    }
}

function shuffle(array,lenH, lenW){
    for(let i = 0; i < 1000; i++){
        const randomH = Math.floor(Math.random() * lenH);
        const randomW = Math.floor(Math.random() * lenW);
        const checked = check(array, randomH, randomW);

        if(checked != "none"){
            const splitCheck = checked.split(' ');
            const direction = splitCheck[0];
            const distance = Number(splitCheck[1]);
            
            swap(array, randomH, randomW, direction, distance);
        }
    }
}

// 入れ替えるときに使う
let testArray = [
    [1,2,3,4,5],
    [6,7,8,9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25]
];


// スタートボタンが押されたとき
startBtn.onclick = () => {
    
    if(!isInGame){
        startGame();
    } else {
        shuffle(testArray, 5, 5);
    }
    // これにより、ログが出力された時点でのtestArrayのスナップショットが得られます。
    // console.log(JSON.parse(JSON.stringify(testArray)));
}


// 5 * 5専用
// 順番に並んでいるか確認する
// 返り値:true/false
function completeCheck(){
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            if(testArray[i][j] != (i * 5 + j + 1)){
                return false;
            }
        }
    }

    return true;
}

// 5*5専用
// 上下左右どの直線上に空白マスがあるか
// 返り値の形式:"direction distance" (directionがnoneの時distanceは返ってこない)
// direction: right / left / up / down / none
function check(array, positionY, positionX){
    // console.log("checkを実行");
    // 左があれば左を確かめる
    let left = 1;
    while(positionX - left >= 0){
        if(array[positionY][positionX - left] == 25){
            return `left ${left}`;
        }
        left++;
    }

    // 右があれば右を確かめる
    let right = 1;
    while(positionX + right < 5){
        if(array[positionY][positionX + right] == 25){
            return `right ${right}`;
        }
        right++;
    }

    // 上があれば上を確かめる
    let up = 1;
    while(positionY - up >= 0){
        if(array[positionY - up][positionX] == 25){
            return `up ${up}`;
        }
        up++;
    }

    // 下があれば下を確かめる
    let down = 1;
    while(positionY + down < 5){
        if(array[positionY + down][positionX] == 25){
            return `down ${down}`;
        }
        down++;
    }

    return "none";
}

// 5 * 5専用
// tdがクリックされたときx軸(y軸)方向に空白マスがあるとき場所を入れ替える
// 以前のswapはクリックされた場所を入れ替えるという考え方だったが、
// これは空白マスをクリックされた場所まで移動するという考え方
function swap(array, positionY, positionX, direction, distance){
    // console.log(`${positionY} ${positionX} ${direction} ${distance}`);
    // 空白マス場所のindexを保持
    const clickedIndex = positionY * 5 + positionX;

    // 空白マスの場所のtdとarrayを保持する変数;
    let tdTmp;
    let arrayTmp;
    
    // 場所を入れ替えるときに使うspan
    let cellTmp = document.createElement("span");
    
    // 下にずらす
    switch(direction){
        case "down":
            for(let i = distance; 0 < i; i--){
                // 空白マス場所のtdを保持
                tdTmp = tds[clickedIndex + (i * 5)];
            
                // 空白マス場所のarrayを保持
                arrayTmp = array[positionY + i][positionX];

                // arrayを入れ替える
                array[positionY + i][positionX] = array[positionY + i - 1][positionX];
                array[positionY + i - 1][positionX] = arrayTmp;

                // tdsを入れ替える
                tds[clickedIndex + (i * 5)] = tds[clickedIndex + (i * 5) - 5];
                tds[clickedIndex + (i * 5) - 5] = tdTmp;

                // td.positionYを書き換え
                tds[clickedIndex + (i * 5)].positionY++;
                tds[clickedIndex + (i * 5) - 5].positionY--;

                // 見た目を書き換える
                tds[clickedIndex + (i * 5) - 5].parentNode.insertBefore(cellTmp, tds[clickedIndex + (i * 5) - 5]);
                tds[clickedIndex + (i * 5)].parentNode.insertBefore(tds[clickedIndex + (i * 5) - 5], tds[clickedIndex + (i * 5)]);
                cellTmp.parentNode.insertBefore(tds[clickedIndex + (i * 5)], cellTmp);
            }
            break;

        case "up":
            for(let i = distance; 0 < i; i--){
                // 空白マス場所のtdを保持
                tdTmp = tds[clickedIndex - (i * 5)];
            
                // 空白マス場所のarrayを保持
                arrayTmp = array[positionY - i][positionX];

                // arrayを入れ替える
                array[positionY - i][positionX] = array[positionY - i + 1][positionX];
                array[positionY - i + 1][positionX] = arrayTmp;

                // tdsを入れ替える
                tds[clickedIndex - (i * 5)] = tds[clickedIndex - (i * 5) + 5];
                tds[clickedIndex - (i * 5) + 5] = tdTmp;

                // td.positionYを書き換え
                tds[clickedIndex - (i * 5)].positionY--;
                tds[clickedIndex - (i * 5) + 5].positionY++;

                // 見た目を書き換える
                tds[clickedIndex - (i * 5) + 5].parentNode.insertBefore(cellTmp, tds[clickedIndex - (i * 5) + 5]);
                tds[clickedIndex - (i * 5)].parentNode.insertBefore(tds[clickedIndex - (i * 5) + 5], tds[clickedIndex - (i * 5)]);
                cellTmp.parentNode.insertBefore(tds[clickedIndex - (i * 5)], cellTmp);
            }
            break;

        case "right":
            for(let i = distance; 0 < i; i--){
                // 空白マス場所のtdを保持
                tdTmp = tds[clickedIndex + i];
            
                // 空白マス場所のarrayを保持
                arrayTmp = array[positionY][positionX + i];

                // arrayを入れ替える
                array[positionY][positionX + i] = array[positionY][positionX + i - 1];
                array[positionY][positionX + i - 1] = arrayTmp;

                // tdsを入れ替える
                tds[clickedIndex + i] = tds[clickedIndex + i - 1];
                tds[clickedIndex + i - 1] = tdTmp;

                // td.positionYを書き換え
                tds[clickedIndex + i].positionX++;
                tds[clickedIndex + i - 1].positionX--;

                // 見た目を書き換える
                tds[clickedIndex + i - 1].parentNode.insertBefore(cellTmp, tds[clickedIndex + i - 1]);
                tds[clickedIndex + i].parentNode.insertBefore(tds[clickedIndex + i - 1], tds[clickedIndex + i]);
                cellTmp.parentNode.insertBefore(tds[clickedIndex + i], cellTmp);
            }
            break;

        case "left":
            for(let i = distance; 0 < i; i--){
                // 空白マス場所のtdを保持
                tdTmp = tds[clickedIndex - i];
            
                // 空白マス場所のarrayを保持
                arrayTmp = array[positionY][positionX - i];

                // arrayを入れ替える
                array[positionY][positionX - i] = array[positionY][positionX - i + 1];
                array[positionY][positionX - i + 1] = arrayTmp;

                // tdsを入れ替える
                tds[clickedIndex - i] = tds[clickedIndex - i + 1];
                tds[clickedIndex - i + 1] = tdTmp;

                // td.positionYを書き換え
                tds[clickedIndex - i].positionX--;
                tds[clickedIndex - i + 1].positionX++;

                // 見た目を書き換える
                tds[clickedIndex - i + 1].parentNode.insertBefore(cellTmp, tds[clickedIndex - i + 1]);
                tds[clickedIndex - i].parentNode.insertBefore(tds[clickedIndex - i + 1], tds[clickedIndex - i]);
                cellTmp.parentNode.insertBefore(tds[clickedIndex - i], cellTmp);
            }
            break;
            
        default:
                break;
    }
    
    cellTmp.remove();
}

// 入れ替え回数をカウントする
function swapCountUp(){
    swapCount++;
    if(swapCount < 10000000){
        swapCountText.innerText = `${swapCount}`;
    }
}

// ゲームタイマーのTickイベント
function gameTimerTick(){
    second++;
    // secondが60以上の時
    if(second >= 60){
        second = 0;
        minute++;
    }

    // minuteが60以上の時
    if(minute >= 60){
        minute = 0;
        hour++;
    }

    if(hour == 0){
        if(second < 10 || minute < 10){
            resultMinute = String(minute).padStart(2, "0");
            resultSecond = String(second).padStart(2, "0");
            timerText.innerText = `${resultMinute}:${resultSecond}`;
        } else {
            timerText.innerText = `${minute}:${second}`;
        }
    } else {
        if(second < 10 || minute < 10){
            resultMinute = String(minute).padStart(2, "0");
            resultSecond = String(second).padStart(2, "0");
            timerText.innerText = `${hour}:${resultMinute}:${resultSecond}`;
        } else {
            timerText.innerText = `${hour}:${minute}:${second}`;
        }
    }
}

// ゲーム開始処理
function startGame(){
    shuffle(testArray, 5, 5);
    swapCount = 0;
    minute = 0;
    second = 0;
    gameTimer = setInterval(gameTimerTick, 1000);
    isInGame = true;
    startBtn.innerHTML = "リスタート";
}

// クリアしたときの処理
function gameCleared(){
    // 内部
    isInGame = false;
    clearInterval(gameTimer);

    // 見た目
    // tds.mapが終了したら、midTds.forEachが実行される。
    Promise.all(
        // すべてのパネルが一瞬光る
        tds.map((e, i) => 
            // ↑返り値として新しい配列が返ってくる
            e.animate(
                {
                    backgroundColor:["white","rgb(204, 249, 255)","white"]
                },
                {
                    duration:500,
                    delay:30 * i + 250
                }
            ).finished
        )
    ).then(() => {
        // ↑アニメーションが終了してから実行
        // 25を表示
        tds[24].innerText = "25";
        tds[24].animate(
            {
                opacity:[0,1]
            },
            {
                duration:500,
                fill:"forwards"
            }
        );
        // テキストをCLEARに書き換え、背景が一瞬黄緑になる;
        midTds.forEach((e, i) => {
            e.innerText = clearAry[i];
            e.animate(
                {
                    backgroundColor:["white","rgb(209, 255, 209)","white"]
                },
                {
                    duration:500,
                    delay:30 * i
                }
            );
        });
    });
}

// function blackTd(){
//     Promise.all(
//         tds.map((e) =>
//             e.animate(
//                 {
//                     backgroundColor:"black"
//                 },
//                 {
//                     duration:1000,
//                     delay:5000
//                 }
//             ).finished
//         )
//     ).then(() => {
//         tds.forEach((e, i) => {
//             e.addEventListener("mouseover",{
//                 backgroundColor = "white";
//             });
//         });
//     });
// }


// 以下実装したいこと
// クリアしたときすべてのマスに色を付ける clear
// クリックした列(行)に空きマスがあった時詰める clear
// クリアにかかった時間を計る clear
// クリアまでにクリックした回数を数える(入れ替えた回数のほうが良いかも) clear
// 時間とクリック回数でスコアを算出
// ランキング
// 番号が見えなくなる
// 最初の状態に戻す(ペナルティがあったほうが良いかも)


// debug
const debugBtn = document.querySelector("#debug-btn");
debugBtn.addEventListener("click",() => {
    gameCleared();
    // for(let i = 0; i < 100000; i++){
    //     gameTimerTick();
    // }
    // shuffle(testArray, 5, 5);
    // blackTd();
});