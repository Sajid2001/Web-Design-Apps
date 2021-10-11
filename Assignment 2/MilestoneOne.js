
document.getElementByID('form-Task').addEventListener('submit',saveTask);

function saveTask(e){
  let title = document.getElementByID('title').value;
  let description = document.getElementByID('description').value;

  let task = {
    title,
    description
  };

  if(localStorage.getItem('tasks') === null){
    let = tasks = [];
    tasks.push(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }else{
    let tasks = JSON.parse(localStorage.getItem)
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();

  document.getElementByID('form-Task').reset();
  e.preventDefault();
}

function deleteTask(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {

      if (tasks[i].title == title) {
        tasks.splice(i,1);
      }
    }

    localStorage.setItem('tasks',JSON.stringify(tasks));
    getTasks();
}

function getTasks(){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementByID('tasks');
  tasksView.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;

    tasksView.innerHTML +=
    `<div class = "card mb-3">
      <div class = "card-body">
        <div class= "row">
          <div class= "col-sm-3 text-left">
            <p>$(title)</p>
          </div>
          <div class= "col-sm-7 text-left">
            <p>$(description)</p>
          </div>
          <div class= "col-sm-2 text-right">
            <a href="#" onclick = "deleteTask('$(title)')" class = "btn btn-danger ml-5">
          </div>
        </div>
      </div>
    </div>`;
  }
}
