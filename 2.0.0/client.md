# [ایجاد درخواست‌های اینترنتی](#create_request_internet)
در جالنو برای ایجاد درخواست های اینترنتی کلاس `packages\base\http\Client` ایجاد شده است. 
این کلاس به عنوان یک wrapper عمل میکند و میتواند در خواست‌های اینترنتی مختلف ایجاد کند. 
در حال حاضر جالنو تنها از کتابخانه CURL برای ایجاد درخواست استفاده میکند; برای این منظور کلاس `packages\base\http\CURL` ایجاد شده است.

### [معرفی کتابخانه CURL](#curl)
برای بازیابی محتوایات یک صفحه در php از روش ها و متدهای مختلفی (مانند file_get_contents("http://www.google.com") ) استفاده میشود. اما گاها لازم است هنگام بازیابی صفحه از کوکی ها استفاده شود یا اطلاعاتی به فرمی ارسال شود و یا عملیات احراز‌هویت انجام شود. که برای انجام این دسته از عملیات در php کتابخانه [`CURL`](http://docs.php.net/manual/en/book.curl.php) ایجاد شده است. 

## [ایجاد درخواست](#create_request)
برای ایجاد یک درخواست لازم است ابتدا شئ از کلاس `packages\base\http\Client` ایجاد شود. 

یک درخواست میتواند یکی از انواع `get` یا `post` باشد. به همین منظور در کلاس Client دو متد get و post ایجاد شده است که متناسب با نوع درخواست، متد مربوطه فراخوانی میشود. 

متدهای get و post دو آرگومان ورودی میگیرند. آرگومان اول آدرس URL که باید بصورت کامل وارد شود و آرگومان دوم آرایه‌ای از تنظیمات درخواست میباشد. 
خروجی متدها شئ از کلاس `packages\base\http\Response` میباشد.

**توجه :** بهتر است زمان کار با کلاس  Client از لاگ ها استفاده کنید، که در صورت نیاز بتوانید به راحتی برنامه را دیباگ کنید.

برای اطلاعات بیشتر به صفحه [لاگ‌ها](log.md) مراجعه کنید.

**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Log, Http};

class Main extends Controller {

