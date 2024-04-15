# مسیریابی
مسیریابی http در این فریمورک به این معناست که فریمورک بعد از دریافت درخواست مرورگر برای بازکردن یک آدرس خاص آن را به کنترلری تحویل دهد.
فریمورک این کار را براساس قوانین موجود در پکیج ها انجام میدهد.این قوانین از طریق معرفی آدرس، دامنه، پروتکل و شیوه ارسال (method) معرفی میشوند.

## آدرس
آدرس یا Path یکی متداول ترین قاعده های مسیریابی محسوب میشود.در جالنو شما توانایی تعریف سه نوع آدرس دارید.

### آدرس های ایستا
این آدرس ها ثابت هستند و قرار نیست تا با تغییر در اطلاعات آدرس تغییر کنند.

مثال
```json
[
	{
		"path": ["panel", "news", "posts"],
		"controller": "controllers\\panel\\News@posts",
		"method": "get"
	}
]
```

### آدرس های پویا
آدرس های پویا عموما از ترکیب قسمت ثابت به عنوان پیشوند یا پسوند و قسمت های پویا تشکیل شده اند.این نوع آدرس ها جایگزین بسیار مناسبی برای URL Parameters هستند و در نهایت افزایش محبوبیت کاربران را برای درک، حفظ و اشتراک آدرس ها به ارمغان خواهند آورد.
هر قسمت پویا در آدرس یک نام برای شناسایی و استفاده مجدد در کنترلر خواهد داشت

مثال
```json
[
	{
		"path": ["news", "view", {"type":"dynamic", "name":"post", "regex":"/^\\d+$/"}],
		"controller": "controllers\\News@view",
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

### آدرس های چندتایی
آدرس های چندتایی نوعی از تکرار نامشخص قسمت های پویا است و زمانی کاربرد که شما تعداد ورودی های پویا را نمیدانید.

مثال
```json
[
	{
		"path": ["files", "download", {"type":"wildcard","name":"path"}],
		"controller": "controllers\\Files@download",
		"method": "get"
	}
]
```

## دامنه
برخلاف آدرس تنظیم قاعده ی دامنه برای قانون های مسیر یابی اجباری و در اکثر موارد حتی لازم نیست.شما با این قاعده میتوانید مشخص کنید اگر وب سایت پروژه دارای بیشتر از یک دامنه بود این قانون انحصارا بر روی کدام دامنه یا دامنه ها اعمال شود و درصورتی که تنظیم نشود این قانون برای همه دامنه ها فعال خواهد شد.

مثال
```json
[
	{
		"path": ["news", {"type":"dynamic", "name":"post", "regex":"/^\\d+$/"}],
		"controller": "controllers\\News@view",
		"method": "get",
		"absolute": true,
		"domain":"news.yourdomain.com"
	}
]
```

## پروتکل
تنظیم پروتکل در قانون ها اجباری نیست اما اگر مایلید یک قانون فقط بر روی یک پروتکل خاص اعمال شود یکی از دوعبارت "http" یا "https" را بروی "scheme" بنویسید و درغیر اصنروت آن قانون بر روی هر دو پروتکل فعال خواهد بود.

مثال
```json
[
	{
		"path": ["panel"],
		"controller": "controllers\\Panel@dashboard",
		"method":"get",
		"scheme": "https"
	}
]
```

## شیوه ارسال
تنظیم محدودیت یک قانون با توجه به نحوه ارسال آن (Method) با معرفی یک عبارت "GET" یا "POST" در مقابل کلید "method" انجام میشود.

مثال 1
```json
[
	{
		"path": ["panel", "news", "posts", "add"],
		"controller": "controllers\\panel\\News@add",
		"method": ["get","post"]
	}
]
```

مثال 2
```json
[
	{
		"path": ["panel", "news", "posts", "add"],
		"controller": "controllers\\panel\\News@add",
		"method": "get"
	},
	{
		"path": ["panel", "news", "posts", "add"],
		"controller": "controllers\\panel\\News@store",
		"method": "post"
	}
]
```

