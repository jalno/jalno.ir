# اعتبار سنجی

اطلاعات ارسال شده از سمت کاربر می بایست قبل از هرگونه عملیات، اعتبار سنجی شوند . بررسی رشته های دریافتی برای اطمینان از عدم وجود کد و یا کد های مخرب برنامه نویسی یکی از مهم ترین کارهایی است که در این بخش باید کنترل شوند .
فقط فیلد هایی که باید دریافت کنید را مشخص کنید تا مابقی فیلد ها ( که ممکن است توسط افراد مخرب در مقدار های ارسالی گنجانده شده اند ) نادیده گرفته شوند . میتوانید نوع و یا مقداری که انتطار دارید توسط کاربر از هر فیلد دریافت کنید را مشخص کنید . اعتبار سنج به صورت خودکار هر مقدار و یا نوعی  به غیر از آنچه مشخص شده دریافت کنید ، با پرتاب یک استثناء از جنس `packages\base\InputValidationException`  از ادامه عملیات جلوگیری خواهد کرد .
برای این موضوع میتوانید از متد `checkinputs`  کلاس `packages\base\controller`   استفاده کنید .

## [متد checkinputs](#checkinputs) 
آرگومان ورودی این متد آرایه ای میباشد که کلیدهای آن نام فیلد های فرم هستند و هرکدام از کلیدها ارایه‌ای دریافت میکند که نوع، مقدار پیشفرض، مقدار های مورد انتظار، اختیاری بودن و یا مجاز به خالی بودن برای هر فیلد  را به صورت جداگانه مشخص میکند.
خروجی این متد یک آرایه با همان کلید های داده شده و مقدار های اعتبار سنجی شده است.

## [نوع داده](#validation_type)
با استفاده از کلید `type` نوع داده دریافتی مشخص می‌شود.

```php
$this->checkinputs(array(
	'id' => array(
		'type' => 'number',
	),
));
```

## انواع داده های اعتبار‌سنجی
در فریمورک برای انواع مختلف داده ها کلاس هایی برای اعتبار سنجی تعریف شده است که داده های زیر را بررسی میکنند. 

