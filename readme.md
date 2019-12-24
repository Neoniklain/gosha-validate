## Базовое использование

### Задание правил для каждого поля отдельно

``` javascript
function Product() {
  this.Code = 0;
  this.Name = '';
  this.Status = false;
  this.Markers = [];
  this.NStatus = {};
  return this;
}

let test = goshaValidate(new Product());

test.setRule("Name", [
	{ require: true, message: 'Field is required' },
	{ type: 'String', message: 'Field type must be String' },
	{ min: 10, message: 'The minimum field value is 10' },
	{ max: 20, message: 'The maximum field value is 10' },	
	{ regexp: /^A/, message: 'Field must satisfy regex' },
]);

let result = test.validate();
console.log(result);
// Output:
// {
//	result: false,
//	messages: [
//	{field: "Name", message: "Field is required"},
//	{field: "Name", message: 'The minimum field value is 10'},	
//	{field: "Name", message: 'Field must satisfy regex'},
//	]
// }
//
```

### Установка правила обязательности для группы полей

Установит обязательность для полей Name, Code и Status.

``` javascript
let test = goshaValidate(new Product());
test.setRuleRequired(["Name", "Code", "Status"]);
let result = test.validate();
```

### Установка типов по дефолтным значениям из базовой модели

Установит следующие правлиа соотвествия типов:

* Code - Number;
* Name - String;
* Status - Boolean;
* Markers - Array;
* NStatus - Object;

``` javascript
let test = goshaValidate(new Product());
test.setRuleTypeFromDefault();
let result = test.validate();
```

При передаче true в setRuleTypeFromDefault будут пропущены поля для которых не задано значение, а так же поля которым задано значение null или undefiend.

``` javascript
let test = goshaValidate(new Product());
test.setRuleTypeFromDefault(true);
let result = test.validate();
```

### Валидация одного поля

Для валидации только по одному полю, необходимо передать название поля в метод Validate

``` javascript
let test = goshaValidate(new Product());
test.setRuleRequired();
let result = test.validate("Name");
```

### Добавление пользовательских правил валидации

Создание пользовательского правила валидации

``` javascript
let test = goshaValidate(new Product());
let validateModel = goshaValidate(model);
validateModel.setCustomRule('Name', function (value) {
  return value === 'test';
}, 'Поле "Name" должно быть равно "test"');
let result = validateModel.validate();
```

### Удаление правил

Удаление всех правил для поля

``` javascript
let test = goshaValidate(new Product());
validateModel.setRule('Name', [
      {require: true, message: ''},
    ]);
validateModel.removeRule('Name');
let result = validateModel.validate();
```

Удаление определенных правил для поля. Код ниже удалит правила 'require' и 'type'

``` javascript
let test = goshaValidate(new Product());
validateModel.setRule('Name', [
      {require: true, message: ''},
      {type: String, message: ''},
    ]);
validateModel.removeRule('Name', ['require', 'type']);
let result = validateModel.validate();
```