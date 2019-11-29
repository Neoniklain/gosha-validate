import {goshaValidate} from '../index.js';
import * as assert from 'assert';

function Product() {
  this.Code = 0;
  this.Name = '';
  this.Status = false;
  this.Markers = [];
  this.NStatus = {};
  this.NullField = null;
  this.UndefinedField = undefined;
  return this;
}

let setRule = function (field, rule) {
  let model = new Product();
  let validateModel = goshaValidate(model);
  validateModel.setRule(field, rule);
  return validateModel;
};

describe('Обязательность', function () {

  it('Обязательность для String', function () {
    let validateModel = setRule('Name', [
      {require: true, message: 'Field is required'},
    ]);
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field is required');

    validateModel.model.Name = '123';
    result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Обязательность для Number', function () {
    let validateModel = setRule('Code', [
      {require: true, message: 'Field is required'},
    ]);
    validateModel.model.Code = null;
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field is required');

    validateModel.model.Code = 123;
    result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Обязательность для Boolean', function () {
    let validateModel = setRule('Status', [
      {require: true, message: 'Field is required'},
    ]);
    validateModel.model.Status = '';
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field is required');

    validateModel.model.Status = true;
    result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Status = false;
    result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Обязательность для Array', function () {
    let validateModel = setRule('Markers', [
      {require: true, message: 'Field is required'},
    ]);
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field is required');

    validateModel.model.Markers = ['1', '2', '3'];
    result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Обязательность для Object', function () {
    let validateModel = setRule('NStatus', [
      {require: true, message: 'Field is required'},
    ]);
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field is required');

    validateModel.model.NStatus = {test: true};
    result = validateModel.validate();
    assert.equal(result.success, true);
  });

});

describe('Типизация', function () {

  it('Типизация для String === String', function () {
    let validateModel = setRule('Name', [
      {type: 'string', message: 'Field type must be String'},
    ]);
    let result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Типизация для String !== Number', function () {
    let validateModel = setRule('Name', [
      {type: 'string', message: 'Field type must be String'},
    ]);
    validateModel.model.Name = 123;
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be String');
  });

  it('Типизация для String !== Array', function () {
    let validateModel = setRule('Name', [
      {type: 'string', message: 'Field type must be String'},
    ]);
    validateModel.model.Name = [];
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be String');
  });

  it('Типизация для String !== Object', function () {
    let validateModel = setRule('Name', [
      {type: 'string', message: 'Field type must be String'},
    ]);
    validateModel.model.Name = {};
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be String');
  });

  it('Типизация для Number === Number', function () {
    let validateModel = setRule('Code', [
      {type: 'number', message: 'Field type must be Number'},
    ]);
    let result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Типизация для Number !== String', function () {
    let validateModel = setRule('Code', [
      {type: 'number', message: 'Field type must be Number'},
    ]);
    validateModel.model.Code = '123';
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be Number');
  });

  it('Типизация для Number !== Array', function () {
    let validateModel = setRule('Code', [
      {type: 'number', message: 'Field type must be Number'},
    ]);
    validateModel.model.Code = [];
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be Number');
  });

  it('Типизация для Number !== Object', function () {
    let validateModel = setRule('Code', [
      {type: 'number', message: 'Field type must be Number'},
    ]);
    validateModel.model.Code = {};
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be Number');
  });

  it('Типизация для Boolean === Boolean', function () {
    let validateModel = setRule('Status', [
      {type: 'Boolean', message: 'Field type must be Boolean'},
    ]);
    let result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Типизация для Boolean !== String', function () {
    let validateModel = setRule('Status', [
      {type: 'Boolean', message: 'Field type must be Boolean'},
    ]);
    validateModel.model.Status = '123';
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be Boolean');
  });

  it('Типизация для Boolean !== Array', function () {
    let validateModel = setRule('Status', [
      {type: 'Boolean', message: 'Field type must be Boolean'},
    ]);
    validateModel.model.Status = [];
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be Boolean');
  });

  it('Типизация для Boolean !== Object', function () {
    let validateModel = setRule('Status', [
      {type: 'Boolean', message: 'Field type must be Boolean'},
    ]);
    validateModel.model.Status = {};
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be Boolean');
  });

  it('Типизация для Array === Array', function () {
    let validateModel = setRule('Markers', [
      {type: 'Array', message: 'Field type must be Array'},
    ]);
    let result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Типизация для Array !== String', function () {
    let validateModel = setRule('Markers', [
      {type: 'Array', message: 'Field type must be Array'},
    ]);
    validateModel.model.Markers = '123';
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be Array');
  });

  it('Типизация для Array !== Boolean', function () {
    let validateModel = setRule('Markers', [
      {type: 'Array', message: 'Field type must be Array'},
    ]);
    validateModel.model.Markers = true;
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be Array');
  });

  it('Типизация для Array !== Object', function () {
    let validateModel = setRule('Markers', [
      {type: 'Array', message: 'Field type must be Array'},
    ]);
    validateModel.model.Markers = {};
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be Array');
  });

  it('Типизация для Object === Object', function () {
    let validateModel = setRule('NStatus', [
      {type: 'object', message: 'Field type must be Object'},
    ]);
    let result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Типизация для Object !== String', function () {
    let validateModel = setRule('NStatus', [
      {type: 'object', message: 'Field type must be Object'},
    ]);
    validateModel.model.NStatus = '123';
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be Object');
  });

  it('Типизация для Object !== Boolean', function () {
    let validateModel = setRule('NStatus', [
      {type: 'object', message: 'Field type must be Object'},
    ]);
    validateModel.model.NStatus = true;
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be Object');
  });

  it('Типизация для Object !== Array', function () {
    let validateModel = setRule('NStatus', [
      {type: 'object', message: 'Field type must be Object'},
    ]);
    validateModel.model.NStatus = [];
    let result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field type must be Object');
  });

});

