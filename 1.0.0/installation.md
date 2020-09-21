# نصب و راه اندازی

نصب جالنو واقعا ساده است، فقط شامل سه مرحله است:

### آخرین نسخه را دانلود کنید

آخرین نسخه این فریم-ورک را میتونید همیشه از شاخه اصلی مخزنش دانلود کنید: [دانلود ZIP](https://github.com/jalno/base/archive/master.zip)

یا اینکه مخزن را بصورت کامل کلون کنید:

```bash
git clone https://github.com/jalno/base.git
```


### نصب PhpParser 
از پکیج PhpParser برای ساده‌سازی روند تولید یک نقشه از کلاس های پکیج و استفاده آن ها در Autoloader استفاده میشود.

این پکیج در کنار پکیج base قرار میگیرد.

میتوانید PhpParser را از لینک زیر کلون کنید :
```bash
git clone https://github.com/yeganemehr/PhpParser.git
```

> ##### Autoloader چیست ؟
> در php برای استفاده از هرکلاس ابتدا باید آن کلاس را در فایل مورد نظر include کنیم که باعث ایجاد مشکلاتی میشود
> برای برطرف کردن مشکلات فایلی به نام autoloader.json ایجاد کرده که مشخصات (نام و ادرس) تمامی کلاس های تعریف شده در پکیج در آن داده میشود;
> و میتوانیم بدون نیاز به include کردن و تنها با استفاده از دستور use کلاس را در فایل مورد نظر تعریف کنیم.

 نمونه ای از فایل autoloader.json :
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

> این روش هم باعث ایجاد لیست طولانی از فایل ها میشود برای جلوگیری از اتلاف وقت از پکیج PhpParser استفاده میکنیم.

> با استفاده از پکیج PhpParser دیگر نیاز به فایل autoloader.json و معرفی تمامی کلاس ها نیست و فقط پوشه های موجود را در فایل package.json معرفی میکنیم .
###### برای اطلاعات بیشتر به صفحه [بارگذاری خودکار](autoloader.md) مراجعه کنید.


### یک پایگاه داده بسازید
اگر پروژه را بر روی رایانه شخصیتون راه اندازی میکنید، از طریق `PHPMyAdmin`  یک پایگاه داده جدید بسازید، یا در غیر اینصورت به پنل میزبانیتون مراجعه کنید.سپس فایل `database.sql` را که در مسیر `packages/base` میباشد در پایگاه داده import نمایید.


### اتصال را برقرار کنید

فایل `packages/base/libraries/config/config.php` را با یک ویرایشگر متن باز کنید و در قسمت `packages.base.loader.db` مشخصات اتصال به پایگاه داده را وارد کنید. برای مثال:

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

