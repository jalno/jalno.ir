# مترجم
  با استفاده از  کلاس `packages\base\Translator` که متد های آن  برای راحتی استفاده به صورت ایستا و `static` نوشته است  بدون تکرار کد ها، می‌توانید نوشته های درون وبسایت را به صورت چندزبانه در آورید .برای این منظور نوشته های سایت درون فایل های دیگری با فرم `json`  نوشته می‌شوند.  با استفاده از کلاس `Translator` می‌توان نوشته های فایل های ذخیره-نوشته را به صورت چند باره در میان کد ها استفاده کرد .  با استفاده از کد زبان و یا کد کشور در آدرس ( به صورت جزئی از آدرس و یا به صورت یک پارامتر در آدرس) فریم ورک به صورت خودکار فایل ذخیره-نوشته متناظر با آن زبان و یا کشور را بارگزاری خواهد کرد . همچنین در تولید آدرس در صورتیکه از متد `base\url` استفاده کنید، این متد به صورت خودکار زبان پیشفرض را در آدرس ها قرار می‌دهد .

نمونه یک فایل ذخیره-نوشته
```json
{
	"author": {
		"name" : "Jalno contributors",
		"website" : "https://jalno.ir/"
	},
	"rtl": true,
	"phrases":{
		"title": "Jalno framwork docs",
		"description": "Powered by <a href=\"{url}\">Jalno</a> , open license framwork"
	}
}
```

### تنظیمات زبان 

برای کار با زبان ها در ابتدا باید تنظیماتی را در فایل `config.php` که در مسیر `packages/base/libraries/config`قرار دارد انجام دهیم. 
در این فایل تنظیمات مربوط به زبان پیش فرض و تغییر زبان و مخفف وارد کردن زبان را می‌توانیم انجام دهیم.


#### زبان پیش فرض
با استفاده از  آپشن `packages.base.translator.defaultlang` می‌توانیم زبان پیش فرض سایت را مشخص کنیم. مقدار وارد شده باید کد زبان کامل باشد.

اگر این آپشن مقدار دهی نشود, هر کد زبان کاملی را میپذیرد.

کد زبان کامل از کد زبان دو حرفی_کد کشور دو حرفی تشکیل میشود 

```php
'packages.base.translator.defaultlang' => 'fa_IR' // or en_US
```

#### تغییر زبان
با استفاده از آپشن `packages.base.translator.changelang` مشخص میکنیم کاربر از چه روشی زبان را مشخص کند.
سه مقدار می‌تواند داشته باشد :

| مقدار      |                             کاربرد                             |
|---------------------------------------------|-------------------------------------------|
| uri                           |      زبان در ابتدای ادرس اضافه میشود |
| parameter           |  انتهای آدرس اضافه میشود           |
| خالی باشد                 | کاربر نمی‌تواند بطور مستقیم زبان را تغییر دهد             |

**مثال uri :**
````
/fa/contactus 
````

**مثال parameter :**
````
/contactus?lang=fa
````

**مثال از خالی بودن :** زبان در آدرس اضافه نمیشود
````
/contactus
````

#### مخفف وارد کردن زبان 
با استفاده از آپشن `packages.base.translator.changelang.type` امکان مخفف وارد کردن زبان را در آدرس می‌دهد .
آپشن مقادیر `short` , `complete` میگیرد.

**مثال** 
````
'packages.base.translator.changelang.type' => 'short'  		// /fa/contactus
'packages.base.translator.changelang.type' => 'complete'    // /fa_IR/contactus
````

## معرفی فایل های ذخیره-نوشته
فایل ذخیره-نوشته باید برای استفاده به فرم ورک معرفی شده و مشخص شوند هر فایل برای کدام کد زبان خواهد بود .
در صورتی که فایل ذخیره نوشته در رابط کاربری `frontend` استفاده شود ، معرفی  در فایل `theme.json` و در غیر اینصورت در فایل `package.json`  انجام خواهد شد .

نمونه فایل package.json
```json
{
	"languages": {
		"fa_IR": "langs/fa_IR.json"
	}
}
```

