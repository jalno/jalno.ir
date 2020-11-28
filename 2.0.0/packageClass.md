# پکیج‌ها
در جالنو برای مدیریت و کاربا پکیج‌های پروژه کلاس `packages\base\Package` تعریف شده است. 
از این کلاس زمان کار با فایل‌ها برای دسترسی به فایل موجود در پکیج، آدرس فایل و ... استفاده میشود.

در کلاس Package متد‌های زیر تعریف شده است. 

|	متد   |	کاربرد  |
|--------------|--------|
| <span class="display-block ltr">fromName(string $name): Package</span> | گرفتن پکیج |
| <span class="display-block ltr">getName(): string</span> | گرفتن نام پکیج والد |
| <span class="display-block ltr">getFilePath(string $file): string</span> | گرفتن آدرس فایل |
| <span class="display-block ltr">url(string $file, bool $absolute): string</span> | گرفتن آدرس فایل |
| <span class="display-block ltr">getFile(string $path): File\Local</span> | گرفتن یک فایل   |
| <span class="display-block ltr">getHome(): Directory</span> | گرفتن مشخصات پکیج بصورت شئ از کلاس Directory   |
| <span class="display-block ltr">getFileContents(string $file): string</span> | خواندن محتویات فایل |
| <span class="display-block ltr">getOption(string $name): ?mixed</span> | گرفتن تنظیم تعریف شده برای پکیج |
| <span class="display-block ltr">setOption(string $name, mixed $value)</span> | افزودن تنظیم جدید برای پکیج |

 **فرمورک از متدهای getter , setter زیر برای کامل کردن اطلاعات پیکج استفاده میکند.**

|	متد   |	کاربرد  |
|--------------|--------|
| <span class="display-block ltr">addDependency(string $dependency)</span> | اضافه کردن پکیج وابسته |
| <span class="display-block ltr">getDependencies(): array</span> | گرفتن نام پکیج‌های وابسته |
| <span class="display-block ltr">addFrontend(string $source)</span> | افزودن پکیج قالب |
| <span class="display-block ltr">getFrontends(): array</span> | گرفتن نام پکیج‌های معرفی شده برای قالب |
| <span class="display-block ltr">setBootstrap(string $bootstrap)</span> | افزودن فایل bootstrap |
| <span class="display-block ltr">bootup()</span> | گرفتن فایل‌های bootstrap |
| <span class="display-block ltr">setRouting(string $routing)</span> | تنظیم فایل مسیریابی |
| <span class="display-block ltr">getRouting(): ?File</span> | گرفتن فایل مسیریابی |
| <span class="display-block ltr">getRoutingRules(): array</span> | گرفتن آدرس‌های مسیریابی مشخص شده در فایل routing.json   |
| <span class="display-block ltr">getConfigFile(): File</span> | گرفتن فایل پیکربندی (package.json) پیکج |


## دسترسی به پکیج 
در کلاس packages\base\Package متد `fromName` برای دسترسی به پکیج‌های پروژه تعریف شده است. 
علاوه بر متد fromName با فراخوانی متد `package` که در کلاس `packages\base\Packages` ،تعریف شده است نیز میتوانید به پکیج‌های پروژه دسترسی داشته باشید. متدهای fromName و package برای سهولت بصورت static تعریف شده‌اند.

خروجی متد‌های fromName و package درصورتی که پکیج مشخص شده موجود باشد شئ از کلاس packages\base\Package است که حاوی مشخصات پکیج مانند پکیج‌های وابسته ، فایل مسیریاب ،فایل‌های مترجم و بطور کلی تمامی تنظیماتی که در فایل ساختار پیکج (package.json) تنظیم شده است می‌باشد.

درصورتی که پکیج مشخص شده موجود نباشد استثنا‌`packages\base\IO\NotFoundException` پرتاب می‌شود.

**دسترسی به پکیج از طریق متد package**
```php
use packages\base\Packages;


$package = Packages::package("packagename");
```

**دسترسی به پکیج از طریق متد fromName**
```php
use packages\base\Package;


$package = Package::fromName("packagename");
```

## آدرس فایل
برای دسترسی به آدرس فایل‌ها دو متد `getFilePath` و `url` تعریف شده است. 
هر دو متد به عنوان ورودی آدرس و نام فایل را بصورت رشته دریافت میکنند. 
فایل معرفی شده میتواند موجود نباشد.

