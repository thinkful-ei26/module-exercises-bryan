/* eslint-disable strict */
/* global store, cuid, Item */
/* eslint-env jquery */

const store = (function () {
  const findById = function(id) {
    store.items.find(item => item.id === id);
  }; // Finding itemid in array Stores.items
  const addItem = function(name) {
    console.log(this.items);
    try {
      Item.validateName(name);
      store.items.push(Item.create(this.items));
    } 
    catch(error) { 
      console.log('Cannot add item: {error.message}');
    }
  }
  const items = [
    // { id: cuid(), name: 'apples', checked: false },
    // { id: cuid(), name: 'oranges', checked: false },
    // { id: cuid(), name: 'milk', checked: true },
    // { id: cuid(), name: 'bread', checked: false }
  ];
  const hideCheckedItems = false;
  const searchTerm = '';
  return {
    items,
    hideCheckedItems,
    searchTerm,
    findById,
    addItem,
    // findAndToggleChecked,
    // findAndUpdateName,
    // findAndDelete,
  };
}());

