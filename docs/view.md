# ظاهر
ظاهر رابط بین کنترلر و قالب است.
در فریمورک برای ظاهر، کلاس `packages\base\view` ایجاد شده است. باید در قسمت frontend  کلاس‌ هایی برای ظاهر ایجاد کنید. این کلاس‌ها باید از کلاس `packages\base\view` ارث بری کنند.


**توجه :** میتوانید مطابق ورژن قبل ظاهر را در دو قسمت backend و frontend تعریف کنید. این دو قسمت از طریق رابطه ی پدر-فرزندی به یکدیگر متصل میشوند.
برای منظم بودن فایل ها، بهتر است تا در هر قسمت یک پوشه با نام views ایجاد شود و فایل های مرتبط با آن قسمت در آن تعریف شود. اگر ظاهر را در دوقسمت تعریف کنید، باید در فایل theme.json پوشه قالب در کلید `views` ارتباط بین ظاهر backend و frontend را مشخص کنید.

```php
<?php
namespace themes\themename\views\packagename;

use packages\base\View;

class index extends View {
	public function __beforeLoad() {}
}
```

اگر صفحه مورد نظر دارای فرم باشد باید کلاس view از کلاس `packages\base\views\form` ارث بری کند . 

__برای اطلاعات بیشتر به صفحه [فرم](form.md) مراجعه کنید.__

```php
<?php
namespace themes\themename\views\packagename\users;

use packages\base\views\Form;

class add extends Form {
	public function __beforeLoad() {}
}
```

اگر صفحه دارای لیست باشد که لازم به صفحه‌بندی دارد، باید کلاس view از کلاس `packages\base\views\listview` ارث بری کند.

__برای اطلاعات بیشتر به صفحه [صفحه‌بندی](pagination.md) مراجعه کنید.__

```php
<?php
namespace themes\themename\views\packagename\users;

use packages\base\views\Listview;

class Search extends Listview {
	public function __beforeLoad() {}
}
```

## قسمت frontend {#frontent_view}

__برای اطلاعات بیشتر به صفحه ی [قالب](frontend.md) مراجعه کنید.__

این فایل در پوشه‌ی معرفی شده به عنوان بخش قالب ایجاد می شود (بهتر است یک پوشه با نام views برای فایل های ظاهر این قسمت ایجاد کنید).

برای ارتباط قسمت ظاهری و قسمت قالب (قسمتی که HTML را شامل می شود) نیاز است تا در پوشه‌ای به نام html فایلی متناظر با فایل کلاس view ایجاد شود.

همچنین لازم است تا در فایل `theme.json` که در پوشه‌ی frontend قرار دارد، نام پوشه کلاس‌های ظاهر (views) تحت عنوان کلید autoload معرفی شود.

در ظاهر میتوانید متد `__beforeLoad()` را تعریف کنید. این متد به صورت خودکار قبل از بارگذاری قسمت قالب برنامه صدا زده خواهد شد.

__برای اطلاعات بیشتر به صفحه ی [بارگذاری خودکار]( autoloader.md) مراجعه کنید.__


**نمونه فایل theme.json**
```json
{
	"name": "themename",
	"title": "Site Frontend",
	"version": "1.0.0",
	"autoload": {
		"directories": ["views"]
	}
}
```

**توجه :** در namespace کلاس ظاهر باید از نامی که در فایل theme.json تعیین شده است استفاده شود.

```php
<?php
namespace themes\themename\views\packagename\news;

use packages\packagename\Post;
use packages\base\View as ParentView;

class Show extends ParentView {

	protected $post;
	
	public function __beforeLoad() {}

	public function setPost(Post $post): void {
		$this->post = $post;
	}
}
```

## قسمت backend {#backend_view}
برای ظاهر قسمت backend، فایلی در پوشه‌ی اصلی پکیج تعریف می شود(بهتر است یک پوشه با نام views برای فایل‌های این قسمت ایجاد کنید
). این فایل به وسیله ی رابطه ی پدر-فرزندی به فایل `packages\base\view` متصل است .

برای اینکه این فایل توسط فرم ورک به صورت خودکار شناسایی و بارگذاری شود باید این  فایل را در فایل تنظیمات پکیج یعنی `package.json` تحت عنوان کلید autoload معرفی شود.

