// ----------モーダルウィンドウ----------
const galleryPG = document.querySelector("#gallery-programming");  // galleryのPG
const PGModal = document.querySelector("#PG-modal"); // modalWindow全体
const closeModalBtn = document.querySelector("#close-modal-btn") // 閉じるボタン
const modalBlackOut = document.querySelector("#modal-blackout") // 背景

galleryPG.onclick = openPGModal;
closeModalBtn.onclick = closePGModal;
modalBlackOut.onclick = closePGModal;

function openPGModal(){
    PGModal.classList.add("open-PG-modal");
    PGModal.classList.remove("close-PG-modal");
}

function closePGModal(){
    PGModal.classList.add("close-PG-modal");
    PGModal.classList.remove("open-PG-modal");
}