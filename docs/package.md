# ساختار بسته ها
زمانی که آخرین نسخه جالنو را دانلود و یا مخرن آن را کلون میکنید; پکیج base در دایرکتوری packages قرار داده شده است .
سایر پکیج های مورد نیاز در پروژه ( که هر کدام یک پوشه هستند) مانند `PhpParser` , پکیج سورس کد‌های پروژه و ... نیز باید در دایرکتوری packages قرار گیرند.

هر پکیج حاوی یک فایل به نام package.json است.

نام پکیج باید لاتین بوده و اولین کارکتر آن لازم است تا یکی از 
حروف الفبا انگلیسی باشد.همینطور امکان استفاده از underline در طول نام بسته نیز وجود دارد.
اگر بسته تمایل به دریافت درخواست های http داشته باشد باید یک فایل مسیریابی معرفی کند و آدرس آن فایل میبایست در فایل package.json ذکر 
شود.

## بارگذاری خودکار
##### برای اطلاعات بیشتر به صفحه ی [بارگذاری خودکار](autoloader.md) مراجعه کنید
همینطور اگر بسته نیاز به استفاده از قابلیت بارگذاری خودکار (Autoload) داشته باشد میبایست آدرس فایل راهنما را در همین فایل و تحت عنوان کلید 
"autoload" معرفی کند.

### Autoloader چیست ؟
در php برای استفاده از هرکلاس ابتدا باید آن کلاس را در فایل مورد نظر include کنیم که باعث ایجاد مشکلاتی میشود
برای برطرف کردن مشکلات فایلی به نام autoloader.json ایجاد کرده که مشخصات (نام کلاس و ادرس فایل) تمامی کلاس های تعریف شده در پکیج در آن داده میشود;
و میتوانیم بدون نیاز به include کردن و تنها با استفاده از دستور use کلاس را در فایل مورد نظر تعریف کنیم.
این روش باعث ایجاد لیست طولانی از مشخصات کلاس ها میشود که ایجاد آن وقت گیر میباشد. 

برای جلوگیری از اتلاف وقت و
برای ساده‌سازی روند تولید یک نقشه از کلاس های پکیج، از پکیج `PhpParser` استفاده میشود. با استفاده از این پکیج, نیاز به ایجاد فایل `autoloader.json` نیست; تنها کافیست نام پوشه‌ی پدر کلاس هایی که قصد داریم از انها استفاده کنیم و خودکار بارگذاری شوند را تحت عنوان کلید `directories` در کلید autoload معرفی کنیم.

برای معرفی و بارگزاری توابع توسط فرم ورک در autoloader باید فایل حاوی تابع را در کلید files معرفی کنید، همچنین برای اینکه فرم ورک متوجه تابع بودن آن شود نیاز هست تا در معرفی آن از کلید function با مقدار true استفاده شود.

**توجه :** کلید `directories` برای سهولت کار برنامه نویسان در نظر گرفته شده است، که فریمورک بطور خودکار فایل های کلاس دایرکتوری ها را شناسایی میکند . درصورتی که برنامه نویس مایل باشد بصورت دستی فایل های کلاس را معرفی کند باید فایل ها را در کلید `files` معرفی کند.


میتوانید PhpParser را از لینک زیر کلون کنید :
```bash
git clone https://github.com/yeganemehr/PhpParser.git
```

نمونه-1 فایل
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

**نمونه-2 :** معرفی دستی فایل های کلاس دایرکتوری controllers
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


## ظاهر
همچنین قالب های ظاهری در همین فایل و باذکر آدرس پوشه های مربوط در کلید "frontend" انجام میگیرد.

نمونه-3 فایل
```json
{
	"permissions": "*",
	"frontend": ["frontend"],
}
```

نمونه-4 فایل
```json
{
	"permissions": "*",
	"frontend": ["frontend", "blog-frontend", "panel-frontend"],
}
```

## زبان های ترجمه
##### برای اطلاعات بیشتر به صفحه ی [مترجم](translator.md) مراجعه کنید
معرفی فایل ترجمه نیز درهمین فایل و با ذکر کد زبان و آدرس فایل عبارات در کلید "langs" انجام می شود.

نمونه-5 فایل
```json
{
	"permissions": "*",
	"languages": {
		"fa_IR": "langs/fa_IR.json"
	}
}
```

## رویداد ها
برای ثبت شنونده های رویداد ها نام آن رویداد و شنونده متناظر را در کلید "events" ذخیره کنید.

نمونه-6 فایل
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

## وابستگی
پکیج هایی که در پکیجتان استفاده کرده اید را باید تحت کلید dependencies در این فایل معرفی کنید .
با معرفی پکیج های وابسته، فرم-ورک به صورت خودکار ابتدا پکیج های وابسته را بارگذاری میکند و در صورت نبود یکی از پکیج ها با پرتاب استثنایی در ادامه روند جلوگیری میکند.

نمونه-7 فایل
```json
{
	"permissions": "*",
	"dependencies": ["base"],
}
```

## فایل Bootstrap
در فرمورک کلیدی تحت عنوان bootstrap تعریف شده است. در این کلید آدرس فایل php را معرفی میکنید و فرمورک بعد از بارگذاری پکیج و قبل از پیدا کردن آدرس‌ها و کنترلرها این فایل را فراخوانی و اجرا میکند.
از این فایل برای انجام عمیاتی مانند بررسی ‌‌‌IP کاربر که قبل از اجرای برنامه باید چک شود استفاده می‌شود.

```json
"bootstrap": "bootup/checkAccess.php"
```

**نمونه کامل فایل تنظیمات پکیج**
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
**نمونه فایل bootstrap**
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
