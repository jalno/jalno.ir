# پکیج‌ها
در جالنو برای مدیریت و کاربا پکیج‌های پروژه کلاس `packages\base\Package` تعریف شده است. 
از این کلاس زمان کار با فایل‌ها برای دسترسی به فایل موجود در پکیج، آدرس فایل و ... استفاده میشود.

در کلاس Package متد‌های زیر تعریف شده است. 

|    متد   |    کاربرد  |
|--------------|--------|
| fromName($name) | گرفتن پکیج |
| getName() | گرفتن نام پکیج والد |
| getFilePath($file) | گرفتن آدرس فایل |
| url($file, $absolute) | گرفتن آدرس فایل |
| getFile($path) | گرفتن یک فایل   |
| getHome() | گرفتن مشخصات پکیج بصورت شئ از کلاس Directory   |
| getFileContents($file) | خواندن محتویات فایل |
| getOption($name) | گرفتن تنظیم تعریف شده برای پکیج |
| setOption($name, $value) | افزودن تنظیم جدید برای پکیج |

 **فرمورک از متدهای getter , setter زیر برای کامل کردن اطلاعات پیکج استفاده میکند.**
|    متد   |    کاربرد  |
|--------------|--------|
| addDependency($dependency) | اضافه کردن پکیج وابسته |
| getDependencies() | گرفتن نام پکیج‌های وابسته |
| addFrontend() | افزودن پکیج قالب |
| getFrontends() | گرفتن نام پکیج‌های معرفی شده برای قالب |
| setBootstrap($bootstrap) | افزودن فایل bootstrap |
| bootup() |  فراخوانی فایل bootstrap در صورتی که در پکیج تنظیم شده باشد. |
| setRouting($routing) | تنظیم فایل مسیریابی |
| getRouting() | گرفتن فایل مسیریابی |
| getRoutingRules() | گرفتن آدرس‌های مسیریابی مشخص شده در فایل routing.json   |
| getConfigFile() | گرفتن فایل پیکربندی (package.json) پیکج |


## دسترسی به پکیج 
در کلاس packages\base\Package متد `fromName` برای دسترسی به پکیج‌های پروژه تعریف شده است. 
علاوه بر متد fromName با فراخوانی متد `package` که در کلاس `packages\base\Packages` ،تعریف شده است نیز میتوانید به پکیج‌های پروژه دسترسی داشته باشید. متدهای fromName و package برای سهولت بصورت static تعریف شده‌اند.

خروجی متد‌های fromName و package درصورتی که پکیج مشخص شده موجود باشد شئ از کلاس packages\base\Package برمیگردانند که حاوی مشخصات پکیج مانند پکیج‌های وابسته ، فایل مسیریاب ،فایل‌های مترجم و بطور کلی تمامی تنظیماتی که در فایل ساختار پیکج (package.json) تنظیم شده است می‌باشد.

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
متد url به ابتدای آدرس `/` اضافه میکند. همچنین با مقداردهی true به آرگومان دوم میتوان آدرس کامل تولید کرد.


**1 مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{View, Controller, Packages, IO\File};
use themes\themename\views;

class Albums extends Controller {

