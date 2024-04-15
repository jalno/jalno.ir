# Autoloader

As you know, in PHP, programmers need to include functions and classes stored in other files to use them. This can be tedious and problematic. Therefore, the framework has created this capability so that programmers can focus on the program itself without having to worry about calling the required files.

An autoloader is defined for the backend in the root directory and another in each template in the appearance section of the program. The autoloader file in the root directory is defined in the `package.json` file and the autoloader file for each template is defined in the template definition file, `theme.json`, under the key `autoload`.

In the `autoloader.json` file, the details (class name and file path) of all classes used in the package must be defined one by one in a JSON format file (it is not possible to define all classes in a directory at once). This can be time-consuming.

To avoid wasting time, you should use the `PhpParser` package. The `PhpParser` package simplifies the process of generating and creating a class map for the package, and you no longer need to create an `autoloader.json` file. You only need to define the name of the parent folder of the classes under the `directories` key in the `autoload` key in the `package.json` file.

To define and load functions by the framework in the autoloader, you must introduce the file containing the function in the `files` key. Also, for the framework to understand that it is a function, you need to use the `function` key with a value of `true` in its introduction.

:::note
The `directories` key is provided for the convenience of programmers, as the framework automatically identifies the class files in the directories. If you wants to define class files manually, they must define the files in the `files` key.
:::


You can clone PhpParser from the following link:

```bash
git clone https://github.com/yeganemehr/PhpParser.git
```

## Package Structure in Jalno

When you download the latest version of Jalno or clone its repository, the base package is placed in the `packages` directory. Other project-required packages, such as `PhpParser`, the project's source code package, and others, should also be placed in the `packages` directory.

:::info
For more information, please refer to the [Package Structure page](package.md).
:::

**Example package.json file**
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

**Manually defining class files in the controllers directory**
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

**Example theme.json file**
```json
{
    "name": "frontname",
    "title": "Site Frontend",
    "version": "1.0.0",
    "autoload": {
        "directories": ["views", "libraries"]
    }
}
```


**Example autoloader.json file (no need to create this file)**
```json
{
    "files":[
        {
            "classes":["controllers/Main"],
            "file":"controllers/Main.php"
        },
        {
            "classes":["views/homePage"],
            "file":"views/homePage.php"
        },
        {
            "classes":["views/notfound"],
            "file":"views/notfound.php"
        },
        {
            "classes":["controllers/News"],
            "file":"controllers/News.php"
        },
        {
            "classes":["views/news/show"],
            "file":"views/news/show.php"
        }
    ]
}
```
