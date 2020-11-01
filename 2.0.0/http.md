
#http
##دریافت اطلاعات کاربر
###آی پی

	http::$client["ip"];

###درگاه (port)

	http::$client["port"];

### userAgent

	http::$client["agent"];

##دریافت اطلاعات سرور
###آی پی
آی پی سرور را برمیگرداند :

	http::$server["ip"];

###درگاه (port)
درگاه استفاده شده برای دریافت درخواست را برمیگرداند

	http::$server["port"];

###نوع وب سرور
نام وب سرور بر روی سرور که درخواست را دریافت کرده، نشان می دهد :

	http::$server["webserver"];

###نام دامنه
نام دامنه اصلی هاست که در وب سرور تنظیم شده است را نشان می دهد :

	http::$server["hostname"];

##دریافت اطلاعات درخواست
###نوع ارسال
نوع  `POST` و یا `GET` درخواست را نمایش میدهد :

	http::$request["method"];

###مسیر درخواست
آدرس مسیر صفحه ای که توسط مرورگر و کاربر درخواست داده شده است را نشان می دهد :

	http::$request["uri"];

###زمان دریافت درخواست
زمانی که درخواست دریافت شده را نشان میدهد :

	http::$request["time"];

و یا میتوانید :

	http::$request["microtime"];

خروجی زمان به صورت timestamp است .

###نام دامنه
برای مثال اگر دامنه ی domain.com توسط یک درخواست برای سرور فرستاده شده باشد، مقدار زیر domain.com خواهد بود .

	http::$request["hostname"];

###نوع اتصال
نوع اتصال `htttp` و یا `https` را نشان میدهد :

	http::$request["scheme"];

###آدرس ارجاع دهنده
در صورتی که آدرس ارجاع دهنده موجود باشد، میتوانید آن را به صورت زیر دریافت کنید :

	http::$request["referer"];

###بررسی نوع درخواست برای درخواست های ajax
در صورتی که درخواست از طریق ajax صورت گرفته باشد، مقدار زیر برابر `true` و در غیر اینصورت `false` خواهد بود .

	http::$request["ajax"];

###پارامتر های POST
برای دریافت پارامتر های ارسال شده از طریق فرم ، میتوانید به این صورت عمل کنید :

	http::$request["post"];

توجه داشته باشید مقدار های دریافتی  اعتبار سنجی نشده اند .
##### برای اطلاعات بیشتر به صفحه ی [اعتبار سنجی](validation.md) مراجعه کنید

###دریافت پارامتر های GET
برای دریافت پارامتر های ارسال شده از طریق آدرس(URL) ، میتوانید به این صورت عمل کنید :

	http::$request["get"];

