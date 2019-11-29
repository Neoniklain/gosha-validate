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

  this.setRules = function (rules) {
    for (let rule of rules) {
      this.setRule(rule.field, rule.rules);
    }
  };

  this.validate = function (field) {
    let result = new ValidateResult();
    let allRules = this.rules;
    if(field) {
      let findField = this.fields.find(x => x === field);
      if(!findField) {
        throw `Not found field "${field}"`;
      }
      allRules = this.rules.filter(x => x.field === field);
    }
    for (let ruleObject of allRules) {

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
        if (this.model[ruleObject.field].search(ruleObject.rule.regexp) === -1) {
          $_AddError(result, ruleObject);
        }
      }
    }
    return result;
  };

  this.setRuleTypeFromDefault = function (ignoreNullable) {
    let rules = [];
    for (let field of this.fields) {
      if (this.model[field] === null || this.model[field] === undefined) {
        if (ignoreNullable) {
          continue;
        }
        else {
          throw 'In base model exist null or undefined field. Rules not set. Add ignoreNullable flag for setTypeRuleFromDefault function.';
        }
      }
      let type = typeof this.model[field];
      if (type === 'object') {
        if (Array.isArray(this.model[field])) {
          type = 'array';
        }
      }
      rules.push({
        field: field,
        rules: [
          {type: type, message: `Field ${field} must be ${typeof this.model[field]} type`}
        ]
      });
    }
    this.setRules(rules);
  };

  this.setRuleRequired = function (fields) {
    if(!fields) fields = this.fields;
    if(!Array.isArray(fields)) {
      throw 'Exception fields parameter gonna be Array of String'
    }
    let rules = [];
    for (let field of fields) {
      let findField = this.fields.find(x => x === field);
      if(!findField) {
        throw `Not found field "${field}"`;
      }
      rules.push({
        field: field,
        rules: [
          {require: true, message: `Field ${field} must be require`}
        ]
      });
    }
    this.setRules(rules);
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
