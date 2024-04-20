const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");
const showCompletedBtn = document.getElementById("showCompleted");
const showActiveBtn = document.getElementById("showActive");
const showAllBtn = document.getElementById("showAll");

function initListeners() {
  addTodoBtn.addEventListener("click", addTodo);
  todoInput.addEventListener("keydown", handleInputKeyPress);

  showCompletedBtn.addEventListener("click", showCompletedTodos);

  showActiveBtn.addEventListener("click", showActiveTodos);

  showAllBtn.addEventListener("click", showAllTodos);

  todoList.addEventListener("dragstart", handleDragStart);
  todoList.addEventListener("dragover", handleDragOver);
  todoList.addEventListener("drop", handleDrop);
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
            <button class="trash-can"><i class="fas fa-trash-alt"></i></button>
        `;
    todoList.appendChild(li);
    todoInput.value = "";
    li.querySelector(".edit-todo").addEventListener("click", editTodo);
    li.querySelector(".trash-can").addEventListener("click", removeTodo);

    li.draggable = true;
    li.addEventListener("dragstart", handleDragStart);
  }
}

function handleInputKeyPress(event) {
    if (event.key === "Enter") {
        addTodo();
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
  const todoItem = event.target.closest("li");
  const todoText = todoItem.querySelector("span");
  const currentText = todoText.textContent;

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = currentText;

  todoText.replaceWith(inputField);

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Done";
  confirmButton.style.backgroundColor = "#4caf50";

  function handleConfirmButtonClick(){
    const newText = inputField.value;
    if (newText.trim() !== "") {
      todoText.textContent = newText;
      inputField.replaceWith(todoText);
    } else {
      todoItem.remove();
    }
    confirmButton.remove();
  }

  confirmButton.addEventListener("click", handleConfirmButtonClick);

    inputField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            handleConfirmButtonClick();
        }
    });

  todoItem.appendChild(confirmButton);

  inputField.focus();
}

function handleDragStart(event) {
    draggedItem = event.target;
    event.dataTransfer.setData('text/plain', draggedItem.dataset.id);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const dropItem = event.target.closest('li');
    if (draggedItem !== dropItem) {
        const todoList = dropItem.parentNode;
        const dropIndex = [...todoList.children].indexOf(dropItem);
        const dragIndex = [...todoList.children].indexOf(draggedItem);
        todoList.insertBefore(draggedItem, dropIndex > dragIndex ? dropItem.nextSibling : dropItem);
    }
    draggedItem = null;
}

initListeners();