+ [داده های رشته ای](#string_validator)
+ [داده های عددی](#number_validator)
+ [داده های boolean](#bool_validator)
+ [تاریخ](#date_validator)
+ [شماره همراه](#cellphone_validator)
+ [ایمیل](#email_validator)
+ [ip ورژن 4](#ipv4_validator)
+ [آدرس اینترنتی (url)](#url_validator)
+ [فایل](#file_validator)
+ [تصویر](#image_validator)
+ [داده‌هایی از جنس کلاس های Model](#model_validator)
+ [توابع](#Closures_validator)

اگر داده های مورد اعتبارسجی نوعی بجز موارد بالا باشد برنامه نویس میتواند اعتبارسنج جدید ایجاد نمایید.

برای تعریف اعتبار‌سنج جدید باید کلاسی تعریف کرد که از اینترفیس `packages\base\Validator\IValidator` implements شده باشد. 

در اینترفیس IValidator متد `getTypes()` برای مشخص کردن نام اعتبارسنج و متد `validate()` برای عملیات اعتبارسنجی در نظرگرفته شده است.

برای مشاهده نمونه کدهای اعتبارسنج میتوانید به کلاس های اعتبارسنج تعریف شده فریمورک در [این پوشه](https://github.com/Jalno/base/tree/master/packages/base/libraries/validator/validators) مراجعه کنید.


### [استفاده از اعتبارسنج جدید](#howto_add_new_validator)
زمان استفاده از اعتبارسنج جدید با استفاده از متد `addValidator()` اعتبار سنج جدید معرفی می‌شود. 
این متد باید قبل از فراخوانی متد `checkinputs()` فراخوانی شود.

همچنین میتوان بجای فراخوانی متد `addValidator()` در ایندکس type namespace کلاس اعتبار‌سنج داده شود.

درمثال زیر اعتبارسنج جدید (IBANValidator) معرفی شده است.
مقدار داده شده به ایندکس type نامی است که در متد `getTypes()` کلاس اعتبارسنج تعیین شده است.

**اعتبار سنج جدید نوشته شده**
```php
<?php
namespace packages\packagename\Validators;

use packages\packagename\Bank;
use packages\base\{InputValidationException, Validator\IValidator, db\DuplicateRecord};

class IBANValidator implements IValidator {
	
	/**
	 * Get alias types
	 * 
	 * @return string[]
	 */
	public function getTypes(): array {
		return ['iban'];
	}

	/**
	 * Validate data to be a IBAN code.
	 * 
	 * @throws packages\base\InputValidationException
	 * @param string $input
	 * @param array $rule
	 * @param mixed $data
	 * @return array
	 */
	public function validate(string $input, array $rule, $data): array {
		if (!is_array($data)) {
			throw new InputValidationException($input);
		}
		if (!$data) {
			if (!isset($rule['empty']) or !$rule['empty']) {
				throw new InputValidationException($input);
			}
			if (isset($rule['default'])) {
				return $rule['default'];
			}
		}
		foreach ($data as $key => $value) {
			if (!isset($value["id"])) {
				throw new InputValidationException($input . "[{$key}][id]");
			}
			if (!isset($value["account"])) {
				throw new InputValidationException($input . "[{$key}][account]");
			}
		}
		foreach ($data as $key => $value) {
			foreach ($data as $key2 => $value2) {
				if ($key != $key2 and $value["id"] == $value2["id"]) {
					throw new DuplicateRecord($input . "[{$key}][id]");
				}
			}
			$bank = Bank::byId($value["id"]);
			if (!$bank) {
				throw new InputValidationException($input . "[{$key}][id]");
			}
			$data[$key]["bank"] = $bank;
		}
		return $data;
	}
}
```

**1 مثال :**
```php
<?php
namespace packages\packagename\controllers;

use packages\base\{Controller, Response, Validator};
use packages\packagename\{Validators\IBANValidator};

class Banks extends Controller {
	public function update(): Response {
		Validator::addValidator(IBANValidator::class);
		$inputs = $this->checkinputs(array(
			"banks" => array(
				"type" => 'iban',
			),
		));
		foreach ($inputs["banks"] as $item) {
			$item["bank"]->account = $item["account"];
			$item["bank"]->save();
		}
		$this->response->setStatus(true);
		return $this->response;
	}
}
```

**مثال 2 :**
```php
<?php
namespace packages\packagename\controllers;

use packages\base\{Controller, Response};
use packages\packagename\{Validators\IBANValidator};

class Banks extends Controller {
	public function update(): Response {
		$inputs = $this->checkinputs(array(
			"banks" => array(
				"type" => IBANValidator::class,
			),
		));
		foreach ($inputs["banks"] as $item) {
			$item["bank"]->account = $item["account"];
			$item["bank"]->save();
		}
		$this->response->setStatus(true);
		return $this->response;
	}
}
```

### [خالی بودن](#empty_validation)
با استفاده از کلید `empty` مجوز خالی بودن یا نبودن فیلد مشخص می‌شود. مقدار این کلید true یا false می‌تواند باشد. 
مقدار true برای مجوز خالی بودن است. مقدار پیش فرض این کلید false می‌باشد.

### [اختیاری بودن](#optional_validation)
با استفاده از کلید `optional` اجازه وجود و یا عدم وجود فیلد ورودی داده می‌شود . 
مقدار پیش فرض این کلید false میباشد . 
اگر این کلید false باشد و فیلد ورودی تعریف نشده باشد استثنا inputValidationException پرتاب میشود.

### [مقدار پیشفرض](#default_validation)
با استفاده از کلید `default` برای فیلد مورد نظر مقدار پیش فرض مشخص میشود.
اگر فیلد مجوز خالی بودن داشته باشد در صورت خالی بودن مقدار پیشفرض به عنوان value در نظر گرفته می‌شود.

### [مقادیر ثابت](#values_validation)
اگر داده های دریافت شده دارای مقادیر مشخص و ثابتی هستند با استفاده از کلید `values` میتوان مقادیر را مشخص کرد. این کلید برای input های checkbox, select,... که دارای تعداد value های ثابت هستند کاربرد بیشتری دارد. 


## [داده های رشته ای](#string_validator) 
برای اعتبار‌سنجی داده های رشته ای از ‌مقدار `string` برای کلید type استفاده می‌شود.
برای داده‌هایی که از نوع string باشند میتوان کلید های زیر را برای مدیریت اعتبارسنجی آن تعریف کرد.


### [عبارت منظم](#regex_validation)
اگر فیلدی که دریافت می‌کنیم باید از قاعده ی مشخصی پیروی کند با استفاده از کلید `regex` قاعده آن مشخص می‌شود.

**مثال**
```php
<?php
namespace packages\packagename\controllers;

use packages\base\{Controller, Response};

class Order extends Controller {
	public function validateDomain(): Response {
		$this->checkinputs(array(
			'domain' => array(
				'type' => 'string',
				'regex' => '/^([a-z0-9\\-]+\\.)+[a-z]{2,12}$/i', // Thrown InpuvalidationException in response if given domain is not match to this pattern
			),
		));
		$this->response->setStatus(true);
		return $this->response;
	}
}
```

### [حذف whitespace](#string_validation_trim)
کلید `trim` مانند متد [<span class="d-inline ltr">trim()</span>](https://www.php.net/trim) در  php عمل میکند‌. این کلید میتواند مقادیر true یا false داشته باشد.
اگر trim مقدار دهی نشود در فریمورک بطور خودکار whitespace های داده حذف می‌شوند. برای جلوگیری از حذف whitespace ها باید مقدار trim را برابر با false قرار دهید.

### [کدها و تگ ها](#string_validation_allow_htmltags)
اگر داده دریافتی کد باشد باید مقدار کلید `htmlTags` را برابر با true قرار دهید در غیر اینصورت کد ها به صورت اسکی خود تبدیل می‌شوند.
بطور مثال اگر داده ورودی `<h1> salam </h1>` باشد و مقدار htmlTags برابر true باشد داده ورودی به `&lt;h1&gt;salam&lt;/h1&gt;` تبدیل می‌شود.
مقدار پیشفرض این کلید false است.

### [رشته های چند خطی](#string_validation_allow_multiLines)
 اگر داده ورودی چند خطی باشد، اگر بخواهیم <span class="d-inline ltr">\n</span> را از داده حذف کنیم باید به کلید `multiLine` مقدار false میدهیم. اگر این کلید مقدار دهی نشود داده ها میتوانند چند خطی باشند.


**مثال :**
```php
<?php
namespace packages\packagename\controllers;

use packages\blog\Comment;
use packages\base\{Controller, Response};

class Blog extends Controller {
	public function comment(): Response {
		$inputs = $this->checkinputs(array(
			'name' => array(
				'type' => 'string',
				'multiLine' => false,
			),
			'message' => array(
				'type' => 'string',
			),
		));
		$model = new Comment();
		$model->name = $inputs["name"];
		$model->message = $inputs["message"];
		$model->save();
		$this->response->setStatus(true);
		return $this->response;
	}
}
```

### [داده های عددی](#number_validator)
برای اعتبار‌سنجی داده های عددی از ‌مقادیر 
`number`, `int`, `int8`, `int16`, `int32`, `int64`, `uint`, `uint8`, `uint16`, `uint32`, `uint64`, `float` برای کلید type استفاده می‌شود.

هریک از موارد فوق، رنج عدد و همچنین مثبت و منفی بودن آن را مشخص میکند که قوانین آن در جدول زیر قابل مشاهده است.

|   نوع   |   رنج عددی مجاز            |
|-------------------|-----------------------------|
|  <div class="display-block ltr">number</div>           |    تمامی اعداد مثبت و منفی را میپذیرد     |
|  <div class="display-block ltr">int</div>              |                     تمامی اعداد مثبت و منفی را میپذیرد         |
|  <div class="display-block ltr">int8</div>             |        -128 تا 127          |
|  <div class="display-block ltr">int16</div>            |        -32768 تا 32767      |
|  <div class="display-block ltr">int32</div>            |        -2147483648 تا 2147483647     |
|  <div class="display-block ltr">int64</div>            |        تمامی اعداد مثبت و منفی را میپذیرد    |
|  <div class="display-block ltr">uint8</div>            |        0 تا 255   |
|  <div class="display-block ltr">uint16</div>           |        0 تا 65535    |
|  <div class="display-block ltr">uint32</div>           |        0 تا 4294967295    |
|  <div class="display-block ltr">uint64</div>           |        تمامی اعداد مثبت را میپذیرد   |
|  <div class="display-block ltr">float</div>            |        اعداد اعشاری   |

علاوه بر قوانینی که برای هریک از مقادیر فوق وجود دارد میتوان بصورت دستی رنج عددی را مشخص کرد. این تنظیمات با استفاده از دو کلید `min` و `max` انجام پذیر می‌باشد.

نوع های `float` و `number` مقدار ورودی صفر‍ را نمیپذیرند و استتثنا `InputValidationException` پرتاب میشود . برای جلوگیری از این استثنا و پذیرش عدد صفر، باید کلید `zero` با مقدار true تعریف کرد.

**نکته 1 :** اگر فیلد از نوع عددی باشد و empty آن برابر true باشد زمانی که مقدار این فیلد خالی باشد، مقدار null برای فیلد در نظر گرفته میشود.

**نکته 2 :** اگر عدد وارد شده خارج از رنج مجاز عددی باشد استثنا از جنس `InputValidationException` با پیغام `min-value` یا `max-value` پرتاب میشود.

**نکته 3 :** اگر داده وارد شده عدد نباشد استثنا از جنس `InputValidationException` با پیغام `not-a-number` پرتاب میشود.

**نکته 4 :** اگر عدد وارد شده برابر با value تعریف شده نباشد استثنا از جنس `InputValidationException` با پیغام `not-defined-value` پرتاب میشود.

**مثال 1**
```php
<?php
namespace packages\packagename\controllers;

use packages\cronjob\Task;
use packages\base\{Controller, Response};

class Cronjobs extends Controller {
	public function store(): Response {
		$inputs = $this->checkinputs(array(
			'hour' => array(
				'type' => 'number',
				'values' => range(0, 24),
			),
			'minuts' => array(
				'type' => 'string',
				'min' => 0,
				'max' => 60,
			),
			'command' => array(
				'type' => 'string',
				'htmlTags' => true,
			),
			'port' => array(
				'type' => 'uint16',
				'optional' => true,
				'default' => 22,
			),
		));
		$model = new Task();
		$model->hour = $inputs["hour"];
		$model->minuts = $inputs["minuts"];
		$model->command = $inputs["command"];
		$model->port = $inputs["port"];
		$model->save();
		$this->response->setStatus(true);
		return $this->response;
	}
}
```

**مثال 2**
```php
<?php
namespace packages\packagename\controllers;

use packages\base\{Controller, Response, Options};

class Chats extends Controller {
	public function update(): Response {
		$inputs = $this->checkinputs(array(
			'prev_messages_count' => array(
				'type' => 'number',
				'min' => -100,
				'max' => 100,
				'zero' => true,
			),
		));
		Options::save("packages.packagename.chats.prev_messages_count", $inputs['prev_messages_count']);
		$this->response->setStatus(true);
		return $this->response;
	}
}
```
**توجه :**در مثال فوق اگر index `zero` .تعریف نشود عدد صفر را نمیپذیرد.

### [داده های boolean](#bool_validator)
برای اعتبارسنجی داده های boolean از کلید `bool` برای مقدار type  استفاده می‌شود.
مقادیر ورودی میتواند 0، 1، true و یا false باشد.

**نکته :** اگر مقدار empty برابر true باشد، درصورتی که فیلد خالی باشد مقدار آن برابر false در نظر گرفته می‌شود.

**مثال**
```php
<?php
namespace packages\packagename\controllers;

use packages\base\{Controller, Response, Options};

class Chats extends Controller {
	public function update(): Response {
		$inputs = $this->checkinputs(array(
			'status' => array(
				'type' => 'bool',
			),
		));
		Options::save("packages.packagename.chats.one-on-one-chats.status", $inputs['status']);
		$this->response->setStatus(true);
		return $this->response;
	}
}
```

### [تاریخ](#date_validator) 
برای اعتبار سنجی تاریخ از مقدار `date` برای کلید type استفاده می‌شود. این اعتبارسنج ورودی های تاریخ را به شکل YYYY/MM/DD و یا همراه با زمان بصورت YYYY/MM/DD HH:II:SS میپذیرد.

**توجه :** سال باید بصورت چهاررقمی وارد شود. روز و ماه میتواند یک یا دو رقمی وارد شود.

برای تاریخ کلید `unix` تعریف شده است اگر این کلید تعریف نشود و یا مقدار false داشته باشد خروجی اعتبارسنج، تاریخ وارد شده میباشد و اگر مقدار true داشته باشد خروجی آن timestamp تاریخ وارد شده است.

**مثال**
```php
<?php
namespace packages\packagename\controllers;

use packages\shop\category\Special;
use packages\base\{Controller, Response, Date, Options, InputValidationException};

class Shop extends Controller {
	public function updateSpecialSells(): Response {
		$inputs = $this->checkinputs(array(
			'start_at' => array(
				'type' => 'date',
				'unix' => true,
				'optional' => true,
				'default' => Date::time(),
			),
			'end_at' => array(
				'type' => 'date',
				'unix' => true,
			),
		));
		if ($inputs["start_at"] < Date::time()) {
			throw new InputValidationException("start_at");
		}
		if ($inputs["end_at"] <= $inputs["start_at"]) {
			throw new InputValidationException("end_at");
		}
		$models = Special::where("status", Special::ACTIVE)->get();
		foreach ($models as $model) {
			$model->start_at = $inputs["start_at"];
			$model->end_at = $inputs["end_at"];
			$model->save();
		}
		$this->response->setStatus(true);
		return $this->response;
	}
}
```

### [شماره همراه](#cellphone_validator)
برای اعتبارسنجی شماره موبایل از مقدار `cellphone` برای کلید type استفاده میشود.

__نکته__: در حال حاضر فقط اعتبار سنجی شماره های همراه اپراتور های ایران در جالنو به صورت پیشفرض وجود دارد. 
همچنین بطور پیش فرض کد ایران 98 تنظیم شده است. برای تغییر آن میتوانید تنظیم با نام `packages.base.validators.default_cellphone_country_code` در فایل تنظیمات جالنو در مسیر `packages/base/libraries/config/config.php` را به مقدار مورد نظر تغییر دهید..

اعتبارسنج ورودی ها را با فرمت های
9131101234 , 09131101234 , 989131101234 , 9809131101234 , <span class="d-inline ltr">+989131101234</span> و 98989131101234 را گرفته و پس از بررسی شماره وارد شده را بصورت 989131234567 برمیگرداند.


**مثال**
```php
<?php
namespace packages\packagename\controllers;

use packages\packagename\User as Medel;
use packages\base\{Controller, Response, InputValidationException, Password, Session};

class Users extends Controller {
	public function login(): Response {
		$inputs = $this->checkinputs(array(
			'username' => array(
				'type' => 'cellphone',
			),
			'password' => array(),
		));
		$model = new Medel();
		$model->where("username", $inputs["username"]);
		$user = $user->getOne();
		if (!$user) {
			throw new InputValidationException("username");
		}
		if (!Password::verify($inputs["password"], $user->password)) {
			throw new InputValidationException("password");
		}
		Session::set("loggin", true);
		Session::set("userID", $user->id);
		$this->response->setStatus(true);
		return $this->response;
	}
}
```

### [ایمیل](#email_validator)
برای اعتبارسنجی ایمیل از مقدار `email` برای کلید type استفاده میشود.

**مثال**
```php
<?php
namespace packages\packagename\controllers;

use packages\packagename\User as Model;
use packages\base\{Controller, Response, InputValidationException, Session};

class Users extends Controller {
	public function login(): Response {
		$inputs = $this->checkinputs(array(
			'username' => array(
				'type' => 'email',
			),
			'password' => array(),
		));
		$model = new Model();
		$model->where("username", $inputs["username"]);
		$user = $user->getOne();
		if (!$user) {
			throw new InputValidationException("username");
		}
		if (!Password::verify($inputs["password"], $user->password)) {
			throw new InputValidationException("password");
		}
		Session::set("loggin", true);
		Session::set("userID", $user->id);
		$this->response->setStatus(true);
		return $this->response;
	}
}
```
**مثال 2**
```php
<?php
namespace packages\packagename\controllers;

use packages\packagename\User as Model;
use packages\base\{Controller, Response, InputValidationException, Session};

class Users extends Controller {
	public function login(): Response {
		$inputs = $this->checkinputs(array(
			'username' => array(
				'type' => ['email', 'cellphone'],
			),
			'password' => array(),
		));
		$model = new Model();
		$model->where("username", $inputs["username"]);
		$user = $user->getOne();
		if (!$user) {
			throw new InputValidationException("username");
		}
		if (!Password::verify($inputs["password"], $user->password)) {
			throw new InputValidationException("password");
		}
		Session::set("loggin", true);
		Session::set("userID", $user->id);
		$this->response->setStatus(true);
		return $this->response;
	}
}
```

### [ip ورژن 4](#ipv4_validator)
برای اعتبارسنجی ip ورژن چهار از مقدار `ip4` برای کلید type استفاده میشود.

**مثال 1**
```php
<?php
namespace packages\packagename\controllers;

use packages\cronjob\Task;
use packages\base\{Controller, Response};

class Cronjobs extends Controller {
	public function store(): Response {
		$inputs = $this->checkinputs(array(
			'hour' => array(
				'type' => 'number',
				'values' => range(0, 24),
			),
			'minuts' => array(
				'type' => 'string',
				'min' => 0,
				'max' => 60,
			),
			'ip' => array(
				'type' => 'ip4',
			),
			'command' => array(
				'type' => 'string',
				'htmlTags' => true,
			),
			'port' => array(
				'type' => 'uint16',
				'optional' => true,
				'default' => 22,
			),
		));
		$model = new Task();
		$model->hour = $inputs["hour"];
		$model->minuts = $inputs["minuts"];
		$model->ip = $inputs["ip"];
		$model->command = $inputs["command"];
		$model->port = $inputs["port"];
		$model->save();
		$this->response->setStatus(true);
		return $this->response;
	}
}
```

## [آدرس اینترنتی (url)](#url_validator)
برای اعتبارسنجی آدرس‌های url از مقدار `url` برای کلید type استفاده میشود.

اگر در url لازم به نوشتن پروتکل و یا بررسی نوع پروتکل باشیم با تعریف کلید `protocols` با مقدار نوع پروتکل مورد نظر برای اعتبارسنجی وجود پروتکل را اجباری میکنیم. 
برای protocols میتوان آرایه ای ازپروتکل ها را معرفی کرد.

**مثال**
```php
<?php
namespace packages\packagename\controllers;

use packages\cronjob\Task;
use packages\base\{Controller, Response};

class Cronjobs extends Controller {
	public function store(): Response {
		$inputs = $this->checkinputs(array(
			'hour' => array(
				'type' => 'number',
				'values' => range(0, 24),
			),
			'minuts' => array(
				'type' => 'string',
				'min' => 0,
				'max' => 60,
			),
			'ip' => array(
				'type' => 'ip4',
			),
			'hostname' => array(
				'type' => 'url',
				'protocols' => 'https',
			),
			'command' => array(
				'type' => 'string',
				'htmlTags' => true,
			),
			'port' => array(
				'type' => 'uint16',
				'optional' => true,
				'default' => 22,
			),
		));
		$model = new Task();
		$model->hour = $inputs["hour"];
		$model->minuts = $inputs["minuts"];
		$model->command = $inputs["command"];
		$model->ip = $inputs["ip"];
		$model->hostname = $inputs["hostname"];
		$model->port = $inputs["port"];
		$model->save();
		$this->response->setStatus(true);
		return $this->response;
	}
}
```
درمثال فوق اگر آدرس فاقد پروتکل یا پروتکل آن برابر https .نباشد استثنا پرتاب میشود.


## [فایل](#file_validator)
برای اعتبارسنجی فایل ها از مقدار `file` برای کلید type استفاده میشود. میتوان از کلید های زیر برای مدیریت اعتبارسنجی فایل ها استفاده کرد. 

### [نوع فایل](#file_validation_extension) 
از کلید `extension` برای مشخص کردن نوع فایل استفاده میشود. مقدار آن میتواند بصورت ارایه‌ای از پسوند‌های مجاز باشد. 
اگر extension مقدار‌دهی نشود فایل با هر پسوندی پذیرفته می‌شود.

### [اندازه فایل](#file_validation_size)
با استفاده از کلید‌های `min-size` و `max-size` میتوان برای فایل دریافتی محدودیت اندازه مشخص  کرد. 

### [ارسال چند فایل](#file_validation_multiple)
اگر فایل دریافتی بصورت آرایه‌ای از چند فایل باشد با قرار دادن مقدار true برای کلید `multiple` ‌‌‌به فریمورک اعلام میشود داده دریافتی شامل چند فایل میباشد.

### [تبدیل فایل دریافتی به شی کلاس File](#file_validation_file_object)
با تعریف کلید `obj` با مقدار true فایل دریافتی به یک شی از کلاس local\Tmp تبدیل میشود. اگر این کلید مقدار دهی نشود برابر false در نظر گرفته میشود، در اینصورت خروجی اعتبارسنج همانند خروجی <span class="d-inline ltr">$_FILES</span> میباشد.

__برای اطلاعات بیشتر در رابطه با فایل ها به صفحه [فایل](file.md) مراجعه کنید.__

**توجه :** هنگام کار با فایل ها تگ form باید صفت `enctype="multipart/form-data"` را داشته باشد.

**1 مثال**
```php
<?php
namespace packages\packagename\controllers;

use packages\base\{Controller, Response, Packages};

class Files extends Controller {
	public function upload(): Response {
		$inputs = $this->checkInputs(array(
			"files" => array(
				"type" => "file",
				"max-size" => 2097152 \\ Byte
				"obj" => true, 
				"extension" => ["pdf", "word"],
				"multiple" => true, // You can false or remove this line if you to accept only one file.
			),
		));
		foreach ($inputs["files"] as $file) {
			$name = $file->md5();
			$localFile = Packages::package("packagename")->file("storage/private/files/{$name}.{$file->getExtension()}");
			if ($localFile->exists()) {
				continue;
			}
			$directory = $localFile->getDirectory();
			if (!$directory->exists()) {
				$directory->make(true);
			}
			$file->copyTo($localFile);
		}

		$this->response->setStatus(true);
		return $this->response;
	}
}

```
در مثال فوق فقط فایل های pdf یا word پذیرفته میشوند و حداکثر حجم آن 2 مگابایت میتواند باشد.
و خروجی اعتبارسنج، شی از کلاس local\Tmp میباشد.


## [تصاویر](#image_validator)
در فریمورک برای اعتبارسنجی تصاویر علاوه بر استفاده از اعتبارسنج فایل ها، بطور اختصاصی اعتبارسنجی برای تصاویر در نظر گرفته شده است که برای استفاده از آن، از مقدار `image` برای کلید type استفاده میشود.

اعتبارسنج، تصاویر با پسوند های `jpeg`, `jpg`, `png`, `gif`, `webp` را میپذیرد.

با استفاده از کلید `extension` میتوان مشخص کرد تنها تعدادی از پسوند های فوق پذیرفته شود.

برای اعتبارسنجی تصاویر میتوان عواملی مانند سایز تصویر و طول و عرض آن را نیز اعتبارسنجی کرد.
از کلید های زیر برای مدیریت اعتبارسنجی تصاویر استفاده میشود.

### [سایز تصویر](#image_validation_size) 
با استفاده از کلید‌های `min-size` و `max-size` میتوان برای تصویر دریافتی محدودیت اندازه مشخص  کرد. 

### [عرض تصویر](#image_validation_width)
برای مشخص کردن حداقل و حداکثر عرض مجاز تصویر از کلید `min-width` و `max-width` استفاده می‌شود که مقدار آن عددی بر‌حسب پیکسل می‌باشد.

### [ارتفاع تصویر](#image_validation_height)
برای مشخص کردن حداقل و حداکثر ارتفاع مجاز تصویر از کلید `min-height` و `max-height` استفاده می‌شود که مقدار آن عددی بر‌حسب پیکسل می‌باشد.

### [تغییر اندازه تصویر](#image_validation_resize)
در فریمورک میتوان ابعادی را برای تصویر در نظر گرفت که بعد از اعتبار سنجی تصویر، ابعاد آن به اندازه‌ی تعریف شده تغییر کند . تغییر اندازه با استفاده از کلید‌ `resize` مشخص می‌شود.

### [تبدیل تصویر دریافتی به شی کلاس Image](#image_validation_image_object)
با تعریف کلید `obj` با مقدار true تصویر دریافتی به یک شی از کلاس packages\base\Image تبدیل میشود. اگر این کلید مقدار دهی نشود برابر false در نظر گرفته میشود، در اینصورت خروجی اعتبارسنج همانند خروجی <span class="d-inline ltr">$_FILES</span> میباشد.

__برای اطلاعات بیشتر در رابطه با تصاویر به صفحه [تصاویر](image.md) مراجعه کنید.__


**توجه :** هنگام کار با فایل ها تگ form باید صفت `enctype="multipart/form-data"` را داشته باشد.

**مثال**
```php
<?php
namespace packages\packagename\controllers;

use packages\base\{Controller, Response, Packages};

class Files extends Controller {
	public function upload(): Response {
		$inputs = $this->checkInputs(array(
			"pic" => array(
				"type" => "image",
				"max-size" => 2097152 // Byte
				"obj" => true, 
				"extension" => array('jpeg', 'jpg'],
				"resize" => array(100, 120],
			),
		));
		$file = $inputs["pic"]->getFile();
		$localFile = Packages::package("packagename")->file("storage/private/files/{$file->md5()}.{$file->getExtension()}");
		if ($localFile->exists()) {
			$this->response->setStatus(true);
			return $this->response;
		}
		$directory = $localFile->getDirectory();
		if (!$directory->exists()) {
			$directory->make(true);
		}
		$inputs["pic"]->saveToFile($localFile);

		$this->response->setStatus(true);
		return $this->response;
	}
}

```
در مثال فوق فقط تصاویر با فرمت های jpeg و jpg پذیرفته میشود. حداکثر حجم تصویر 2 مگابایت میتواند باشد. 
خروجی اعتبارسنج تصویری با عرض 100px وارتفاع 120px که شی از کلاس packages\base\Image میباشد، است.


## [داده‌ها از جنس کلاس های Model](#model_validator)
داده های دریافتی میتوانند از جنس کلاس های model باشند. برای اعتبارسنجی در کلید `type` کلاس model را مشخص کنید و فریمورک اعتبارسنجی داده را انجام می‌دهد.

برای اعتبارسنجی model ها میتوانید از کلید `query` برای اضافه کردن شرایط تائید داده استفاده کنید.
مقدار کلید query تابع میباشد. تابع یک آرگومان ورودی میگیرد که شئ کلاس model مشخص شده در type میباشد.

**مثال**   
**نمونه فایل Model**
```php
<?php
namespace packages\packagename;

use packages\base\{db\dbObject, Date};

class Ticket extends dbObjecy {

	const OPEN = 1;
	const CLOSED = 2;

	protected $dbTable = "packagename_tickets"
	protected $primaryKey = "id";
	protected $dbFields = array(
		'created_at' => array('type' => 'int', 'required' => true),
		'text' => array('type' => 'text', 'required' => true),
		'status' => array('type' => 'int', 'required' => true),
	);

	public function preLoad(array $data): array {
		if (!isset($data["created_at"])) {
			$data["created_at"] = Date::time();
		}
		if (!isset($data["status"])) {
			$data["status"] = self::OPEN;
		}
		return $data;
	}

}
```
**نمونه فایل کنترلر بدون استفاده از کلاس Model ها**
```php
<?php
namespace packages\packagename\controllers;

use packages\base\{Controller, Response, InputValidationException};
use packages\packagename\{Ticket as TicketModel, ticket\Message as Model};

class Tickets extends Controller {
	public function response(): Response {
		$inputs = $this->checkinputs(array(
			'ticket' => array(
				'type' => 'number',
			),
			'message' => array(
				'type' => 'text',
			),
		));

		$model = new TicketModel();
		$model->where("id", $inputs["ticket"]);
		$model->where("status", Ticket::OPEN);
		$inputs["ticket"] = $model->getOne();
		if (!$inputs["ticket"]) {
			throw new InputValidationException("ticket");
		}

		$model = new Model();
		$model->ticket_id = $inputs["ticket"]->id;
		$model->text = $inputs["text"];
		$model->save();

		$this->response->Go(url("userpanel/tickets/{$inputs['ticket']->id}/overview"));
		
		$this->response->setStatus(true);
		return $this->response;
	}
}
```
**نمونه فایل کنترلر با استفاده از کلاس Model ها**
```php
<?php
namespace packages\packagename\controllers;

use packages\base\{Controller, Response};
use packages\packagename\{Ticket as TicketModel, ticket\Message as Model};

class Tickets extends Controller {
	public function response(): Response {
		$inputs = $this->checkinputs(array(
			'ticket' => array(
				'type' => Ticket::class,
				'query' => function ($query) {
					$query->where("status", TicketModel::OPEN);
				}
			),
			'message' => array(
				'type' => 'text',
			),
		));

		$model = new Model();
		$model->ticket_id = $inputs["ticket"]->id;
		$model->text = $inputs["text"];
		$model->save();

		$this->response->Go(url("userpanel/tickets/{$inputs['ticket']->id}/overview"));
		
		$this->response->setStatus(true);
		return $this->response;
	}
}
```
__برای اطلاعات بیشتر از نحوه ایجاد فرم‌ها به صفحه [فرم](from.md) مراجعه کنید.__

## [توابع](#Closures_validator)
اگر داده‌ای که قصد اعتبارسنجی آن را دارید نوع‌ داده‌ای بجز موارد تعریف شده در فرمورک باشد علاوه بر تعریف [اعتبارسنج جدید](#howto_add_new_validator) میتوانید از توابع `Closures` استفاده کنید. 
در این روش نیاز به ایجاد کلاس اعتبارسنج نیست تنها کافیست عملیات اعتبارسنجی مورد نظر را در یک تابع که به کلید `type` داده می‌شود تعریف کنید. 

این تابع کاملا مشابه متد validate که در کلاس‌های اعتبارسنجی تعریف می‌شود میباشد. 

تابع سه آرگومان ورودی میگیرد که به ترتیب داده‌ی دریافت شده از کاربر ،‌قوانین مشخص شده برای اعتبارسنجی و نام فیلد هستند.

**مثال**
```php
<?php
namespace packages\packagename\controllers;

use packages\base\{Controller, Response, Validator};

class Banks extends Controller {
    public function update(): Response {
        $inputs = $this->checkinputs(array(
            "banks" => array(
                "type" => function($data, array $rule, string $input) {
					if (!is_array($data)) {
						throw new InputValidationException($input);
					}
					if (!$data) {
						if (!isset($rule['empty']) or !$rule['empty']) {
							throw new InputValidationException($input);
						}
						if (isset($rule['default'])) {
							return $rule['default'];
						}
					}
					foreach ($data as $key => $value) {
						if (!isset($value["id"])) {
							throw new InputValidationException($input . "[{$key}][id]");
						}
						if (!isset($value["account"])) {
							throw new InputValidationException($input . "[{$key}][account]");
						}
					}
					foreach ($data as $key => $value) {
						foreach ($data as $key2 => $value2) {
							if ($key != $key2 and $value["id"] == $value2["id"]) {
								throw new DuplicateRecord($input . "[{$key}][id]");
							}
						}
						$bank = Bank::byId($value["id"]);
						if (!$bank) {
							throw new InputValidationException($input . "[{$key}][id]");
						}
						$data[$key]["bank"] = $bank;
					}
					return $data;
				}
            ),
        ));
        foreach ($inputs["banks"] as $item) {
            $item["bank"]->account = $item["account"];
            $item["bank"]->save();
        }
        $this->response->setStatus(true);
        return $this->response;
    }
}
```

## [استثنا](#inputvalidation_exception)
هر یک از داده های دریافتی طبق قوانینی که برای آنها مطابق تعاریف فوق مشخص شده است اعتبارسنجی میشوند. هر کدام از داده ها که نا معتبر باشند استثنا از جنس  `packages\base\InputValidationException` پرتاب می‌شود.
فریمورک این استثنا را مدیریت کرده و به خطای فرم تبدیل میشود. (برای مدیریت استثنا نیاز به نوشتن try catch نیست.) به طور خودکار خطاها در متد setFormError از کلاس packages\base\views\form ثبت میشوند.

همچنین برای سهولت در استفاده و مدیریت خطاهای فرم میتوانید از متد `createField` در پکیج [یوزرپنل](https://github.com/Jalno/userpanel) استفاده کنید. با استفاده از این متد استثنا پرتاب شده به صورت خودکار به خطا در ظاهر قالب  و در مکان input و یا select نمایش داده میشود.

__برای اطلاعات بیشتر به صفحه [فرم](form.md) مراجعه کنید.__


**مثال 1**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Response, View};
use packages\packagename\User;
use themes\themename\views;

class Main extends Controller {
	
	public function register(): Response {
		$view = View::byName(views\Register::class);
		$this->response->setView($view);
		$this->response->setStatus(false);
		$inputsRules = array(
			"firstname" => array(
				"type" => "string",
			),
			"lastname" => array(
				"type" => "string",
				"optional" => true,
				"empty" => true,
			),
			"email" => array(
				"type" => "email",
			),
			"cellphone" => array(
				"type" => "cellphone",
			),
			"state" => array(
				"values" => array("Tehran", "Esfahan")
			),
			"publish_email" => array(
				"type" => "bool",
			),
			"password" => array(),
			"password_again" => array()
		);
		try {
			$inputs = $this->checkinputs($inputsRules);
			
			if ($inputs["password"] != $inputs["password_again"]) {
				throw new InputValidationException("password_again");
			}
			$user = new User();
			$user->firstname = $inputs["firstname"];
			if (isset($inputs["lastname"]) {
				$user->lastname = $inputs["lastname"];
			}
			$user->email = $inputs["email"];
			$user->cellphone = $inputs["cellphone"];
			$user->password = md5($inputs["password"]);
			$user->publish_email = $inputs["publish_email"];
			$user->save();
			$this->response->setStatus(true);
			$this->response->Go(base\url("userpanel"));
	    } catch(InputValidationException $error) {
			$view->setFormError(FormError::fromException($error));
			$view->setDataForm($this->inputsvalue($inputsRules));
	    }
	    return $this->response;
	}
}
```

برای مدیریت استثنا در catch از متد setFormError و setDataForm  که در کلاس packages\base\views\form تعریف شده‌اند، استفاده شده است. 

__مدیریت استثنا توسط فریمورک انجام میشود و لازم به نوشتن try catch نیست. مثال فوق تنها برای اطلاعات بیشتر برنامه نویس بیان شده است.__

متد setFormError مشخصات فیلد نامعتبر را به view انتقال می‌دهد. در view با استفاده از متد getFormErrors مشخصات فیلد دارای خطا را میتوان دریافت کرد.

زمانی که کاربر مجددا به صفحه فرم ریدایرکت شود داده‌های  قبلی وارد شده در input ها حذف شده است. برای نمایش داده‌های قبلی با استفاده از متد setDataForm داده های قبلی به قالب منتقل میشود و در قالب با فراخوانی متد getDataForm داده وارد شده قبلی قابل دسترس میباشد. 

**توجه :** برای کاربا متدهای فوق باید کلاس view تعریف شده از کلاس packages\base\views\form ارث بری کند و یا packages\base\views\traits\form در کلاس use شود.


**مثال 2**
```php
<?php
namespace packages\packagename\controllers;

use themes\themename\views;
use packages\packagename\User as Model;
use packages\base\{Controller, Response, View};

class Main extends controller {
	public function login(): Response {
		$view = View::byName(views\Login::class);
		$this->response->setView($view);
		$this->response->setStatus(false);
		$inputs = $this->checkinputs(array(
	        "username" => array(
	            "type" => "email",
	        ),
	        "password" => array()
		));
		try {
			$model = new Model();
			$model->where("email", $inputs["username"]);
			$user = $model->getOne()
			if (!$user) {
				throw new inputValidationException("username");
			}
			if (Password::verify($inputs["password"], $this->password)) {
				throw new inputValidationException("password");
			}
			Session::set("login", true);
			Session::set("userID", $user->id);

			$this->response->setStatus(true);
			$this->response->Go(base\url("userpanel"));
		} catch (InputValidationException $e) {
			$e->setInput(""); // For security reason, the users should not know which field is wrong
			throw $e;
		}
	    return $this->response;
	}
}
```