    public function getGoogle() {
		$log = Log::getInstance();
        $client = new Http\Client();
		try {
			$log->info("init client params");
			$params = [
				"timeout" => 10
			];
			$log->reply($params);
			$log->info("send http request to get http://www.google.com");
			$response = $client->get("http://www.google.com", $params);
            echo $response->getbody();

        } catch (Http\ClientException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		} catch (Http\ServerException $e) {
           echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		}
    }
}
```
در مثال فوق صفحه اول گوگل را گرفته و با فراخوانی متد getbody() که در کلاس [Response](#response) تعریف شده است میتوانید آن را نمایش دهید.
در صورتی که روند اجرا بدرستی پیش نرود و استثنا پرتاب شود کد وضعیت خطا را نمایش میدهد.


## [استثنا](#exception)
هنگام ارسال درخواست ممکن است مشکلی در سمت سرور و یا کلاینت به وجود آید که روند اجرا بدرستی پیش نرود مشکلات بوجود آمده باعث پرتاب استثناهای `packages\base\http\ServerException` یا `packages\base\http\ClientException` می‌شود.

برای در خواست هایی که وضعیت آن‌ها 4xx باشد استثنا ClientException و درخواست‌هایی که وضعیت آن‌ها 5xx باشد استثنا ServerException پرتاب می‌شود.

در استسثناهای ClientException و ServerException دو متد `getResponse()` , `getRequest()` تعریف شده است که به ترتیب شئ از کلاس [Response](#response) , [Request](#request) بر میگردانند. با فراخوانی آن‌ها روی شئ استثنا میتوانید به اطلاعات درخواست ارسال شده و پاسخ آن که باعث استثنا شده است مانند کد وضعیت خطا دسترسی داشته باشید.


## [تنظیمات درخواست](#request_options)
هنگام ایجاد یک درخواست لازم است تنظیماتی برای آن انجام شود که از اهمیت بالایی نیز برخوردار میباشد. 
تنظیمات بصورت آرایه‌ای به آرگومان دوم متدهای get , post داده میشود.
تنظیماتی که میتوانید برای یک درخواست تعریف کنید به شرح زیر میباشد. 

|   تنظیم   |    کاربرد   |
|-------------|-----------|
| base_uri    |    (مشخص کردن دامنه اصلی سایت (برای ارسال چند درخواست روی یک سایت      |
| allow_redirects    |     مجوز دنبال کردن صفحاتی که سرور به عنوان بخشی از هدر HTTP ارسال می کند مقدار پیش‌فرض آن true است.       |
| auth    |      آرایه‌ای از مشخصات احرازهویت     |
| cookies    |    مجوز ذخیره کوکی       |
| connect_timeout    |      مدت زمان انتظار برای اتصال به سرور برحسب ثانیه    |
| delay    |     ایجاد تاخیر در روند اجرا برحسب میکرو‌ثانیه      |
| form_params    |      ارسال داده‌های متنی     |
| headers    |     ثبت پارامترهای header درخواست      |
| json    |       ارسال داده‌هایی با فرمت json    |
| multipart    |   ارسال فایل     |
| proxy    |     آرایه‌ای از مشخصات پروکسی       |
| query    |      آرایه‌ای از متغیر‌هایی که در آدرس URL اضافه می‌شود     |
| ssl_verify    |      تعیین استفاده یا عدم استفاده از ssl verify (مقدار پیش فرض true است)    |
| timeout    |      مدت زمان انتظار برای دریافت پاسخ برحسب ثانیه    |
| save_as    |     مشخص کردن محل ذخیره فایل دانلود شده      |
| outgoing_ip    |    مشخص کردن IP برای سرورهایی که چند آدرس IP دارند       |

### [auth](#auth) 
برای اتصال به برخی از سرورها نیاز به نام کاربری و رمز عبور برای احراز‌هویت میباشد. برای این منظور کلید auth آرایه‌ای از نام کاربری و رمز‌عبور میگیرد. 
اگر کلید auth بصورت آرایه و با کلید‌های `username` , `password` مقدار‌دهی شود؛ در هدر درخواست کلید Authorization بصورت کد شده مقداردهی میشود. (Authorization: Basic YWxpOjEyMzQ1Nzg= )

**توجه:** اگر کلید auth بصورت رشته مقداردهی شود بدون هیچ پردازشی به هدر درخواست اضافه می‌شود.(Authorization: name pass)

```php
$params = [
	"auth" => [
		"username" => "ali",
		"password" => 1234578
	]
	/**
	 * or :
	 * "auth" => "name pass"
	 * */
];
```

### [headers](#headers)
هر درخواستی که ارسال میشود داری هدر میباشد که مشخص کننده‌ی اطلاعاتی در رابطه با درخواست مانند فرمت داده‌های ارسالی، تاریخ و ... میباشد. 

headers['content-type'] فرمت داده‌های ارسالی را مشخص میکند که بطور پیش‌فرض برابر text/plain است. مقدار content-type مطابق کلید‌های json, form_params, multipart توسط فرمورک مقداردهی می‌شود. 

بطورکلی تمامی پارامترهای headers توسط فرمورک مدیریت میشود.

**توجه :** در هر درخواست فقط باید یکی از کلید‌های json, form_params, multipart را مقداردهی کنید.

### [cookies](#cookies)
برای امکان ذخیره و یا عدم ذخیره کردن کوکی‌ها از کلید cookies استفاده می‌شود. مقدار پیش‌فرض این کلید true است و فایل کوکی در پوشه ریشه پروژه ذخیره می‌شود. درصورتی که بخواهیم کوکی‌ها ذخیره نشوند مقدار کلید را false میدهیم. اگر بخواهیم محل ذخیره فایل کوکی را تغییر دهیم آدرس فایل مورد نظر را بصورت رشته به کلید می‌دهیم.

```php
$params = [
	'cookies' => '/tmp/cookies.txt'
];
```

### [form_params](#form_params)
از کلید form_params برای ارسال داده‌های متنی استفاده می‌شود که آرایه‌ای کلید مقدار دریافت می‌کند.
مقادیر وارد شده زمان ارسال درخواست به کلید body اضافه شده و ارسال میشود.

**توجه :** اگر در درخواست کلید form_params را مقداردهی کرده باشید دیگر نباید کلیدهای multipart و json را مقداردهی کنید.

```php
$params = [
	'form_params' => [
		'keyOne' => 'valueOne',
		'keyTwo' => 'valueTwo'
	]
];
```

### [multipart](#multipart)
برای آپلود فایل باید در هدر مشخص شود که محتوای ارسال شده شامل فایل میباشد. برای این منظور از کلید multipart استفاده میشود.
این کلید آرایه‌ای کلید مقدار با مقادیر فایل‌ میگیرد. اگر لازم باشد داده‌های رشته‌ای نیز ارسال شود باید در همین کلید معرفی شود.
زمانی که کلید multipart را مقداردهی میکنید فرمورک مقدار headers['content-type'] را برابر `multipart/form-data` قرار میدهد.
مقادیر وارد شده زمان ارسال درخواست به کلید body اضافه شده و ارسال میشود.

**توجه :** اگر در درخواست کلید multipart را مقداردهی کرده باشید دیگر نباید کلیدهای form_params و json را مقداردهی کنید.

```php
$params = [
	'multipart' => [
		'image' => new File\Loca("packages/packagename/image/img.jpg"),
		'pdf' => new File\Loca("packages/packagename/files/file.pdf"),
		'title' => 'files of packagename'
	]
];
```

### [proxy](#proxy)
گاها لازم است برای اتصال به برخی از سرورها از پروکسی استفاده شود. برای تنظیم پروکسی لازم است آدرس هاست، پورت و در صورت نیاز نام کاربری و رمز عبور بصورت آرایه به  کلید proxy داده شود.

```php
$params = [
	'proxy' => [
		'hostname' => '1.2.3.4',
		'port' => 123,
		'username' => 'ali',
		'password' => '12345678'
	]
];
```

### [save_as](#save_as)
درخواست‌هایی که بمنظور دانلود یک فایل ارسال می‌شود لازم است در کلید save_as محل ذخیره فایل نیز مشخص شود. ورودی این کلید شئ از کلاس [File](file.md) میباشد.

```php
$params = [
	'save_as' => new File\Local("/tmp/download/file.format")
];
```

### [json](#json)
برای ارسال داده‌هایی با فرمت json از کلید json استفاده میشود. 
این کلید آرایه‌ای از مقادیر بصورت کلید مقدار دریافت می‌کند و فرمورک بصورت خودکار به فرمت json تبدیل میکند.
زمانی که کلید json را مقداردهی میکنید فرمورک مقدار headers['content-type'] را برابر `application/json` قرار میدهد.
مقادیر وارد شده زمان ارسال درخواست به کلید body اضافه شده و ارسال میشود.

**توجه :** اگر در درخواست کلید json را مقداردهی کرده باشید دیگر نباید کلیدهای form_params و multipart را مقداردهی کنید.

```php
$params = [
	'form_params' => [
		'keyOne' => 'valueOne',
		'keyTwo' => 'valueTwo'
	]
];
```

### [base_uri](#base_uri)
ممکن است بخواهید چندین درخواست برای صفحات مختلف یک سایت ارسال کنید، در این شرایط میتوانید آدرس دامنه سایت را به کلید base_uri  داده و به آرگومان اول متدهای get , post آدرس صفحه موردنظر را بدهید.

همچنین میتوانید بجای مقداردهی کلید base_uri آدرس دامنه را زمان ایجاد شئ مقداردهی کنید.


```php
$client = new Client();
$params = [
	'base_uri' => 'http://www.example.com/',
	'form_params' => [
		'username' => 'john',
		'password' => 12345678
	]
];
$client->post('userpanel/login', $params);
$client->get('userpanel/documents', [
	'save_as' => new File\Local("/tmp/download/doc.pdf")
]);
```

```php
$client = new Client('http://www.example.com/');

