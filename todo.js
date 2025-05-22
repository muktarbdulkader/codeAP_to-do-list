 

// Call once on load and after DOM changes
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  startClock();
  adjustTaskListPadding(); // here
});
function adjustTaskListPadding() {
  const footer = document.getElementById('footer');
  const taskList = document.getElementById('taskList');

  if (footer && taskList) {
    footer.style.position='reltaive'
    const footerHeight = footer.offsetHeight;
    taskList.style.paddingBottom = `${footerHeight}px`;
  }
}
function scrollToBottom() {
  const taskList = document.getElementById('taskList');
  taskList.scrollTop = taskList.scrollHeight;
}



// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskObj => addTaskElement(taskObj));
}

// Add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');

  // const taskCategory = document.getElementById('taskCategory').value;
  const task = taskInput.value.trim();
  // if(!task || isNaN(task)){
  //   alert('enter only anumber')
  //   return;
  // }

  // Check for duplicate task only if an uncompleted task with the same text exists
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
if (tasks.some(t => !t.completed && t.task.toLowerCase() === task.toLowerCase())) {
  alert("This task already exists and is not completed!");
  return;
}

  

  if (!task) {
    alert("Task cannot be empty!");
    return;
  }

  const now = new Date();
  const dateString = now.toLocaleString();

  const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;

  const taskObj = {
    id: taskId,
    task,
    // category: taskCategory,
    date: dateString,
    completed: false
  };
  addTaskElement(taskObj);

  tasks.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  taskInput.value = '';
}

// Create a new task element in the list
function addTaskElement(taskObj) {
  const taskList = document.getElementById('taskList');

  const li = document.createElement('li');
  // li.classList.add(taskObj.category);
  if (taskObj.completed) li.classList.add('completed');
  li.dataset.id = taskObj.id;

  const taskText = document.createElement('span');
  taskText.classList.add('task-text');
  taskText.textContent = taskObj.task;
   

  const taskDate = document.createElement('span');
  taskDate.classList.add('task-date');
  taskDate.textContent = taskObj.date;

  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('button-group');

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete-btn');
  completeBtn.textContent = 'Complete';
  completeBtn.onclick = () => toggleComplete(li, taskObj.id);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => removeTask(li, taskObj.id);

  buttonGroup.appendChild(completeBtn);
  buttonGroup.appendChild(deleteBtn);

  li.appendChild(taskText);
  li.appendChild(taskDate);
  li.appendChild(buttonGroup);

  taskList.appendChild(li);
  scrollToBottom();

  
  
}

// Mark task as completed (line-through effect)
function toggleComplete(taskElement, taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find(t => t.id === taskId);

  task.completed = !task.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));

  taskElement.classList.toggle('completed');
  taskElement.querySelector('.task-text').style.textDecoration = task.completed ? 'line-through' : 'none';
}

// Remove a task
function removeTask(taskElement, taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.id !== taskId);

  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  taskElement.remove();
}

// Start the clock
function startClock() {
  const clockElement = document.getElementById('clock');
  setInterval(() => {
    const now = new Date();
    clockElement.style.color='rgb(130, 102, 187)'
    clockElement.textContent = now.toLocaleTimeString();
  }, 1000);
}

// Toggle background mode (Light/Dark)
function toggleBackground() {
  const body = document.body;

  // Toggle dark-mode class on the body
  body.classList.toggle('dark-mode');
}

// Mark all tasks as completed
function completeAllTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');

  tasks.forEach(task => {
    task.completed = true;
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Update the UI to reflect completion
  const taskElements = taskList.querySelectorAll('li');
  taskElements.forEach(taskElement => {
    taskElement.classList.add('completed');
    taskElement.querySelector('.task-text').style.textDecoration = 'line-through';
  });
}
// Function to open modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

// Function to close modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  startClock();

  // Add Enter key listener on the task input
  const taskInput = document.getElementById('taskInput');
  taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {  
      event.preventDefault();     
      addTask();                  
    }
  });
});


// Close modal if user clicks outside modal content
window.onclick = function(event) {
  ['privacyModal', 'termsModal', 'faqModal', 'contactModal'].forEach(modalId => {
    const modal = document.getElementById(modalId);
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

