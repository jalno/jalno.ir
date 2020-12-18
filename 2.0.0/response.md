# پاسخ ها
هنگامی که مسیر یاب یک درخواست http تحویل یک کنترلر می دهد و آن را فراخوانی میکند، از آن انتظار دارد تا پس از انجام پردازش های لازم یک شئ از کلاس `packages\base\Response`  را در نهایت برگرداند .
یک پاسخ می تواند صفحه وب و یا یک فایل و یا داده‌هایی به فرم json یا xml ویا یک متن ساده باشد .

در جالنو برای کاربا پاسخ ها کلاس `packages\base\Response` ایجاد شده است. متد‌های زیر در این کلاس تعریف شده ‌‌اند. برای کار با کلاس Response لازم است شئ از این کلاس ایجاد شود. همچنین میتوانید از متغیر `response` کلاس کنترلر استفاده کنید که شئ از کلاس Response در آن ذخیره شده است.

وضعیت یک پاسخ را میتوانید زمان ایجاد شئ کلاس Response مشخص کنید. 
مقدار وضعیت بطور پیش فرض `false` میباشد.

```php
use packages\base\Response;


$response = new Response(true);
```

| متد    |    کاربرد   | 
|---------------------|---------------------|
| is_ajax()  |  مشخص کننده نوع درخواست‌های ajax  |
| is_api()  |  مشخص کننده نوع درخواست‌های api  |
| setView(view $view)  | تنظیم کلاس ظاهر | 
| getView()  |  شئ از کلاس ظاهر تعیین شده را بر‌میگرداند |
| setFile(File $file) |  تنظیم یک فایل |
| setStatus($status) | تنظیم وضعیت پاسخ  |
| getStatus() |  وضعیت پاسخ را برمیگرداند  |
| setData($data, $key) | تنظیم داده | 
| getData($key) | داده های تنظیم شده را بر‌میگرداند  | 
| json()  | وضعیت پاسخ و داده‌های تنظیم شده را با فرمت json بر‌میگرداند |
| go($url) | انتقال کاربر | 
| rawOutput($output) |  چاپ کردن متن در خروجی |
| setHeader($key, $value) | تنظیم مشخصه‌های header |
| setHttpCode($code) | مشخص کردن کد وضعیت پاسخ | 
| setMimeType($type, $charset = null) |  تنظیم مشخصه های content-type و charset در header |
| forceDownload() | مشخص میکند که فایل تنظیم شده برای دانلود می‌باشد  |

## [صفحات وب](#webpage)
اگر شما یک شئ از کلاس `View` را در اختیار داشته باشید و قصد دارید تا آن را به کاربر نشان دهید، از متد `setView`  کلاس `Response`  استفاده کنید و فریمورک پس از تمام شدن اجرای کنترلر آن را به کاربر نشان خواهد داد . 

**1 مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Response, View};
use themes\themename\views;
class Main extends controller {
    public function index(): Response {
		$view = View::byName(views\Index::class);
		$response = new Response(true);
		$response->setView($view);
		return $response;
    }
 }
```

**2 مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Response, View};
use themes\theme\views;
class Main extends controller {
    public function index(): Response {
		$view = View::byName(views\Index::class);
		$this->response->setStatus(true);
		$this->response->setView($view);
		return $this->response;
    }
 }
```

## [فایل](#file)
پاسخ ها میتوانند از جنس فایل ها باشند و فایل ها میتوانند دانلود شوند (مثل فایل های فشرده، برنامه ها یا ...) و یا میتواند بلافاصله به کاربر نشان داده شوند (مثل تصاویر و یا فایل های صوتی و تصویری) .
برای این منظور میتوانید از متد `setFile` از کلاس `Response` استفاده کنید .

