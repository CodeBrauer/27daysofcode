# #005 2017-01-05: FormGenerator (PHP)

## Requirements

- PHP7+

## Properties, Constants

### Constant: `ID_PREFIX`

Prefix of the generated ID attribute. Default: `'FG_'`

### Property: `$newline`

Will be appended after some elements. Default: `PHP_EOL`

Can be changed `''` _(empty string)_ to disable new lines.


## Methods

### `new FormGenerator(array $attributes)`

`$attributes` Attributes will be match (as in any method) as key-value-pair, like this:

```php
<?php
$attributes = [
    'method' => 'GET'
    'action' => 'index.php'
];
```

Will result:

```html
<form method="GET" action="index.php">
```

### `generate(bool $print = true)`

Will close the form and print it - or if `$print` is false - it will return the PHP String

### `input(string $type, string $name, array $attributes = [])`

Generates a input.

- `$type` can be anything like button, checkbox, text, password etc.
- `$name` will be the inputs name
- `$attributes` can be an array with attributes like:
 - `['required', 'class' => 'form-control']`
 - Values without a key will be parsed correctly (like the `required` attribute)

### `textarea(string $name, array $attributes = [], string $value = '')`

Generates a textarea. Predefined values can be defined with `$value`


### `select(string $name, array $options, bool $multiple = false, array $attributes = [])`

Generates a `<select>`. `$options` will be the `<option>` where the arrays _key_ will be the `value` and the _value_ will be the inner HTML of the `<option>`

### `withLabel(string $label)`

Wraps a label on last generated element with `$name`

### `withWrap(string $element, string $closingElement)`

Wraps the last element (input, textarea, select) between `$element` and `$closingElement`

### `rawHTML(string $html)`

Adds raw html at current position

## Example

```php
require 'src/FormGenerator.php';

$login = new FormGenerator([
    'action'         => 'test.php',
    'method'         => 'POST',
    'accept-charset' => 'utf-8',
]);
$login->input('text', 'username', ['required'])->withLabel('Username:')
     ->input('password', 'password', ['required'])->withLabel('Password:')
     ->input('checkbox', 'remember_me')->withLabel('Remember me')
     ->input('submit', 'login', ['value' => 'Login', 'class' => 'btn'])
     ->generate();
?><!-- renders: -->
<form action="test.php" method="POST" accept-charset="utf-8">
  <label>Username:<input type="text" name="username" id="FG_username_9e" required></label>
  <label>Password:<input type="password" name="password" id="FG_password_9e" required></label>
  <label>Remember me<input type="checkbox" name="remember_me" id="FG_remember_me_9e"></label>
  <input type="submit" name="login" id="FG_login_9e" value="Login" class="btn">
</form>

```

## Notes

All IDs will have a once for instance suffix so you can generate multiple forms on one page and the names can be the same. But if you want to select them with CSS/Javascript/jQuery you can do it with: `[id^='FS_name']`



