# مسیریابی
مسیریابی http در این فریمورک به این معناست که فریمورک بعد از دریافت درخواست مرورگر برای بازکردن یک آدرس خاص آن را به کنترلری تحویل دهد.
فریمورک این کار را براساس قوانین موجود در پکیج ها انجام میدهد.این قوانین از طریق معرفی آدرس، دامنه، پروتکل و شیوه ارسال (method) معرفی میشوند.

## تنظیمات 
برای انجام تنظیمات مسیریابی باید به فایل
`config.php` که در مسیر `packages/base/libraries/config` قرار دارد مراجعه نمایید.

اگر میخواهید آدرس های تعریف شده با پسوند `www` نیز قابل دسترس باشند باید آپشن `packages.base.router.defaultDomain` تنظیم شود .

```php
'packages.base.router.defaultDomain' => ['www.domain.com', 'domain.com']
```

برای تنظیم پروتکل ازآپشن `packages.base.routing.scheme` استفاده میشود.

```php
'packages.base.routing.scheme' => 'http' // https
```

اضافه کردن اسلش به انتهای آدرس
```php
'packages.base.routing.lastslash' => true //false
```

برای وجود پسوند `www` در کنار دامنه از آپشن `packages.base.routing.www` استفاده میشود.
اگر آپشن مقدار `withwww` داشته باشد اگر domain.com را جستجو کنیم www. به ابتدای آن اضافه میشود
درصورتی که مقدار `nowww` داشته باشد اگر آدرس www.domain.com را جستجو کنیم www. از ابتدای آدرس حذف خواهد شد.
```php
'packages.base.routing.www' => 'nowww' // withwww
```

## آدرس
آدرس یا Path یکی متداول ترین قاعده های مسیریابی محسوب میشود.در جالنو شما توانایی تعریف سه نوع آدرس دارید.

در جالنو برای هر آدرس میتوان مشخصه های زیر را تعیین کرد.

| مشخصه            |                                      کاربرد                          |
|---------------------------------------------|-------------------------------------------|
| path                                        |              آدرس                         |
| controller                                  |          متد مربوطه در کنترلر             |
| method                                      |           شیوه ارسال                      |
| domain                                      |                   دامنه                   |
| absolute                                    |         تعیین اضافه شدن زبان به آدرس      |
| scheme                                      |                     پروتکل                |
| middleware                                  |   مدیریت آدرس قبل از کنترلر               |
| exceptions                                  |                    مدیریت خطاها           |
| name                                        |               مشخص کردن اسم برای هر آدرس  |
| permissions                                 |               مجوز دسترسی                 |


## آدرس های ایستا
این آدرس ها ثابت هستند و قرار نیست تا با تغییر در اطلاعات آدرس تغییر کنند.

مثال
```json
[
	{
		"path": "panel/news/posts",
		"controller": "controllers/panel/News@posts",
		"method": "get"
	}
]
```

میتوانید از مدل قدیم زیر نیز بهره ببرید
```json
[
    {
        "path": ["panel", "news", "posts"],
        "controller": "controllers/panel/News@posts",
        "method": "get"
    }
]
```

## آدرس های پویا
آدرس های پویا عموما از ترکیب قسمت ثابت به عنوان پیشوند یا پسوند و قسمت های پویا تشکیل شده اند.این نوع آدرس ها جایگزین بسیار مناسبی برای URL Parameters هستند و در نهایت افزایش محبوبیت کاربران را برای درک، حفظ و اشتراک آدرس ها به ارمغان خواهند آورد.
هر قسمت پویا در آدرس یک نام برای شناسایی و استفاده مجدد در کنترلر خواهد داشت

**regex :**  در آدرس های پویا که بخشی از آدرس متغیر است برای مدیریت آن میتوانیم از مشخصه **regex** استفاده کنیم. مقدار regex قاعده عبارت پویا آدرس را مشخص میکند.

**توجه :** زمانی که از `regex` استفاده میشود باید از مشخصه `name` برای تعیین نام متغیر پویا استفاده شود.

**مثال 1**
```json
[
	{
		"path": "news/view/:post",
		"controller": "controllers/News@view",
		"method": "get"
	}
]
```

حال اکنون اگر کاربری آدرس `news/view/10` را باز کند فریمورک درخواست را به کنترلر posts واگذار کرده و در هنگام فراخوانی متد view یک آرایه را در اولین ورودی متد با محتوای ‍`["post"=>10"]` ارسال میکند تا برنامه نویس برای مراحل بعد از آن استفاده کند.

```php
<?php
namespace packages\packagename\controllers;
use \packages\base;
use \packages\base\{response, NotFound};
use \packages\packagename\{controller, view, views, news as newsObject};

class News extends controller {
	public function view($data): response {
		$news = new newsObject();
		$news->where("status", 1);
		$news->where("id", $data["post"]);
		if (!$news = $news->getOne()) {
			throw new NotFound();
		}
		$response = new response();
		$view = view::byName(views\news\view::class);
		$view->setNews($news);
		$response->setView($view);
		$response->setStatus(true);
		return $response;
	}
}
```


