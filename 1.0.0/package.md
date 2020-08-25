# ساختار بسته ها
هر بسته یک پوشه در packages است که حاوی یک فایل به نام package.json است.نام پکیج باید لاتین بوده و اولین کارکتر آن لازم است تا یکی از 
حروف الفبا انگلیسی باشد.همینطور امکان استفاده از underline در طول نام بسته نیز وجود دارد.
اگر بسته تمایل به دریافت درخواست های http داشته باشد باید یک فایل مسیریابی معرفی کند و آدرس آن فایل میبایست در فایل package.json ذکر 
شود.

## بارگذاری خودکار
##### برای اطلاعات بیشتر به صفحه ی [بارگذاری خودکار](autoloader.md) مراجعه کنید
همینطور اگر بسته نیاز به استفاده از قابلیت بارگذاری خودکار (Autoload) داشته باشد میبایست آدرس فایل راهنما را در همین فایل و تحت عنوان کلید 
"autoload" معرفی کند.

نمونه-۱ فایل
```json
{
	"permissions": "*",
	"autoload": "autoloader.json"
}
```

## ظاهر
همچنین قالب های ظاهری در همین فایل و باذکر آدرس پوشه های مربوط در کلید "frontend" انجام میگیرد.

نمونه-2 فایل
```json
{
	"permissions": "*",
	"frontend": ["frontend"],
}
```

نمونه-3 فایل
```json
{
	"permissions": "*",
	"frontend": ["frontend", "blog-frontend", "panel-frontend"],
}
```

## زبان های ترجمه
##### برای اطلاعات بیشتر به صفحه ی [مترجم](translator.md) مراجعه کنید
معرفی فایل ترجمه نیز درهمین فایل و با ذکر کد زبان و آدرس فایل عبارات در کلید "langs" انجام می شود.

نمونه-4 فایل
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

نمونه-5 فایل
```json
{
	"permissions": "*",
	"events": [
		{
			"name":"\\packages\\base\\view\\events\\afterLoad",
			"listener": "listeners\\Stats@watch"
		}
	]
}
```

## وابستگی
پکیج هایی که در پکیجتان استفاده کرده اید را باید تحت کلید dependencies در این فایل معرفی کنید .
با معرفی پکیج های وابسته، فرم-ورک به صورت خودکار ابتدا پکیج های وابسته را بارگذاری میکند و در صورت نبود یکی از پکیج ها با پرتاب استثنایی در ادامه روند جلوگیری میکند.

نمونه-6 فایل
```json
{
	"permissions": "*",
	"dependencies": ["base"],
}
```

نمونه کامل فایل
```json
{
	"permissions": "*",
	"routing": "routing.json",
	"frontend": ["frontend"],
	"autoload": "autoloader.json",
	"dependencies": ["base"],
	"languages": {
		"fa_IR": "langs/fa_IR.json"
	},
	"events": [
		{
			"name":"\\packages\\base\\view\\events\\afterLoad",
			"listener": "listeners\\Stats@watch"
		}
	]
}
```

