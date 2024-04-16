"use strict";

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const TodoData = localStorage.getItem("TodoData")
    ? JSON.parse(localStorage.getItem("TodoData"))
    : [];


const render = () => {

    todoCompleted.innerHTML = '';
    todoList.innerHTML = '';

    TodoData.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
    <span class="text-todo">${item.text}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
    `

        if (item.completed) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }
        li.querySelector('.todo-complete').addEventListener('click', () => {
            item.completed = !item.completed
            localStorage.setItem("TodoData", JSON.stringify(TodoData));
            render()
        })
        li.querySelector('.todo-remove').addEventListener('click', () => {
            const itemIndex = TodoData.indexOf(item);
            console.log(itemIndex);
            TodoData.splice(itemIndex, 1);
            render()
            localStorage.setItem("TodoData", JSON.stringify(TodoData));
        })
    })
}
render()
todoControl.addEventListener('submit', (event) => {
    event.preventDefault()

    const newToDo = {
        text: headerInput.value,
        completed: false,
    }
    if (headerInput.value !== '') {
        TodoData.push(newToDo)
        headerInput.value = ''
        render()
        localStorage.setItem("TodoData", JSON.stringify(TodoData));

    } else {
        alert('Какие планы?')
    }

})

