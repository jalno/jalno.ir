# نشست (Session)

برای پیگیری و ردیابی و همچنین ذخیره اطلاعات برای یک کاربر در درخواست های متفاوت و جداگانه از نشست ها استفاده میشود. جالنو با ارائه یک ساختار جامع و پشتیبانی از نشست های معروف مانند Memcached، دسترسی به کاربر و همچنین اطلاعات آن را آسان ساخته است.

در این کلاس از سه روش برای ذخیره سازی اطلاعات کاربر استفاده میشود که به شرح زیر است : 

+ [منطق پیش فرض php](#php)
+ [حافظه موقت Cache ](#cache)
+ [پایگاه داده ( Database )](#database)

در تمامی روش های فوق میتوان از متدهای ایستا (static) زیر برای کار با نشست ها استفاده کرد.

| متد	  |							 کاربرد							 |
|---------------------------------------------|-------------------------------------------|
| <div class="display-block ltr">start(): void</div>						  |	   [شروع نشست](#start_session) |
| <div class="display-block ltr">set(string $key, mixed $value): void</div>				 | [تعریف متغیر و یا ذخیره اطلاعات](#store_data)			  |
| <div class="display-block ltr">get(string $key): mixed</div>				 | [گرفتن متغییر و یا دریافت اطلاعات](#get_data)			  |
| <div class="display-block ltr">unset(string $key): void</div>		   |  [پاک کردن اطلاعات](#unset_data) |
| <div class="display-block ltr">destroy(): void</div>				| [از بین بردن نشست](#destroy)			 |
| <div class="display-block ltr">getID(): ?string</div>		   |  [دریافت شناسه ی یکتای نشست](#get_session_id)		   |

## [روش های ذخیره سازی](#session_methods)

### [منطق پیش فرض php](#php)
در منطق php زمانی که یک نشست فعال میشود در کوکی های مرورگر کاربر کلیدی تحت عنوان  PHPSESSID ایجاد شده که مقدار رشته ای یکتا در آن ذخیره و متناظر با آن فایلی در سرور با عنوان همان رشته ایجاد میشود . در فایل php.ini در کلید session.save_path آدرس محل ذخیره‌ی فایل های نشست قابل مشاهده است.

### [حافظه موقت Cache](#cache)
در صورتی که از حافظه موقت برای ذخیره سازی نشست ها استفاده شود، ذخیره سازی طبق روش [cache](cache.md) صورت گرفته که میتواند به سه روش  ذخیره در فایل, ذخیره در پایگاه داده (Database) و یا استفاده از Memcache باشد.

#### [مشخص کردن روش ذخیره داده](#configure_cache_method)
با افزودن یک تنظیم در تنظیمات با عنوان `packages.base.cache`  و یکی از مقادیر `file` (برای  ذخیره داده ها در فایل)، `memcache` (ذخیره داده ها با استفاده از memcache) و یا `database` (ذخیره داده ها در پایگاه داده)  میتوانید روش ذخیره سازی را مشخص کنید  .
اگر روش ذخیره سازی مشخص نشده باشد  به صورت خودکار از روش ذخیره سازی داده ها در فایل استفاده خواهد شد .
استفاده از هر سه روش یکسان خواهد بود و کلاس `cache`  به صورت خودکار داده ها را با روش مشخص شده ذخیره و مدیریت خواهد کرد .

__برای اطلاعات بیشتر به صفحه ی [حافظه موقت](cache.md) مراجعه کنید.__

### [پایگاه داده (Database)](#database) 
میتوان اطلاعات نشست ها را در پایگاه داده نیز ذخیره کرد. در این روش اطلاعات در جدول `base_sessions` در پایگاه داده ذخیره میشوند.


## [پیکربندی نشست](#configure)
ابتدا باید در فایل تنظیمات جالنو  ( `config.php` ) که در مسیر `packages/base/libraries/config` قرار دارد، پیکربندی انجام شود .
در تنظیم `packages.base.session` مقادیر تنظیمات مربوط به نشست را انجام میدهیم که آرایه‌ای با ایندکس های `handler`, `autostart`, `ip` دریافت میکند.

**handler :** برای مشخص کردن روش ذخیره سازی اطلاعات استفاده میشود که مقادیر `cache`, `mysql` و `php` میگیرد. 
در ابتدا مقدار آن php است.

**autostart :** برای ایجاد و فعال شدن خودکار نشست ها استفاده میشود و مقدار boolean دریافت میکند.
اگر autostart را true نکنیم باید در ابتدای هر متد که در آن قصد کار با نشست ها را داریم متد `session::start()` را صدا بزنیم.   
اگر به autostart مقدار true بدهید و session::start() را صدا بزنید خطای `Warning: session_set_cookie_params()` دریافت میکنید.

**ip :** درصورتی که مقدار ایندکس ip برابر true باشد بصورت خودکار متغیر `SESSION_IP` برای نشست تعریف میشود و ip کاربر در آن ذخیره میشود مقدار پیش فرض ایندکس برابر true است.

__نکته__: در صورتیکه مقدار برابر true باشد، با تغییر آی پی کاربر، نشست کاربر نیز تغییر داده شده و یک نشست جدید برای آن ایجاد میشود.

**نمونه فایل config.php**
```php
'packages.base.session' => array(
	'handler' => 'php', //cache, mysql, php
	'ip' => true,
	'autostart' => true
),
```

## [شروع نشست](#start_session)
برای شروع نشست ها از متد ایستا `start()` استفاده میشود .
این متد باید قبل از فراخوانی سایر متد های نشست، فراخوانی شود.
برای جلوگیری از حجم کد اضافه میتوان در فایل `packages/base/libraries/config/config.php` به تنظیم `packages.base.session["autostart"]` مقدار true داده شود. 

**مثال 1**
```php
<?php
namespace packages\my_package\controllers;

use themes\my_theme\views;
use packages\base\{Response, Controller, Session, View};

class Panel extends Controller {
	/* 
	'autostart' => false
	*/
	public function index(): Response {
		Session::start();
		if (!Session::get("login")) {
			$this->response->Go(base\url("login"));
			$this->response->setStatus(true);
			return $this->response;
		}
		$view = View::byName(views\panel\Index::class);
		$this->response->setView($view);
		$this->response->setStatus(true);
		return $this->response;
	}
	public function chat(): Response {
		Session::start();
		if (!Session::get("login")) {
			$this->response->Go(base\url("login"));
			$this->response->setStatus(true);
			return $this->response;
		}
		$name = Session::get("name");
		$view = view::byName(views\Chat::class);
		$view->setName($name);
		$this->response->setView($view);
		$this->response->setStatus(true);
		return $this->response;
	}
}
```

**مثال 2**
```php
<?php
namespace packages\my_package\controllers;

use themes\my_theme\views;
use packages\base\{Response, Controller, Session, View};

class Main extends Controller {
	/*
	'autostart' => true
	*/
	public function index(): Response {
        if (!Session::get("login")) {
            $this->response->Go(base\url("login"));
			$this->response->setStatus(true);
            return $this->response;
        }
        $view = View::byName(views\panel\Index::class);
		$this->response->setView($view);
		$this->response->setStatus(true);
        return $this->response;
    }
	public function chat(): Response {
        if (!Session::get("login")) {
            $this->response->Go(base\url("login"));
			$this->response->setStatus(true);
            return $this->response;
        }
		$name = Session::get("name");
		$view = view::byName(views\Chat::class);
		$view->setName($name);
		$this->response->setView($view);
		$this->response->setStatus(true);
		return $this->response;
	}
}
```

## [تعریف متغیر و یا ذخیره اطلاعات](#store_data)
برای ذخیره اطلاعات در نشست ها از متد ایستا `set(string $key, mixed $value)` استفاده میشود. ارگومان های ورودی این متد نام کلید داده و مقدار داده میباشد. 

**مثال**
```php
<?php
namespace packages\my_package\controllers;

use themes\my_theme\views;
use packages\my_package\User;
use packages\base\{Response, Controller, Session, View, Http, view\Error};

class Main extends Controller {
	/* 
	'autostart' => true
	*/
	public function login(): Response {
		$view = view::byName(views\Login::class);
		$this->response->setView($view);
		if (Http::is_post()) {
			$inputs = $this->checkinputs(array(
				"username" => array(
					"type" => "email",
				),
				"password" => array()
			));

			$user = new User();
			$user->where("email", $inputs["username"]);
			$user->where("password", md5($inputs["password"]));
			$user = $user->getOne();
			
			if (!$user) {
				throw new Error("invalid_username_or_password");
			}
			Session::set("login", true);
			Session::set("userID", $user->id);
			$this->response->Go(base\url("userpanel"));
		} else {
			$this->response->setStatus(true);
		}
		return $this->response;
	}
}
```


## [گرفتن متغییر و یا دریافت اطلاعات](#get_data)
برای دریافت اطلاعاتی که در نشست تعریف و ذخیره شده است از متد ایستا `get(string $key)` استفاده میشود . آرگومان ورودی این متد نام کلید داده است.

اگر اطلاعاتی با نام کلید وارد شده وجود نداشته باشد، مقدار false برمیگرداند.

**مثال**
```php
<?php
namespace packages\my_package\controllers;

use themes\my_theme\views;
use packages\base\{Response, Controller, Session, View};

class Main extends Controller {
	/* 
	'autostart' => true
	*/
	public function panel(): Response {
		if (!Session::get("login")) {
			$this->response->Go(base\url("login"));
			$this->response->setStatus(true);
			return $this->response;
		}
		$view = view::byName(views\panel::class);
		$this->response->setView($view);
		$this->response->setStatus(true);
		return $this->response;
	}
}
```


## [پاک کردن اطلاعات](#unset_data)
برای حذف اطلاعات ذخیره شده در یک کلید نشست از متد `unset(string $key)` استفاده میشود. آرگومان ورودی این متد نام کلید داده مورد نظر میباشد.

**مثال 1:**
```php
<?php
namespace packages\my_package\controllers;

use function packages\base\url;
use packages\base\{Response, Controller, Session};

class User extends Controller {
	/* 
	'autostart' => true
	*/
	function logout(): Response {
		Session::unset("login");
		Session::unset("userID");
		$this->response->Go(url("login"));
		$this->response->setStatus(true);
		return $this->response;
	}
}
```
**مثال 2:**
```php
<?php
namespace packages\my_package\controllers;

use themes\my_theme\views;
use packages\my_package\ContactUs;
use packages\base\{Response, Controller, Session, View, InputValidationException};

class Main extends Controller {
	/* 
	'autostart' => true
	*/
	public function contactUs(): Response {
		$view = view::byName(views\ContactUs::class);
		$this->response->setView($view);
		if (Http::is_post()) {
			$inputs = $this->checkinputs([
				'name' =>[
					'type' => 'string'
				],
				'msg' =>[
					'type' => 'string'
				], 
				'captcha' =>[
					'type' => 'string'
				]
			]);
			if ($inputs["captcha"] != Session::get("captcha")) {
				throw new InputValidationException("captcha");
			}

			$contactUs = new ContactUs();
			$contactUs->msg = $inputs['msg'];
			$contactUs->name = $inputs['name'];
			$contactUs->save();

			Session::unset("captcha");

			$this->response->setStatus(true);
		} else {
			$this->response->setStatus(true);
		}
		return $this->response;
	}
}
```

## [از بین بردن نشست](#destroy)

برای از بین بردن نشست بطور کامل از متد `destroy()` استفاده میشود. این متد آرگومان ورودی دریافت نمیکند. 

**مثال :**
```php
<?php
namespace packages\my_package\controllers;

use function packages\base\url;
use packages\base\{Response, Controller, Session};

class Panel extends controller {
	/* 
	'autostart' => true
	*/
	public function logOut(): Response {
		Session::destroy();
		$this->response->Go(url("login"));
		$this->response->setStatus(true);
		return $this->response;	
	}
}
```

## [دریافت شناسه ی یکتای نشست](#get_session_id)
هر نشست دارای کلید یکتا بوده و میتوان از این کلید یکتا برای موارد گوناگون مانند ایجاد سبد خرید استفاده کرد. این کلید از طریق متد `getID` قابل دسترسی است.

**مثال:**
```php 
<?php
namespace packages\carjer;

use packages\base\{db\dbObject, Session, Date, Http};

class Cart extends dbObject {
	/* 
	'autostart' => true
	*/
	public static function getCart(): Cart {
		$id = Session::getID();
		$cart = (new Cart)->byId($id);
		if (!$cart) {
			$cart = new Cart();
			$cart->id = $id; // This is optional
			$cart->save();
		}
		return $cart;
	}

	protected $dbTable = "carjer_carts";
	protected $primaryKey = "id";
	protected $dbFields = array(
        "id" => array("type" => "text", "required" => true),
		"ip" => array("type" => "text", "required" => true),
        "created_at" => array("type" => "int", "required" => true),
	);
	protected $relations = array(
		"products" => array("hasMany", Cart\Prodcut::class, "card_id"),
	);
	public function preLoad(array $data): array {
		if (!isset($data["id"])) {
			$data["id"] = Session::getID();
		}
		if (!isset($data["created_at"])) {
			$data["created_at"] = Date::time();
		}
		if (!isset($data["ip"])) {
			$data["ip"] = Http::$client["ip"];
		}
		return $data;
	}
}
```
