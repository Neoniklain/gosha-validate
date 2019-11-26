* Usage:

```
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
{require: true, message: 'Field is required'},
{type: 'String', message: 'Field type must be String'},
{min: 10, message: 'The minimum field value is 10'},
{max: 20, message: 'The maximum field value is 10'},
{regexp: /^A/, message: 'Field must satisfy regex'},
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