# CLI
کدهای php علاوه‌بر ساخت صفحات وب میتواند برای اجرای برنامه از طریق خط فرمان نیز استفاده شود؛ به همین منظور php از
CLI که مخفف عبارت Command Line Interface یا رابط خط فرمان میباشد پشتیبانی میکند.

در جالنو برای کار با خط فرمان کلاس `packages\base\CLI` ایجاد شده است.

در کلاس CLI متدهای زیر تعریف شده است متدها برای سهولت استفاده بصورت استاتیک تعریف شده‌اند.

| متد |     کاربرد     |
|---------------|------------|
| <span class="display-block ltr">set()</span>  |   این متد کلاس را برای استفاده آماده سازی میکند<br />**این متد به صورت خودکار توسط فرم ورک فرخوانی میشود**  |
| <span class="display-block ltr">getParameter(string $name): ?string</span> |  مقدار پارامتر دریافتی را برمیگرداند   |
| <span class="display-block ltr">getParameters(array $params): array</span> |   تبدیل پارامترهای دریافتی به آرایه کلید مقدار   |
| <span class="display-block ltr">readLine(string $message): string</span> |  گرفتن مقدار ورودی از خط فرمان   |


## اجرا برنامه از طریق خط فرمان {#run}
برای اجرای برنامه لازم است از طریق ترمینال به شاخه اصلی پروژه رفته و فایل index.php را اجرا کنید. آدرس روندی که قصد اجرای آن را دارید در آرگومان process همراه دستور ارسال کنید.

```shell
php index.php --process=packages/packagename/processes/Main@index
```
**برای اطلاعات بیشتر به صفحه ی [روند](process.md) مراجعه کنید.**

در php آرگومان‌های ارسالی بصورت رشته دریافت میشود. در جالنو برای پردازش بهتر، آرگومان‌ها به آرایه کلید مقدار تبدیل میشوند.
زمانی که دستور فوق اجرا شود ابتدا متد `set` اجرا شده و آرگومان‌های ورودی را بصورت آرایه در متغیر <span class="d-inline ltr">$request['parameters']</span> کلاس ذخیره می‌کند.
عملیات تبدیل آرگومان به آرایه توسط متد `getParameters` انجام میشود.
همچنین ID پروسس نیز در متغیر <span class="d-inline ltr">$process['pid']</span> کلاس دخیره می‌شود.


## گرفتن مقدار آرگومان ورودی {#get_parameter}
با فراخوانی متد `getParameter` میتوانید به آرگومان ورودی دسترسی داشته باشید. 
ورودی این متد نام آرگومان میباشد.

آرگومان‌های ورودی باید بصورت `--key=value` وارد شوند. فرمورک آرگومان‌ها را به آرایه‌ای با کلید key و مقدار value تبدیل می‌شود.
اگر آرگومان ورودی بصورت `--arg` باشد به آرایه‌ای با کلید `arg` و مقدار `1` تبدیل می‌شود.

```shell
php index.php --process=packages/packagename/processes/Main@index --name=ali --password=123456
```

```php
<?php
namespace packages\packagename\processes;

use packages\base\{Process, CLI};

class Main extends Process {

	public function index($data) {

		echo CLI::getParameter("name");  //output: ali
		echo CLI::getParameter("password");  //output: 123456
		/**
		 * Or
		 * echo $data["name"];
		 * echo $data["password"];
		 */
	}
}
```

## گرفتن مقدار ورودی از خط فرمان {#readLine}
با فراخوانی متد `readLine` میتوانید داده‌هایی را از خط‌ فرمان دریافت کنید. همچنین میتوانید رشته‌ای را به ورودی متد readLine داده تا قبل از دریافت ورودی از کاربر، متن را نمایش دهد. آرگومان ورودی متد اختیاری میباشد. 

خروجی متد readLine مقداری است که از ورودی دریافت شده است.


```php
<?php
namespace packages\packagename\processes;

use packages\base\{Process, CLI};

class Main extends Process {

	public function index($data) {
		if (!isset($data["email"])) {
			$data["email"] = CLI::readLine("please enter your email:\n");
		}
		echo "your email is : " . $data["email"] . "\n";
	}
}
```

روند اجرای کد فوق بصورت زیر میباشد
```bash
$ php index.php --process=packages/jalno/processes/Main@index
please enter your email:
email@example.com
your email is : email@example.com
```
