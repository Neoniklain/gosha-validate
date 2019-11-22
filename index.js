export function initValidate(model) {
  let validationItem = new ValidationItem();
  validationItem.setModel(model);
  return validationItem;
};

export function ValidationItem() {
  this.model = Object;
  this.rules = [];
  this.fields = [];

  this.setModel = function (model) {
    this.model = model;
    this.fields = Object.getOwnPropertyNames(model);
  };

  this.setRule = function (field, rules) {
    if (!field) {
      console.error(`Field required.`);
      return;
    }

    if (!rules || rules.length === 0) {
      console.error(`Rule required.`);
      return;
    }

    let findField;
    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i] === field) {
        findField = field;
        break;
      }
    }

    if (!findField) {
      console.error(`Not found field: ${field} in model.`);
      return;
    }

    for (let rule of rules) {

      if (rule.require) {
        if (typeof rule.require !== 'boolean') {
          console.error('Field must be a Boolean type');
          return;
        }
      }

      if (rule.type) {
        if (typeof rule.require !== 'string') {
          console.error('Rule of type must be a String type');
          return;
        }
        if (rule.type.toLowerCase() !== 'number'
          && rule.type.toLowerCase() !== 'boolean'
          && rule.type.toLowerCase() !== 'string'
          && rule.type.toLowerCase() !== 'object') {
          console.error('Rule of type must be a string, boolean, number or object');
          return;
        }
      }

      if (rule.min) {
        if (typeof rule.require !== 'number') {
          console.error('Rule of minimum must be a Number type');
          return;
        }
        if (typeof this.model[field] !== 'number') {
          console.error('Rule of minimum must be applied only for Number field');
          return;
        }
      }

      if (rule.max) {
        if (typeof rule.require !== 'number') {
          console.error('Rule of maximum must be a Number type');
          return;
        }
        if (typeof this.model[field] !== 'number') {
          console.error('Rule of maximum must be applied only for Number field');
          return;
        }
      }

      if (rule.regexp) {
        if (typeof rule.require !== 'string') {
          console.error('Rule of regexp must be a String type');
          return;
        }
        if (typeof this.model[field] !== 'string') {
          console.error('Rule of regexp must be applied only for String field');
          return;
        }
      }

      this.rules.push({field: field, rule: rule});
    }

  };

  this.validate = function () {
    let result = new ValidateResult();
    for (let ruleObject of this.rules) {
      console.log('ruleObject', ruleObject);
      if (ruleObject.rule.require) {
        if (!this.model[ruleObject.field] || this.model[ruleObject.field] === '') {
          result.success = false;
          result.messages.push({field: ruleObject.field, message: ruleObject.message});
        }
      }
      if (ruleObject.rule.type) {
        if (typeof this.model[ruleObject.field] !== ruleObject[ruleObject.field].toLowerCase()) {
          result.success = false;
          result.messages.push({field: ruleObject.field, message: ruleObject.message});
        }
      }
      if (ruleObject.rule.min) {
        if (this.model[ruleObject.field] < ruleObject[ruleObject.field]) {
          result.success = false;
          result.messages.push({field: ruleObject.field, message: ruleObject.message});
        }
      }
      if (ruleObject.rule.max) {
        if (this.model[ruleObject.field] > ruleObject[ruleObject.field]) {
          result.success = false;
          result.messages.push({field: ruleObject.field, message: ruleObject.message});
        }
      }
      if (ruleObject.rule.regexp) {
        if (this.model[ruleObject.field].match(ruleObject[ruleObject.field])) {
          result.success = false;
          result.messages.push({field: ruleObject.field, message: ruleObject.message});
        }
      }
    }
    return result;
  };
};

function ValidateResult() {
  this.success = true;
  this.messages = [];
}