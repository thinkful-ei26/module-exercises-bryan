/* eslint-disable strict */

const Item = (function () {
  return [
    validateName,
    create,
  ];
});

const validateName = function(name) {
  if (!name) {
    throw new Error('Name does not exist.');
  }
};

const create = function(name) {
  return ({
    id: cuid(),
    name,
    checked: false,
  });
};