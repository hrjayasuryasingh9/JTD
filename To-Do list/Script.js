const popup = document.getElementById("popup");
const openPopupButton = document.getElementById("ADD-TODO");
const addTaskButton = document.getElementById("addTask");
const cancelTaskButton = document.getElementById("cancelTask");

function initializeTasks() {
  const tasks = {
    High: [],
    Medium: [],
    Low: [],
  };
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

openPopupButton.addEventListener("click", function () {
  popup.style.display = "flex";
  popup.style.transform = scale(1);
});

addTaskButton.addEventListener("click", function () {
  const taskName = document.getElementById("taskName").value;
  const taskDescription = document.getElementById("taskDescription").value;
  const taskPriority = document.getElementById("taskPriority").value;
  const deadlineTime = document.getElementById("deadlineTime").value;
  const deadlineDate = document.getElementById("deadlineDate").value;

  if (
    !taskName ||
    !taskDescription ||
    !taskPriority ||
    !deadlineTime ||
    !deadlineDate
  ) {
    alert("Please fill in all fields.");
    return;
  }

  const currentDateTime = new Date();
  const selectedDateTime = new Date(`${deadlineDate}T${deadlineTime}`);

  if (selectedDateTime <= currentDateTime) {
    alert("Please select a future date and time.");
    return;
  }

  const task = {
    name: taskName,
    description: taskDescription,
    priority: taskPriority,
    deadline: `${deadlineDate} ${deadlineTime}`,
  };

  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    initializeTasks();
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks[taskPriority].push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  Addtodos(taskPriority);

  clearInputs();

  popup.style.display = "none";
});

function clearInputs() {
  document.getElementById("taskName").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("taskPriority").selectedIndex = 0;
  document.getElementById("deadlineTime").value = "";
  document.getElementById("deadlineDate").value = "";
}
function checkDeadline(task) {
  const currentDateTime = new Date();
  const taskDeadline = new Date(`${task.deadline.replace(" ", "T")}`);

  return taskDeadline <= currentDateTime; // Returns true if deadline has passed
}
function Addtodos(priority) {
  let tasksdata = JSON.parse(localStorage.getItem("tasks"));
  const taskrow = document.getElementById("TODO-list");
  taskrow.innerText = "";
  if (priority == "All") {
    tasks = [...tasksdata["High"], ...tasksdata["Medium"], ...tasksdata["Low"]];
  } else {
    tasks = tasksdata[priority];
  }
  tasks.forEach((task, index) => {
    const isDeadlinePassed = checkDeadline(task) ? "deadline-passed" : "";
    const isTaskCompleted = task.completed ? "completed-task" : "";
    const isButtonDisabled = task.completed ? "disabled" : "";

    const todoHTML = `
      <div class="todo pt-1 d-flex justify-content-around align-items-center my-2 ${isDeadlinePassed}">
        <div class="todo-main mx-2">
          <div class="task-head mt-1 d-flex justify-content-between align-items-center">
            <h1 class="${isTaskCompleted}">${task.name}</h1>
            <div class="priority-box ${task.priority}">${task.priority}</div>
          </div>
          <div class="task-header d-flex justify-content-between align-items-center">
            <p class="${isTaskCompleted}">${task.description}</p>
            <p>${task.deadline}</p>
          </div>
        </div>
        <div class="task-buttons mb-1 d-flex justify-content-between align-items-center">
          <button class="Completed mx-2 done" ${isButtonDisabled} onclick="completeTask('${task.priority}', ${index})">Completed</button>
          <button class="Completed mx-2 Delete" onclick="deleteTask('${task.priority}', ${index})">Delete</button>
        </div>
      </div>
    `;
    taskrow.innerHTML += todoHTML;
  });
}
function deleteTask(priority, index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[priority].splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  Addtodos(priority);
}
cancelTaskButton.addEventListener("click", function () {
  popup.style.display = "none";
});
function completeTask(priority, index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[priority][index].completed = true; // Mark task as completed
  localStorage.setItem("tasks", JSON.stringify(tasks));
  Addtodos(priority); // Refresh the task list
}
function checkAllDeadlines() {
  const tasksdata = JSON.parse(localStorage.getItem("tasks"));
  Object.keys(tasksdata).forEach((priority) => {
    tasksdata[priority].forEach((task) => {
      if (checkDeadline(task)) {
        task.isDeadlinePassed = true; // Mark task as deadline passed
      }
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  Addtodos("All");
}
document.addEventListener("DOMContentLoaded", function () {
  checkAllDeadlines();
});
