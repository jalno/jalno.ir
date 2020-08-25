#پاسخ ها
هنگامی که مسیر یاب یک درخواست http تحویل یک کنترلر می دهد و آن را فراخوانی میکند، از آن انتظار دارد تا پس از انجام پردازش های لازم یک شئ از کلاس `package\base\response`  را در نهایت برگرداند .
یک پاسخ می تواند انواع مختلفی داشته باشد .

##صفحات وب
اگر شما یک شئ از کلاس `view` را در اختیار داشته باشید و قصد دارید تا آن را به کاربر نشان دهید، از متد `setView`  کلاس `response`  استفاده کنید و فریمورک پس از تمام شدن اجرای کنترلر آن را به کاربر نشان خواهد داد .

مثال
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{controller, response, view};
use \packages\packagename\views;
class Main extends controller {
    public function index(): response {
		$view = view::byName(views\index::class);
		$response = new response(true);
		$response->setView($view);
		return $response;
    }
 }
```
##پاسخ به درخواست های Ajax و API
اگر شما از سمت مرورگر درخواستی ارسال میکنید و نیاز دارید تا سرور اطلاعات لازم را به فرم `JSON` و یا `XML` برگرداند، شما باید از متد `setData`  کلاس `response` استفاده کنید .
این تابع در پارامتر اول مقدار آیتم و در پارامتر دوم( که حتما میبایست از جنس رشته باشد) کلید آن مقدار را دریافت میکند .
فریم ورک زمانی که در `URL Parameter` مقدار `ajax=1` و یا `api=1` را دریافت کند، این مقادیر را به مرورگر ارسال میکند .

مثال
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{controller, response, http};
use \packages\packagename\state;
class API extends controller {
	public function getCities(): response {
		$response = new response(true);
		$city = new state\city();
		$city->where("state", http::getData("state"));
		$city->orderBy("title_fa", "ASC");
		$response->setData($city->get(), "cities");
		return $response;
	}
}
```
##انتقال کاربر
در نظر بگیرید که کاربر فرم ورود به سایت را برای سرور ارسال کرده و کنترلر به نتیجه میرسد که اطلاعات وارده شده صحیح است، اکنون نوبت آن رسیده که کاربر را به پنل کاربری منتقل کنید . یا شما شما لازم دارید تا کاربر را برای پرداخت صورتحساب به درگاه پرداخت منتقل کنید . در این شرایط شما لازم دارید تا کاربر را از آدرسی به آدرس دیگری منتقل کنید و این کار میتواند با متد `Go` از کلاس `response` انجام شود . شما در تنها پارامتر این تابع هر آدرسی وارد کنید، کاربر به آن آدرس منتقل خواهد شد .

مثال
```php
<?php
namespace packages\packagename\controllers;
use \packages\base;
use \packages\base\{controller, response, view, inputValidation, views\FormError};
use \packages\packagename\{user, views};
class Main extends controller {
	public function login(): response {
		$response = new response(false);
		$view = view::byName(views\login::class);
		$inputRules = array(
			"username" => array(
				"type" => "email",
			),
			"password" => array()
		);
		try {
			$inputs = $this->checkinputs($inputRules);
			$user = new user();
			$user->where("email", $inputs["username"]);
			$user->where("password", md5($inputs["password"]));
			if (!$user = $user->getOne()) {
				throw new inputValidation("username");
			}
			$response->setStatus(true);
			$response->Go(base\url("userpanel"));
		} catch(inputValidation $error) {
			$view->setFormError(FormError::fromException($error));
		}
		$response->setView($view);
		return $response;
	}
}
```

##فایل
پاسخ ها میتواند از جنس فایل ها باشند و فایل ها میتوانند دانلود شوند (مثل فایل های فشرده، برنامه ها یا ...) و یا میتواند بلافاصله به کاربر نشان داده شوند (مثل تصاویر و یا فایل های صوتی و تصویری) .
برای این منظور میتوانید از متد `setFile` از کلاس `response` استفاده کنید .

مثال
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{controller, response, NotFound};
use \packages\packagename\ticket;
public function getTicketFile($data): response {
	$file = new ticket\file();
	$file->where("id", $data['file']);
	if (!$file = $file->getOne()) {
		throw new NotFound();
	}
	$response = new response();
	$responsefile = new response\file();
	$responsefile->setLocation($file->path);
	$responsefile->setSize($file->size);
	$responsefile->setName($file->name);
	$response->setFile($responsefile);
	return $response;
}
```
##تولید آدرس
در این فریم ورک لازم است تا برنامه نویس از تولید آدرس به صورت دستی خودداری کند و تمامی آدرس ها را برای استاندارد سازی از طریق تابع `base\url` بسازد . این تابع در پارامتر اول آدرس را بدون نام دامنه و زبان ، در پارامتر دوم آرایه ای از رشته ها برای پارامتر های داخل آدرس (که در این آرایه کلید هر ایندکس کلید `URL Parameter` و مقدار هر کلید، مقدار آن است) و در پارامتر سوم نوع بازگشتی آدرس را دریافت میکند .
در صورتی که در پارامتر سوم مقدار `true` وارد کنید ، مقدار خروجی آدرس به صورت کامل و همراه با نام دامنه اصلی می باشد ، در غیر این صورت تنها آدرس و پارامتر ها (در صورت وارد کردن در پارامتر دوم) نشان خواهد داد .

	base\url(page, parameters, absolute);

مثال
```php
$url = base\url("userpanel");
echo $url;
/*
$url = "/userpanel";
*/
$url = base\url("register", array(
"state" => "tehran"
));
echo $url;
/*
$url = "/userpanel/?state=tehran";
\*/
$url = base\url("", array(), true);
echo $url;
/*
$url = "http://yourdomain.com";
\*/
```