**نمونه فایل package.json**
```json
{
	"routing": "routing.json",
	"frontend": ["frontend"],
	"autoload": {
		"directories": ["controllers", "Models", "views"]
	}
}
```

**نمونه فایل ظاهر در backend**
```php
<?php
namespace packages\packagename\views\news;

use packages\base\View;
use packages\packagename\Post;

class Show extends View {
	public function setPost(Post $post) {
		$this->setData($post, "post");
	}
	public function getPost(): Post {
	   return $this->getData("post");
	}
}
```
**نمونه فایل قالب**
```php
<?php
namespace themes\themename\views\packagename\news;

use packages\packagename\Post;
use packages\packagename\views\news\Show as ParentView;

class Show extends ParentView {

	protected $post;
	
	public function __beforeLoad() {
		$this->post = $this->getPost();
	}
}
```

**نکته :** میتوانید قسمت backend را ایجاد نکنید و در کنترلر بخش ظاهر را مستقیما از قالب فراخوانی کنید.

## فراخوانی ظاهر {#set_view}

__برای اطلاعات بیشتر به صفحه ی [کنترلر](controller.md) مراجعه کنید.__

هر کنترلر با استفاده از کلاس `packages\base\view` و متد `byName`  یک ظاهر و در نتیجه یک قالب را فراخوانی میکند. اگر namespace داده شده به متد byName نادرست باشد
این کلاس با پرتاب یک استثناء از جنس کلاس `packages\base\NoViewException` از ادامه ی روند برنامه جلوگیری خواهد کرد.


### فرواخوانی ظاهر قالب در کنترلر {#set_frontend_view}
برای فراخوانی ظاهر قالب در کنترلر باید از namespace قالب استفاده شود.
```php
<?php
namespace packages\packagename\controllers;

use packages\packagename\Post as Model;
use themes\themename\views\packagename\news as views;
use packages\base\{Controller, Response, View, NotFound};

class News extends Controller {

	public function view(array $data): Response {

		$model = new Model();
		$model->where("id", $data["post"]);
		$model->where("status", Post::PUBLISHED);
		$post = $model->getOne();
		if (!$post) {
			throw new NotFound();
		}

		$view = View::byName(views\Show::class);
		$this->response->setView($view);

		$view->setPost($post);

		$this->response->setStatus(true);

		return $this->response;
	}
}

```

### فرواخوانی ظاهر پکیج در کنترلر {#set_package_view}
برای فراخوانی ظاهر پکیج در کنترلر باید از namespace پکیج استفاده شود.
```php
<?php
namespace packages\packagename\controllers;

use packages\base\{Controller, Response, View, NotFound}
use packages\packagename\{Post as Model, views\news as views};

class News extends Controller {
	
	public function view(array $data): Response {

		$model = new Model();
		$model->where("id", $data["post"]);
		$model->where("status", Post::PUBLISHED);
		$post = $model->getOne();
		if (!$post) {
			throw new NotFound();
		}

		$view = View::byName(views\Show::class);
		$this->response->setView($view);

		$view->setPost($post);

		$this->response->setStatus(true);

		return $this->response;
	}
}

```

## تنظیم نام صفحه {#set_page_title}
برای هر صفحه وب لازم است عنوان ( Title ) مشخص شود. در فریمورک برای تنظیم عنوان متد `setTitle` تعریف شده است .
آرگومان ورودی این متد رشته میباشد. همچنین میتوانید آرایه‌ای از رشته ها نیز به متد بدهید، بطور خودکار عناصر آرایه به رشته تبدیل می‌شود.
متد setTitle در متد `__beforeLoad` فراخوانی می‌شود. 

تنظیم نام در ظاهر به شما این امکان را میدهد تا قسمت ابتدایی و مشترک صفحات HTML را یکبار نوشته و در تمامی صفحات استفاده کنید.
برای بهبود کدنویسی میتوانید از مترجم ها و فایل‌های ذخیره نوشته استفاده کنید. با استفاده از فایل های ذخیره نوشته مجبور به نوشتن متن‌‌ها در بین کدها نخواهید بود

__برای اطلاعات بیشتر به صفحه ی [مترجم](translator.md) مراجعه کنید.__

**1 مثال**
```php
<?php 
namespace themes\themename\views\packagename;

use packages\base\views\Form;

class ContactUs extends Form {

	public function __beforeLoad() { 
		$this->setTitle('تماس با ما');
		
		/**
		 * استفاده از مترجم
		 * 
		 * $this->setTitle(t("title.contactUs"));
		 */
	}
}
```

