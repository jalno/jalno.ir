---
title: نصب و راه اندازی
slug: /
---

## فرم ورک جالنو
یک فرم ورک متن-باز و چابک که میتواند در تمامی مراحل تولید یک وب سایت و یا وب اپلیکیشن به برنامه نویس کمک کند. راحت نویسی و صریح نویسی از جمله مواردی است که باعث شده کد نویسی با جالنو راحت و لذت بخش باشد.   
برای استفاده از این فرم ورک آشنایی ابتدایی به زبان های PHP، MySql, CSS, Javascript و HTML نیاز است.   
جالنو در مرحله ی توسعه می باشد و به دلیل تغییرات عمده و متداول در کد ها ممکن است مستندات موجود با آخرین نسخه هماهنگی کامل نداشته باشد. 

## نصب و راه اندازی {#installation}

### پیش نیاز نصب {#server-requirements}
فرم ورک جالنو پیش نیاز های حداقلی دارد. شما باید مطمئن شوید که سرور شما شرایط زیر را دارد:

+ نسخه ی PHP 7.2 و بالاتر
+ افزونه PHP [Mbstring](http://ir2.php.net/mbstring) 
+ افزونه PHP  [Mysqli](http://ir2.php.net/mysqli) 

### نصب جالنو {#installing-jalno}
نصب جالنو واقعا ساده است، فقط شامل سه مرحله است :

#### آخرین نسخه را دانلود کنید {#download-last-version}
آخرین نسخه این فریم-ورک را میتونید همیشه از شاخه اصلی مخزنش دانلود کنید: [دانلود ZIP](https://github.com/jalno/base/archive/master.zip)

یا اینکه مخزن را بصورت کامل کلون کنید:

```bash
git clone https://github.com/jalno/base.git
```

#### یک پایگاه داده بسازید {#create-database}
اگر پروژه را بر روی رایانه شخصیتون راه اندازی میکنید، از طریق `PHPMyAdmin`  یک پایگاه داده جدید بسازید، یا در غیر اینصورت به پنل میزبانیتون مراجعه کنید.سپس فایل `database.sql` را که در مسیر `packages/base` میباشد در پایگاه داده import نمایید.


#### نصب PhpParser {#installing-phpparser}
از پکیج PhpParser برای ساده‌سازی روند تولید یک نقشه از کلاس های پکیج و استفاده آن ها در Autoloader استفاده میشود. پکیج PhpParser در کنار پکیج base قرار میگیرد.
میتوانید PhpParser را از لینک زیر کلون کنید :
```bash
git clone https://github.com/yeganemehr/PhpParser.git
```

### ساختار پکیج ها در جالنو {#packages-structure}
زمانی که آخرین نسخه جالنو را دانلود و یا مخرن آن را کلون میکنید; پکیج base در دایرکتوری packages قرار داده شده است .
سایر پکیج های مورد نیاز در پروژه مانند PhpParser , پکیج سورس کد ها پروژه و ... نیز باید در دایرکتوری packages قرار گیرند.


### Autoloader چیست ؟ {#what-is-autoloader}
در php برای استفاده از هرکلاس ابتدا باید آن کلاس را در فایل مورد نظر include کنیم که باعث ایجاد مشکلاتی میشود
برای برطرف کردن مشکلات فایلی به نام autoloader.json ایجاد کرده که مشخصات (نام و ادرس) تمامی کلاس های تعریف شده در پکیج در آن داده میشود;
و میتوانیم بدون نیاز به include کردن و تنها با استفاده از دستور use کلاس را در فایل مورد نظر تعریف کنیم.

__برای اطلاعات بیشتر به صفحه [بارگذاری خودکار](autoloader.md) مراجعه کنید.__

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

البته این روش هم بدون مشکل نبوده و باعث ایجاد لیست طولانی از فایل ها میشود. برای جلوگیری از اتلاف وقت از پکیج PhpParser استفاده میکنیم.

با استفاده از پکیج PhpParser دیگر نیاز به فایل autoloader.json و معرفی تمامی کلاس ها نیست و فقط پوشه های موجود را در فایل package.json معرفی میکنیم .

__برای اطلاعات بیشتر به صفحه [ساختار بسته ها](package.md) مراجعه کنید.__

## پیکربندی {#configuration-jalno}
### پیکربندی وب سرور {#config-webserver}
بعد از نصب جالنو باید مطمئن شوید فایل index.php در شاخه ( دایرکتوری/پوشه ) اصلی قرار داشته باشد. در هاست های میزبانی کنترل پنل های شناخته شده معمولا این پوشه را با نام public_html میشناسیم ها.
همچنین میتوانید با تغییر تنظیم های وب سرور خود، مسیر شاخه اصلی را تغییر داده تا این فایل در شاخه اصلی قرار گیرد.
### تنظیمات فرم ورک {#configuration-file}
تمامی تنظیمات مورد نیاز جالنو در فایل `config.php` در مسیر `packages/base/libraries/config/config.php` قرار دارد. برای اعمال تنظیمات، فقط کافی است تا این فایل را با یک ویرایشگر متن باز کرده و تنظیمات جدید را ذخیره کنید. همچنین میتوانید تنظیم ها در پایگاه داده و در جدول `options` اعمال کنید.   
هر تنظیم مستند است ، بنابراین در صورت تمایل به مرور فایل ها بپردازید و با گزینه هایی که در اختیار شما قرار دارد آشنا شوید.
### سطح دسترسی پوشه ها {#directory-permissions}
بعد از نصب جالنو شاید نیاز باشد تا سطح دسترسی بعضی از پوشه ها را تنظیم کنید. تمامی پوشه ها و فایل ها در مسیر شاخه اصلی باید توسط وب سرور و جالنو قابل دسترسی و خواندن باشند. همچنین باید جالنو اجازه نوشتن ( ایجاد فایل جدید و یا نوشتن در فایل های موجود ) در پوشه `packages/base/storage` داشته باشد در غیر اینصورت بدرستی اجرا نخواهد شد.
### اتصال را برقرار کنید {#config-db-connection}
فایل تنظیمات فرم ورک را با یک ویرایشگر متن باز کنید و در تنظیم `packages.base.loader.db` مشخصات اتصال به پایگاه داده را وارد کنید.  
برای مثال:

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

