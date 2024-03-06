let taskList = document.querySelector("#tasks-list");

function addTask() {
    let inputTask = document.querySelector("#new-task");
    let newTask = inputTask.value.trim();
    if (newTask !== '') {
        let listItem = document.createElement('li');
        let deleteBtn = document.createElement('button');
        let taskText = document.createElement('span');
        taskText.textContent = newTask;
        taskText.classList.add('task-text'); 
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = deleteTask;
        
        listItem.appendChild(taskText);
        listItem.appendChild(document.createTextNode("  ")); // Space between text and button
        listItem.appendChild(deleteBtn);
        
        listItem.onclick = function(event) {
            // Prevent toggling 'done' when clicking the delete button
            if (event.target !== deleteBtn) {
                taskText.classList.toggle('done');
                saveTasks();
            }
        }
        taskList.appendChild(listItem);
        inputTask.value = '';
        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#tasks-list li").forEach(function(taskItem) {
        let taskText = taskItem.querySelector('.task-text');
        tasks.push({
            text: taskText.textContent,
            completed: taskText.classList.contains('done'),
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';
    tasks.forEach(function(task) {
        let listItem = document.createElement('li');
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        let taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.classList.add('task-text');
        if (task.completed) {
            taskText.classList.add('done');
        }
        
        deleteBtn.onclick = deleteTask;
        
        listItem.appendChild(taskText);
        listItem.appendChild(document.createTextNode("  "));
        listItem.appendChild(deleteBtn);
        
        listItem.onclick = function(event) {
            if (event.target !== deleteBtn) {
                taskText.classList.toggle('done');
                saveTasks();
            }
        }
        
        taskList.appendChild(listItem);
    });
}

function deleteTask(event) {
    let taskItem = event.target.parentElement;
    taskItem.remove();
    saveTasks();
}

document.querySelector('#add-task').addEventListener('click', addTask);

document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});
