import {AbstractRenderingComponent} from "../abstract-component/abstract-rendering-component";
import {createItem} from "./todo-item.template";

export class TodoItem extends AbstractRenderingComponent{

  _render(props) {
    return createItem(props);
  }

  _findElements() {
    this._removeAction = this.root.querySelector('.js-todo-item-remove-action');
    this._readyMarker = this.root.querySelector('.js-todo-ready-marker');
  }

  _bindEvents() {
    this._removeAction.addEventListener('click', () => {
      this._callbackMap.onRemove();
    });

    this._readyMarker.addEventListener('change', e => {
      this._callbackMap.onReadyChange(e.target.checked);
    });
  }

  get isReady() {
    return this._readyMarker.checked;
  }
}
