const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
window.onload = function() {
    loadTasks();
}

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    const priority = document.getElementById('priority').value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    // Set the priority class based on the dropdown
    li.classList.add(priority); 

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = function() {
        li.remove();
        saveTasks(); // Save tasks after deletion
    };
    li.appendChild(deleteButton);

    taskSpan.onclick = function() {
        li.classList.toggle('completed');
        saveTasks(); // Save tasks after marking as completed
    };

    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks(); // Save tasks after adding
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    const taskItems = taskList.getElementsByTagName('li');
    
    for (let task of taskItems) {
        tasks.push({
            text: task.children[0].textContent,
            completed: task.classList.contains('completed'),
            priority: task.classList.contains('low') ? 'low' : task.classList.contains('medium') ? 'medium' : 'high'
        });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks)); // Store the tasks in localStorage
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            const taskSpan = document.createElement('span');
            taskSpan.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            li.classList.add(task.priority); // Add priority class

            li.appendChild(taskSpan);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.classList.add('delete-btn');
            deleteButton.onclick = function() {
                li.remove();
                saveTasks();  // Save tasks after deletion
            };
            li.appendChild(deleteButton);

            taskSpan.onclick = function() {
                li.classList.toggle('completed');
                saveTasks();  // Save tasks after marking as completed
            };

            taskList.appendChild(li);
        });
    }
}

// Function to clear all tasks
function clearAllTasks() {
    const taskItems = taskList.getElementsByTagName('li');
    while (taskItems.length > 0) {
        taskItems[0].remove();
    }
    saveTasks(); // Save empty task list
}
