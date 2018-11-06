/* eslint-disable strict */
/* global store, cuid, Item */
/* eslint-env jquery */

const store = (function () {
  
  const items = [
    // { id: cuid(), name: 'apples', checked: false },
    // { id: cuid(), name: 'oranges', checked: false },
    // { id: cuid(), name: 'milk', checked: true },
    // { id: cuid(), name: 'bread', checked: false }
  ];

  const hideCheckedItems = false;

  const searchTerm = '';

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  }; 

  const addItem = function(name) {
    console.log(this.items);
    try {
      Item.validateName(name);
      this.items.push(Item.create(name));
    } 
    catch(error) { 
      console.log('Cannot add item: {error.message}');
    }
  };


  const findAndToggleChecked = function(id) {
    console.log('this.findById(id) is here ', this.findById(id));
    // console.log('this.items[this.findById(id)] ' , this.findById(id));
    this.findById(id).checked = !this.findById(id).checked; 
  };
  // Make a findAndUpdateName method, which accepts id and newName parameters. 
  // Use a try/catch to first validate the name and then use findById() to fetch the item and update its name.
  // //  Inside catch, log out 'Cannot update name: {error.message}'
  const findAndUpdateName = function(id, newName) {
    // console.log('this.findById.name ', this.findById(id, newName));
    try {
      Item.validateName(newName);
      this.findById(id).name = newName;
      // this.items.push(Item.create(id, newName));
    }
    catch(error) {
      console.log('Cannot update name: {error.message}');
    }
  };
  // Make a findAndDelete method, which accepts an id, and then removes the item from this.items. 
  // // (HINT: You can use array method .filter() or a combination of .findIndex() and .splice().)
  const findAndDelete = function(id) {
    this.items.filter(!id);
  };
  // Add all of these new functions to the IIFE's return object. These are all public methods.
  return {
    items,
    hideCheckedItems,
    searchTerm,
    findById,
    addItem,
    findAndToggleChecked,
    findAndUpdateName,
    findAndDelete,
  };
}());

