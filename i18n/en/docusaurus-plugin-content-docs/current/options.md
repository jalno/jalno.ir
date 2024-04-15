# Configuration
The web developer can read settings in two ways and write them in one way.

## config.php file

If you look at the `config.php` file in the `packages/base/libraries/config` directory, you will see a PHP array containing a number of key-value pairs. If the programmer adds values to this file, they can later access them using the following method and use them during program execution.

## Options table

If the program has database capabilities, the programmer can read and write settings using the `Options` class during installation or program execution.

Settings with an `autoload` value of 1 will be automatically loaded from the database in bulk when the framework is activated, and other settings will be called from the database when the programmer needs them.

It is also possible to store arrays or objects in the `value` field, and the framework will automatically manage their values when saving or reading.

### Reading settings

The `get` function of the `Options` class is used to read settings. In the `$name` parameter, this function receives the name of the setting you want and first looks for it among the values in the `config.php` file and then (if a database connection is available) in the `options` table.

Similarly, if you pass the `$reload` parameter as `true`, this function will recheck the database for the value of this setting if it has already been retrieved from the database before.


Example:
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{controller, options}
class Main extends controller {
	public function getDefaultLang() {
		return options::get("packages.package.lang.default");
	}
}
```

## Saving Settings

### Temporary Settings

You can temporarily save a setting using the `set` function of the `options` class. When processing is complete, the setting will be deleted or reset to its original value.

### Permanent Settings

If you want to save a setting permanently, you should use the `save` function of the `options` class. This function, like the `set` function, takes the unique name of the setting in the first parameter and its value (which can be a number, string, boolean, or array) in the second parameter.

You can also send one of the values `true` or `false` for the `autoload` parameter in the third parameter to specify whether this setting should be loaded automatically in bulk or referred to when needed.

Example:
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{controller, options}
class Main extends controller {
	public function changeLang($lang) {
		options::set("packages.package.lang.default", $lang);
	}
}
```