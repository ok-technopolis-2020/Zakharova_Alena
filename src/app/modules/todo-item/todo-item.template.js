export function createItem({id, text}) {
  const root = document.createElement('li');
  root.className = "item js-todo-item";
  const view = document.createElement('div');
  view.className = "task";
  root.appendChild(view);

  const checkbox = document.createElement('input');
  checkbox.className = "task__checkbox js-todo-ready-marker";
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('aria-label', 'checkbox');
  checkbox.id = `item_${id}`;
  view.appendChild(checkbox);

  const label = document.createElement('label');
  label.className = "task__status-icon";
  label.setAttribute('for', checkbox.id);
  view.appendChild(label);

  const itemText = document.createElement('span');
  itemText.className = "task__text";
  view.appendChild(itemText);

  const itemTextNode = document.createTextNode(text);
  itemText.appendChild(itemTextNode);

  const removeButton = document.createElement('button');
  removeButton.className = "task__button js-todo-item-remove-action";
  checkbox.setAttribute('aria-label', 'Remove task');
  view.appendChild(removeButton);

  return root;
}
