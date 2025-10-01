// To-Do List Application with Advanced DOM Manipulation
// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Load Tasks Function
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            if (taskText.trim() !== '') {
                // Create a new li element
                const li = document.createElement('li');
                li.textContent = taskText;
                
                // Create a new button element for removing the task
                const removeButton = document.createElement('button');
                removeButton.textContent = "Remove";
                removeButton.classList.add('remove-btn');
                
                // Assign an onclick event to the remove button
                removeButton.onclick = function() {
                    taskList.removeChild(li);
                    // Update Local Storage after removal
                    updateLocalStorage();
                };
                
                // Append the remove button to the li element
                li.appendChild(removeButton);
                
                // Append the li to taskList
                taskList.appendChild(li);
            }
        });
    }
    
    // Update Local Storage function
    function updateLocalStorage() {
        const tasks = [];
        const taskElements = taskList.querySelectorAll('li');
        taskElements.forEach(li => {
            tasks.push(li.textContent.replace('Remove', '').trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();
        
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
            removeButton.classList.add('remove-btn');
            
            // Assign an onclick event to the remove button
            removeButton.onclick = function() {
                taskList.removeChild(li);
                // Update Local Storage after removal
                updateLocalStorage();
            };
            
            // Append the remove button to the li element
            li.appendChild(removeButton);
            
            // Append the li to taskList
            taskList.appendChild(li);
            
            // Clear the task input field
            taskInput.value = "";
            
            // Save to Local Storage
            updateLocalStorage();
        }
    }
    
    // Attach Event Listeners
    // Add event listener to addButton
    addButton.addEventListener('click', addTask);
    
    // Add event listener to taskInput for the 'keypress' event
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    // Load tasks from Local Storage when page loads
    loadTasks();
});