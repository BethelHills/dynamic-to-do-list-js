// To-Do List Application with Advanced DOM Manipulation and Local Storage
// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Initialize and Load Tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }
    
    // Create the addTask Function with Local Storage support
    function addTask(taskText, save = true) {
        // If taskText is provided as parameter (from loading), use it; otherwise get from input
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        }
        
        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        // Task Creation and Removal
        if (taskText !== "") {
            // Create a new li element
            const li = document.createElement('li');
            li.textContent = taskText;
            
            // Create a new button element for removing the task
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.className = 'remove-btn';
            
            // Assign an onclick event to the remove button
            removeButton.onclick = function() {
                // Remove from DOM
                taskList.removeChild(li);
                // Update Local Storage
                updateLocalStorage();
            };
            
            // Append the remove button to the li element
            li.appendChild(removeButton);
            
            // Append the li to taskList
            taskList.appendChild(li);
            
            // Clear the task input field only if it was from user input
            if (save) {
                taskInput.value = "";
            }
            
            // Save to Local Storage if save parameter is true
            if (save) {
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                storedTasks.push(taskText);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        }
    }
    
    // Update Local Storage when tasks are removed
    function updateLocalStorage() {
        const tasks = [];
        const taskElements = taskList.querySelectorAll('li');
        taskElements.forEach(li => {
            tasks.push(li.textContent.replace('Remove', '').trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Load tasks from Local Storage when page loads
    loadTasks();
    
    // Attach Event Listeners
    // Add event listener to addButton
    addButton.addEventListener('click', function() {
        addTask();
    });
    
    // Add event listener to taskInput for the 'keypress' event
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});