**2 مثال**
```php
<?php 
namespace themes\themename\views\packagename;

use packages\base\View;

class Index extends View {

	public function __beforeLoad() { 
		$this->setTitle(['ظاهر', 'مستندات', 'جالنو']);
	}
}
```

## گرفتن نام صفحه {#get_page_title}
پس از تنظیم کردن نام صفحه میتوانید با فراخوانی متد `getTitle` نام تنظیم شده را دریافت کنید. 
اگر متد setTitle مقدار ورودی آرایه دریافت کرده باشد، آرایه به رشته تبدیل شده و عناصر با "|" از هم جدا می‌شوند.
اگر بخواهید از کارکتر دیگری به عنوان جدا کننده استفاده کنید باید کارکتر مورد نظر به عنوان ورودی به متد `getTitle` داده شود.

**1 مثال**
```php
/**
 *  $this->setTitle('تماس با ما');
 */

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>
		<?php echo $this->getTitle();?>
		/**
		 * output: 
		 * تماس با ما
		 */
	</title>
</head>
```

**2 مثال**
```php
/**
 *  $this->setTitle(
 *	  ['ظاهر', 'مستندات', 'جالنو']
 *   );
 */

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>
		<?php echo $this->getTitle();?>
		/**
		 * output: 
		 * ظاهر | مستندات | جالنو 
		 */
	</title>
</head>
```

**3 مثال**
```php
/**
 *  $this->setTitle(
 *	  ['ظاهر', 'مستندات', 'جالنو']
 *   );
 */

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>
		<?php echo $this->getTitle("-");?>
		/**
		 * output: 
		 * ظاهر - مستندات - جالنو 
		 */
	</title>
</head>
```

## تنظیم توضیحات {#set_description}
برای تنظیم توضیحات مربوط به صفحه که در تگ meta قرار میگیرد از متد `setDescription` استفاده می‌شود. این توضیحات میتواند در جستجوی موتورهای جستجوگر اهمیت بسیاری داشته باشد.
متد setDescription در متد __beforeLoad فراخوانی می‌شود.


**1 مثال**
```php
<?php 
namespace themes\themename\views\packagename;
use packages\base\View;

class Index extends View {

	public function __beforeLoad() { 
		$this->setDescription("آموزش ها و مقالات کاربردی برای وبمستران");
	}
}
```

برای بهبود کدنویسی میتوانید از مترجم ها و فایل‌های ذخیره نوشته استفاده کنید. با استفاده از فایل های ذخیره نوشته مجبور به نوشتن متن‌‌ها در بین کدها نخواهید بود

__برای اطلاعات بیشتر به صفحه ی [مترجم](translator.md) مراجعه کنید.__

**2 مثال :** استفاده از مترجم
```php
<?php 
namespace themes\themename\views\packagename;

use packages\base\View;

class Index extends View {

	public function __beforeLoad() { 
		$this->setDescription(t("site.decription"));
	}
}
```

## گرفتن توضیحات {#get_description}
پس از تنظیم توضیحات صفحه با فراخوانی متد `getDescription()` میتوانید متن توضیحات را دریافت کنید.

**مثال**
```php
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width، initial-scale=1.0">
	<?php
		$description = $this->getDescription();
		if ($description) {
			echo("<meta content=\"{$description}\" name=\"description\" />");
		}
	?>
</head>
```

## اضافه و حذف کردن کد css  {#add_or_delete_css}
فایل مربوط به کدهایی css در فایل theme.json پوشه frontend معرفی می‌شود. اما گاها لازم است برخی از کدها بصورت inline تعریف شود و یا صرفا برای یکی از صفحات تعریف شود در این موارد میتوانید متد‌های `addCSS` و `addCSSFile` را فراخوانی کنید. 

**توجه :** متدهای `addCSS` و `addCSSFile` باید در متد __beforeLoad فراخوانی شوند.

برای هر استایلی که تعریف میشود میتوانید نام مشخص کنید در این صورت اگر در شرایطی خاص لازم به حذف استایل داشته باشید، میتوانید نام استایل را به آرگومان ورودی متد `removeCSS` ارسال کنید.
همچنین با فراخوانی متد `clearCSSAssets` میتوانید تمامی استایل‌ها را حذف کنید. این متد آرگومان ورودی ندارد.

