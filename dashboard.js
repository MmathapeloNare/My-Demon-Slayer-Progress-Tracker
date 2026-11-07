const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const STORAGE_KEY = "greenProductiveTasks";
const MAX_TASKS = 7;
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };
const PRIORITY_LABEL = { high: "High", medium: "Medium", low: "Low" };

// ---------- Date ----------
const today = new Date();
document.getElementById("day").textContent = weekday[today.getDay()];
document.getElementById("number").textContent = today.getDate();
document.getElementById("month").textContent = month[today.getMonth()];

// ---------- Elements ----------
const inputTask = document.getElementById("write-task");
const categorySelect = document.getElementById("task-category");
const prioritySelect = document.getElementById("task-priority");
const addTaskBtn = document.getElementById("add-btn");
const finishBtn = document.getElementById("finish-btn");
const progressBar = document.getElementById("progress-bar");
const listEl = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");

// ---------- Saved tasks ----------
// Each task: { id, text, category, priority, done }
let tasks = loadTasks();

function loadTasks() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch (e) {
        return [];
    }
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ---------- Actions ----------
function addTask() {
    const text = inputTask.value.trim();
    if (text === "") {
        inputTask.focus();
        return;
    }
    if (tasks.length >= MAX_TASKS) {
        inputTask.value = "";
        inputTask.placeholder = `Mission list is full (max ${MAX_TASKS})`;
        return;
    }
    tasks.push({
        id: Date.now(),
        text,
        category: categorySelect.value,
        priority: prioritySelect.value,
        done: false,
    });
    inputTask.value = "";
    update();
}

function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) task.done = !task.done;
    update();
}

function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    inputTask.placeholder = "Write your mission here...";
    update();
}

addTaskBtn.addEventListener("click", addTask);
inputTask.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

finishBtn.addEventListener("click", () => {
    localStorage.setItem("finalProgress", progressBar.value);
    window.electronAPI.loadPage("finishDay.html");
});

// ---------- Rendering ----------
function makeTag(className, label) {
    const tag = document.createElement("span");
    tag.className = "tag " + className;
    tag.textContent = label;
    return tag;
}

function renderTasks() {
    listEl.innerHTML = "";

    // High priority first; tasks with the same priority keep the order they were added in.
    const sorted = tasks
        .slice()
        .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);

    sorted.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task" + (task.done ? " done" : "");

        const icon = document.createElement("i");
        icon.className = "bx bxs-flame";

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text; // textContent keeps user input safe
        text.addEventListener("click", () => toggleTask(task.id));

        const del = document.createElement("button");
        del.className = "delete-btn";
        del.textContent = "×";
        del.setAttribute("aria-label", "Delete task");
        del.addEventListener("click", () => deleteTask(task.id));

        li.append(
            icon,
            text,
            makeTag("category", task.category),
            makeTag("priority-" + task.priority, PRIORITY_LABEL[task.priority]),
            del
        );
        listEl.appendChild(li);
    });

    emptyMsg.hidden = tasks.length > 0;
}

function updateProgressBar() {
    if (tasks.length === 0) {
        progressBar.value = 0;
        return;
    }
    const doneCount = tasks.filter((t) => t.done).length;
    progressBar.value = (doneCount / tasks.length) * 100;
}

function update() {
    saveTasks();
    renderTasks();
    updateProgressBar();
}

update();
