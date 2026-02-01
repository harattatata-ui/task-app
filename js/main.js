

const taskText = document.getElementById("taskText");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const today = new Date().toISOString().split("T")[0];


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  const grouped = {};

  // 日付ごとにグループ化
  tasks.forEach((task) => {
    if (!grouped[task.date]) {
      grouped[task.date] = [];
    }

    grouped[task.date].push(task);
  });

  // 日付ごとに表示
  Object.keys(grouped).sort().forEach(date => {
    const dateHeader = document.createElement("h3");
    dateHeader.textContent = `📅 ${date}`;
    taskList.appendChild(dateHeader);

    grouped[date].forEach((task) => {
      const li = document.createElement("li");

      if (task.date < today && !task.done) {
         li.style.background = "#ffd6d6";
}

      const left = document.createElement("div");
      left.innerHTML = `
        <input type="checkbox" ${task.done ? "checked" : ""}>
        <span style="${task.done ? 'text-decoration: line-through; opacity:0.6;' : ''}">
          ${task.text}
        </span>
      `;

      left.querySelector("input").addEventListener("change", () => {
        task.done = !task.done;
        saveTasks();
        renderTasks();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "削除";
      deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t !== task);
        saveTasks();
        renderTasks();
      });

      li.appendChild(left);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  });
}

addTaskBtn.addEventListener("click", () => {
  if (taskText.value === "" || taskDate.value === "") return;

  tasks.push({
    text: taskText.value,
    date: taskDate.value,
    done: false
  });

  taskText.value = "";
  saveTasks();
  renderTasks();
});

renderTasks();

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
        document.body.classList.remove  ("dark");
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