$client->post('register', [
	'json' => [
		'name' => "John",
		'email' => "john@yahoo.com"
	]
]);
$client->get('userpanel/tickets', ["query" => ["ajax" => 1]]);
```

### چند‌مثال

**مثال 1**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Log, IO\File, Http};

class FileManager extends Controller {

    public function downloadPHPDoc(File $source) {
		$log = Log::getInstance();
        $sourceDirectory = $source->getDirectory();
		if (!$sourceDirectory->exists()) {
			$sourceDirectory->make(true);
		}
        
		$client = new Http\Client();
		try {
			$log->info("init client params");
			$params = array(
				"ssl_verify" => false,
				"cookies" => false,
				"save_as" => $source
			);
			$log->reply($params);
			$log->info("send http request for download php_manual_en.html.gz from php.net");

			$response = $client->get("https://www.php.net/distributions/manual/php_manual_en.html.gz", $params);
		} catch (Http\ClientException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
			
		} catch (Http\ServerException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		}
    }
}
```
کد فوق فایل با فرمت gz را دانلود میکند. فایل در محلی که توسط ورودی متد downloadPHPDoc مشخص شده است ($source) و به کلید save_as داده شده است ذخیره می‌شود.

**مثال 2**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Log, IO\File, Http};

class FileManager extends Controller {