مثال
`http://domain.com/?lang=en`
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{controller, response, http, view}
use \pacakges\packagename\views;
class Main extends controller {
	public function homepage(): response {
		$response = new respose(true);
		$view = view::byName(views\homepage::class);
		$lang = $this->getLang();
		$view->setLang($lang);
		$response->setView($view);
		return $response;
	}
	public function getLang() {
		return isset(http::$request["get"]["lang"]) ? http::$request["get"]["lang"] : "en";
	}
}
```
توجه داشته باشید مقدار های دریافتی  اعتبار سنجی نشده اند .
##### برای اطلاعات بیشتر به صفحه ی [اعتبار سنجی](validation.md) مراجعه کنید

##دریافت آدرس URL
با استفاده از متد `getURL` کلاس `http` میتوانید آدرس کاملی که کاربر درخواست داده است را دریافت کنید .

	http::getURL();

##دریافت پارامتر ها
با استفاده از متد `getData` کلاس `http` میتوانید مقدار پارامتری که یا توسط آدرس و یا به صورت فرم ارسال شده است را دریافت کنید .
این متد ابتدا در میان پارامتر های ارسالی آدرس `GET` جستجو میکند ، در صورتی که مقداری با کلید مشخص شده  پیدا نکند، به سراغ پارامتر های دریافتی از طریق فرم `POST` میرود . اولین مقدار با کلید دریافت شده را در صورت یافتن و در غیر اینصورت `null` برمی گرداند.
توجه داشته باشید ، این متد پارامتر های ارسالی را اعتبار سنجی نخواهد کرد و مقادیر را عینا باز می گرداند .
##### برای اطلاعات بیشتر به صفحه ی [اعتبار سنجی](validation.md) مراجعه کنید

	http::getData(key);

مثال
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{controller, response, http, view}
use \pacakges\packagename\{views, state};
class Main extends controller {
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
###دریافت پارامتر های ارسالی از طریق فرم POST
##### برای اطلاعات بیشتر به صفحه ی [اعتبار سنجی](validation.md) مراجعه کنید
در صورتی که بخواهید فقط و فقط مقدار کلیدی را در بین پارامتر های ارسالی از طریق فرم دریافت کنید، میتوانید از متد `getFormData` کلاس `http` استفاده کنید . این متد اولین مقدار پیدا شده با کلید مشخص شده و در غیر اینصورت `null` بر میگرداند .

	http::getFormData(key);

###دریافت پارمتر های ارسالی از طریق آدرس GET
##### برای اطلاعات بیشتر به صفحه ی [اعتبار سنجی](validation.md) مراجعه کنید
در صورتی که بخواهید مقدار کلیدی را فقط در پارمتر های ارسالی از طریق آدرس دریافت کنید. میتوانید از متد `getURIData` کلاس `http` استفاده کنید. این متد کلیدی که دریافت میکند را فقط در پارامتر های درون آدرس جستجو میکند، در صورتی که مقداری برای این کلید پیدا کند، آن مقدار و در غیر اینصورت `null` بر میگرداند .

	http::getURIData(key);

##بررسی نوع درخواست
با استفاده از متد `is_post` کلاس `http` میتوانید متوجه شوید ، درخواستی که از طریق کاربر برای کنترلر ارسال شده است، به صورت فرم `POST` و یا به صورت `GET` است . در اینصورت میتوانید پاسخ های مناسب برای هر نوع درخواست را بدون تداخل در نظر بگیرید .
 خروجی این متد در صورتی که نوع درخواست از نوع `POST` باشد، `true` و در غیر اینصورت `false` خواهد بود .

	http::is_post();

مثال
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{controller, response, http};
use \packages\packagename\views;
class Main extends controller {
	public function accept_terms(): response {
		$response = new response();
		$view = view::byName(views\index::class);
		$response->setStatus(true);
		if (http::is_post()) {
			// meaning the user accept terms
			$response->Go(base\url("panel"));
		}
		return $response;
	}
}
```
##تنظیم کوکی (cookie)
با استفاده از متد `setcookie`   کلاس `http` میتوانید یک کوکی بر روی مرورگر کاربر ذخیره کنید . این متد در پارامتر اول یک نام/کلید، در پارامتر دوم یک مقدار (برای کلید)، در پارامتر سوم مدت زمان انقضای کوکی، در پارامتر چهارم مسیری که کوکی در آن فعال ( در صورتی که "/" قرار داده شود، کوکی در سایت اصلی فعال) خواهد بود و  پارامتر پنجم نام دامنه را دریافت میکند . همچنین در پارامتر ششم مشخص میکنید که این کوکی فقط در زمان اتصال ایمن `https` فعال باشد و در پارامتر هفتم و آخر اگر این مقدار را برابر `true` قرار دهید، این کوکی در اختیار Javascript نخواهد بود .

	http::setcookie(name, value, expire, path, domain, secure, httponly);

