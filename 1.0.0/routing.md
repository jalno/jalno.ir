# مسیریابی

مسیریابی http در این فریمورک به این معناست که فریمورک بعد از دریافت درخواست مرورگر برای بازکردن یک آدرس خاص آن را به کنترلری تحویل دهد.
فریمورک این کار را براساس قوانین موجود در پکیج ها انجام میدهد.این قوانین از طریق معرفی آدرس، دامنه، پروتکل و شیوه ارسال (method) معرفی میشوند.

## تنظیمات

برای انجام تنظیمات مسیریابی باید به فایل
`config.php` که در مسیر `packages/base/libraries/config` قرار دارد مراجعه نمایید.

### تنظیم دامنه
زمانی که سایت بجر دامنه اصلی دارای زیر دامنه هایی نیز باشد باید دامنه و تمامی زیر دامنه ها در آپشن `packages.base.router.defaultDomain` معرفی شوند.

```php
'packages.base.router.defaultDomain' => ['panel.domain.com', 'domain.com']
```

### تنظیم پروتکل

برای تنظیم پروتکل ازآپشن `packages.base.routing.scheme` استفاده میشود. پرتوکل روی هر آپشنی تنظیم شود فریمورک هنگام بازشدن سایت به‌طور خودکار روی آپشن تنظیم شده ریدایرکت می‌شود.
بطور مثال اگر سایت گواهینامه دارد و این آپشن با مقدارhttps تنظیم شود; اگر سایت در حالت http باشد، به صورت خودکار به https ریدایرکت می‌شود.

```php
'packages.base.routing.scheme' => 'http' // https
```

### اضافه کردن اسلش به انتهای آدرس

اگر آپشن `packages.base.routing.lastslash` برابر true باشد زمانی که ادرس url باز میشود به انتهای آدرس اسلش اضافه میشود.
(تنظیم این آپشن مطابق با سلیقه برنامه نویس می‌باشد.)

```php
'packages.base.routing.lastslash' => true //false
```

**مثال 1**
```php
'packages.base.routing.lastslash' => true
/*
	url: domain.com/fa/contact-us/
*/
```

**مثال 2**
```php
'packages.base.routing.lastslash' => false
/*
	url: domain.com/fa/contact-us
*/
```

### تنظیم پسوند www

برای وجود پسوند `www` در کنار دامنه از آپشن `packages.base.routing.www` استفاده میشود.
اگر آپشن مقدار `withwww` داشته باشد اگر domain.com را وارد کنیم www. به ابتدای آن اضافه میشود
درصورتی که مقدار `nowww` داشته باشد اگر آدرس www.domain.com را وارد کنیم www. از ابتدای آدرس حذف خواهد شد.

**توجه :** آپشن در هر حالتی تنظیم شود اگر سایت در حالت دیگر باز شود، فریمورک بطور خودکار به حالت تنظیم شده ریدایرکت می‌شود.
بطور مثال اگر آپشن مقدار `withwww` داشته باشد و آدرس به صورت domain.com وارد شود، فریمورک به آدرس www.domain.com ریدایرکت می‌شود.

```php
'packages.base.routing.www' => 'nowww' // withwww
```

## آدرس

آدرس یا Path یکی متداول ترین قاعده های مسیریابی محسوب میشود.در جالنو شما توانایی تعریف سه نوع آدرس دارید.

در جالنو برای هر آدرس میتوان مشخصه های زیر را تعیین کرد.

| مشخصه       | کاربرد                       |
| ----------- | ---------------------------- |
| path        | آدرس                         |
| controller  | متد مربوطه در کنترلر         |
| method      | شیوه ارسال                   |
| domain      | دامنه                        |
| absolute    | تعیین اضافه شدن زبان به آدرس |
| scheme      | پروتکل                       |
| middleware  | مدیریت آدرس قبل از کنترلر    |
| exceptions  | مدیریت خطاها                 |
| name        | مشخص کردن اسم برای هر آدرس   |
| permissions | مجوز دسترسی                  |

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