**مثال 2 :**آدرس با عبارت پویا با‌قاعده
```json
[
	{
		"path": ["userpanel/logs/view/", {"name":"log", "regex":"/^\\d+$/"}],
		"controller": "controllers/Logs@view",
		"method": "get"
	}
]
```
در مثال فوق بخش پویا آدرس باید فقط عدد صحیح باشد.


**مثال 3 :** آدرس با دو متغیر پویا
```json
[
	{
		"path": "surah/:surah/:ayeh",
		"controller": "controllers/Homepage@ayah",
		"method":"get",
	}
]
```
در مثال فوق زمانی که کاربر آدرس `surah/80/11` را باز کند در کنترلر آرایه `["surah" => 80, "ayeh" => 11]` دریافت میشود.

**مثال 4**
```json
[
	{
		"path": ["surah", {"name":"surah", "regex":"/^\\d+$/"}, {"name":"ayah", "regex":"/^\\d+$/"}],
		"controller": "controllers/Homepage@ayah",
		"method":"get"
	}
]
```
همچنین میتوانید از مدل قدیم نیز بهره ببرید

در روش قدیم برای آدرس پویا باید مشخصه `type` با مقدار `dynamic` تعریف کنید.

**مثال**
```json
[
    {
        "path": ["news", "view", {"type":"dynamic", "name":"post", "regex":"/^\\d+$/"}],
        "controller": "controllers/News@view",
        "method": "get"
    }
]
```

## آدرس های چندتایی
آدرس های چندتایی نوعی از تکرار نامشخص قسمت های پویا است و زمانی کاربرد که شما تعداد ورودی های پویا را نمیدانید.

مثال
```json
[
	{
		"path": "files/download/:path...",
		"controller": "controllers/Files@download",
		"method": "get"
	}
]
```
در مثال فوق هر تعداد عبارت پویا وارد شود مورد قبول است . 
اگر آدرس `files/download/images/summer/5` وارد شود مقدار `["path" => "images/summer/5"]` به کنترلر ارسال میشود.


همچنین میتوانید از روش قدیمی نیز بهره ببرید.
در روش قدیم برای آدرس های چندتایی باید مشخصه `type` با مقدار `wildcard` را تعریف کرد. 

**مثال**
```json
[
	{
		"path": ["files", "download", {"type":"wildcard","name":"path"}],
		"controller": "controllers/Files@download",
		"method": "get"
	}
]
```

## دامنه
برخلاف آدرس تنظیم قاعده ی دامنه برای قانون های مسیر یابی اجباری و در اکثر موارد حتی لازم نیست.شما با این قاعده میتوانید مشخص کنید اگر وب سایت پروژه دارای بیشتر از یک دامنه بود این قانون انحصارا بر روی کدام دامنه یا دامنه ها اعمال شود و درصورتی که تنظیم نشود این قانون برای همه دامنه ها فعال خواهد شد.

**نکته :** درصورتی که بخواهیم ساب دامین با مقادیر متغیر داشته باشیم میتوانیم در نام دامنه از عبارات با‌قاعده استفاده کنیم.

**مثال 1**
```json
[
	{
		"path": ["news", {"name":"post", "regex":"/^\\d+$/"}],
		"controller": "controllers/News@view",
		"method": "get",
		"absolute": true,
		"domain":"news.yourdomain.com"
	}
]
```

**مثال 2** ساب دامین های متغیر
```json
[
	{
		"path": "product-list/:id",
		"controller": "controllers/Pages@productList",
		"domain": "/^([a-z0-9\\-]+)\\.domain\\.com$/"
	}
]
```

**مثال 3 :** تعریف چند دامنه 
```json
[
	{
		"path": ["news", {"name":"post", "regex":"/^\\d+$/"}],
		"controller": "controllers/News@view",
		"method": "get",
		"absolute": true,
		"domain":["news.yourdomain.com", "yourdomain.com"]
	}
]
```

## پروتکل
تنظیم پروتکل در قانون ها اجباری نیست اما اگر مایلید یک قانون فقط بر روی یک پروتکل خاص اعمال شود یکی از دوعبارت "http" یا "https" را بروی "scheme" بنویسید و درغیر اصنروت آن قانون بر روی هر دو پروتکل فعال خواهد بود.

مثال
```json
[
	{
		"path": "panel",
		"controller": "controllers/Panel@dashboard",
		"method":"get",
		"scheme": "https"
	}
]
```

## شیوه ارسال
تنظیم محدودیت یک قانون با توجه به نحوه ارسال آن (Method) با معرفی یک عبارت "GET" یا "POST" در مقابل کلید "method" انجام میشود.

**مثال 1**
```json
[
	{
		"path": "panel/news/posts/add",
		"controller": "controllers/panel/News@add",
		"method": ["get","post"]
	}
]
```

**مثال 2**
```json
[
	{
		"path": "panel/news/posts/add",
		"controller": "controllers/panel/News@add",
		"method": "get"
	},
	{
		"path": "panel/news/posts/add",
		"controller": "controllers/panel/News@store",
		"method": "post"
	}
]
```

