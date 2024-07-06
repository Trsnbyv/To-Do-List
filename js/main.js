document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todoForm");
    const newTodo = document.getElementById("newTodo");
    const allBtn = document.getElementById("allBtn");
    const completedBtn = document.getElementById("completedBtn");
    const uncompletedBtn = document.getElementById("uncompletedBtn");
    const todoList = document.getElementById("todoList");
    const allCount = document.getElementById("allCount");
    const completedCount = document.getElementById("completedCount");
    const uncompletedCount = document.getElementById("uncompletedCount");
    const darkModeToggle = document.getElementById("darkModeToggle");

    let todos = [];

    const renderTodos = (filter = "all") => {
        todoList.innerHTML = "";
        let filteredTodos = todos;

        if (filter === "completed") {
            filteredTodos = todos.filter(todo => todo.completed);
        } else if (filter === "uncompleted") {
            filteredTodos = todos.filter(todo => !todo.completed);
        }

        filteredTodos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.className = todo.completed ? "completed" : "";
            li.innerHTML = `
                <span class="task-text">${todo.text}</span>
                <div class="change-wrapper">
                <input type="radio" class="completedBtn" data-index="${index}" ${todo.completed ? "checked" : ""}>
                <button class="updateBtn" data-index="${index}">Update</button>
                <button class="deleteBtn" data-index="${index}">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });

        updateCounts();
    };

    const updateCounts = () => {
        allCount.textContent = todos.length;
        completedCount.textContent = todos.filter(todo => todo.completed).length;
        uncompletedCount.textContent = todos.filter(todo => !todo.completed).length;
    };

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (newTodo.value.trim()) {
            todos.push({ text: newTodo.value.trim(), completed: false });
            newTodo.value = "";
            renderTodos();
        }
    });

    todoList.addEventListener("click", (e) => {
        const index = e.target.dataset.index;

        if (e.target.classList.contains("deleteBtn")) {
            todos.splice(index, 1);
            renderTodos();
        } else if (e.target.classList.contains("updateBtn")) {
            const newText = prompt("Update your todo", todos[index].text);
            if (newText) {
                todos[index].text = newText;
                renderTodos();
            }
        } else if (e.target.classList.contains("completedBtn")) {
            todos[index].completed = !todos[index].completed;
            renderTodos();
        }
    });

    allBtn.addEventListener("click", () => renderTodos("all"));
    completedBtn.addEventListener("click", () => renderTodos("completed"));
    uncompletedBtn.addEventListener("click", () => renderTodos("uncompleted"));

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    renderTodos();
});