قسمت پویا آدرس به صورت `:key` در مشخصه `path` معرفی میشود .

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

 اکنون اگر کاربری آدرس `news/view/10` را باز کند فریمورک درخواست را به کنترلر posts واگذار کرده و در هنگام فراخوانی متد view یک آرایه را در اولین ورودی متد با محتوای ‍`["post"=>10"]` ارسال میکند تا برنامه نویس برای مراحل بعد از آن استفاده کند.

**نمونه فایل کنترلر**

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

**مثال 2 :** آدرس با دو متغیر پویا

```json
[
  {
    "path": "surah/:surah/:ayeh",
    "controller": "controllers/Homepage@ayah",
    "method": "get"
  }
]
```

در مثال فوق زمانی که کاربر آدرس `surah/80/11` را باز کند در کنترلر آرایه `["surah" => 80, "ayeh" => 11]` دریافت میشود.

### آدرس با عبارت پویا با‌قاعده

در آدرس های پویا که بخشی از آدرس متغیر است برای مدیریت آن میتوانیم از مشخصه **regex** استفاده کنیم. مقدار regex قاعده عبارت پویا آدرس را مشخص میکند.

**توجه :** زمانی که از `regex` استفاده میشود باید از مشخصه `name` برای تعیین نام متغیر پویا استفاده شود.
همچنین باید مشخصه `type` نیز برابر با `dynamic` (و برای آدرس های چندتایی برابر `wildcard`) تعریف شود.

**مثال 3 :**
```json
[
  {
    "path": [
      "userpanel/logs/view/",
      { "type": "dynamic", "name": "log", "regex": "/^\\d+$/" }
    ],
    "controller": "controllers/Logs@view",
    "method": "get"
  }
]
```
در مثال فوق بخش پویا آدرس باید فقط عدد صحیح باشد.

**مثال 4**
```json
[
  {
    "path": [
      "surah",
      { "type": "dynamic", "name": "surah", "regex": "/^\\d+$/" },
      { "type": "dynamic", "name": "ayah", "regex": "/^\\d+$/" }
    ],
    "controller": "controllers/Homepage@ayah",
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
    "path": ["files", "download", { "type": "wildcard", "name": "path" }],
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
    "path": ["news", { "name": "post", "regex": "/^\\d+$/" }],
    "controller": "controllers/News@view",
    "method": "get",
	"absolute": true,
	"permissions": {
      	"api": true
    },
    "domain": "news.yourdomain.com"
  }
]
```
در مثال فوق چون صفحه مورد نظر برای api استفاده می‌شود و زبان کاربردی ندارد به همین دلیل مقدار absolute برابر true تعریف شده و زبان به آدرس اضافه نمیشود.


