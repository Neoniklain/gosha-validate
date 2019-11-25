export function goshaValidate(model) {
  return new ValidationItem(model);
}

export function ValidationItem(model) {
  this.model = model;
  this.rules = [];
  this.fields = Object.getOwnPropertyNames(model);

  this.setRule = function (field, rules) {
    if (!field) {
      console.error(`Field required.`);
    }

    if (!rules || rules.length === 0) {
      console.error(`Rule required.`);
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
    }

    for (let rule of rules) {

      if (rule.require) {
        if (typeof rule.require !== 'boolean') {
          throw 'Field must be a Boolean type';
        }
      }

      if (rule.type) {
        if (typeof rule.type !== 'string') {
          throw 'Rule of type must be a String type';
        }
        if (rule.type.toLowerCase() !== 'number'
          && rule.type.toLowerCase() !== 'boolean'
          && rule.type.toLowerCase() !== 'string'
          && rule.type.toLowerCase() !== 'object'
          && rule.type.toLowerCase() !== 'array') {
          throw 'Rule of type must be a string, boolean, number, object or array';
        }
      }

      if (rule.min) {
        if (typeof rule.min !== 'number') {
          throw 'Rule of minimum must be a Number type';
        }
        if (typeof this.model[field] !== 'number' && !Array.isArray(this.model[field])
        && typeof this.model[field] !== 'string') {
          throw 'Rule of minimum must be applied only for Number or Array field';
        }
      }

      if (rule.max) {
        if (typeof rule.max !== 'number') {
          throw 'Rule of maximum must be a Number type';
        }
        if (typeof this.model[field] !== 'number' && !Array.isArray(this.model[field])
          && typeof this.model[field] !== 'string') {
          throw 'Rule of maximum must be applied only for Number or Array field';
        }
      }

      if (rule.regexp) {
        if (typeof this.model[field] !== 'string') {
          throw 'Rule of regexp must be applied only for String field';
        }
      }

      this.rules.push({field: field, rule: rule});
    }

  };

  this.validate = function () {
    let result = new ValidateResult();
    for (let ruleObject of this.rules) {

      if (ruleObject.rule.require) {
        if (this.model[ruleObject.field] === undefined
          || this.model[ruleObject.field] === null
          || this.model[ruleObject.field] === ''
          || (Array.isArray(this.model[ruleObject.field]) && this.model[ruleObject.field].length === 0)
          || (typeof this.model[ruleObject.field] === 'object' && Object.entries(this.model[ruleObject.field]).length === 0)) {
          $_AddError(result, ruleObject);
        }
      }

      if (ruleObject.rule.type) {

        if (ruleObject.rule.type.toLowerCase() === 'array') {
          if (!Array.isArray(this.model[ruleObject.field])) {
            $_AddError(result, ruleObject);
          }
        }
        else {
          if (ruleObject.rule.type.toLowerCase() === 'object') {
            if (Array.isArray(this.model[ruleObject.field])) {
              $_AddError(result, ruleObject);
            }
          }
          if ((typeof this.model[ruleObject.field]).toLowerCase() !== ruleObject.rule.type.toLowerCase()) {
            $_AddError(result, ruleObject);
          }
        }

      }

      if (ruleObject.rule.min) {
        if (Array.isArray(this.model[ruleObject.field]) || typeof this.model[ruleObject.field] === 'string') {
          if (this.model[ruleObject.field].length < ruleObject.rule.min) {
            $_AddError(result, ruleObject);
          }
        }
        else {
          if (this.model[ruleObject.field] < ruleObject.rule.min) {
            $_AddError(result, ruleObject);
          }
        }
      }

      if (ruleObject.rule.max) {
        if (Array.isArray(this.model[ruleObject.field]) || typeof this.model[ruleObject.field] === 'string') {
          if (this.model[ruleObject.field].length > ruleObject.rule.max) {
            $_AddError(result, ruleObject);
          }
        }
        else {
          if (this.model[ruleObject.field] > ruleObject.rule.max) {
            $_AddError(result, ruleObject);
          }
        }
      }

      if (ruleObject.rule.regexp) {
        console.log(this.model[ruleObject.field].search(ruleObject.rule.regexp));
        if (this.model[ruleObject.field].search(ruleObject.rule.regexp) === -1) {
          $_AddError(result, ruleObject);
        }
      }
    }
    return result;
  };
}

function $_AddError(result, ruleObject) {
  result.success = false;
  result.messages.push({field: ruleObject.field, message: ruleObject.rule.message});
  return result;
}

function ValidateResult() {
  this.success = true;
  this.messages = [];
}