describe('Минимум максимум', function () {

  it('Минимум для Number', function () {
    let validateModel = setRule('Code', [
      {min: 10, message: 'Field is 10 minimum'},
    ]);
    validateModel.model.Code = 0;
    let result = validateModel.validate();
    assert.equal(result.success, false);

    validateModel.model.Code = 10;
    result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Code = 11;
    result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Code = 20;
    result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Максимум для Number', function () {
    let validateModel = setRule('Code', [
      {max: 10, message: 'Field is 10 maximum'},
    ]);
    validateModel.model.Code = 0;
    let result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Code = 10;
    result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Code = 20;
    result = validateModel.validate();
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field is 10 maximum');
  });

  it('Минимум для Array', function () {
    let validateModel = setRule('Markers', [
      {min: 3, message: 'Field is 10 maximum'},
    ]);
    validateModel.model.Markers = [];
    let result = validateModel.validate();
    assert.equal(result.success, false);

    validateModel.model.Markers = ['', ''];
    result = validateModel.validate();
    assert.equal(result.success, false);

    validateModel.model.Markers = ['', '', ''];
    result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Markers = ['', '', '', ''];
    result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Максимум для Array', function () {
    let validateModel = setRule('Markers', [
      {max: 3, message: 'Field is 10 maximum'},
    ]);
    validateModel.model.Markers = [];
    let result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Markers = ['', ''];
    result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Markers = ['', '', ''];
    result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Markers = ['', '', '', ''];
    result = validateModel.validate();
    assert.equal(result.success, false);
  });

  it('Минимум для String', function () {
    let validateModel = setRule('Name', [
      {min: 5, message: 'Field is 10 minimum'},
    ]);
    validateModel.model.Name = '';
    let result = validateModel.validate();
    assert.equal(result.success, false);

    validateModel.model.Name = '1234';
    result = validateModel.validate();
    assert.equal(result.success, false);

    validateModel.model.Name = '12345';
    result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Name = '123456789';
    result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Максимум для String', function () {
    let validateModel = setRule('Name', [
      {max: 5, message: 'Field is 10 maximum'},
    ]);
    validateModel.model.Name = '';
    let result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Name = '1234';
    result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Name = '12345';
    result = validateModel.validate();
    assert.equal(result.success, true);

    validateModel.model.Name = '123456789';
    result = validateModel.validate();
    assert.equal(result.success, false);
  });

});

describe('Регулярные выражения', function () {

  it('Регулярные выражение для String', function () {
    let validateModel = setRule('Name', [
      {regexp: /^A/, message: 'Field must satisfy regex'},
    ]);
    validateModel.model.Name = 'an A';
    let result = validateModel.validate();
    assert.equal(result.success, false);

    validateModel.model.Name = 'An E';
    result = validateModel.validate();
    assert.equal(result.success, true);
  });

});