اگر به آرگومان دوم متد `url` مقدار true داده شود آدرس را بطور کامل (در قالب آدرس url) برمیگرداند. 
مقدار پیش‌فرض این آرگومان `false` میباشد.

#### تفاوت متد `getFilePath` و `url` 
از متد `getFilePath` برای دریافت آدرس فایل در داخل پکیج و از متد `url` برای دریافت آدرس اینترنتی فایل استفاده میشود.

**مثال 1**
```php
<?php
namespace packages\packagename\controllers;

use themes\themename\views;
use packages\base\{Controller, Response, View, Packages, IO\File};

class Albums extends Controller {

	public function insertImg(): Response {

		$view = view::byName(views\Albums\InsertImg::class);
		$this->response->setView($view);

		if (Http::is_post()){
			$inputs = $this->checkinputs([
				'img' =>[
					'type' => 'image',
					"max-size" => 2097152 // Byte
					"obj" => true, 
					"extension" => array('jpeg', 'jpg']
				]
			]);
			
			$path = 'storage/public/albums/' . $inputs['img']->getFile()->md5() . '.' . $inputs['img']->getExtension();
			$img = new File\Local(Packages::package('packagename')->getFilePath($path));
			/**
			 * Or
			 * $img = Packages::package('packagename')->getFile($path);
			 */
			$directory = $img->getDirectory();
			if (!$directory->exists()) {
				$directory->make(true);
			}
			$inputs['img']->copyTo($img);
		}
		
		$this->response->setStatus(true);
		return $this->response;
	}
}
```
در مثال فوق ابتدا در $path آدرس محل ذخیره فایل را ایجاد میکنیم
سپس $path را به متد getFilePath داده که آدرس دقیق فایل مطابق package موردنظر ایجاد شود.

خروجی متد getFilePath بصورت زیر میباشد.
````
packages/packagename/storage/public/albums/0bc27259aae45199b214898a48d0a7bf.jpg
````  

__برای اطلاعات بیشتر در رابطه با فایل ها و دایرکتوری ها به صفحات کار با [فایل‌ها](file.md) و [پوشه‌ها](directory.md) مراجعه کنید.__


**مثال 2**
```php
<?php
namespace packages\packagename\controllers;

use packages\base\{Controller, Response, Packages, NotFound, ResponseFile};

class Albums extends Controller {

	public function download($data): Response {
		$file = Packages::package('packagename')->getFile($data["path"]);
		if (!$file->exists()) {
			throw new NotFound();
		}
		$responsefile = new ResponseFile();
		$responsefile->setLocation(Packages::package('packagename')->getFilePath($file->path));
		$responsefile->setSize($file->size);
		$responsefile->setName($file->name);
		$this->response->setFile($responsefile);

		$this->response->setStatus(true);
		return $this->response;
	}
}
```
در مثال فوق قصد داریم فایلی را برای دانلود به کاربر بدهیم.
ابتدا شئ از کلاس فایل مطابق آدرس دریافت شده دریافت کرده و وجود فایل را بررسی میکنیم.

__برای اطلاعات بیشتر به صفحه [پاسخ](response.md) مراجعه کنید.__

## [خواندن محتویات فایل](#get_file_content) 
متد `getFileContents` برای خواندن محتویات فایل تعریف شده است. 
این متد به عنوان آرگومان ورودی آدرس و نام فایل موجود در پکیج را بصورت رشته دریافت میکند. در صورتی که فایل موجود نباشد استثنا `packages\base\IO\NotFoundException` پرتاب می‌شود. 

**مثال**
```php
<?php
namespace packages\packagename\controllers;

use themes\themename\views;
use packages\base\{View, Controller, Packages, view\Error};

class Main extends Controller {

	public function description() {

		$view = view::byName(views\main\Description::class);
		$this->response->setView($view);

		try {
			$description = Packages::package('packagename')->getFileContents("storage/public/description.txt");
			$view->setData($description, 'description');
		} catch(IO\NotFoundException $e) {
			throw new Error("file_not_exists");
		}

		$this->response->setStatus(true);
		return $this->response;
	}
}
```
در مثال فوق محتویات فایل را با متد getFileContents گرفته و در متد setData به view منتقل می‌شود.

## [گرفتن فایل](#get_file)
متد `getFile` آدرس و نام فایل را بصورت رشته گرفته و خروجی آن شئ از کلاس [File](file.md) میباشد.
فایل مشخص شده میتواند موجود نباشد. 