با فراخوانی متد `clearAssets` علاوه بر کدهای css کدهای js نیز حذف می‌شوند.

همچنین با فراخوانی متد `getCSSAssets` فایل‌های css .اضافه شده به صفحه در دسترس میباشند

```php
<?php 
namespace themes\themename\views\packagename;

use packages\base\View;

class Index extends View {
	public function __beforeLoad() { 
		if (isset($this->getData('bg'))) {
			$this->removeCSS("bodyStyle");
		}
		/**
		 * $this->clearCSSAssets();
		 * $this->clearAssets();
		 */
	}
}
```

متد `addCSS` دو آرگومان ورودی میگیرد. آرگومان اول کد استایل و آرگومان دوم نام برای استایل میباشد. آرگومان دوم اختیاری میباشد.

```php
<?php 
namespace themes\themename\views\packagename;

use packages\base\View;

class Index extends View {
	public function __beforeLoad() { 
		$this->addCSS("body{background: antiquewhite}", "bodyStyle");
	}
}
```

متد `addCSSFile` فایل جدید برای استایل اضافه میکند. متد سه آرگومان ورودی میگیرد. 
آرگومان اول آدرس فایل را بصورت رشته میگیرد، آرگومان دوم نام استایل و آرگومان سوم لود شدن و یا نشدن فایل را مشخص میکند; درصورتی که آرگومان سوم true باشد فایل معرفی شده در صفحه لود نمی‌شود. مقدار پیشفرض این متد false است.
آرگومان دوم و سوم اختیاری هستند.

```php
<?php 
namespace themes\themename\views\packagename;

use packages\base\View;

class Index extends View {
	public function __beforeLoad() { 
		$this->addCSSFile("assets/css/style.css", 'newStyle');
	}
}
```

## اضافه و حذف کردن کد js {#add_or_delete_js}
فایل مربوط به کدهای js در فایل theme.json پوشه frontend معرفی می‌شود. اما گاها لازم است برخی از کدها بصورت inline تعریف شود و یا صرفا برای یکی از صفحات تعریف شود در این موارد میتوانید متد‌های `addJS` و `addJSFile` را فراخوانی کنید. 

**توجه :** متدهای `addJS` و `addJSFile` باید در متد __beforeLoad فراخوانی شوند.

برای هر کد جاوااسکریپت که تعریف میشود میتوانید نام مشخص کنید در این صورت اگر در شرایطی خاص لازم به حذف کد داشته باشید، میتوانید نام کد را به آرگومان ورودی متد `removeJS` ارسال کنید.
همچنین با فراخوانی متد `clearJSAssets` میتوانید تمامی کدهای جاوااسکریپت را حذف کنید. این متد آرگومان ورودی ندارد.

با فراخوانی متد `clearAssets` علاوه بر کدهای js کدهای css نیز حذف می‌شوند.

همچنین با فراخوانی متد `getJSAssets` فایل‌های js اضافه شده به صفحه در دسترس میباشند

```php
<?php 
namespace themes\themename\views\packagename;

use packages\base\View;

class Index extends View {
	public function __beforeLoad() { 
		$this->removeJS("indexJS");
		/**
		 * $this->clearJSAssets();
		 * $this->clearAssets();
		 */
	}
}
```

متد `addJS` دو آرگومان ورودی میگیرد. آرگومان اول کد جاوااسکریپت و آرگومان دوم نام برای کد میباشد. آرگومان دوم اختیاری میباشد.

```php
<?php 
namespace themes\themename\views\packagename;

use packages\base\View;

class Index extends View {
	public function __beforeLoad() { 
		$this->addJS("alert('hello')", "helloAlert");
	}
}
```

با استفاده از متد `addJSFile` میتوانید در یک صفحه فایل جدید و مخصوص آن صفحه را اضافه کنید. این متد در پارامتر اول آدرس فایل را نسبت به شاخه ی اصلی قالب ( مکانی که فایل تنظیمات قالب در آن قرار دارد ) دریافت میکند. در آرگومان دوم میتوانید در صورت تمایل یک نام برای آن مشخص کنید. از این نام میتوانید در حذف کردن فایل اضافه شده استفاده نمایید.
 
