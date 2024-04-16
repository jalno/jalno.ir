---
title: Installation
slug: /
---

## Introduction

Jalno is an open-source and agile framework that can assist programmers throughout all stages of website or web application development. Its emphasis on readability and expressiveness makes coding with Jalno simple and enjoyable.

To use this framework, a basic understanding of PHP, MySQL, CSS, JavaScript, and HTML is required.

Jalno is under development, and due to frequent and significant code changes, the documentation may not be entirely consistent with the latest version.
### Installing Jalno

Installing Jalno is straightforward and involves only three steps:

**Download the Latest Version:**

You can always download the latest version of the framework from its main repository branch:

[Download ZIP](https://github.com/jalno/base/archive/master.zip)

Or clone the repository:

```bash
git clone https://github.com/jalno/base.git
```

**Create a Database:**

If you are setting up the project on your local machine, create a new database using PHPMyAdmin or your hosting panel. Then, import the `database.sql` file located in the `packages/base` directory into the database.   
Configure your web server to point to the Jalno project directory. This will typically involve setting up a virtual host or configuring your document root.


#### Install PhpParser {#installing-phpparser}

The PhpParser package is used to simplify the process of generating a class map for a package and using it in the Autoloader. The PhpParser package is included with the base package. You can clone PhpParser from the following link:

```bash
git clone https://github.com/yeganemehr/PhpParser.git
```

### Packages Structure

When you download the latest version of Jalno or clone its repository, the base package is placed in the packages directory. Other project-required packages, such as PhpParser, the project's source code package, and others, should also be placed in the packages directory.


### What is Autoloader?

In PHP, to use any class, you must first include it in the desired file, which can cause problems. To address these file-related issues, a file called autoloader.json is created that contains the details (name and address) of all the classes defined in the package. This allows you to define the class in the desired file without needing to include it and only using the use statement.

:::info
For more information, please refer to the [Autoloader page](autoloader.md).
:::

Example of autoloader.json file:
```json
[
	{
		"classes":["User"],
		"file":"libraries/users/user.php"
	},
	{
		"classes":["controllers/Main"],
		"file":"controllers/Main.php"
	}
]
```

However, this method is not without its drawbacks and can lead to lengthy file lists. To avoid wasting time, we use the PhpParser package.

With the PhpParser package, you no longer need an autoloader.json file and to declare all classes; instead, you only declare the existing folders in the package.json file.

:::info
For more information, please refer to the [Package Structure page](package.md).
:::

## Configuration {#configuration-jalno}
### Web Server Configuration {#config-webserver}

After installing Jalno, make sure the index.php file is located in the root directory. On common control panel hosting servers, this folder is usually called public_html.

You can also change the root directory settings of your web server to place this file in the root directory.

### Framework Settings {#configuration-file}

All Jalno settings are located in the `config.php` file at `packages/base/libraries/config/config.php`. To apply settings, simply open this file with a text editor and save the new settings. You can also apply the settings to the database in the `options` table.

Each setting is documented, so feel free to browse the files and familiarize yourself with the options available to you.

### Directory Permission Levels {#directory-permissions}

After installing Jalno, you may need to adjust the permission levels of some folders. All folders and files in the root directory must be accessible and readable by the web server and Jalno. Jalno must also have write permission (create new files or write to existing files) in the `packages/base/storage` folder, otherwise it will not run properly.

### Database Connection {#config-db-connection}
Open the framework configuration file with a text editor and enter the database connection details in the `packages.base.loader.db` setting. For example:

```php
<?php
namespace packages\base;
$options = array(
    'packages.base.loader.db' => array(
        'type' => 'mysql',
        'host' => '127.0.0.1',
        'user' => 'root',
        'pass' => 'myComplexPassword',
        'dbname' => 'jalno'
    )
...
```

