const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const showCompletedBtn = document.getElementById('showCompleted');
const showActiveBtn = document.getElementById('showActive');
const showAllBtn = document.getElementById('showAll');

addTodoBtn.addEventListener('click', addTodo);
showCompletedBtn.addEventListener('click', showCompletedTodos);
showActiveBtn.addEventListener('click', showActiveTodos);
showAllBtn.addEventListener('click', showAllTodos);

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox">
            <span>${todoText}</span>
            <span class="trash-can"><i class="fas fa-trash-alt"></i></span>
        `;
        todoList.appendChild(li);
        todoInput.value = '';
        li.querySelector('.trash-can').addEventListener('click', removeTodo);
    }
}

function showCompletedTodos() {
    const todos = todoList.querySelectorAll('li');
    todos.forEach((todo) => {
        const checkbox = todo.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            todo.style.display = 'block';
        } else {
            todo.style.display = 'none';
        }
    });
}

function showActiveTodos() {
    const todos = todoList.querySelectorAll('li');
    todos.forEach((todo) => {
        const checkbox = todo.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) {
            todo.style.display = 'block';
        } else {
            todo.style.display = 'none';
        }
    });
}

function showAllTodos() {
    const todos = todoList.querySelectorAll('li');
    todos.forEach((todo) => {
        todo.style.display = 'block';
    });
}

function removeTodo() {
    this.parentNode.remove();
}