```php
<?php 
namespace themes\themename\views\packagename;

use packages\base\View;

class Index extends View {
	public function __beforeLoad() { 
		$this->addJSFile("assets/js/index.js", 'indexJS');
	}
}
```

## انتقال داده {#set_data}
با فراخوانی متد `setData($data, string $key)` میتوانید داده ای را تنظیم و هر زمان به آن نیاز داشتید با فراخوانی متد `getData()` به آن دسترسی داشته باشید. 

متد `setData` دو آرگومان ورودی میگیرد. آرگومان اول داده مورد نظر است، داده ها از هر نوع داده‌ای میتوانند باشند و آرگومان دوم کلید برای داده است که آرگومان دوم اختیاریست.

در این روش برای تعریف چند مقدار لازم است چندبار متد setData فراخوانی شود. برای جلوگیری از تکرار کدها میتوانید آرگومان اول را بصورت آرایه کلید - مقدار مقدار دهی کنید. کلیدهای آرایه کلید داده و مقادیر آن مقدارهای داده میباشند. در این روش لازم به تعریف آرگومان دوم نیست. اگر به آرگومان اول آرایه داده شود و آرگومان دوم مقدار دهی شود، تمامی آرایه برای آن کلید در نظر گرفته می‌شود.


**مثال 1:** نمونه فایل کنترلر
```php
<?php
namespace packages\packagename\controllers;

use packages\packagename\Post;
use themes\themename\views\packagename\news as views;
use packages\base\{Response, Controller, View, NotFound};

class News extends controller {

	public function view($data): Response {
		$post = Post::byId($data["post_id"]);
		if (!$post) {
			throw new NotFound();
		}

		$view = View::byName(views\Show::class);
		$this->response->setView($view);

		$view->setData($post, "post");

		$this->response->setStatus(true);

		return $this->response;
	}
}
```

**مثال 2 :** نمونه فایل html
```php
<div class="container">
	<h1> <?php echo $this->getData('post')->title; ?> </h1>
</div>
```

## تنظیم فایل {#set_file}
از طریق متد `setFile` هر view میتواند صفحه ی HTML را برای بارگذاری معرفی کند. البته استفاده مستقیم از متد نیاز نبوده و فرم ورک میتواند از طرق زیر فایل HTML را شناسایی و فعال کند:
### فایل HTML دقیقا هم نام با view {#set_file_automate}
یعنی اگر فایل View شما `frontend/views/posts/View.php` باشد، فایل HTML آن باید در مسیر `frontend/html/posts/` و با نام `View.php` باشد.
### تعریف فایل در کلاس View  {#set_file_using_file_path}
آدرس فایل HTML را نسبت به شاخه اصلی قالب ( مکانی فایل معرف قالب `theme.json` قرار دارد ) در متغیری با نام `$file` در کلاس view معرفی شود.
```php
<?php
namespace themes\themename\views\packagename\news;

use packages\base\View;

class Show extends View {

	protected $file = 'html/view-post.php';

	public function __beforeLoad() {}
}
```

### معرفی فایل های View و HTML در فایل تنظیمات قالب {#set_file_definein_theme}
در صورتیکه از ظاهر Backend در پروژه استفاده میکنید، باید در فایل تنظیمات قالب ( Theme.json ) فایل قسمت backend و همینطور فایل های قسمت ظاهر و HTML آن را معرفی کنید.
```json
{
	"name": "themename",
	"autoload": {
		"directories": ["views"]
	},
	"assets": [
		{"type": "css", "file": "assets/css/style.css"},
		{"type": "js", "file": "assets/js/pages/index.js"}
	],
	"views": [
		{
			"name": "/themes/themename/views/packagename/news/Show",
			"parent": "/packages/packagename/views/news/Show",
			"file": "html/news/Show.php"
		}
	]
}
```

## خطاها
برای نمایش خطاهایی که لازم است در قالب نمایش داده شود متد `addError` تعریف شده است. این یک آرگومان ورودی میگیرد که شئ از کلاس `packages\base\view\Error` می‌باشد.

__برای اطلاعات بیشتر به صفحه  [خطا ظاهر](view_error.md) مراجعه کنید.__

خطاهای ثبت شده را با متد‌‌‌های `getError` و `getErrors` میتوانید دریافت کنید. 
متد getError یک شئ از کلاس Error برمی‌گرداند که اولین خطا ثبت شده است و متد getErrors آرایه‌ای از اشیا کلاس Error که تمامی خطاهای ثبت شده است را برمیگرداند.

