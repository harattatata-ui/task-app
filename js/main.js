
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