## exceptions
برای مدیریت exception ها میتوان از مشخصه exceptions استفاده کرد. 
با استفاده از این مشخصه زمانی که برنامه با exception برخورد میکند بجای نمایش خطا کاربر به صفحه طراحی شده برای مدیریت آن exception فرستاده میشود.

برای این مشخصه میتوان چند اکسپشن تعریف کرد.

**توجه :** مشخصه pathsدر این قسمت تعیین کننده ی ابتدای آدرس میباشد. برای این مشخصه میتوان چندین مقدار تعریف کرد

درمثال زیر اگر در برنامه به اکسپشن NotFound برخورد کنیم تنها زمانی handler اجرا میشود که ابتدای آدرس با `userpanel` اغاز شده باشد. مانند آدرس `userpanel/users/view`

**مثال 1**
```json
[
	{
		"paths": [
			"userpanel/"
		],
		"exceptions":[
			"/packages/base/NotFound"
		],
		"handler": "controllers/dashboard@notfound"
	}
]
```

**مثال 2**
```json
[
	{
		"paths": [
			"userpanel/", "/news"
		],
		"exceptions":[
			"/packages/base/NotFound",
			"/packages/base/NoViewException"
		],
		"handler": "controllers/dashboard@notfound"
	}
]
```
در مثال فوق تمامی آدرس هایی که با userpanel , news شروع شوند و با اکسپشن های NotFound و یا NoViewException برخورد کنند به کنترلر تعریف شده در handler فرستاده میشوند.


## middleware
مشخصه middleware قبل از کنترلر اجرا میشود .
زمانی که این مشخصه تعریف شود ابتدا middleware صدا زده میشود سپس پردازش مورد نظر انجام شده و به کنترلر فرستاده میشود .

میتوان برای هر آدرس چند middleware تعریف کرد. 

همچنین میتوان از middleware های تعریف شده در سایر پکیج ها نیز استفاده کرد.

کاربرد middleware زمانی است پردازش های مشابهی را در چند کنترلر داشته باشیم; برای جلوگیری از تکرار کد ها از middleware استفاده میکنیم.



**مثال 1**
```json
[
	{
		"path": "panel/news/posts/add",
		"controller": "controllers/panel/News@add",
		"method": ["get","post"],
		"middleware": "middlewares/CheckAcsess@localIP"
	}
]
```

**2 مثال**
```json
[
	{
		"path": "panel/news/posts/add",
		"controller": "controllers/panel/News@add",
		"method": ["get","post"],
		"middleware": [
            "middlewares/CheckAcsess@localIP",
            "packages/another_package/middlewares/APIChecker@apikey" 
        ]
	}
]
```
در مثال فوق به ترتیب localIP , apikey اجرا میشوند.


**نمونه فایل middleware**
```php
namespace packages\my_package\middlewares;

use packages\base\{Http, NotFound};

class CheckAcsess {
	public function localIP() {

		if (http::$client['ip'] != '127.0.0.1') {
			throw new NotFound();
		}else {
			echo http::$client['ip'];
		}
	}
}
```

## absolute 
مشخصه ی absolute تعیین میکند به آدرس زبان اضافه شود یا خیر; مقدار boolean دریافت میکند .
مقدار پیشفرض absolute false است.

**false :** درصورتی که به absolute مقدار false داده شود زبان به آدرس اضافه میشود.
بطور مثال اگر آدرس userpanel/test داشته باشیم به آدرس fa/userpanel/test تبدیل میشود .

**true :** اگر به absolute مقدار true داده شود آدرس همان صورتی که بود باقی میماند. از true زمانی استفاده میشود که زبان در آن صفحه اهمیتی نداشته باشد مانند صفحه **api**.

**مثال**
```json
[
	{
		"path": ["news", {"name":"post", "regex":"/^\\d+$/"}],
		"controller": "controllers/News@view",
		"method": "get",
		"absolute": true
	}
]
```

## permissions
مشخصه permissions امکان دسترسی به صفحه مورد نظر را از طریق `api` و `ajax` مشخص میکند.
مقادیر آن میتواند `true` , `false` ویا متدی باشد که برای بررسی دسترسی به صفحه تعریف شده است.

**مثال 1**
```json
[
	{
		"path": "news",
		"controller": "controllers/News@view",
		"method": "get",
		"absolute": true,
		"permissions": {
			"api": true
		}
	}
]
```

**مثال 2** بررسی دسترسی از طریق متد
```json
[
	{
		"path": ["surah", {"name":"surah", "regex":"/^\\d+$/"}],
		"controller": "controllers/Homepage@surah",
		"method":"get",
		"permissions":{
			"ajax": "controllers/Auth@apiCheck",
			"api": "controllers/Auth@apiCheck"
		}
	}
]
```
**نمونه متد permissions**
```php
public function apiCheck() {
	if (!isset(http::$data['app']) or empty(http::$data['app']) ) {
		return false;
	}
	self::$app = App::where("token", http::$data['app'])->getOne();
	return !empty(self::$app);
}

```


