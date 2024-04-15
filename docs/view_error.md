# خطاها در قالب
گاها لازم است خطاهایی که به وجود می‌آید در قالب نمایش داده شوند، برای نمایش و مدیریت این دسته از خطاها در فریمورک کلاس `packages\base\view\Error` ایجاد شده است.

## کد خطا  {#error_code}
برای مدیریت خطاها حتما پیشنهاد میشود برای هر خطا یک کد مشخص تعیین کنید که بیانگر علت خطای دریافتی میباشد. از این کد میتوانید برای پیدا کردن مشکل و یا نمایش خطای مختص به آن استفاده کنید.   
در زمان ایجاد شئ از کلاس Error میتوانید کد خطا را در اولین آرگومان آن مشخص کنید. همچنین میتوانید بعد از ایجاد شئ، از متد `setCode`  برای مشخص کردن کد خطا، استفاده نمایید.   
از طریق فراخوانی متد `getCode` میتوانید کد خطا مشخص شده را دریافت کنید.

```php
<?php
namespace packages\packagename\controllers;

use themes\themename\views\packagenaem as views;
use packages\packagename\{hosts\Plan as HostModel, Order as OrderModel, Tld as TldModel};
use packages\base\{Controller, Response, View, Http, InputValidationException, view\Error};

class Orders extends Controller {

	public function domain($data): Response {

		$view = View::byName(views\domains\Order::class);
		$this->response->setView($view);

		if (Http::is_post()) {
			$this->response->setStatus(false);
			$inputs = $this->checkinputs(array(
				'domain' => array(
					"type" => "string",
				),
				'tld' => array(
					'type' => array('number', 'string'),
				),
				'hostPlan' => array(
					'type' => HostModel::class,
					'optional' => true
				)
			));
			if (!$inputs["tld"]) {
				throw new InputValidationException("tld");
			}
			if (!$inputs["domain"]) {
				throw new InputValidationException("domain");
			}
			if (is_number($inputs["tld"])) {
				$inputs["tld"] = TldModel::byId($inputs["tld"]);
				if (!$inputs["tld"]) {
					throw new InputValidationException("tld");
				}
				$inputs["tld"] = $inputs["tld"]->code;
			}
            $isAvailable = OrderModel::checkDomainAvailability($inputs["domain"] . "." . $inputs["tld"]);
            if (!$isAvailable) {
                $error = new Error("domain_is_not_available");
                // $error->setCode("domain_is_not_available");
                $view->addError($error);
                /**
                 * Or you can throw it. Jalno will be catch and add it to view errors automatically
                 * 
                 * throw $error;
                 */
            }
            $order = new Order();
            $order->user_id = 1;// Current user id
            $order->domain = $inputs["domain"] . "." . $inputs["tld"];
            if (isset($inputs["hostPlan"])) {
                $order->host_id = $inputs["hostPlan"]->id;
            }
            $order->status = OrderModel::NOT_CONFIGURED;
            $order->save();

			$this->response->setStatu(true);
		} else {
			$this->response->setStatu(true);
		}
		return $this->response;
	}
}
```

## نوع خطا {#error_type}
در فریمورک خطاها به چهاردسته زیر تقسیم می‌شوند که هرکدام بیانگر سطحی از خطا هستند. 

نوع خطا در متغیر `type` کلاس ذخیره می‌شود و مقدار پیش فرض آن `fatal` میباشد.

| سطح   | کاربرد									  |
| ----- | ------------------------------------------- |
| success | پیام تایید					   |
| warning  | خطاهایی که روند اجرای برنامه را متوقف نمیکنند اما نیاز به بررسی و یا حساسیت بیشتری دارند   |
| fatal  | خطاهایی که باید روند اجرای برنامه متوقف شود	|
| notice | اعلام مشکلاتی که در برنامه وجود دارد  |

**توجه :** `success` خطا نیست از آن برای نمایش پیام هایی در قالب با مضمون موفقیت آمیز بودن عملیاتی در اجرای برنامه استفاده می‌شود.

### مشخص کردن نوع خطا {#set_type}
برای مشخص کردن نوع خطا از متد `setType` استفاده می‌شود.
در کلاس برای خطاها ثابت‌های `SUCCESS` , `WARNING` , `FATAL` , `NOTICE` تعریف شده است.

آرگومان ورودی متد setType رشته است و میتواند یکی از انواع خطا باشد. 
اگر ورودی متد به غیر از موارد فوق باشد استثنا type پرتاب می‌شود. 

همچنین متد `getType` نوع خطا را بصورت رشته برمیگرداند.

```php
use packages\base\view\Error;


$error = new Error();
$error->setType(Error::NOTICE);
```

## متن خطا {#error_text}
برای نمایش خطا لازم است متنی برای خطا ثبت شده باشد. با فراخوانی متد `setMessage` میتوانید متنی برای خطا ثبت کنید. آرگومان ورودی این متد یک رشته می‌باشد.

همچنین با فراخوانی متد `getMessage` میتوانید به متن پیام خطا دسترسی داشته باشید.

```php
use packages\base\view\Error;


$error = new Error();
$error->setMessage('This is error message!');
```