**مثال**
```php
<?php
namespace packages\packagename\controllers;

use themes\themename\views;
use packages\base\{Controller, Response, View, Http, Packages};

class Main extends Controller {

	public function addDescription(): Response {

		$view = View::byName(views\main\AddDescription::class);
		$this->response->setView($view);

		if (Http::is_post()) {
		   
			$input = $this->checkinputs([
				'description' =>[
					'type' => 'string'
				]
			]);

			$file = Packages::package('packagename')->getFile("storage/public/description.txt");
			
			$directory = $file->getDirectory();
			if (!$directory->exists()) {
				$directory->make(true);
			}
			
			$file->write($input['description']);
		}

		$this->response->setStatus(true);
		return $this->response;
	}
}
```
در مثال فوق فایل مورد نظر را با فراخوانی متد getFile گرفته سپس از وجود دایرکتوری والد آن اطمینان حاصل میشود (اگر دایرکتوری والد موجود نباشد با فراخوانی متد make ایجاد می‌شود.) 
 سپس متن دریافت شده از ورودی در فایل نوشته می‌شود. اگر فایل موجود نباشد با فراخوانی متد write ایجاد و متن در آن نوشته میشود. در صورت وجود فایل متن جایگزین متن قبلی می‌شود.

## [اضافه کردن تنظیمات جدید](#set_option)
علاوه بر کلیدهای routing, frontend, autoload , ... که در فایل ساختار پکیج تعریف شده‌اند و باید مقداردهی شوند؛ فرمورک این امکان را به برنامه نویسان میدهد تا بتوانند تنظیماتی را در فایل [ساختار بسته‌ها](package.md) اضافه کنند و در روند برنامه از آن استفاده کنند.

بطور مثال برنامه نویس آدرس محل ذخیره فایل‌های آپلود شده را در این فایل تنظیم میکند و در برنامه بجای استفاده از آدرس ایستا تنظیمات پکیج را فراخوانی میکند. 

برای فراخوانی تنظیمات متد `getOption` تعریف شده است. آرگومان ورودی متد کلید تنظیم میباشد.

علاوه‌بر معرفی تنظیمات در فایل ساختار میتوانید تنظیمات مورد نظر را با استفاده از متد `setOption` در روند برنامه تنظیم کنید ولیکن باید توجه داشته باشید، این تنظیم باید قبل از فراخوانی و دریافت، مقدار دهی شده باشد.

**توجه :** در این روش تنظیم ذخیره نشده و فقط تا پایان همان درخواست قابل فراخوانی است

**نمونه فایل پیکربندی**
```json
{
	"permissions": "*",
	"routing": "routing.json",
	"frontend": "frontend",
	"autoload": {
		"directories": ["controllers", "Models", "listeners", "events"]
	},
	"dependencies": ["userpanel"],
	"languages":{
		"fa_IR": "langs/fa_IR.json",
		"en_US": "langs/en_US.json"
	},
	"events": [
		{
			"name": "packages/userpanel/events/usertype_permissions_list",
			"listener": "listeners/settings/usertypes/Permissions@list"
		}
	],
	"upload_path": "storage/public/upload/"
}
```


**مثال: ** نحوه استفاده از تنظیمات
```php
<?php
namespace packages\packagename\controllers;

use themes\themename\views;
use packages\packagename\User as Model;
use packages\base\{Controller, Response, View, Packages, NotFound};

class Users extends Controller {

	public function updateAvatar($data): Response {

		$user = Model::byId($data['id']);
		if (!$user) {
			throw new NotFound;
		}
		
		$view = view::byName(views\user\Info::class);
		$this->response->setView($view);

		$inputs = $this->checkinputs([
			'img' =>[
				'type' => 'image',
				"max-size" => 2097152 // Byte
				"obj" => true, 
				"extension" => array('jpeg', 'jpg'],
				"resize" => [200, 200]
			]
		]);

		$package = Packages::package('packagename');

		$path = $package->getOption("upload_path") . $inputs["img"]->getFile()->md5() . "." . $inputs["img"]->getExtension();

		$file = Packages::package("packagename")->getFile($path);
		if (!$file->exists()) {
			$directory = $file->getDirectory();
			if (!$directory->exists()) {
				$directory->make(true);
			}

			$image->saveToFile($file);
		}
		
		$user->avatar = $path;
		$user->save();

		$this->response->setData($package->url($path, true), "path");

		$this->response->setStatus(true);
		return $this->response;
	}
}
```
