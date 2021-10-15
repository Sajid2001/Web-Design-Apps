

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

function completeTask(title){

  {alert('You have completed a task')}
  removeTask(title);

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
    `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <label>
          <input id="task-status" type="checkbox" value="" onclick = "completeTask('${title}')">
          ${title}
        </label>
        <small>${priority}</small>
      </div>
      <p class="mb-1">${description}</p>
      <a href="#" onclick="removeTask('${title}')" class="btn btn-danger">Remove</a>
    </a>`;
  }
}