    function insertImg() {
        $view = view::byName(views\Albums\InsertImg::class);
        $this->response->setView($view);

        if(http::is_post()){
           
            $inputs = $this->checkinputs([
                'img' =>[
                    'type' => 'image',
                    "max-size" => 2097152 // Byte
                    "obj" => true, 
                    "extension" => array('jpeg', 'jpg']
                ]
            ]);
            
            $path = 'storage/public/albums/' . $inputs['img']->md5() . '.' . $inputs['img']->getExtension();
			$img = new File\Local(Packages::package('packagename')->getFilePath($path));
			$directory = $img->getDirectory();
			if (!$directory->exists()) {
				$directory->make(true);
			}
			$inputs['img']->copyTo($img);
    	}
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


**2 مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{View, Controller, Packages, IO};
use themes\themename\views;

class Albums extends Controller {

    function download(string $path) {
        $file = new IO\File\Local(Packages::package('packagename')->getFilePath($path));
        if (!$file->exists()) {
			throw new IO\NotFoundException($file);
        }
        $this->response->Go(Packages::package('packagename')->url($path, true));
    	return $this->response;
    }
}
```
در مثال فوق قصد داریم فایلی را برای دانلود به کاربر بدهیم.
ابتدا شئ از کلاس فایل مطابق آدرس دریافت شده ایجاد کرده و وجود فایل را بررسی میکنیم.
سپس آدرس فایل را با فراخوانی متد `url` و در نظر گرفتن مقدار true برای آرگومان دوم، به متد Go میدهیم. 

__برای اطلاعات بیشتر به صفحه [پاسخ](response.md) مراجعه کنید.__

خروجی متد url بصورت زیر میباشد. 
````
http://domain.com/packages/packagename/storage/public/7bbfc6eb592cf82d4fb0ca9cc343335d.png
````

**مثال 3** استفاده از متد url در قالب
```php
<?php
namespace themes\themename\views\profile;

use packages\base\Packages;
use packages\base\frontend\Theme;
use packages\base\views\Form;
use themes\clipone\{ViewTrait, views\FormTrait, views\TabTrait};

class edit extends Form{

	use ViewTrait,FormTrait, TabTrait;
    
    function __beforeLoad(){
		$this->setTitle(array(
			t('profile.edit')
		));

		$this->addBodyClass('profile');
		$this->addBodyClass('profile_edit');
	}
	
	protected function getAvatarURL(){
		if($this->getUserData('avatar')){
			return Packages::package('userpanel')->url($this->getUserData('avatar'));
		}else{
			return Theme::url('assets/images/defaultavatar.jpg');
		}
    }
    
    public function setUserData($data){
		$this->setData($data, 'user');
	}
	public function getUserData($key){
		return($this->data['user']->$key);
	}
}
```

```html
<div class="img-profile">
    <img class="img-responsive img-circle" src="<?php echo $this->getAvatarURL(); ?>">
    <h4 class="user-name">
        <i class="fa fa-user"></i>
        username				
    </h4>
</div>
```

## خواندن محتویات صفحه 
متد `getFileContents` برای خواندن محتویات فایل تعریف شده است. 
این متد به عنوان آرگومان ورودی آدرس و نام فایل موجود در پکیج را بصورت رشته دریافت میکند. در صورتی که فایل موجود نباشد استثنا `packages\base\IO\NotFoundException` پرتاب می‌شود. 

**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{View, Controller, Packages, IO};
use themes\themename\views;

class Main extends Controller {

    function description() {
        $view = view::byName(views\main\Description::class);
        $this->response->setView($view);

        try {
            $description = Packages::package('packagename')->getFileContents("storage/public/description.txt");
            $view->setData($description, 'description');

        }catch(IO\NotFoundException $e) {}

        return $this->response;
    }
}
```
در مثال فوق محتویات فایل را با متد getFileContents گرفته و در متد setData به view منتقل می‌شود.

## گرفتن فایل
متد `getFile` آدرس و نام فایل را بصورت رشته گرفته و خروجی آن شئ از کلاس [File](file.md) میباشد.
فایل مشخص شده میتواند موجود نباشد. 


**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{View, Controller, Packages, IO\File};
use themes\themename\views;

class Main extends Controller {

    function addDescription() {
        $view = view::byName(views\main\AddDescription::class);
        $this->response->setView($view);

        if(http::is_post()){
           
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
    	return $this->response;
    }
}
```
در مثال فوق فایل مورد نظر را با فراخوانی متد getFile گرفته سپس از وجود دایرکتوری والد آن اطمینان حاصل میشود (اگر دایرکتوری والد موجود نباشد با فراخوانی متد make ایجاد می‌شود.) 
 سپس متن دریافت شده از ورودی در فایل نوشته می‌شود. اگر فایل موجود نباشد با فراخوانی متد write ایجاد و متن در آن نوشته میشود. در صورت وجود فایل متن جایگزین متن قبلی می‌شود.

## اضافه کردن تنظیمات جدید
علاوه بر کلیدهای routing, frontend, autoload , ... که در فایل ساختار پکیج تعریف شده‌اند و باید مقداردهی شوند؛ فرمورک این امکان را به برنامه نویسان میدهد تا بتوانند تنظیماتی را در فایل [ساختار بسته‌ها](package.md) اضافه کنند و در روند برنامه از آن استفاده کنند.

بطور مثال برنامه نویس آدرس محل ذخیره فایل‌های آپلود شده را در این فایل تنظیم میکند و در برنامه بجای استفاده از [آدرس دهی‌](address.md) تنظیمات پکیج را فراخوانی میکند. 

برای فراخوانی تنظیمات متد `getOption` تعریف شده است. آرگومان ورودی متد کلید تنظیم میباشد.

علاوه‌بر معرفی تنظیمات در فایل ساختار میتوانید تنظیمات مورد نظر را با استفاده از متد `setOption` تنظیم کنید. متد setOption  باید در متد سازنده کلاس کنترلر فراخوانی شود تا در هر بار فراخوانی کنترلر تنظیم مورد‌نظر مقداردهی شود.

**توجه :** در این روش فقط متد‌های تعریف شده در کنترلر به تنظیمات دسترسی دارند

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
use packages\base\{View, Controller, Packages, IO, NotFound};
use packages\packagename\User;
use themes\themename\views;

class Users extends Controller {

    function info($data) {
        $user = User::byId($data['id']);
        if(!$user) {
            throw new NotFound;
        }

        $package = Packages::package('packagename');
        $path = $package->getHome()->getPath().$package->getOption("upload_path");
        /**
         * path: packages/packagename/storage/public/upload/
         * */
        
        $view = view::byName(views\user\Info::class);
        $this->response->setView($view);
        $view->setData($user, 'user');
        $view->setData($path.$user->avatar, 'avatar');

        return $this->response;
    }
}
```
متد `getHome()` پکیج را بصورت شئ از کلاس [Directory](directory.md) برمیگرداند. با فراخوانی متد getPath به آدرس دایرکتوری دسترسی داریم (packages/packagename).
سپس با فراخوانی متد getOption به آدرس محل ذخیره فایل‌های آپلود شده که در فایل package.json تنظیم شده است دسترسی خواهیم داشت. سپس در متد setData نام تصویر ذخیره شده در دیتابیس به آدرس اضافه شده و تحت عنوان کلید avatar به view منتقل می‌شود.


## فایل bootstrap 
در فرمورک کلیدی تحت عنوان bootstrap تعریف شده است. در این کلید آدرس فایل php را معرفی میکنید و فرمورک بعد از لود شدن کامل پکیج و قبل از پیدا کردن آدرس‌ها و کنترلرها این فایل را فراخوانی و اجرا میکند. 
از این فایل برای انجام عمیاتی مانند بررسی ‌‌‌IP کاربر که قبل از اجرای برنامه باید چک شود استفاده می‌شود. 

فرمورک عملیات اضافه کردن فایل bootstrap و فراخوانی آن را با استفاده از متدهای `setBootstrap` و `bootup` انجام میدهد.

**معرفی فایل bootstrap در فایل package.json**
```json
"bootstrap": "bootup/checkAccess.php"
```