نمونه فایل theme.json
```json
{
	"name": "frontname",
	"title": "Site Frontend",
	"version": "1.0.0",
	"languages": {
		"fa_IR": "langs/fa_IR.json"
	}
}
```
در این دو فایل بلوک کد زیر باعث تعریف زبان های آن قالب یا پکیج خواهد شد:

```json
"languages": {
	"fa_IR" : "langs/fa_IR.json"
}
```
و در صورتی که بیش از یک زبان داشته باشید 
```json
"languages": {
	"fa_IR" : "langs/fa_IR.json",
	"en_US" : "langs/en_US.json"
}
```

## کد زبان های مجاز
در کلاس `Translator` کد زبان های مجاز به صورت دو حرفی از  قبل در متغیر ایستایی به نام `allowlangs` ذخیره شده است .

	Translator::$allowlangs;

## کد کشور های مجاز
کد کشور های مجاز در قالب یک آرایه به صورت دوحرفی در متغیری با نام `countries` ذخیره شده است .

	Translator::$countries;

## تغییر زبان
در صورتیکه بخواهید زبان یک صفحه را تنظیم و یا تغییر دهید می‌توانید از متد `setLang` کلاس `Translator` استفاده کنید .این متد  در پارامتر خود، کد زبان کامل را دریافت میکند . در صورتیکه کد زبان مشخص شده در کد زبان های مجاز نباشد،با پرتاب استثنایی از جنس `packages\base\Translator\InvalidLangCode`  از ادامه روند جلوگیری خواهد کرد .

**کد زبان کامل** از کد زبان دو حرفی_کد کشور دو حرفی تشکیل میشود.

**مثال:** 
```php
<?php
namespace packages\my_package\controllers;
use packages\base\{Response, Controller, View, Translator};
use themes\my_theme\views;

class Main extends controller {
	
	public function index(): Response {
		Translator::setLang("en_US");
		$view = View::byName(views\Home::class);
		$this->response->setView($view);
		return $this->response;
	}
}
```
به دلیل تفاوتی که در املای لهجه ها و گویش های مختلف (مانند بریتانیایی و آمریکایی  یا فارسی ایران و فارسی تاجیک) وجود دارد؛ در جالنو امکان تعریف فایل ذخیره نوشته بصورت مجزا برای هرکدام وجود دارد. مانند en_GB و en_US

## استفاده از نوشته ها
برای استفاده از نوشته ها در میان کد ها، باید از متد `trans` استفاده کنید . پارامتر اول این متد، نام کلید و در پارامتر دوم آرایه ای از کلید-مقدار ها دریافت میکند .
در صورتیکه پارامتری در نوشته وجود داشته باشد، این متد پارامتر را در کلید آرایه مشخص شده در پارامتر دوم جستجو کرده و مقدار آن را جایگزین فرانویسه در نوشته خواهد کرد .
پارامتر دوم به ما این امکان را می‌دهد که متن مورد نظر را به‌صورت داینامیک ایجاد کنیم.

```php
Translator::trans(string $name, array $params = []): string;
```

برای اسان و سریع تر شدن برنامه نویسی تابع `t(string $name, array $params = []): string` در namespace اصلی تعریف شده است که دقیقا همان وظیفه ی متد `trans()` را دارد. 

از این تابع می‌توان در تمامی فایل ها (controller, view, html, process) استفاده کرد.

همچنین این تابع نیاز به use کردن  ندارد در هر قسمت از کد قابل صدا زدن میباشد.


فایل ذخیره-نوشته fa_IR.json :
```json
{
	"rtl": true,
	"phrases":{
		"title": "جالنو",
		"description": "قدرت گرفته از <a href=\"{url}\"> جالنو </a>" ,
		"support.period": "پشتیبانی رسمی تا {month} ماه",
		"log.invoice.edit": "کاربر <span class=\"tooltips\" title=\"#{user_id}\">{user_name}</span>  صورتحساب را ویرایش کرد ",
	}
}
```