اگر بخواهید فایل تنها امکان دانلود داشته و در مرورگر اجرا نشود (مانند فایل های صوتی و تصویری) باید متد `forceDownload()` از کلاس Response را فراخوانی کنید. با فراخوانی این متد مشخصه content-disposition در header برابر مقدار attachment شده و دیگر فایل در مرورگر اجرا نمیشود.

باید مشخصات فایلی که به کاربر داده میشود تعیین شود این کار با استفاده از متدهای کلاس `packages\base\response\File` انجام میشود.

**1 مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Response, NotFound};
use packages\packagename\Ticket;

class Main extends controller {

	public function getTicketFile($data): Response {
		$file = new Ticket\File();
		$file = $file->byId($data['id']);
		if (!$file) {
			throw new NotFound();
		}
		$response = new Response();
		$responsefile = new Response\File();
		$responsefile->setLocation($file->path);
		$responsefile->setSize($file->size);
		$responsefile->setName($file->name);
		$response->setFile($responsefile);
		return $response;
	}
}
```

**2 مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Response, NotFound, Packages};
use packages\packagename\File as Model;

class Main extends controller {

	public function download($data)
	{
		$file = Model::byId($data['id']);
		if(!$file) {
			throw new NotFound();
		}
		$file = Packages::package('packagename')->getFile($file->path);
		$responsefile = new response\File();
		$responsefile->setLocation($file->getPath());
		$responsefile->setSize($file->size());
		$this->response->forceDownload();
		$this->response->setFile($responsefile);
		return $response;
	}
}
```

## [پاسخ به درخواست های Ajax و API](#api_ajax)
اگر شما از سمت مرورگر درخواستی ارسال میکنید و نیاز دارید تا سرور اطلاعات لازم را به فرم `JSON` و یا `XML` برگرداند، شما باید از متد `setData($data, $key)`  کلاس `Response` استفاده کنید .

این تابع در پارامتر اول **مقدار آیتم** که از هرنوع داده‌ای میتواند باشد و در پارامتر دوم( که حتما میبایست از جنس رشته باشد) **کلید** آن مقدار را دریافت میکند .

فریمورک زمانی که در `URL Parameter` مقدار `ajax=1` و یا `api=1` را دریافت کند، این مقادیر را به مرورگر ارسال میکند .

با فراخوانی متد `getData` میتوانید به داده‌های تنظیم شده دسترسی داشته باشید. پارامتر ورودی این متد کلید داده‌ میباشد. اگر به متد getData پارامتری ارسال نشود آرایه‌ای از داده‌های تنظیم شده برمیگرداند.


**1 مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Response, Http};
use packages\packagename\state;
class API extends controller {
	public function getCities(): response {
		$response = new Response(true);
		$city = new state\City();
		$city->where("state", Http::getData("state"));
		$city->orderBy("title_fa", "ASC");
		$response->setData($city->get(), "cities");
		return $response;
	}
}
```

**2 مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Response, View};
use themes\themename\views;
class Dashboard extends controller {

	public function forbidden(): Response {

		$this->response->setStatus(false);
		$this->response->setHttpCode(403);
		$view = View::byName(views\Forbidden::class);
		$this->response->setView($view);
		if ($this->response->is_api()) {
			$this->response->setData("forbidden", "error");
		}
		return $this->response;
	}
}
```

## [چاپ متن به عنوان خروجی ](#rawOutput)
گاها ممکن است پاسخی که ارسال می‌شود یک صفحه وب و یا یک فایل نباشد و بخواهیم تنها متنی را به کاربر نمایش دهیم در این صورت با فراخوانی متد `rawOutput` میتوانید متن مورد نظر را به کاربر نمایش دهید. آرگومان ورودی این متد رشته مورد نظر میباشد.

**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Response, HTTP};

class Dashboard extends Controller {

