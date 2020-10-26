# بارگذارنده خودکار
همانطور که میدانید در php لازم است تا برنامه نویس برای استفاده از توابع و کلاس هایی که در فایل دیگری ذخیره شده اند آن هارا include کند و این کار علاوه بر خسته کننده بودن مشکلاتی نیز بوجود خواهد آورد. بنابراین فریمورک این قابلیت را ایجاد نموده تا برنامه نویس فارغ از دغدغه فرخوانی فایل های مورد نیاز صرفا بر روی خودِ برنامه تمرکز کند.   
یک بارگذارنده ی خودکار برای قسمت backend در پوشه ی اصلی و دیگری در هر قالب در قسمت ظاهری برنامه تعریف می شوند. فایل بارگذارنده ی خودکار در پوشه ی اصلی در فایل `package.json` و فایل بارگذارنده ی خودکار هر قالب در فایل معرف قالب، `theme.json`  در کلیدی با عنوان `autoload` تعریف خواهد شد .   

در فایل autoloader.json باید مشخصات (نام کلاس و آدرس فایل) تمامی کلاس های مورد استفاده در پکیج، تک به تک در فایلی با فرمت json معرفی شود (معرفی کل کلاس ها داخل یک دایرکتوری به صورت یکجا امکان پذیر نیست.) که موجب اتلاف وقت میشود.

 برای جلوگیری از اتلاف وقت باید از پکیج `PhpParser` استفاده کنید. پکیج `PhpParser` موجب ساده سازی روند تولید و ایجاد یک نقشه از کلاس های پکیج میشود و دیگر لازم به ایجاد فایل autoloader.json نیست تنها کافیست در فایل package.json نام پوشه پدر کلاس ها را تحت عنوان کلید `directories` در کلید autoload معرفی کنید.

برای معرفی و بارگزاری توابع توسط فرم ورک در autoloader باید فایل حاوی تابع را در کلید `files` معرفی کنید، همچنین برای اینکه فرم ورک متوجه تابع بودن آن شود نیاز هست تا در معرفی آن از کلید function با مقدار true استفاده شود.

**توجه :** کلید `directories` برای سهولت کار برنامه نویسان در نظر گرفته شده است، که فریمورک بطور خودکار فایل های کلاس دایرکتوری ها را شناسایی میکند . درصورتی که برنامه نویس مایل باشد بصورت دستی فایل های کلاس را معرفی کند باید فایل ها را در کلید `files` معرفی کند.


میتوانید PhpParser را از لینک زیر کلون کنید :
```bash
git clone https://github.com/yeganemehr/PhpParser.git
```

### ساختار پکیج ها در جالنو
زمانی که آخرین نسخه جالنو را دانلود و یا مخرن آن را کلون میکنید; پکیج base در دایرکتوری packages قرار داده شده است .
سایر پکیج های مورد نیاز در پروژه مانند PhpParser , پکیج سورس کد ها پروژه و ... نیز باید در دایرکتوری packages قرار گیرند.

###### برای اطلاعات بیشتر به صفحه [ساختار پکیج ها](package.md) مراجعه کنید.

نمونه فایل package.json 
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

معرفی دستی فایل های کلاس دایرکتوری controllers
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