مثال
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{controller, response, http, view};
use \packages\packagename\user;
class Main extends controller {
	public function login(): response {
	    $response = new response();
	    $view = view::byName(views\login::class);
	    $inputRules = array(
	        "username" => array(
	            "type" => "email",
	        ),
	        "password" => array(),
	        "remember_me" => array(
		        "type" => "bool",
                "optional" => true,
                "default" => false,
	        )
	    );
	    try {
	        $response->setStatus(false);
	        $inputs = $this->checkinputs($inputRules);
	        $user = new user();
	        $user->where("email", $inputs["username"]);
	        $user->where("password", md5($inputs["password"]));
	        if (!$user = $user->getOne()) {
	            throw new inputValidation("username");
	        }
	        if ($inputs["remember_me"]) {
		        $token = mdf(rand(999, 9999) + date::time());
		        http::setcookie("remember", $token, date::time() + 31536000);
		        $user->remember_token = $token;
		        $user->save();
	        }
	        $response->setStatus(true);
	        $response->Go(base\url("panel"));
	    } catch(inputValidation $error) {
	        $view->setFormError(FormError::fromException($error));
	    }
	    $response->setView($view);
	    return $response;
	}
}
```
##پاک کردن کوکی
هر چند کوکی ها بعد از گذشت مدت زمان انقضایی که در زمان تنظیم گذاشته میشود، پاک خواهند شد، ولی شما میتوانید با استفاده از متد `removeCookie` کلاس `http` به صورت دستی یک کوکی را پاک کنید. این متد در پارامتر خود نام/کلید کوکی را دریافت میکند .

	http::removeCookie(name);

مثال
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{controller, response, http};
class Main extends controller {
	public function logout(): response {
		$response = new response();
      $user = $this->getUser(); // return the logged user ;
      $user->remember_token = null;
      $user->save();
      $this->setUser(null); // empty logged user;
      if ($cookies = http::$request["cookies"]) {
	      if (isset($cookies["remember"]) and $cookies["remember"]) {
	         http::removeCookie("remember");
         }
     }
     $response->Go(base\url("login"));
     return $response;
    }
}
```
##تغییر مسیر
با استفاده از متد `redirect` کلاس `http` میتوانید مرورگر را به آدرس دیگری منتقل کنید  . این متد در پارامتر خود یک آدرس را دریافت میکند .

	http::redirect(url);

##تنظیم header
با استفاده از متد `setHeader` کلاس `http` میتوانید هر مقدار و کلیدی را در سربرگ پاسخ درخواست  مرورگر اضافه کنید .
این متد در پارامتر اول خود یک نام و در پارامتر دوم مقدار دریافت میکند .

	http::setHeader(name, value);

##تنظیم وضعیت
با استفاده از متد `setHttpCode` کلاس `http` میتوانید کد وضعیت پاسخ درخواست را تنظیم کنید . این متد در پارامتر خود یک عدد (که حتما باید جزء کد های http باشد) را دریافت میکند، این کد را تفسیر و در سربرگ پاسخ درخواست مرورگر اعمال میکند .

	http::setHttpCode(code);

##تنظیم نوع محتوا
با استفاده از متد `setMimeType` میتوانید نوع پاسخ  را تنظیم کنید . این متد در پارامتر اول نوع و در پارامتر دوم نوع `charset` را دریافت میکند .

	http::setMimeType(name, charset);

##تنظیم طول محتوا
پارامتر متد `setLength` یک عدد دریافت میکند و این عدد را در سربرگ پاسخ درخواست اعمال میکند .

	http::setLength(length);

##خروجی JSON
با فراخوانی متد `tojson` از کلاس `http`  مرورگر متوجه خواهد شد نوع محتوای پاسخ،از جنس  JSON است .
این متد در پارامتر خود نوع `charset` را دریافت میکند که به صورت پیشفرض مقدار آن برابر `utf-8` قرار داده شده .

	http::tojson(charset);
	http::tojson();

##اعتبار سنجی آدرس ارجاع دهنده
با استفاده از متد `is_safe_referer` کلاس `http` میتوانید آدرسی که درخواست از آن ارجاع داده شده (منتقل شده) است را اعتبار سنجی کنید . در صورتی که آدرس ارجاع دهنده و آدرس دامنه اصلی یکی باشد، خروجی این متد `true` خواهد. همچنین اگر شما در تنظیمات، تنظیمی به منظور آدرس های مورد قبول تنظیم کرده باشد، در بین این آدرس ها جستجو کرده و در صورتی که با یکی از موارد مطابقت داشته باشد خروجی `true`  در غیر این موارد خروجی `false` خواهد بود .
این متد در پارامتر خود آدرس ارجاع دهنده را دریافت میکند، البته اگر هیچ آدرسی برای آن ارسال نشود، به صورت خودکار آدرس ارجاع دهنده ی سربرگ درخواست را بررسی خواهد کرد .

	http::is_safe_referer();
	htttp::is_safe_referer(referer);
