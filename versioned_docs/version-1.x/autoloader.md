# بارگذارنده خودکار
همانطور که میدانید در php لازم است تا برنامه نویس برای استفاده از توابع و کلاس هایی که در فایل دیگری ذخیره شده اند آن هارا include کند و این کار علاوه بر خسته کننده بودن مشکلاتی نیز بوجود خواهد آورد. بنابراین فریمورک این قابلیت را ایجاد نموده تا برنامه نویس فارغ از دغدغه فرخوانی فایل های مورد نیاز صرفا بر روی خودِ برنامه تمرکز کند.   
یک بارگذارنده ی خودکار برای قسمت backend در پوشه ی اصلی و دیگری در هر قالب در قسمت ظاهری برنامه تعریف می شوند. فایل بارگذارنده ی خودکار در پوشه ی اصلی در فایل `package.json` و فایل بارگذارنده ی خودکار هر قالب در فایل معرف قالب، `theme.json`  در کلیدی با عنوان `autoload` تعریف خواهد شد .   
نمونه فایل package.json
```json
{
    "permissions": "*",
	"autoload": "autoloader.json"
}
```

نمونه فایل theme.json
```json
{
    "name": "frontname",
    "title": "Site Frontend",
    "version": "1.0.0",
	"autoload": "autoloader.json"
}
```

شما برای استفاده از قابلیت یک فایل با ساختار json ایجاد کرده و آدرس فایل  و کلاس های موجود در آن معرفی میکنید.

مثال
```json
{
    "files":[
        {
            "classes":["controllers\\Main"],
            "file":"controllers/Main.php"
        },
        {
            "classes":["views\\homePage"],
            "file":"views/homePage.php"
        },
        {
            "classes":["views\\notfound"],
            "file":"views/notfound.php"
        },
        {
            "classes":["controllers\\News"],
            "file":"controllers/News.php"
        },
        {
            "classes":["views\\news\\show"],
            "file":"views/news/show.php"
        }
    ]
}
```
