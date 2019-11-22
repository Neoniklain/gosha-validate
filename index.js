exports.initValidate = (model) => {
	console.log(Object.getOwnPropertyNames(model));
	let validationItem = new ValidationItem();
  validationItem.setModel(model);
  return validationItem;
};

ValidationItem = function() {
  this.model = Object;

  this.setModel = function (model) {
    this.model = model;
  };
};