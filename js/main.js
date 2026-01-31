document.addEventListener("DOMContentLoaded", () => {

const btn = document.getElementById("changeBtn");
const intro = document.getElementById("intro");

let isChanged = false;

changeBtn.addEventListener("click", () => {
    if(isChanged){
        intro.textContent = "こんにちは";
        changeBtn.textContent = "メッセージ変更"
        isChanged = false;
    }else{
        intro.textContent = "はらだです";
        changeBtn.textContent = "元に戻す"
        isChanged = true;
    }
});

const countBtn = document.getElementById("countBtn");
const countDisplay = document.getElementById("count");
let count = 0;

countBtn.addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;
});

const darkToggle = document.getElementById("darkToggle");

let isDarkMode =  false;

darkToggle.addEventListener("click" , () => {
    if(isDarkMode){
        document.body.classList.remove("dark");
        darkToggle.textContent = "🌙 ダークモード";
        isDarkMode = false;
    }else{
        document.body.classList.add("dark");
        darkToggle.textContent = "🌞 ライトモード";
        isDarkMode = true;
    }
});
console.log("読み込み成功");

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.85;

    reveals.forEach(el =>{
        const top = el.getBoundingClientRect().top;
        if(top < trigger){
            el.classList.add("show");
        }
    });
});

});