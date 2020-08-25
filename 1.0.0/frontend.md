#قالب
قسمت های سمت کاربر شامل HTML، CSS و Javascript  و یک قسمت ظاهری است. قالب ها باید در فایل `package.json` در کلیدی با عنوان frontend در  پوشه ی اصلی پکیج تعریف شود .

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

برای بارگذاری و معرفی فایل های هر قالب دو فایل، یکی برای معرفی فایل های قالب  و دیگری برای معرفی قالب با نام های `autoloader.json` و `theme.json` دارد.
 
 نمونه فایل بارگذار خودکار autoloader.json
```json
{
    "files":[
        {
            "classes":["views\\homePage"],
            "file":"views/homePage.php"
        }
    ]
}
```
<div class="alert alert-info text-center">
برای اطلاعات بیشتر به صفحه ی <a href="autoloader.md">بارگذاری خودکار</a> مراجعه کنید
</div>

نام هر قالب باید به صورت یکتا باشد و نام مشخص شده در کلید `name` معرفی می شود. همچنین توضیحات اضافی مانند عنوان و یا نسخه ی قالب را برای خوانایی بیشتر به این فایل اضافه کنید.
فایل های css و javascript نیز باید در فایل معرف قالب، در کلیدی با نام `assets` معرفی شوند.

برای راحتی نوشتار و استفاده از پکیج های مختلف [NPM](https://npmjs.org) ،  قابلیت [Webpack](http://webpack.js.org/) در فرم-ورک پیاده سازی شده است. میتوانید css های قالب را با استفاده از less و فایل های javascript را به صورت JQuery و یا حتی Typescript بنویسید. فرم-ورک به صورت خودکار پکیج های مورد نیاز را دانلود و فایل های معرفی شده را بعد از  کامپایل و در قالب یک فایل در صفحه بارگذاری خواهد کرد.

برای استفاده از این قابلیت نیاز هست تا دو پکیج [Webpack](https://github.com/yeganemehr/webpack) برای کامپایل فایل ها  و [npm](https://github.com/yeganemehr/npm) برای دانلود پکیج ها در کنار پکیج اصلی استفاده کنید .


نمونه معرفی فایل css

	{"type": "css", "file": "assets/css/Style.css"}

	{"type": "less", "file": "assets/css/Main.less"}


نمونه معرفی فایل javascript

	{"type": "js", "file": "assets/js/Main.js"}

	{"type": "ts", "file": "assets/ts/Main.ts"}


نمونه معرفی پکیج bootstrap در قالب

	{"type":"package", "name":"bootstrap", "version": "^3.3.7"}

میتوانید نسخه ای که با برنامه ی شما سازگاری دارد را مشخص کنید تا در کامپایل های بعدی نیز فقط نسخه ی مشخص شده دانلود و کامپایل شود.

فایل بارگذار خودکار در کلیدی با عنوان `autoload` در این فایل معرفی می شود.
<div class="alert alert-info text-center">
برای اطلاعات بیشتر به صفحه ی <a href="autoloader">بارگذاری خودکار</a> مراجعه کنید
</div>
در صورتی که از قابلیت مترجم فرم-ورک استفاده میکنید نیاز هست تا فایل های ذخیره-نوشته را در کلید `languages` معرفی کنید .
<div class="alert alert-info text-center">
برای اطلاعات بیشتر به صفحه ی <a href="translator">مترجم</a> مراجعه کنید
</div>


نمونه فایل معرف قالب
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
    "autoload": "autoloader.json",
    "languages": {
        "fa_IR": "langs/fa_IR.json"
    },
    "views": [
        {
            "name": "\\themes\\frontname\\views\\homePage",
            "parent": "\\packages\\packagename\\views\\homePage",
            "file": "html/index.php"
        }
    ]
}
```
فایل های HTML قالب فقط در فایل معرف قالب معرفی میشوند و نیاز نیست تا در فایل بارگذار خودکار معرفی شوند. برای نظم دهی بیشتر بهتر است که یک پوشه با عنوانی مانند html برای فایل های html در نظر گرفته شود.

نمونه فایل ظاهری در قسمت قالب
```php
<?php
namespace themes\frontname\views;
use \packages\packagename\views\homePage as parentView;
class homePage extends parentView {
}
```
<div class="alert alert-info text-center">
برای اطلاعات بیشتر به صفحه ی <a href="view">ظاهر</a> مراجعه کنید
</div>
نمونه فایل ذخیره-نوشته در قسمت قالب
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

برای فراخوانی فایل های css فقط نیاز هست تا در صفحه ی html متد `loadCSS` را صدا بزنید. این متد در کلاس `packages/base/view` تعریف شده و ظاهر ها با توجه به رابطه ی پدر-فرزندی از آن ارث بری دارند.

نمونه فراخوانی فایل های css
```php
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <title>My First Site</title>
    <?php $this->loadCSS(); ?>
<head>
```
 برای فراخوانی فایل های javascript فقط نیاز هست تا در صفحه ی html متد `loadJS` را صدا بزنید. این متد نیز در کلاس `packages/base/view` تعریف شده و ظاهر ها با توجه به رابطه ی پدر-فرزندی از آن ارث بری دارند.

 نمونه فراخوانی فایل های javascript
```php
<!DOCTYPE html>
<html lang="en" dir="ltr">
<body>
<?php $this->loadJS(); ?>
</body>
</html>
```

