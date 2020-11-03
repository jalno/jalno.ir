# قالب
قسمت های سمت کاربر شامل HTML، CSS و Javascript  و یک قسمت ظاهری است. قالب ها باید در فایل `package.json` در کلیدی با عنوان frontend در  پوشه ی اصلی پکیج تعریف شود .

فایل‌های html باید در پوشه‌ای به نام html ذخیره شوند. نام فایل های html باید با نام کلاس view متناظر با آن یکسان باشد.

###### برای اطلاعات بیشتر به صفحه ی [ظاهر](view.md) .مراجعه کنید


نمونه فایل package.json
```json
{
    "permissions": "*",
    "frontend": ["frontend"]
}
```
میتوان قالب های متعددی در یک پکیج ایجاد و در فایل `package.json` تعریف کرد. فرم-ورک به صورت خودکار با استفاده از نام مشخص شده برای هر قالب، فایل های متناظر با ظاهر و قالب را بارگذاری می کند.

نمونه فایل package.json
```json
{
    "permissions": "*",
    "frontend": ["frontend", "frontend_blog", "frontend_panel", "frontend_news"],
}
```

فایل های هر قالب باید در فایل `theme.json` که در پوشه قالب قرار دارد معرفی شوند.
نام پوشه ای که فایل‌های ظاهر قالب در آن قرار دارد در کلید `autoload` معرفی میشود.

###### برای اطلاعات بیشتر به صفحه ی [بارگذاری خودکار](autoloader.md) .مراجعه کنید

**نمونه فایل theme.json**
```json
{
	"name": "theme_name",
	"autoload": {
        "directories": ["views"]
    }
}

```

نام هر قالب باید به صورت یکتا باشد و نام مشخص شده در کلید `name` معرفی می شود. همچنین توضیحات اضافی مانند عنوان و یا نسخه ی قالب را برای خوانایی بیشتر به این فایل اضافه کنید.
فایل های css و javascript نیز باید در فایل معرف قالب، در کلیدی با نام `assets` معرفی شوند.

برای راحتی نوشتار و استفاده از پکیج های مختلف [NPM](https://npmjs.org) ،  قابلیت [Webpack](http://webpack.js.org/) در فرم-ورک پیاده سازی شده است. میتوانید css های قالب را با استفاده از less و scss و فایل های javascript را به صورت JQuery و یا حتی Typescript بنویسید. فرم-ورک به صورت خودکار پکیج های مورد نیاز را دانلود و فایل های معرفی شده را بعد از  کامپایل و در قالب یک فایل در صفحه بارگذاری خواهد کرد.

برای استفاده از این قابلیت نیاز هست تا دو پکیج [Webpack](https://github.com/yeganemehr/webpack) برای کامپایل فایل ها  و [npm](https://github.com/yeganemehr/npm) برای دانلود پکیج ها در کنار پکیج اصلی استفاده کنید .

### نمونه هایی از معرفی فایل های css و js
نمونه معرفی فایل css

	{"type": "css", "file": "assets/css/Style.css"}

	{"type": "less", "file": "assets/css/Main.less"}


نمونه معرفی فایل javascript

	{"type": "js", "file": "assets/js/Main.js"}

	{"type": "ts", "file": "assets/ts/Main.ts"}


نمونه معرفی پکیج bootstrap در قالب

	{"type":"package", "name":"bootstrap", "version": "^3.3.7"}

میتوانید نسخه ای که با برنامه ی شما سازگاری دارد را مشخص کنید تا در کامپایل های بعدی نیز فقط نسخه ی مشخص شده دانلود و کامپایل شود.


### مترجم در قالب
در صورتی که از قابلیت مترجم فرم-ورک استفاده میکنید نیاز هست تا فایل های ذخیره-نوشته را در کلید `languages` معرفی کنید .

###### برای اطلاعات بیشتر به صفحه ی [مترجم](translator.md) .مراجعه کنید


**نمونه فایل ذخیره-نوشته در قسمت قالب**
```json
{
    "author": {
        "name" : "Jeyserver",
        "website" : "https://www.jeyserver.com/"
    },
    "rtl": true,
    "phrases":{
        "title": "Jeyserver framwork docs",
        "description": "powered by <a href=\"{url}\">Jeyserver</a> , open license framwork"
    }
}
```

**نمونه فایل معرف قالب theme.json**
```json
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
        "fa_IR": "langs/fa_IR.json"
    }
}
```

### فراخوانی فایل های css
برای فراخوانی فایل های css فقط نیاز هست تا در صفحه ی html متد `loadCSS` را صدا بزنید. این متد در کلاس `packages/base/view` تعریف شده و ظاهر ها با توجه به رابطه ی پدر-فرزندی از آن ارث بری دارند.

```php
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <title>My First Site</title>
    <?php $this->loadCSS(); ?>
<head>
```


### فراخوانی فایل های js
 برای فراخوانی فایل های javascript فقط نیاز هست تا در صفحه ی html متد `loadJS` را صدا بزنید. این متد نیز در کلاس `packages/base/view` تعریف شده و ظاهر ها با توجه به رابطه ی پدر-فرزندی از آن ارث بری دارند.

```php
<!DOCTYPE html>
<html lang="en" dir="ltr">
<body>

<?php $this->loadJS(); ?>
</body>
</html>
```

