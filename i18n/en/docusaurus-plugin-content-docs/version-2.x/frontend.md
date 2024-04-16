# Themes
The frontend section comprises HTML, CSS, and JavaScript, forming the visual part. Themes must be defined in the `package.json` file under a key named `frontend` in the root directory of the package.

HTML files should be stored in a directory named `html`. The names of HTML files should match the names of the corresponding view classes.


:::info
For more information, refer to the [View](view.md) page.
:::

```json title="package.json"
{
    "frontend": ["frontend"]
}
```
Multiple themes can be created in one package and defined in the `package.json` file. Jalno automatically loads the corresponding files based on the specified names for each theme.

```json title="package.json"
{
    "frontend": ["frontend", "frontend_blog", "frontend_panel", "frontend_news"],
}
```

## Theme Configuration

In the main directory of each theme, there must be a file named `theme.json` for configuring and defining the theme. This file identifies items such as the theme name, which Jalno uses to locate and activate the theme.  
Additionally, it defines other files and classes for identification by Jalno. Other details such as translation files and asset files like CSS and JavaScript can also be defined in this file.
The name of the directory containing the theme's View files is specified in the `autoload` key.

:::info
For more information, refer to the [Autoloader](autoloader.md) page.
:::

```json title="frontend/theme.json"
{
	"name": "theme_name",
	"autoload": {
        "directories": ["views"]
    }
}
```
Each theme name must be unique and is specified in the `name` key. Additionally, you can add extra information such as the `title` and `version` of the theme for better readability. CSS and JavaScript files should also be defined in the `theme.json` file under a key named `assets`.

To facilitate writing and using various packages from [NPM](https://npmjs.org), the [Webpack](http://webpack.js.org/) feature is implemented in Jalno. You can write CSS, LESS, SCSS and JavaScript files using jQuery or even TypeScript. JAlno automatically downloads the required packages and transpile the specified files into one file for loading on the page.

To use this feature, it is necessary to use the [node_webpack](node_webpack.md) package alongside the primary package.

### Examples of CSS and JS File Definition

Example definition of a CSS file

```json title="frontend/theme.json"
{
    ...
    "assets": [
        {"type": "css", "file": "assets/css/Style.css"},
        {"type": "less", "file": "assets/css/Main.less"}
    ]
}
```

Example definition of a JavaScript file

```json title="frontend/theme.json"
{
    ...
    "assets": [
        {"type": "css", "file": "assets/js/Main.js"},
        {"type": "less", "file": "assets/ts/Main.ts"}
    ]
}
```

Example definition of [the Bootstrap](https://getbootstrap.com) package in a theme

```json
{
    ...
    "assets": [
        {"type":"package", "name":"bootstrap", "version": "^3.3.7"}
    ]
}
```
You can specify the version compatible with your app so that in subsequent transpiles, only the specified version will be downloaded and compiled.

## Translations

If you are using the translator feature of Jalno, you need to specify the file paths in the `languages` key.

:::info
For more information, refer to the [Translator](translator.md) page.
:::

```json title="frontend/langs/en_US.json"
{
    "rtl": true,
    "phrases":{
        "title": "Jalno framwork docs",
        "description": "powered by <a href=\"{url}\">Jalno CO</a> , open license framwork"
    }
}
```
```json title="frontend/theme.json"
{
    "name": "frontname",
    "title": "Site Frontend",
    "version": "1.0.0",
    "assets": [
        {"type":"package", "name":"bootstrap", "version": "^3.3.7"},
        {"type":"package", "name":"jquery", "version": "^3.2.1"},
        {"type":"package", "name":"webuilder", "version": "^2.0.1"},
        {"type": "less","file": "node_modules/bootstrap/less/bootstrap.less"},
        {"type": "less","file": "assets/less/Main.less"},
        {"type": "ts","file": "assets/ts/Main.ts"}
    ],
    "autoload": {
        "directories": ["views"]
    },
    "languages": {
        "en_US": "langs/en_US.json"
    }
}
```

### Loading CSS

To load CSS files, simply call the `loadCSS` method in the HTML page. This method is defined in the `packages/base/View` class, and `View`s have access to it based on the parent-child relationship.

```php title="frontend/html/my-page.php"
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <title>My First Site</title>
    <?php $this->loadCSS(); ?>
<head>
...
```


### Loading JavaScript
To load JavaScript files, it is also necessary to call the `loadJS` method in the HTML page. This method is also defined in the `packages/base/View` class, and `View`s have access to it based on the parent-child relationship.

```php title="frontend/html/my-page.php"
<!DOCTYPE html>
<html lang="en" dir="ltr">
<body>
...

<?php $this->loadJS(); ?>
</body>
</html>
```