**مثال 1 :** نمونه فایل کنترلر
```php
<?php
namespace packages\packagename\controllers;

use themes\themename\views\packagename\classes as views;
use packages\base\{Controller, Response, NotFound, View, Http};
use packages\packagename\{Classroom as ClassModel, Student as StudentModel};

class Classes extends Controller {

	public function addStudent(array $data): Response {
		
		$model = ClassModel::byId($data["class"]);

		if (!$model) {
			throw new NotFound();
		}

		$view = View::byName(views\AddStudent::class);
		$this->response->setView($view);
		
		if (Http::is_post()) {
			$this->response->setStatus(false);
			try {
				$inputs = $this->checkinputs(array(
					'student' => array(
						'type' => StudentModel::class,
						'query' => function ($q) {
							$q->where("status", StudentModel::ACTIVE);
						},
					)
				));

				$model->addStudent($inputs["student"]);

				$this->response->setStatus(true);
			} catch (InputValidationException $e) {
				$error = new Error("student_notfound_or_disabled");
				$error->setMessage("دانش آموز با وضعیت فعال پیدا نشد.");
				$view->assError($error);
			}
		} else {
			$this->response->setStatus(true);
		}
		return $this->response;
	}
}
```
در مثال فوق اگر وضعیت کاربر غیر فعال باشد شئ‌ از کلاس Error ایجاد میشود، در این کلاس متد setMessage برای مشخص کردن متن خطا تعریف شده است.
نهایتا شئ ایجاد شده از کلاس Error به متد addError برای نمایش خطا در قالب داده می‌شود.


**مثال 2 :** نمایش خطا در قالب
```php
<body>
	<?php
	if ($this->getError()) {
		$error = $this->getError()->getMessage();
		echo '<div class="alert alert-danger" role="alert">
				<strong>'. $error. '</strong>
			</div>';
	}
	?>

```

