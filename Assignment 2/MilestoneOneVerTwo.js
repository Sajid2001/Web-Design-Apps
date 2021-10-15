

document.addEventListener('DOMContentLoaded', function(){

//are these methods in the right place?
  document.querySelector("#new-task").addEventListener('submit',addTask);

})

let tasks = [];

function addTask (ev) {

  let title = document.querySelector("#title").value;
  let description = document.querySelector("#description").value;
  let priority = document.querySelector("#priority-level").value;

  let task = {
    title:title,
    description: description,
    priority: priority
  }

  tasks.push(task);
  document.querySelector("#new-task").reset();
  ev.preventDefault();

  displayTasks();
}

function removeTask(title) {

  for (let i = 0; i < tasks.length; i++) {

    if (tasks[i].title == title) {
      tasks.splice(i,1);
    }
  }

  displayTasks();
}

function displayTasks(){

  let tasksView = document.querySelector("#tasks_list");
  tasksView.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;
    let priority = tasks[i].priority;

    tasksView.innerHTML +=
    `<div class="card">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${priority}</h6>
        <p class="card-text">${description}</p>
        <a href="#" onclick="removeTask('${title}')" class="btn btn-primary">Remove </a>
      </div>
    </div>`;
  }
}
