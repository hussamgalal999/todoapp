// Task interface
interface Task {
  id: string;
  text: string;
  priority: string;
  completed: boolean;
}

// Get references to the necessary DOM elements
const taskInput = document.getElementById('task-input') as HTMLInputElement;
const taskSelect = document.getElementById('task-select') as HTMLSelectElement;
const taskList = document.getElementById('task-list') as HTMLUListElement;
const completedTaskList = document.getElementById('completed-tasks') as HTMLUListElement;
const addTaskButton = document.getElementById('add-task') as HTMLButtonElement;

// Task state
let tasks: Task[] = [];

// Add task function
function addTask() {
  const taskText = taskInput.value.trim();
  const taskPriority = taskSelect.value;

  if (taskText !== '') {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: taskText,
      priority: taskPriority,
      completed: false
    };

    tasks.push(newTask);
    renderTaskList();
    taskInput.value = '';
  }
}

// Render task list
function renderTaskList() {
  taskList.innerHTML = '';
  completedTaskList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = createTaskItem(task);

    if (task.completed) {
      completedTaskList.appendChild(taskItem);
    } else {
      taskList.appendChild(taskItem);
    }
  });
}

// Create task item element
function createTaskItem(task: Task): HTMLLIElement {
  const taskItem = document.createElement('li');
  taskItem.classList.add(
    'bg-white',
    'shadow-md',
    'rounded-lg',
    'p-4',
    'flex',
    'items-center',
    'justify-between'
  );

  const taskLabel = document.createElement('span');
  taskLabel.classList.add('font-medium', 'flex-1', 'mr-4');
  taskLabel.textContent = task.text;

  const taskPriorityLabel = document.createElement('span');
  taskPriorityLabel.classList.add(
    'px-2',
    'py-1',
    'rounded-full',
    'text-sm',
    'font-medium',
    task.priority === 'high'
      ? 'bg-red-100 text-red-500'
      : task.priority === 'medium'
      ? 'bg-yellow-100 text-yellow-500'
      : 'bg-green-100 text-green-500'
  );
  taskPriorityLabel.textContent = task.priority;

  const actionsContainer = document.createElement('div');
  actionsContainer.classList.add('flex', 'items-center');

  const completeButton = document.createElement('button');
  completeButton.classList.add(
    'bg-indigo-500',
    'hover:bg-indigo-600',
    'text-white',
    'font-bold',
    'py-2',
    'px-4',
    'rounded',
    'mr-2'
  );
  completeButton.textContent = task.completed ? 'Undo' : 'Complete';
  completeButton.addEventListener('click', () => toggleTaskCompletion(task.id));

  const deleteButton = document.createElement('button');
  deleteButton.classList.add(
    'bg-red-500',
    'hover:bg-red-600',
    'text-white',
    'font-bold',
    'py-2',
    'px-4',
    'rounded'
  );
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteTask(task.id));

  actionsContainer.appendChild(completeButton);
  actionsContainer.appendChild(deleteButton);

  taskItem.appendChild(taskLabel);
  taskItem.appendChild(taskPriorityLabel);
  taskItem.appendChild(actionsContainer);

  return taskItem;
}

// Toggle task completion
function toggleTaskCompletion(id: string) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTaskList();
}

// Delete task
function deleteTask(id: string) {
  tasks = tasks.filter(task => task.id !== id);
  renderTaskList();
}

// Add event listener to the add task button
addTaskButton.addEventListener('click', addTask);

// Render initial task list
renderTaskList();
