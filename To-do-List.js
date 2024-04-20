const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");
const showCompletedBtn = document.getElementById("showCompleted");
const showActiveBtn = document.getElementById("showActive");
const showAllBtn = document.getElementById("showAll");

function initListeners() {
  addTodoBtn.addEventListener("click", addTodo);

  showCompletedBtn.addEventListener("click", showCompletedTodos);

  showActiveBtn.addEventListener("click", showActiveTodos);

  showAllBtn.addEventListener("click", showAllTodos);
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const li = document.createElement("li");
    li.innerHTML = `   
            <button class="edit-todo"><i class="fas fa-edit"></i>
            </button>
            <input type="checkbox">
            <span>${todoText}</span>
            <span class="trash-can"><i class="fas fa-trash-alt"></i></span>
        `;
    todoList.appendChild(li);
    todoInput.value = "";
    li.querySelector(".trash-can").addEventListener("click", removeTodo);
    li.querySelector(".edit-todo").addEventListener("click", editTodo);
  }
}

function showCompletedTodos() {
  const todos = todoList.querySelectorAll("li");
  todos.forEach((todo) => {
    const checkbox = todo.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      todo.style.display = "block";
    } else {
      todo.style.display = "none";
    }
  });
}

function showActiveTodos() {
  const todos = todoList.querySelectorAll("li");
  todos.forEach((todo) => {
    const checkbox = todo.querySelector('input[type="checkbox"]');
    if (!checkbox.checked) {
      todo.style.display = "block";
    } else {
      todo.style.display = "none";
    }
  });
}

function showAllTodos() {
  const todos = todoList.querySelectorAll("li");
  todos.forEach((todo) => {
    todo.style.display = "block";
  });
}

function removeTodo() {
  this.parentNode.remove();
}

function editTodo(event) {
    const todoItem = event.target.closest('li');
    const todoText = todoItem.querySelector('span');
    const currentText = todoText.textContent;

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentText;

    todoText.replaceWith(inputField);

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Done';
    confirmButton.style.backgroundColor = '#4caf50';

    confirmButton.addEventListener('click', () => {
        const newText = inputField.value;
        if (newText.trim() !== '') {
            todoText.textContent = newText;
            inputField.replaceWith(todoText);
        } else {
            todoItem.remove();
        }
        confirmButton.remove();
    });

    todoItem.appendChild(confirmButton);

    inputField.focus();
}

initListeners();
