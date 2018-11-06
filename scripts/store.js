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
  const findAndUpdateName = function(id, newName) {
    try {
      Item.validateName(newName);
      this.findById(id).name = newName;
    }
    catch(error) {
      console.log('Cannot update name: {error.message}');
    }
  };

  const findAndDelete = function(id) {
    // console.log('findAndDelete ran ', this.items.filter(x => !this.items.id.includes(id)));
    this.items = this.items.filter(x => x.id !== id);
  };

  const toggleCheckedFilter = function() {
    this.hideCheckedItems = !this.hideCheckedItems;
  };

  const setSearchTerm = function(search) {
    this.searchTerm = search;
  };
 
  return {
    items,
    hideCheckedItems,
    searchTerm,
    findById,
    addItem,
    findAndToggleChecked,
    findAndUpdateName,
    findAndDelete,
    toggleCheckedFilter,
    setSearchTerm,
  };
}());