نمونه یک فایل ذخیره-نوشته en_US.json :
```json
{
	"phrases":{
		"title": "Jalno",
		"description": "Powered by <a href=\"{url}\"> Jalno </a>",
		"support.period": "Official support for {month} months",
		"log.invoice.edit": "<span class=\"tooltips\" title=\"#{user_id}\">{user_name}</span> just edited the invoice.",
	}
}
```

**مثال 1 :**
( url: test.com/fa )
```php
<?php
use packages\base\Translator;
?>

<!DOCTYPE html>
<html>
<head>
	<title><?php echo Translator::trans("title"); ?></title>
	/*
	output:
	<title>جالنو</title>
	*/
</head>
</html>
```


**مثال 2 :** 
( url: test.com/en )
```php
<!DOCTYPE html>
<html>
<head>
	<title><?php echo t("title"); ?></title>
	/*
	output:
	<title>Jalno</title>
	*/
</head>
</html>
```


**مثال 3 :**
( url: test.com/en )
```php
<!DOCTYPE html>
<html>
<body>

<?php echo t("support.period", array("period" => 6); ?>

/*
Output:
Official support for 6 months
*/

</body>
</html>
```


**مثال 4 :**
( url: test.com/fa )
```php
<?php
use packages\base;
?>

<!DOCTYPE html>
<html>
<body>

<?php echo t("description", array("url" => base\url()); ?>

/*
Output:
قدرت گرفته از <a href="/"> جالنو </a>
*/

</body>
</html>

```

**مثال 5 :** استفاده از مترجم در Controller
```php
<?php
namespace packages\package_name\controllers;

use packages\base\{Response, Controller, Date};
use package\package_name\{Log, User, Invoice};

class Invoice extends Controller {
	
	public function update($data): Response {

		$user = (new User)->byId($data["userId"]);
		$invoice = (new Invoice)->byId($data["invoiceId"]);

		if($user and $invoice) {
			$log = new Log();
			$log->user = t("log.invoice.edit", ['user_name' => $user->getFullName(), 'user_id' => $user->id]);
			$log->date = Date::time();
			$log->invoice = $invoice->id;
			$log->save();
		}
		
		return $this->response;
	}
}
```
برای مشاهده نمونه کد های بیشتر از استفاده مترجم در کنترلرها می‌توانید به  [کنترلر مدیریت کاربران در Userpanel](https://github.com/Jalno/userpanel/blob/master/controllers/Users.php) فایل مراجعه کنید.

**مثال 6 :** استفاده از مترجم در View
```php
<?php
namespace themes\clipone\views;

use packages\userpanel\Authorization;
use themes\clipone\Navigation;
use function packages\userpanel\url;

class ContactUs extends \packages\userpanel\View {

	public static function onSourceLoad() {
		if (!Authorization::is_accessed("contact_us")) {
			return;
		}
		$contactUs = Navigation::getByName("contact-us");
		if ($contactUs) {
			return;
		}
		$contactUs = new Navigation\MenuItem("contact-us");
		$contactUs->setTitle(t("contactus"));
		$contactUs->setIcon('fa fa-envelope-open');
		$contactUs->setURL(url('contact-us'));
		$contactUs->setPriority(400);
		Navigation::addItem($contactUs);
	}

	public function __beforeLoad() {
		$this->setTitle(array(
			t("contactus"),
			t("comments")
		));
		$this->addBodyClass('contact-us');
		Navigation::active("contact-us");
	}
}
```


**مثال 7 :** استفاده از مترجم در process
```php
<?php
use packages\base\Process;
use package\package_name\Classroom as ClassroomDB;

class Classroom extends Process {

	public function insert($data) {
		
		$classroom = new ClassroomDB();
		$classroom->title = t("class.title", "title" => $data["title"], "group" => $data["group"]);
		$classroom->teacher = $data["teacher"];
		$classroom->save();
	}
}

/*نمونه فایل ذخیره نوشته
{
	"phrases":{
		"class.title": "کلاس {title} در گروه {group}"
	}
}
*/

```
برای مشاهده نمونه کد های بیشتر از استفاده مترجم درprocess ها می‌توانید به  [این](https://github.com/Jalno/userpanel/blob/master/processes/FixEditUserLogs.php) .فایل مراجعه کنید.