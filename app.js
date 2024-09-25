
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const filterAllBtn = document.getElementById('filter-all');
    const filterActiveBtn = document.getElementById('filter-active');
    const filterCompletedBtn = document.getElementById('filter-completed');
    
    let todos = [];
    let filter = 'all'; // Default filter
  
    // Event listener to add a task
    addTodoBtn.addEventListener('click', function () {
      addTodo();
    });
  
    // Filter button event listeners
    filterAllBtn.addEventListener('click', function () {
      filter = 'all';
      renderTodos();
      updateFilterButtons();
    });
  
    filterActiveBtn.addEventListener('click', function () {
      filter = 'active';
      renderTodos();
      updateFilterButtons();
    });
  
    filterCompletedBtn.addEventListener('click', function () {
      filter = 'completed';
      renderTodos();
      updateFilterButtons();
    });
  
    // Event listener for task actions (complete and delete)
    todoList.addEventListener('click', function (event) {
      const target = event.target;
      const todoItem = target.closest('li');
      const id = todoItem.dataset.id;
  
      if (target.classList.contains('complete-btn')) {
        toggleComplete(id);
      } else if (target.classList.contains('delete-btn')) {
        deleteTask(id);
      }
    });
  
    // Add a new task
    function addTodo() {
      const taskText = todoInput.value.trim();
      if (taskText) {
        const todo = {
          id: Date.now(),
          text: taskText,
          completed: false
        };
        todos.push(todo);
        renderTodos();
        todoInput.value = ''; // Clear input field after adding
      }
    }
  
    // Toggle complete status
    function toggleComplete(id) {
      todos = todos.map(todo =>
        todo.id === parseInt(id) ? { ...todo, completed: !todo.completed } : todo
      );
      renderTodos();
    }
  
    // Delete task
    function deleteTask(id) {
      todos = todos.filter(todo => todo.id !== parseInt(id));
      renderTodos();
    }
  
    // Render the list of tasks based on the filter
    function renderTodos() {
      todoList.innerHTML = ''; // Clear previous list
  
      const filteredTodos = todos.filter(todo => {
        if (filter === 'active') {
          return !todo.completed;
        } else if (filter === 'completed') {
          return todo.completed;
        }
        return true; // 'all'
      });
  
      filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center text-black p-2 bg-gray-200 rounded-lg';
        li.dataset.id = todo.id;
  
        const text = document.createElement('span');
        text.textContent = todo.text;
        if (todo.completed) {
          text.classList.add('line-through');
        }
  
        const completeBtn = document.createElement('button');
        completeBtn.textContent = todo.completed ? 'Undo' : 'Complete';
        completeBtn.className = 'complete-btn text-green-500 mr-2';
  
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn text-red-500';
  
        li.appendChild(text);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
      });
    }
  
    // Highlight the currently active filter button
    function updateFilterButtons() {
      filterAllBtn.classList.toggle('text-green-500', filter === 'all');
      filterActiveBtn.classList.toggle('text-green-500', filter === 'active');
      filterCompletedBtn.classList.toggle('text-green-500', filter === 'completed');
    };
  