**مثال 2** ساب دامین های متغیر
(در مثال زیر دامنه domain.com در نظر گرفته شده است.)
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
    "path": ["news", { "name": "post", "regex": "/^\\d+$/" }],
    "controller": "controllers/News@view",
    "method": "get",
    "absolute": true,
    "domain": ["news.yourdomain.com", "yourdomain.com"]
  }
]
```
**توجه :** در مثال فوق اگر دامنه بصورت `"domain":["news.yourdomain.com"]` تعریف شود و سایت با آدرس yourdomain.com/news/1 جستجو شود، چون دامنه yourdomain.com برای آن تعریف نشده است اکسپشن notFound دریافت میکنیم.

## پروتکل

تنظیم پروتکل در قانون ها اجباری نیست اما اگر مایلید یک قانون فقط بر روی یک پروتکل خاص اعمال شود یکی از دوعبارت "http" یا "https" را بروی "scheme" بنویسید و درغیر اینصورت آن قانون بر روی هر دو پروتکل فعال خواهد بود.

مثال

```json
[
  {
    "path": "panel",
    "controller": "controllers/Panel@dashboard",
    "method": "get",
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
    "method": "get"
  },
  {
    "path": "panel/news/posts/add",
    "controller": "controllers/panel/News@store",
    "method": "post"
  }
]
```

اگر در کنترلر بخواهیم از هر دوشیوه ارسال (post, get) استفاده کنیم بصورت زیر عمل می‌کنیم.

**توجه :** در مثال زیر زمانی که آدرس `panel/news/posts/add` به صورت عادی در مرورگر باز شود، قانون get فعال میشود. و زمانی که فرمی با اکشن post, submit شود، قانون post فعال می‌شود.

**مثال 2**
```json
[
  {
    "path": "panel/news/posts/add",
    "controller": "controllers/panel/News@add",
    "method": ["get", "post"]
  }
]
```

## exceptions

برای مدیریت exception ها میتوان از مشخصه exceptions استفاده کرد.
با استفاده از این مشخصه زمانی که برنامه با exception برخورد میکند بجای نمایش خطا کاربر به صفحه طراحی شده برای مدیریت آن exception فرستاده میشود.

برای این مشخصه میتوان چند استثنا تعریف کرد.

**توجه :** مشخصه pathsدر این قسمت تعیین کننده ی ابتدای آدرس میباشد. برای این مشخصه میتوان چندین مقدار تعریف کرد

درمثال زیر اگر در برنامه به استثنا NotFound برخورد کنیم تنها زمانی handler اجرا میشود که ابتدای آدرس با `userpanel` اغاز شده باشد. مانند آدرس `userpanel/users/view/7`

**مثال 1**

```json
[
  {
    "paths": ["userpanel/"],
    "exceptions": ["/packages/base/NotFound"],
    "handler": "controllers/dashboard@notFound"
  }
]
```

**نمونه کد کنترلر**

```php
use packages\base\NotFound;


$user = User::byId($data['id']);
if(!$user) {
	throw new NotFound;
}
```
طبق مثال فوق اگر آدرس `userpanel/users/view/7` در مرورگر باز شود و کاربری با id برابر 7 وجود نداشته باشد، اکسپشن notFound دریافت می‌کنیم.

**مثال 2**

```json
[
  {
    "paths": ["userpanel/", "/news"],
    "exceptions": ["/packages/base/NotFound", "/packages/base/NoViewException"],
    "handler": "controllers/dashboard@notfound"
  }
]
```

در مثال فوق تمامی آدرس هایی که با userpanel , news شروع شوند و با اکسپشن های NotFound و یا NoViewException برخورد کنند به کنترلر تعریف شده در handler فرستاده میشوند.

## middleware

مشخصه middleware قبل از کنترلر اجرا میشود .
زمانی که این مشخصه تعریف شود ابتدا middleware صدا زده میشود سپس پردازش مورد نظر انجام شده و بعد از آن روند اجرا به کنترلر داده می‌شود.

میتوان برای هر آدرس چند middleware تعریف کرد.

همچنین میتوان از middleware های تعریف شده در سایر پکیج ها نیز استفاده کرد.

کاربرد middleware زمانی است پردازش های مشابهی را در چند کنترلر داشته باشیم; برای جلوگیری از تکرار کد ها از middleware استفاده میکنیم.

**مثال 1**

```json
[
  {
    "path": "panel/news/posts/add",
    "controller": "controllers/panel/News@add",
    "method": ["get", "post"],
    "middleware": "middlewares/CheckAccess@localIP"
  }
]
```

**2 مثال**

```json
[
  {
    "path": "panel/news/posts/add",
    "controller": "controllers/panel/News@add",
    "method": ["get", "post"],
    "middleware": [
      "middlewares/CheckAccess@localIP",
      "packages/another_package/middlewares/APIChecker@apikey"
    ]
  }
]
```

در مثال فوق به ترتیب ابتداlocalIP و سپس apikey فراخوانی میشوند.

**نمونه فایل middleware**

```php
namespace packages\my_package\middlewares;

use packages\base\{Http, NotFound};