	public function download(string $filePath, File $source, array $auth, string $url) {
		$log = Log::getInstance();
		$log->info("insure the source directory is exists");

		$sourceDirectory = $source->getDirectory();
		if (!$sourceDirectory->exists()) {
			$sourceDirectory->make(true);
		}

		$log->info("send http client request to {$username}@", $url, " for download ", $filePath);
		$client = new Http\Client();
		try {
			$log->info("init client params");
			$params = array(
				"ssl_verify" => false,
				"cookies" => "/tmp/cookies.txt",
				"save_as" => $source,
				"auth" => array(
					"username" => $auth['username'],
					"password" => $auth['password'],
				),
				"query" => array(
					"path" => $filePath
				),
			);
			$log->reply($params);
			$response = $client->get($url, $params);
		} catch (Http\ClientException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		} catch (Http\ServerException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		}
	}
}
```
در مثال فوق برای دانلود فایل در سرور نیاز به احراز هویت میباشد. در کلید auth نام کاربردی و رمز عبور مشخص شده است. 
 آدرس فایل دانلود در پارامتر path مشخص شده است که به ادامه‌ی url اضافه میشود.
در کلید cookies  آدرس فایل ذخیره کوکی ها مشخص شده است.

**مثال 3**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Log, IO\File, Http, Exception};

class FileManager extends Controller {

	public function upload(array $auth, string $url) {
		$log = Log::getInstance();
		if (!$source->exists()) {
			throw new Exception("file not exists");
		}

		$client = new Http\Client();
		try {
			
			$log->info("init client params");
			$params = array(
				"ssl_verify" => false,
				"cookies" => false,
				'proxy' => [
					'hostname' => '1.2.3.4',
					'port' => 123,
					'username' => 'ali',
					'password' => '12345678'
				],
				'multipart' => [
                    'file' => new File\Local("packages/packagename/doc.pdf")
                ]
			);
			$response = $client->post($url, $params);
			
		} catch (Http\ClientException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		} catch (Http\ServerException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		}
	}
}
```
در کد فوق کاربر به پروکسی مشخص شده متصل میشود و سپس فایل داده شده به کلید multipart برای سرور ($url) ارسال می‌شود.

**مثال 4**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Log, Http};

class Main extends Controller {

	public function sendInfo(string $name, string $city, int $age) {
		$log = Log::getInstance();

		$client = new Http\Client();
		try {
			
			$log->info("init client params");
			$params = array(
				"ssl_verify" => true,
				"cookies" => false,
				'form_params' => [
					'name' => $name,
					'city' => $city,
					'age' => $age
				]
			);
			$response = $client->post("https://www.example.com", $params);
			
		} catch (Http\ClientException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		} catch (Http\ServerException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		}
	}
}
```

**مثال 5**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Log, Http};

class Users extends Controller {

	public function register(array $info) {
		$log = Log::getInstance();

		$client = new Http\Client("https://www.example.com");
		try {

			$log->info("init client params for register");
			$params = array(
				"ssl_verify" => true,
				"cookies" => false,
				'json' => [
					'username' => $info['username'],
					'password' => $info['password'],
					'email' => $info['email']
				]
			);
			$response = $client->post('register', $params);
			
			$log->info("init client params for complete profile");
			$params = array(
				"ssl_verify" => true,
				"cookies" => false,
				'form_params' => [
					'name' => $info['name'],
					'city' => $info['city'],
					'age' => $info['age'],
					'address' => $info['address']
				],
				'query' => [
					'user' => $info['username']
				]
			);
			$response = $client->post('userpanel/profile', $params);
			
		} catch (Http\ClientException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		} catch (Http\ServerException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		}
	}
}
```