برای سهولت نمایش خطاها در قالب میتوانید از متد `getErrorsHTML()` که در پکیج [یوزرپنل](https://github.com/Jalno/userpanel) تعریف شده است استفاده کنید. 
برای استفاده از متد getErrorsHTML باید کلاس ظاهر از `themes\clipone\viewTrait` استفاده کند.

**نمونه فایل view**
```php
<?php
namespace themes\themename\views\packagename;

use packages\base\View;
use themes\clipone\viewTrait;

class Index extends View {
	use viewTrait;

	public function __beforeLoad() {}
}
```

**مثال 3**
```php
<div class="container">
<?php
$errorcode = $this->getErrorsHTML();
if ($errorcode) {
?>
	<div class="error-container"><?php echo $errorcode; ?></div>
<?php } ?>
</div>
```
در مثال فوق هر تعداد خطا که ثبت شده باشد نمایش داده میشود. پکیج طبق نوع هر خطا متن آن را در کلاس‌های alert متناسب با آن نمایش میدهد.

## افزودن فایل‌ های ظاهری {#using_nodewebpack}
زمانی که متد setView در کنترلر فراخوانی می‌شود، فایل theme.json قالب خوانده می‌شود و قسمت assets برای پیدا کردن فایل های css و  js جستجو میشود و به صفحه اضافه می‌شود.
در صورتیکه فایل های تنظیم شده در کلید assets از جنس CSS یا JS نباشند، نیاز دارید تا قبل از بارگذاری این فایل در صفحه، ابتدا سایر فرمت ها را به این فرمت ها تبدیل کنید.   
برای مدیریت فایل ها و همچنین تبدیل کردن فایل ها، پکیج `node_webpack` را در کنار پکیج اصلی اضافه کنید. این پکیج، در تمامی پکیج ها پیمایش کرده و فایل هایی که باید در صفحات بارگذاری شوند را شناسایی و به فرمت های CSS و JS که قابل شناسایی توسط مرورگر ها هستند، تبدیل میکند. همچنین این پکیج با استفاده از تکنولوژی Webpack تمامی فایل ها را به یک فایل تبدیل میکند. این اقدام یکی از پایه ترین و اصولی ترین اقدامات جهت ارتقای رتبه و درجه سایت است.

__برای اطلاعات بیشتر به صفحه [node_webpack](node_webpack.md) مراجعه کنید.__

## افزودن داده های متغیر {#add_dynamic_data}
برای افزودن داده های متغیر در صفحه و استفاده آنها در جاوااسکریپت میتوانید از متید `dynamicData` استفاده نمایید. با استفاده از این متد میتوانید به رویداد ( Event ) داده های متغیر دسترسی پیدا کرده و به آن اطلاعاتی اضافه نمایید. این اطلاعات به صورت خودکار به اطلاعات قابل خواندن توسط جاوااسکریپت تبدیل و قبل از بارگذاری فایل های اصلی در صفحه قرار داده میشود. تنظیمات مشخص شده در فرم ورک مانند چند زبانه بودن، زبان ها مجاز و زبان فعال، نحوه ی قرار گرفتن زبان در آدرس و تنظیمات دیگر به صورت پیشفرض در این رویداد اضافه شده است.

**خروجی پیشفرض**
```js
var options = {"packages.base.translator.defaultlang":"fa_IR","packages.base.translator.changelang":"uri","packages.base.translator.changelang.type":"short","packages.base.routing.www":"nowww"};var translator = {"lang":"fa_IR"};
```

**نحوه استفاده**
```js
$(() => {
	alert(options["packages.base.translator.defaultlang"]);
	alert(JSON.stringify(translator));
});
```
**مثال 1**: افزودن داده در متغیر جداگانه
```php
<?php
namespace themes\themename\views\packagename;

use packages\base\View;

class Index extends View {
	public function __beforeLoad() {
		$this->dynamicData()->setData("permissions", array(
			array(
				"title": "جستجوی کاربران",
				"permission": "userpanel_users_search"
			),
			array(
				"title": "افزودن کاربر جدید",
				"permission": "userpanel_users_add",
			),
			array(
				"title": "ویرایش کاربران",
				"permission": "userpanel_users_edit",
			),
			array(
				"title": "حذف کاربران",
				"permission": "userpanel_users_delete",
			),
		));
	}
}
```

**خروجی مثال 1**
```js
var options = {"packages.base.translator.defaultlang":"fa_IR","packages.base.translator.changelang":"uri","packages.base.translator.changelang.type":"short","packages.base.routing.www":"nowww"};var translator = {"lang":"fa_IR"};var permissions = [{"title": "جستجوی کاربران", "permission": "userpanel_users_search"}, {"title": "افزودن کاربر جدید", "permission": "userpanel_users_add"}, {"title": "ویرایش کاربران", "permission": "userpanel_users_edit"}, {"title": "حذف کاربران", "permission": "userpanel_users_delete"}];
```
**نحوه استفاده مثال 1**
```js
$(() => {
	const $tbody = $("#permission-table tbody");
	if ($tbody.length) {
		for (const permission of permissions) {
			$tbody.append('<tr><td><div class="checkbox checkbox-primary"><label><input type="checkbox" name="permissions[' + permission.permission + ']" value="' + permission.permission + '">' + permission.title + '</label></div></td></tr>');
		}
	}
});
```
**مثال 2**: افزودن تنظیم جدید 
```php
<?php
namespace themes\themename\views\packagename;

use packages\base\{View, Options};

class Index extends View {

	protected $hasAccessToDelete = false;

	public function __beforeLoad() {
		Options::set("packages.packagename.has_access_to_delete_service", $this->hasAccessToDelete);
		$this->dynamicData()->setOption("packages.packagename.has_access_to_delete_service");
	}
	public function hasAccessToDelete(bool $permission) {
		$this->hasAccessToDelete = $permission;
	}
}
```

**خروجی مثال 2**
```js
var options = {"packages.base.translator.defaultlang":"fa_IR","packages.base.translator.changelang":"uri","packages.base.translator.changelang.type":"short","packages.base.routing.www":"nowww", "packages.packagename.has_access_to_delete_service": true};var translator = {"lang":"fa_IR"};
```
**نحوه استفاده مثال 2**
```js
$(() => {
	if (!options["packages.packagename.has_access_to_delete_service"]) {
		$(".services .service .delete-service-btn").prop("disabled", true);
	} else {
		$(".services .service .delete-service-btn").prop("disabled", false);
	}
	/**
	 * Or
	 * $(".services .service .delete-service-btn").prop("disabled", !options["packages.packagename.has_access_to_delete_service"]);
	 */
});
```