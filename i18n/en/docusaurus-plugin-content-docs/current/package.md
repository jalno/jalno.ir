# Package Structure

When you download the latest version of Jalno or clone its repository, the base package is placed in the packages directory. Other project-required packages (which are each a folder), such as `PhpParser`, the project's source code package, and others, should also be placed in the packages directory.

Each package contains a file called package.json.

The package name must be Latin and the first character must be one of the letters of the English alphabet. You can also use underscores in the package name.

If the package wants to receive HTTP requests, it must introduce a routing file and its address must be specified in the package.json file.
## Autoloading

:::info
For more information, please refer to the [Autoloading page](autoloader.md).
:::

Also, if the package needs to use the Autoloading feature, it must introduce the path to the guide file in this file and under the key "autoload".

### What is Autoloader?

In PHP, to use any class, you must first include it in the desired file, which can cause problems. To solve these problems, a file called autoloader.json is created that contains the details (class name and file address) of all classes defined in the package; and we can define the class in the desired file without the need to include it and only using the use statement.

This method creates a long list of class specifications, which can be time-consuming to create.

To save time and simplify the process of generating a class map for a package, the `PhpParser` package is used. With this package, you do not need to create an `autoloader.json` file; you only need to introduce the name of the parent folder of the classes you want to use and autoload under the key `directories` in the `autoload` key.

To introduce and load functions by the framework in the autoloader, you must introduce the file containing the function in the `files` key, and also in order for the framework to understand that it is a function, you need to use the `function` key with a value of true in its introduction.

:::note
The `directories` key is provided for the convenience of programmers, as the framework automatically identifies the class files in the directories. If the programmer wants to introduce class files manually, they must introduce the files in the `files` key.
:::

You can clone PhpParser from the following link:

```bash
git clone https://github.com/yeganemehr/PhpParser.git
```

**Example 1:**
```json
{
    "permissions": "*",
    "autoload": {
        "directories": ["controllers", "Models", "listeners", "users", "libraries"],
        "files": [
            {
                "file": "libraries/io/io.php",
                "function": true
            }
        ]
    }
}
```

**Example 2:** Manually introducing class files in the controllers directory

```json
{
  "permissions": "*",

  "autoload": {
    "files":[
      {
        "file":"libraries/base/url.php",
        "function": true
      },
      {
        "file":"controllers/Dashboard.php"
      },
      {
        "file":"controllers/Lock.php"
      },
      {
        "file":"controllers/Login.php"
      }
    ],
    "directories": ["libraries", "listeners", "logs", "views", "processes"]
  }
}
```


## Frontend

Also, the frontend templates are done in this file by mentioning the addresses of the corresponding folders in the "frontend" key.

**Example 3:**
```json
{
    "permissions": "*",
    "frontend": ["frontend"],
}
```

**Example 4:**

```json
{
    "permissions": "*",
    "frontend": ["frontend", "blog-frontend", "panel-frontend"],
}
```

## Translations

:::info
For more information, please refer to the [Translator page](translator.md).
:::

The defination of the translation file is also done in this file by mentioning the language code and the address of the phrases file in the "langs" key.

**Example 5:**

```json
{
    "permissions": "*",
    "languages": {
        "fa_IR": "langs/fa_IR.json"
    }
}
```

## Events Listeners

To register event listeners, store the event name and the corresponding listener in the "events" key.

**Example 6:**
```json
{
    "permissions": "*",
    "events": [
        {
            "name":"/packages/base/view/events/afterLoad",
            "listener": "listeners/Stats@watch"
        }
    ]
}
```

## Dependencies
This field specifies any other Jalno packages your package relies on to function correctly. By listing them here, Jalno will automatically load them first, ensuring all dependencies are available before attempting to use your package.

**Example 7:**

```json
{
  "permissions": "*",
  "dependencies": ["base"],
}
```
In this example, the package depends on the `base` Jalno package.


## Bootstrap File

The `bootstrap` key allows you to define a PHP file that gets executed after the package is loaded but before Jalno starts searching for routes or controllers. This is useful for performing tasks like checking user IP addresses or other setup operations that need to happen before the application starts running.

```json
"bootstrap": "bootup/checkAccess.php"
```

**Complete Example package.json file**
```json
{
    "permissions": "*",
    "routing": "routing.json",
    "frontend": ["frontend"],
    "autoload": {
        "directories": ["controllers", "Models", "listeners", "users"]
    },
    "dependencies": ["base"],
    "languages": {
        "fa_IR": "langs/fa_IR.json"
    },
    "events": [
        {
            "name":"/packages/base/view/events/afterLoad",
            "listener": "listeners/Stats@watch"
        }
    ],
    "bootstrap": "bootup/checkAccess.php"
}
```

**Example bootstrap file:**
```php
<?php
namespace packages\packagename\bootstraps;

use packages\base\{Http, NotFound};
use packages\packagename\BannedIP as Model;

$userIP = Http::$client["ip"];

$model = new Model();
$model->where("ip", $userIP);
if ($model->has()) {
    throw new NotFound();
}
```


This example checks if the user's IP address is banned before continuing. If it is, it throws a NotFound exception to halt the application.