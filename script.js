document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const deadlineInput = document.getElementById('deadline-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.querySelectorAll('#filter-buttons button');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todo.text} (Deadline: ${todo.deadline})</span>
                <div>
                    <button class="complete-btn">${todo.completed ? 'Batal Selesai' : 'Selesai'}</button>
                    <button class="delete-btn">Hapus</button>
                </div>
            `;
            if (todo.completed) {
                li.classList.add('completed');
            }
            todoList.appendChild(li);

            li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(index));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(index));
        });
    }

    function addTodo() {
        const text = todoInput.value.trim();
        const deadline = deadlineInput.value;
        if (text && deadline) {
            todos.push({ text, deadline, completed: false });
            saveTodos();
            renderTodos();
            todoInput.value = '';
            deadlineInput.value = '';
        }
    }

    function toggleComplete(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    function filterTodos(filter) {
        const filteredTodos = todos.filter(todo => {
            if (filter === 'all') return true;
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
        });
        renderFilteredTodos(filteredTodos);
    }

    function renderFilteredTodos(filteredTodos) {
        todoList.innerHTML = '';
        filteredTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todo.text} (Deadline: ${todo.deadline})</span>
                <div>
                    <button class="complete-btn">${todo.completed ? 'Batal Selesai' : 'Selesai'}</button>
                    <button class="delete-btn">Hapus</button>
                </div>
            `;
            if (todo.completed) {
                li.classList.add('completed');
            }
            todoList.appendChild(li);

            li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(index));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(index));
        });
    }

    addBtn.addEventListener('click', addTodo);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterTodos(button.id.split('-')[1]);
        });
    });

    renderTodos();
});