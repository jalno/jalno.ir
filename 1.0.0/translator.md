#مترجم
  با استفاده از  کلاس `packages\base\translator` که متد های آن  برای راحتی استفاده به صورت ایستا و `static` نوشته است  بدون تکرار کد ها، میتوانید نوشته های درون وبسایت را به صورت چندزبانه در آورید .برای این منظور نوشته های سایت  در درون فایل های دیگری با فرم `json`  نوشته میشوند.  با استفاده از کلاس `translator` میتوان نوشته های فایل های ذخیره-نوشته را به صورت چند باره در میان کد ها استفاده کرد .  با استفاده از کد زبان و یا کد کشور در آدرس ( به صورت جزعی از آدرس و یا به صورت یک پارامتر در آدرس) فریم ورک به صورت خودکار فایل ذخیره-نوشته متناظر با آن زبان و یا کشور را بارگزاری خواهد کرد . همچنین در تولید آدرس در صورتیکه از متد `base\url` استفاده کنید، این متد به صورت خودکار زبان پیشفرض را در آدرس ها قرار میدهد .

نمونه یک فایل ذخیره-نوشته
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
##معرفی فایل های ذخیره-نوشته
فایل ذخیره-نوشته باید برای استفاده به فرم ورک معرفی شده و مشخص شوند هر فایل برای کدام کد زبان خواهد بود .
در صورتی که فایل ذخیره نوشته در رابط کاربری `frontent` استفاده شود ، معرفی  در فایل `theme.json` و در غیر اینصورت در فایل `package.json`  انجام خواهد شد .

نمونه فایل package.json
```json
{
	"permissions": "*",
	"languages": {
		"fa_IR": "langs/fa_IR.json"
	}
}
```

نمونه فایل theme.json
```json
{
    "name": "frontname",
    "title": "Site Frontend",
	"version": "1.0.0",
	"languages": {
		"fa_IR": "langs/fa_IR.json"
	}
}
```

نمونه معرفی فایل ذخیره-نوشته
```json
"languages": {
	"fa_IR" : "langs/fa_IR.json"
}
```
و در صورتی که بیش از یک زبان داشته باشید 
```json
"languages": {
	"fa_IR" : "langs/fa_IR.json",
	"en_US" : "langs/en_US.json"
}
```

##کد زبان های مجاز
در کلاس `translator` کد زبان های مجاز به صورت دو حرفی از  قبل در متغیر ایستایی به نام `allowlangs` ذخیره شده است .

	translator::$allowlangs;

##کد کشور های مجاز
کد کشور های مجاز در قالب یک آرایه به صورت دوحرفی در متغیری با نام `countries` ذخیره شده است .

	translator::$countries;

##تغییر زبان
در صورتیکه بخواهید زبان پیشفرض را تنظیم و یا تغییر دهید میتوانید از متد `setLang` کلاس `translator` استفاده کنید .این متد  در پارامتر خود، کد زبان کامل را دریافت میکند . در صورتیکه کد زبان مشخص شده در کد زبان های مجاز نباشد،با پرتاب استثنایی از جنس `packages\base\translator\InvalidLangCode`  از ادامه روند جلوگیری خواهد کرد .

> کد زبان کامل از کد زبان دو حرفی_کد کشور دو حرفی تشکیل میشود 

**مثال:** 
>en_US , fa_IR


##استفاده از نوشته ها
برای استفاده از نوشته ها در میان کد ها، باید از متد `trans` استفاده کنید . پارامتر اول این متد، نام کلید و در پارامتر دوم آرایه ای از کلید-مقدار ها دریافت میکند .
در صورتیکه پارامتری در نوشته وجود داشته باشد، این متد پارامتر را در کلید آرایه مشخص شده در پارامتر دوم جستجو کرده و مقدار آن را جایگزین فرانویسه در نوشته خواهد کرد .

> پارامتر دوم به ما این امکان را میدهد که متن مورد نظر را به‌صورت داینامیک ایجاد کنیم.

	translator::trans(name, params);

 برای اسان و سریع تر شدن برنامه نویسی تابع `t(name, params)` در namespace اصلی تعریف شده است که دقیقا همان وظیفه ی متد `trans()` را دارد. 

> **توجه :** در صورتی که نام کلید وارد شده در فایل ذخیره - نوشته وجود نداشته باشد مقدار رشته ای خالی بر میگرداند.



فایل ذخیره-نوشته fa_IR.json :
```json
{
	"rtl": true,
    "phrases":{
		"title": "جی سرور",
        "description": "قدرت گرفته از <a href=\"{url}\"> جی سرور </a>" ,
		"month.period": "ماه {period} برای",
    }
}
```

نمونه یک فایل ذخیره-نوشته en_US.json :
```json
{
	"phrases":{
		"title": "Jeyserver",
        "description": "powered by <a href=\"{url}\"> Jeyserver </a>",
		"month.period": "for {period} month",
    }
}
```

مثال 1 : 
( url: test.com/fa )
```php
<?php
use packages\base\translator;
?>

<!DOCTYPE html>
<html>
<head>
	<title><?php echo translator::trans("title"); ?></title>
	/* output 
		 جی‌سرور
	*/
</head>
</html>
```


مثال 2 : 
( url: test.com/en )
```php
<!DOCTYPE html>
<html>
<head>
	<title><?php echo t("title"); ?></title>
	
	/* output 
		Jeyserver
	*/
</head>
</html>
```


مثال 3 :
( url: test.com/en )
```php
<!DOCTYPE html>
<html>
<body>

<?php echo t("month.period", array("period" => 6); ?>

/* output
	for 6 month
*/

</body>
</html>

```


مثال 4 :
( url: test.com/fa )
```php
<?php
use packages\base;
?>

<!DOCTYPE html>
<html>
<body>

<?php echo t("description", array("url" => base\url()); ?>

/* output
	قدرت گرفته از <a href="/"> جی‌سرور </a>
*/

</body>
</html>

```
