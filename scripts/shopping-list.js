/* eslint-disable strict */
/* global store, cuid, Item */
/* eslint-env jquery */

// eslint-disable-next-line no-unused-vars
const shoppingList = (function(){

  function generateItemElement(item) {
    let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
    if (!item.checked) {
      itemTitle = `
        <form class="js-edit-item">
          <input class="shopping-item type="text" value="${item.name}" />
        </form>
      `;
    }
  
    return `
      <li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle}
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
  }
  
  function generateShoppingItemsString(shoppingList) {
    const items = shoppingList.map((item) => generateItemElement(item));
    return items.join('');
  }
  
  function render() {
    let items = store.items;
    if (store.hideCheckedItems) {
      items = store.items.filter(item => !item.checked);
    } if (store.searchTerm) {
      items = store.items.filter(item => item.name.includes(store.searchTerm));
    }
    console.log('`render` ran');
    const shoppingListItemsString = generateShoppingItemsString(items);
    $('.js-shopping-list').html(shoppingListItemsString);
  }
  
  function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function (event) {
      event.preventDefault();
      const newItemName = $('.js-shopping-list-entry').val();
      $('.js-shopping-list-entry').val('');
      store.addItem(newItemName);
      render();
    });
  }
  
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }
  
  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.currentTarget);
      store.findAndToggleChecked(id);
      render();
    });
  }

  function handleDeleteItemClicked() {
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);
      store.findAndDelete(id);
      render();
    });
  }
  
  function handleEditShoppingItemSubmit() {
    $('.js-shopping-list').on('submit', '.js-edit-item', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const newName = $(event.currentTarget)
        .find('.shopping-item')
        .val();
      store.findAndUpdateName(id, newName);
      render();
    });
  }
  
  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      store.toggleCheckedFilter();
      render();
    });
  }
  
  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const search = $(event.currentTarget).val();
      store.setSearchTerm(search);
      render();
    });
  }
  
  function bindEventListeners() {
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleEditShoppingItemSubmit();
    handleToggleFilterClick();
    handleShoppingListSearch();
  }

  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