class CheckAccess {
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
برای این مشخصه مقدار پیشفرض false است.

درصورتی که به absolute مقدار false داده شود زبان به آدرس اضافه میشود.
بطور مثال اگر آدرس userpanel/test داشته باشیم به آدرس fa/userpanel/test تبدیل میشود .

همچنین اگر به absolute مقدار true داده شود آدرس همان صورتی که بود باقی میماند. از true زمانی استفاده میشود که زبان در آن صفحه اهمیتی نداشته باشد مانند صفحه **api**.

**مثال**

```json
[
  {
    "path": ["news", { "name": "post", "regex": "/^\\d+$/" }],
    "controller": "controllers/News@view",
    "method": "get",
    "absolute": true
  }
]
```

## permissions

مشخصه `permissions` امکان دسترسی به صفحه مورد نظر را از طریق `api` و `ajax` مشخص میکند.
مقادیر آن میتواند `true` یا `false` ویا متدی باشد که برای بررسی دسترسی به صفحه تعریف شده است. (خروجی متد باید true یا false باشد.)

اگر هر یک از موارد (api , ajax) مقدار false داشته باشند آدرس در ان حالت در دسترس نیست. همچنین اگر مقدار true داشته باشند میتوان به آن دسترسی داشت.

بطور مثال اگر مقدار api برابر با false و مقدار ajax برابر با true باشد، آدرس در حالت api در دسترس نیست و در حالت ajax در دسترس می‌باشد.

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
در مثال فوق چون در حالت api مشخصه زبان در آدرس نیاز نبوده است به همین دلیل مشخصه absolute مقدار دهی شده است.

**مثال 2** بررسی دسترسی از طریق متد
```json
[
  {
    "path": ["surah", { "name": "surah", "regex": "/^\\d+$/" }],
    "controller": "controllers/Homepage@surah",
    "method": "get",
    "permissions": {
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

### شخصی سازی پاسخ های ajax , api

اگر permissions آدرس در حالت ajax برابر true باشد زمانی که در انتهای آدرس مقدار `ajax=1` تنظیم شود، (مانند: `domain.com?ajax=1`) داده‌های سایت بصورت `json` پاسخ داده می‌شود.
و اگر برابر با false باشد، مقدار `status: null` دریافت می‌شود.

موارد فوق برای api نیز برقرار میباشد.

> برای اطلاعات بیشتر در رابطه با نحوه ی پاسخ دهی به درخواست های ajax , api به صفحه [پاسخ](response.md) مراجعه کنید.

در کلاس `packages\base\views\listview` متد `export` برای پاسخ به درخواست های api و ajax نوشته شده است.
میتوان برای شخصی سازی داده هایی که در پاسخ ارسال می‌شود، در بخش view پروژه این متد را باز نویسی کرد.

**نمونه متد export**

```php
use packages\base\views\listview;


public function export() {
	$original = parent::export();
	$original['data']['items'] = array_map(function($log) {
		return array(
			'id' => $log->id,
			'name' => $log->name,
			'lastname' => $log->lastname
		);
	}, $this->dataList);
	return $original;
}
```
در مثال فوق بجای تمامی اطلاعات فقط name, lastname, id در پاسخ ارسال می‌شود.

**نمونه تنیجه درخواست**

```json
{
  "status": true,
  "items": [
    { "id": 1, "name": "zahra", "lastname": "mohammadi" },
    { "id": 2, "name": "reza", "lastname": "rezayi" }
  ],
  "items_per_page": 25,
  "current_page": 1,
  "total_items": 2
}
```

اگر متد export() بازنویسی نشده باشد نتیجه بصورت زیر می‌باشد.
```json
{
  "status": true,
  "items": [
    {
      "id": 1,
      "name": "zahra",
      "lastname": "mohammadi",
      "email": "zahra@example.com",
      "cellphone": "09131234567",
      "address": null,
      "web": null,
      "lastonline": 1587798956,
      "status": 1
    },
    {
      "id": 2,
      "name": "reza",
      "lastname": "rezayi",
      "email": "reza@example.com",
      "cellphone": "09137654321",
      "address": null,
      "web": null,
      "lastonline": 1587785947,
      "status": 1
    },
  ],
  "items_per_page": 25,
  "current_page": 1,
  "total_items": 2
}
```
