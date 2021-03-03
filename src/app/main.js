import './styles/default.css';

let idIterator = 1;

document.addEventListener('DOMContentLoaded', () => {

    function createItem(todoText) {
        const root = document.createElement('li');
        root.className = "item js-todo-item";
        const view = document.createElement('div');
        view.className = "task";
        root.appendChild(view);

        const checkbox = document.createElement('input');
        checkbox.className = "task__checkbox js-todo-ready-marker";
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('aria-label', 'checkbox');
        checkbox.id = `item_${idIterator}`;
        view.appendChild(checkbox);

        const label = document.createElement('label');
        label.className = "task__status-icon";
        label.setAttribute('for', checkbox.id);
        view.appendChild(label);

        const itemText = document.createElement('span');
        itemText.className = "task__text";
        view.appendChild(itemText);

        const itemTextNode = document.createTextNode(todoText);
        itemText.appendChild(itemTextNode);

        const removeButton = document.createElement('button');
        removeButton.className = "task__button js-todo-item-remove-action";
        checkbox.setAttribute('aria-label', 'Remove task');
        view.appendChild(removeButton);

        return root;

        // return `<li class="item">
        //             <div class="task">
        //                 <input type="checkbox" class="task__checkbox" id="task1">
        //                 <label class="task__status-icon" for="task1"></label>
        //                 <span class="task__text">${todoText}</span>
        //                 <button class="task__button js-todo-item-remove-action" aria-label="remove task"></button>
        //             </div>
        //             <div hidden="hidden" class="editable-task">
        //                 <input type="text" class="editable-task__text" value="HTML" aria-label="edit task">
        //             </div>
        //         </li>`;
    }

    const addNewTodoForm = document.querySelector('.js-add-new-todo-form');
    const addNewInput = document.querySelector('.js-add-new-todo-input');
    const todoItemsList = document.querySelector('.js-todo-items-list');

    const itemsLeftCounter = document.querySelector('.js-todo-items-left-counter');

    function incItemsLeftCounter() {
        const currentItemsLeftText = itemsLeftCounter.textContent;
        const currentItemsLeft = parseInt(currentItemsLeftText, 10);
        itemsLeftCounter.textContent = `${currentItemsLeft + 1} item${currentItemsLeft > 0 ? 's' : ''} left`
    }

    function decItemsLeftCounter() {
        const currentItemsLeftText = itemsLeftCounter.textContent;
        const currentItemsLeft = parseInt(currentItemsLeftText, 10);
        itemsLeftCounter.textContent = `${currentItemsLeft - 1} item${currentItemsLeft > 2 ? 's' : ''} left`
    }


    addNewTodoForm.addEventListener('submit', evt => {
        evt.preventDefault();
        const newTodoText = addNewInput.value.trim();
        if (newTodoText) {
            addNewInput.value = '';

            const currentItem = createItem(newTodoText);
            todoItemsList.appendChild(currentItem);
            incItemsLeftCounter();

            currentItem
                .querySelector('.js-todo-item-remove-action')
                .addEventListener('click', () => {
                    todoItemsList.removeChild(currentItem);
                    decItemsLeftCounter();
                })

            currentItem
                .querySelector('.js-todo-ready-marker')
                .addEventListener('change', evt => {
                    if (evt.target.checked) {
                        decItemsLeftCounter();
                    } else {
                        incItemsLeftCounter();
                    }
                })
        }
    });

    const clearCompletedAction = document.querySelector('.js-clear-completed-action');
    clearCompletedAction.addEventListener('click', () => {
        todoItemsList
            .querySelectorAll('.js-todo-item')
            .forEach(item => {
                if (item.querySelector('.js-todo-ready-marker').checked) {
                    item.remove();
                }
            })
    })


});