## انتقال داده {#set_data}
علاوه بر متن پیام خطا میتوانید داده هایی نیز مشخص کنید. با فراخوانی متد `setData` میتوانید داده‌ها را ثبت کنید. 
متد setData دو آرگومان ورودی میگیرد. آرگومان اول مقدار داده ( از هر نوع داده‌ای میتواند باشد) و آرگومان دوم، کلید داده می‌باشد.

 برای اضافه کردن چند داده باید متد setData چندین بار فراخوانی شود. برای جلوگیری از کد اضافه میتوانید به آرگومان اول یک آرایه کلید-مقدار دهید.
درصورتی که آرگومان دوم نیز مقداردهی شود، تمامی آرایه برای آن کلید در نظر گرفته میشود.

متد `getData` داده های ثبت شده را برمیگرداند. متد یک آرگومان ورودی میگیرد که نام کلیدی است که زمان تنظیم داده‌ها تعیین شده است. درصورتی که به متد آرگومان ورودی داده نشود آرایه‌ای از تمامی داده‌های ثبت شده برمیگرداند.


**مثال**
```php
<?php
namespace packages\packagename\controllers;

use themes\themename\views;
use packages\base\{View, NotFound, Controller, view\Error};
use packages\packagename\{Student as StudentModel, ClassRoom as ClassroomModal, ClassStudent};

class Classrooms extends Controller {

	public function addStudent($data) {

		$student = StudentModel::byId($data['student']);
		$classroom = ClassroomModal::byId($data['classroom']);
		if(!$student or !$classroom) {
			throw new NotFound();
		}
		$view = View::byName(views\classroom\AddStudent::class);
		$this->response->setView($view);

		if ($classroom->status == ClassroomModal::FINISHED) {
			$error = new Error();
			$error->setData($classroom->id, 'classroomId');
			$error->setData($classroom, 'classroomObj');
			$error->setMessage("کلاس پایان یافته است!");
			$view->addError($error);
			return $this->response;
		}

		$classStudent = new ClassStudent();
		$classStudent->class = $classroom->id;
		$classStudent->student = $student->id;
		$classStudent->save();

		$this->response->setStatus(true);
		return $this->response;
	}
}
?>
```
در مثال فوق متد `addError` در کلاس `packages\base\View` برای انتقال خطاها به قالب تعریف شده است.

## تعیین حالت trace {#trace_mode}
در کلاس Error متغیر `traceMode` تعریف شده است که مشخص میکند چه اطلاعاتی از متغیرهای کلاس، زمان فراخوانی متد `jsonSerialize()` در خروجی نمایش داده شود.
متد `setTraceMode` برای مقدار دهی و یا تغییر حالت `traceMode` پیاده سازی شده و یکی از ثابت های تعریف شده ی زیر را در تنها آرگومان خود دریافت میکند. زمانیکه این متغیر توسط برنامه نویس مقدار دهی نشود، به صورت خودکار مقدار FULL_TRACE در نظر گرفته خواهد شد.

| حالت   | کاربرد									  |
| ----- | ------------------------------------------- |
| <span class="display-block ltr">NO_TRACE</span> | فقط نوع خطا و پیام خطا را برمیگرداند				   |
| <span class="display-block ltr">SHORT_TRACE</span>  | در کلید trace اطلاعات فایل هایی که برای نمایش صفحه اجرا شده‌اند بصورت مختصر نمایش داده می‌شود   |
| <span class="display-block ltr">FULL_TRACE</span>  | در کلید trace اطلاعات فایل هایی که برای نمایش صفحه اجرا شده‌اند در آرایه‌ای نمایش داده می‌شود	|
همچنین با فراخوانی متد `getTraceMode` میتوانید  به مقدار traceMode دسترسی داشته باشید.

```php
$error = new Error();
$error->setTraceMode(Error::SHORT_TRACE)
```

## دریافت خطا ها در قالب {#get_errors}
خطاهای ثبت شده را با متد‌‌‌های `getError` و `getErrors` میتوانید دریافت کنید. 
متد getError یک شئ از کلاس Error برمی‌گرداند که اولین خطا ثبت شده است و متد getErrors آرایه‌ای از اشیا کلاس Error که تمامی خطاهای ثبت شده است را برمیگرداند.
```php
<body>
	<?php
	$errors = $this->getErrors();
	if ($errors) {
		foreach ($errors as $error) {
			$message = $error->getMessage();
			if (!$message) {
				$message = t($error->getCode());
			}
			echo '<div class="alert alert-danger" role="alert">
					<strong>'. $message . '</strong>
				</div>';
		}
	}
	?>

```

## متد jsonSerialize {#json_serialize}
از متد `jsonSerialize()` برای تبدیل شئ کلاس Error به آرایه قابل تبدیل به `JSON` استفاده میشود. این متد با استفاده از حالت مشخص شده در متغیر `traceMode` اطلاعات خروجی را مشخص میکند. 

## Serialize {#serialize}
زمانیکه شئ از کلاس serialize میشود، اطلاعات خروجی با استفاده از حالت مشخص شده در متغیر `traceMode` مشخص و در خروجی برگردانده میشوند.