	public function checkAccess(): Response {
		if(Http::$client["ip"] == "127.0.0.1") {
			$this->response->setStatus(false);
			$this->response->setHttpCode(403);
			$error = "<h1>403 Forbidden page</h1>";
			$this->response->rawOutput($error);
		}
		return $this->response;
	}
}
```

## [انتقال کاربر](#go)
در نظر بگیرید که کاربر فرم ورود به سایت را برای سرور ارسال کرده و کنترلر به نتیجه میرسد که اطلاعات وارده شده صحیح است، اکنون نوبت آن رسیده که کاربر را به پنل کاربری منتقل کنید . یا شما لازم دارید تا کاربر را برای پرداخت صورتحساب به درگاه پرداخت منتقل کنید . در این شرایط شما لازم دارید تا کاربر را از آدرسی به آدرس دیگری منتقل کنید و این کار میتواند با متد `Go` از کلاس `Response` انجام شود . شما در تنها پارامتر این تابع هر آدرسی وارد کنید، کاربر به آن آدرس منتقل خواهد شد .

__برای اطلاعات بیشتر از نحوه‌ آدرس دهی به صفحه [تولید آدرس](address.md) مراجعه کنید__

**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base;
use packages\base\{Controller, Response, View, InputValidation, views\FormError};
use packages\packagename\User;
use themes\themename\views;

class Main extends controller {
	public function login(): Response {
		$response = new Response();
		$view = View::byName(views\Login::class);
		$inputRules = array(
			"username" => array(
				"type" => "email",
			),
			"password" => array()
		);
		try {
			$inputs = $this->checkinputs($inputRules);
			$user = new User();
			$user->where("email", $inputs["username"]);
			$user->where("password", md5($inputs["password"]));
			if (!$user = $user->getOne()) {
				throw new InputValidation("username");
			}
			$response->setStatus(true);
			$response->Go(base\url("userpanel"));
		} catch(InputValidation $error) {
			$view->setFormError(FormError::fromException($error));
		}
		$response->setView($view);
		return $response;
	}
}
```

## [وضعیت پاسخ](#status)
برای مشخص کردن وضعیت پاسخ متد `setStatus` تعریف شده است ورودی این متد boolean میباشد.
فراخوانی متد `getStatus()` وضعیت تعیین شده را برمیگرداند.

 وضیعت پاسخ، زمان پاسخ به درخواست های api و ajax اهمیت بیشتری دارد. 

**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Response};
use packages\packagename\User;

class Users extends controller {

    public function getUser($data): Response {

		$user = User::byId($data['id']);
		if($user) {
			$this->response->setStatus(true);
			$this->response->setData($user, "user");
		}else {
			$this->response->setStatus(false);
		}
		return $this->response;
    }
 }
```

## [تنظیم کد وضعیت](#setHttpCode)
هر پاسخی که ارسال میشود دارای یک کد وضعیت میباشد. در جالنو میتوانید کد وضعیت را با فراخوانی متد `setHttpCode($code)` مشخص کنید. 

در مثال زیر بررسی میشود که اگر درخواست ارسال شده از نوع ajax یا api باشد کد وضعیت آن 401 تنظیم شود. 

**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Response};

class Dashboard extends controller {

	public function authError(): Response {
		$this->response->setStatus(false);
		if ($this->response->is_ajax() or $this->response->is_api()) {
			$this->response->setHttpCode(401);
		}
		return $this->response;
	}
}
```

## [تنظیم مشخصه‌های ‌header](#setHeader)
در جالنو برای تنظیم مشخصه‌های header متد `setHeader($key, $value)` تعریف شده است. این متد در پارامتر اول عنوان مشخصه و در پارامتر دوم مقدار مشخصه را میگیرد

**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Response, View, NotFound};
use packages\packagename\Post;
use themes\themename\views;

class News extends controller {

	public function post($data): Response {
		$post = Post::byId($data['id']);
		if(!$post) {
			throw new NotFound();
		}
		
		$view = View::byName(views\news\Post::class);
		$view->setData($post, "post");
		$this->response->setView($view);
		$this->response->setHeader("author", $post->author);
		return $this->response;
	}
}
```