describe('Установка множества правил', function () {

  it('Установка правил', function () {
    let model = new Product();
    model.Name = 'An E';
    model.Code = 123;
    let validateModel = goshaValidate(model);
    validateModel.setRules([
      {
        field: 'Name',
        rules: [
          {regexp: /^A/, message: 'Field must satisfy regex'},
          {require: true, message: 'Field is required'},
        ]
      },
      {
        field: 'Code',
        rules: [
          {require: true, message: 'Field is required'},
        ]
      }]);

    let result = validateModel.validate();
    assert.equal(result.success, true);

  });

  it('Установка типов из модели по умолчанию', function () {
    let model = new Product();
    let validateModel = goshaValidate(model);
    let exception = false;
    try {
      validateModel.setRuleTypeFromDefault();
    } catch (e) {
      exception = true;
    }
    assert.equal(exception, true);

    validateModel.setRuleTypeFromDefault(true);
    let result = validateModel.validate();
    assert.equal(result.success, true);
  });

  it('Установка обязательности для набора полей', function () {
    let model = new Product();
    let validateModel = goshaValidate(model);
    let exception = false;
    try {
      validateModel.setRuleRequired(['N1ame']);
    } catch (e) {
      exception = true;
    }
    assert.equal(exception, true);

    exception = false;
    try {
      validateModel.setRuleRequired(123);
    } catch (e) {
      exception = true;
    }
    assert.equal(exception, true);

    validateModel.setRuleRequired(['Code', 'Name', 'Status', 'Markers', 'NStatus']);
    let result = validateModel.validate();
    assert.equal(result.success, false);

    model.Name = '123';
    model.Code = 123;
    model.Status = 123;
    model.Markers = ['123', '222'];
    model.NStatus = {field: '123'};
    result = validateModel.validate();
    assert.equal(result.success, true);
  });

});

describe('Валидация одного поля', function () {

  it('Валидация String', function () {
    let validateModel = setRule('Name', [
      {require: true, message: 'Field is required'},
    ]);
    let result = validateModel.validate('Name');
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field is required');

    validateModel.model.Name = '123';
    result = validateModel.validate('Name');
    assert.equal(result.success, true);
  });

  it('Валидация Number', function () {
    let validateModel = setRule('Code', [
      {require: true, message: 'Field is required'},
    ]);
    validateModel.model.Code = '';
    let result = validateModel.validate('Code');
    assert.equal(result.success, false);

    validateModel.model.Code = 123;
    result = validateModel.validate('Code');
    assert.equal(result.success, true);
  });

  it('Валидация для Array', function () {
    let validateModel = setRule('Markers', [
      {min: 3, message: 'Field is 10 maximum'},
    ]);
    validateModel.model.Markers = [];
    let result = validateModel.validate('Markers');
    assert.equal(result.success, false);

    validateModel.model.Markers = ['', ''];
    result = validateModel.validate('Markers');
    assert.equal(result.success, false);

    validateModel.model.Markers = ['', '', ''];
    result = validateModel.validate('Markers');
    assert.equal(result.success, true);

    validateModel.model.Markers = ['', '', '', ''];
    result = validateModel.validate('Markers');
    assert.equal(result.success, true);
  });

  it('Валидация для Boolean', function () {
    let validateModel = setRule('Status', [
      {require: true, message: 'Field is required'},
    ]);
    validateModel.model.Status = '';
    let result = validateModel.validate('Status');
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field is required');

    validateModel.model.Status = true;
    result = validateModel.validate('Status');
    assert.equal(result.success, true);

    validateModel.model.Status = false;
    result = validateModel.validate('Status');
    assert.equal(result.success, true);
  });

  it('Валидация для Object', function () {
    let validateModel = setRule('NStatus', [
      {require: true, message: 'Field is required'},
    ]);
    let result = validateModel.validate('NStatus');
    assert.equal(result.success, false);
    assert.equal(result.messages[0].message, 'Field is required');

    validateModel.model.NStatus = {test: true};
    result = validateModel.validate('NStatus');
    assert.equal(result.success, true);
  });

});