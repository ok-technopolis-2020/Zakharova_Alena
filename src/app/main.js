import './styles/default.css';
import {AddNewTodo} from "./modules/add-new-todo/add-new-todo";
import {TodosList} from "./modules/todos-list/todos-list";
import {ItemsLeftCounter} from "./modules/items-left-counter/items-left-counter";

document.addEventListener('DOMContentLoaded', () => {

  const itemsLeftCounter = new ItemsLeftCounter(
      document.querySelector('.js-todo-items-left-counter')
  );

  const todosList = new TodosList(
      document.querySelector('.js-todo-items-list'),
      {
        onItemsLeftChange(count) {
          itemsLeftCounter.changeCount(count);
        }
      }
  );

  const addNewTodo = new AddNewTodo(
      document.querySelector('.js-add-new-todo-form'),
      {
        onNew(newTodoText) {
          todosList.add(newTodoText);
        }
      });

  const todoItemsList = document.querySelector('.js-todo-items-list');

  // const itemsLeftCounter = document.querySelector('.js-todo-items-left-counter');

  // function incItemsLeftCounter() {
  //   const currentItemsLeftText = itemsLeftCounter.textContent;
  //   const currentItemsLeft = parseInt(currentItemsLeftText, 10);
  //   itemsLeftCounter.textContent = `${currentItemsLeft + 1} item${currentItemsLeft !== 0 ? 's' : ''} left`;
  // }
  //
  // function decItemsLeftCounter() {
  //   const currentItemsLeftText = itemsLeftCounter.textContent;
  //   const currentItemsLeft = parseInt(currentItemsLeftText, 10);
  //   itemsLeftCounter.textContent = `${currentItemsLeft - 1} item${currentItemsLeft !== 2 ? 's' : ''} left`;
  // }


  // addNewTodoForm.addEventListener('submit', evt => {
  //   evt.preventDefault();
  //   const newTodoText = addNewInput.value.trim();
  //   if (newTodoText) {
  //     addNewInput.value = '';
  //
  //     const currentItem = createItem(newTodoText);
  //     todoItemsList.appendChild(currentItem);
  //     incItemsLeftCounter();
  //     idIterator++;
  //
  //     currentItem
  //         .querySelector('.js-todo-item-remove-action')
  //         .addEventListener('click', () => {
  //           todoItemsList.removeChild(currentItem);
  //           decItemsLeftCounter();
  //         });
  //
  //     currentItem
  //         .querySelector('.js-todo-ready-marker')
  //         .addEventListener('change', evt => {
  //           if (evt.target.checked) {
  //             decItemsLeftCounter();
  //           } else {
  //             incItemsLeftCounter();
  //           }
  //         });
  //
  //     const checkedFilter = Array.from(
  //         document.querySelector('.js-todo-filters')
  //         .querySelectorAll('.js-todo-filter')
  //     ).find(filter => filter.checked);
  //     if (checkedFilter.value === 'Completed') {
  //       currentItem.style.display = 'none';
  //     }
  //   }
  // });

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

  const filtersRoot = document.querySelector('.js-todo-filters');
  filtersRoot.querySelectorAll('.js-todo-filter')
      .forEach(filter => {
        filter.addEventListener('change', evt => {
          const currentFilter = evt.target;
          if (currentFilter.checked) {
            switch (currentFilter.value) {
              case 'All':
                todoItemsList.querySelectorAll('.js-todo-item').forEach(item => {
                  item.style.display = 'block';
                });
                break;
              case 'Active':
                todoItemsList.querySelectorAll('.js-todo-item').forEach(item => {
                  item.style.display = item.querySelector('.js-todo-ready-marker').checked ? 'none' : 'block';
                });
                break;
              case 'Completed':
                todoItemsList.querySelectorAll('.js-todo-item').forEach(item => {
                  item.style.display = item.querySelector('.js-todo-ready-marker').checked ? 'block' : 'none';
                });
                break;
            }
          }
        });
      })

  // document.querySelector('.js-select-all-action')
  //     .addEventListener('click', () => {
  //       todoItemsList.querySelectorAll('.js-todo-item .js-todo-ready-marker').forEach(item => {
  //         item.checked = true;
  //         itemsLeftCounter.textContent = '0 items left';
  //       });
  //     });
});