## [کلاس Response](#response)
درخواست‌های اینترنتی با فراخوانی متد‌های get , post کلاس `packages\base\http\Client` ارسال میشود. خروجی متدها شئ از کلاس `packages\base\http\Response` میباشد. 
با فراخوانی متدهای کلاس Response میتوانید به اطلاعاتی مانند کد وضعیت، هدر پاسخ و اطلاعاتی که از سمت سرور ارسال شده است دسترسی داشته باشید. 

همچنین در استثناهای پرتاب شده با فراخوانی متد `getResponse()` روی شئ استثنا، میتوانید به کلاس Response دسترسی داشته باشید.

متدهای این کلاس بشرح زیر میباشند. 

|   متد   |    کاربرد   |
|-------------|-----------|
| getStatusCode()   |      خواندن کد وضعیت     |
| getHeader($name)    |     خواندن یکی از پارامترهای هدر     |
| getHeaders()    |      خواندن پارامترهای هدر   |
| getBody()    |   دریافت اطلاعات ارسال شده از سمت سرور       |
| getPrimaryIP()    |      خواندن IP |


**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Log, Http};

class Main extends Controller {

	public function register(string $name, string $email) {
		$log = Log::getInstance();

		$client = new Http\Client();
		try {
			
			$log->info("init client params");
			$params = array(
				"ssl_verify" => true,
				"cookies" => false,
				'json' => [
					'name' => $name,
					'email' => $email
				]
			);
			$response = $client->post("https://www.example.com", $params);
			print_r($response->getHeader("date"));
			print_r($response->getBody());

			/**
			 * output:
			 * Fri, 20 Nov 2020 17:25:27 GMT
			 * Array
				(
					[status] => your register is completed.
				)
			*/
		} catch (Http\ClientException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		} catch (Http\ServerException $e) {
			echo "Error {$e->getResponse()->getStatusCode()} has occurred";
		}
	}
}
```

## [کلاس Request](#request)
زمان ارسال درخواست فرمورک شئ از کلاس `packages\base\http\Request` ایجاد میکند. 

اگر روند اجرا بدرستی انجام نشود و استثنا پرتاب شود میتوانید با فراخوانی متد `getRequest()` روی شئ استثنا به کلاس Request دسترسی داشته باشید و با فراخوانی متدهای تعریف شده در کلاس، درخواست ارسال شده را بررسی کنید.

متدهای این کلاس بشرح زیر میباشند. 

|   متد   |    کاربرد   |
|-------------|-----------|
| getMethod()   |      نوع درخواست (GET یا POST)     |
| getHost()    |     گرفتن قسمت هاست آدرس     |
| getURI()    |      گرفتن قسمت URI آدرس   |
| getQuery()    |   گرفتن پارامترهای آدرس      |
| getURL()    |      گرفتن آدرس بطور کامل  |
| getPort()    |      گرفتن پورت |
| getIP()    |      گرفتن IP |
| getHeader(string $name)    |      گرفتن پارامتر مشخصی از هدر |
| getHeaders()    |      گرفتن پارامترهای هدر |
| getBody()   |      گرفتن داده‌های ارسالی در درخواست |
| getProxy()    |      گرفتن پروکسی تنظیم شده |
| getSaveAs()   |      گرفتن فایل مشخص شده برای ذخیره فایل دانلود شده |
| getOutgoingIP   |       گرفتن IP مشخص شده از بین IP های سرور|


**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Log, Http};

class Main extends Controller {

	public function register(string $name, string $email) {
		$log = Log::getInstance();

		$client = new Http\Client();
		try {
			
			$log->info("init client params");
			$params = array(
				"ssl_verify" => true,
				"cookies" => false,
				'json' => [
					'name' => $name,
					'email' => $email
				]
			);
			$response = $client->post("https://www.example.com", $params);

		} catch (Http\ClientException $e) {
            print_r($e->getRequest()->getHeaders());
            print_r($e->getRequest()->getBody());
		} catch (Http\ServerException $e) {
			echo "URL: {$e->getRequest()->getURL()}";
		}
	}
}
```