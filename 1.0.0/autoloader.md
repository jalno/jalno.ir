# بارگذارنده خودکار
همانطور که میدانید در php لازم است تا برنامه نویس برای استفاده از توابع و کلاس هایی که در فایل دیگری ذخیره شده اند آن هارا include کند و این کار علاوه بر خسته کننده بودن مشکلاتی نیز بوجود خواهد آورد. بنابراین فریمورک این قابلیت را ایجاد نموده تا برنامه نویس فارغ از دغدغه فرخوانی فایل های مورد نیاز صرفا بر روی خودِ برنامه تمرکز کند.   
یک بارگذارنده ی خودکار برای قسمت backend در پوشه ی اصلی و دیگری در هر قالب در قسمت ظاهری برنامه تعریف می شوند. فایل بارگذارنده ی خودکار در پوشه ی اصلی در فایل `package.json` و فایل بارگذارنده ی خودکار هر قالب در فایل معرف قالب، `theme.json`  در کلیدی با عنوان `autoload` تعریف خواهد شد .   

در فایل autoloader.json باید مشخصات (نام کلاس و آدرس فایل) تمامی کلاس های مورد استفاده در پکیج، در فایل معرفی شود که موجب اتلاف وقت میشود برای جلوگیری از اتلاف وقت باید از پکیج `PhpParser` استفاده کنید. پکیج `PhpParser` موجب ساده سازی روند تولید و ایجاد یک نقشه از کلاس های پکیج میشود و دیگر لازم به ایجاد فایل autoloader.json نیست تنها کافیست در فایل package.json نام پوشه پدر کلاس ها را تحت عنوان کلید `directories` در کلید autoload معرفی کنید.


میتوانید PhpParser را از لینک زیر کلون کنید :
```bash
git clone https://github.com/yeganemehr/PhpParser.git
```

### ساختار پکیج ها در جالنو
زمانی که آخرین نسخه جالنو را دانلود و یا مخرن آن را کلون میکنید; پکیج base در دایرکتوری packages قرار داده شده است .
سایر پکیج های مورد نیاز در پروژه مانند PhpParser , پکیج سورس کد ها پروژه و ... نیز باید در دایرکتوری packages قرار گیرند.


نمونه فایل package.json
```json
{
    "permissions": "*",
	"autoload": {
		"directories": ["controllers", "Models", "listeners", "users"]
	}
}
```

نمونه فایل theme.json
```json
{
    "name": "frontname",
    "title": "Site Frontend",
    "version": "1.0.0",
	"autoload": {
        "directories": ["views", "libraries"]
    }
}
```


نمونه فایل autoloader.json (نیاز به ایجاد این فایل نیست)
```json
{
    "files":[
        {
            "classes":["controllers/Main"],
            "file":"controllers/Main.php"
        },
        {
            "classes":["views/homePage"],
            "file":"views/homePage.php"
        },
        {
            "classes":["views/notfound"],
            "file":"views/notfound.php"
        },
        {
            "classes":["controllers/News"],
            "file":"controllers/News.php"
        },
        {
            "classes":["views/news/show"],
            "file":"views/news/show.php"
        }
    ]
}
```
