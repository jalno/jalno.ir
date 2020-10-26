# تولید آدرس

در جالنوبرای تولید آدرس قابل دسترس در مرورگر از سه روش میتوان استفاده کرد که هر روش برای دسترسی به فایل های مختلفی استفاده میشود که به شرح زیر میباشد.

| متد / تابع      |                             دسترسی به  فایل                             |
|---------------------------------------------|-------------------------------------------|
| packages\base\url                           |      لینک به صفحات                        |
| packages\base\frontend\theme::url           |  لینک به فایل های استاتیک قالب            |
| packages\base\package::url                  | لینک به فایل های استاتیک پکیج             |


## تنظیمات زبان 
ابتدا باید در فایل `config.php` که در مسیر `packages/base/libraries/config` قرار دارد تنظیمات `زبان پیشفرض` و `تغییر زبان` و `امکان مخفف وارد کردن زبان` را انجام دهیم.

**توجه :** اگر تنظیمات زبان انجام شده باشد، در تولید آدرس ، زبان فعال در آدرس قرار داده میشود.


### زبان پیش فرض : 
با استفاده از  آپشن `packages.base.translator.defaultlang` میتوانیم زبان پیش فرض سایت را مشخص کنیم. مقدار وارد شده باید کد زبان کامل باشد.
 اگر این آپشن مقدار دهی نشود, هر کد زبان کاملی را میپذیرد.
 کد زبان کامل از کد زبان دو حرفی_کد کشور دو حرفی تشکیل میشود 

```php
'packages.base.translator.defaultlang' => 'fa_IR' // or en_US
```

### زبان های مجاز برای تغییر زبان :
با استفاده از آپشن `packages.base.translator.active.langs` زبان های مجاز برای تغییر در پروژه معرفی می‌شوند.

کاربرد آن زمانی است که پروژه ی شما دارای ۳ زبان فایل ترجمه است ولی شما قصد دارید فقط ۲ زبان از آن فعال باشد. با تعریف زبان ها در این آپشن از باز شدن سایت در زبان سوم جلوگیری میشود.

**توجه :** زبان پیشفرض جزو زبان های مجاز برای تغییر زبان در نظر گرفته میشود حتی اگر در این آپشن تعریف نشود.

**مثال :**
```php
'packages.base.translator.defaultlang' => 'en_US',
'packages.base.translator.active.langs' => array(
	"fa_IR",
)
```

### تغییر زبان :
با استفاده از آپشن `packages.base.translator.changelang` مشخص میکنیم کاربر از چه روشی زبان را مشخص کند.
سه مقدار میتواند داشته باشد :

| مقدار      |                             کاربرد                             |
|---------------------------------------------|-------------------------------------------|
| uri                           |      زبان در ابتدای ادرس اضافه میشود |
| parameter           |  انتهای آدرس اضافه میشود           |
| خالی باشد                 | کاربر نمیتواند بطور مستقیم زبان را تغییر دهد             |

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

### مخفف وارد کردن زبان :
با استفاده از آپشن `packages.base.translator.changelang.type` امکان مخفف وارد کردن زبان را در آدرس میدهد .
آپشن مقادیر `short` , `complete` میگیرد.

**مثال** 
```php
'packages.base.translator.changelang.type' => 'short'  // fa
'packages.base.translator.changelang.type' => 'complete'    //fa_IR
```

**نمونه فایل config.php**
```php
'packages.base.translator.defaultlang' => 'fa_IR',
'packages.base.translator.changelang' => 'parameter', //uri, parameter
'packages.base.translator.changelang.type' => 'complete', //short, complete
```

## لینک به صفحات 
برای ادرس دهی و لینک شدن به صفحات مختلف از تابع `packages\base\url` استفاده میشود . 
این تابع سه ارگومان ورودی میگیرد;

### آرگومان اول 
آرگومان اول ادرس صفحه مورد نظری را میگیرد که در فایل `routing.json` تعریف شده است.
##### برای اطلاعات بیشتر به صفحه ‍[مسیریابی](routing.md) مراجعه کنید.

نمونه فایل routing.json 
```json 
[
    {
        "path": "/",
        "controller": "controllers/Main@index"
    },
	{
		"path": "about-us",
		"controller": "controllers/Main@aboutus"
    }
]
```

میتوان url را بصورت `function packages\base\url` در فایل مورد استفاده معرفی کرد.   

**مثال 1**
```php
<?php
namepsacep packages\packagename\controllers;

use function packages\base\url;
use packages\base\{Controller, Response};

class Main extends Controller {
	public function index(): Response {
		$response = new Response(true);
		$response->Go(url("about-us")); // redirect to about us page
		return $response;
	}
}
```

**مثال 2**
همچنین میتوان `packages\base` را use کرده و url را بصورت `base\url()` فراخوانی کرد.
```php
<?php
namepsacep packages\packagename\controllers;

use packages\base;
use packages\base\{Controller, Response};

class Main extends Controller {
	public function index(): Response {
		$response = new Response(true);
		$response->Go(base\url("about-us")); // redirect to about us page
		return $response;
	}
}
```

### آرگومان دوم
آرگومان دوم یک آرایه `key => value` دریافت می‌کند،‌ که به وسیله آن پارامتر‌های آدرس مشخص ‌می‌شوند.
مقدار کلید هر خانه از آرایه کلید پارامتر و مقدار value آن مقدار پارامتر میباشد.

**مثال**
```php
use function packages\base\url;

// domain is domain.com

echo url("users", ["id" => 1]);
/**
 * Output is:
 * /en/users?id=1 or
 * /users?id=1&lang=en or
 * /users?id=1 // if the Site isn't multi languages
 */
```

در فریمورک ایندکس های `@hostname` و `@lang` و `@encode` در این ارایه رزرو شده‌اند که کاربرد آن‌ها بجز تعریف پارامتر‌های آدرس میباشد. کاربرد هر کدام به شرج زیر است.

### معرفی ایندکس های آرگومان دوم

**@lang :** با استفاده از ایندکس @lang میتوانیم زبان مورد نظر را برای آدرس url تعیین کنیم. مقدار ایندکس میتواند کد زبان دو حرفی باشد.
درصورتی میتوانیم زبان را تعیین کنیم که سایت به صورت چند زبانه باشد و در فایل `config.php` که در مسیر `packages/base/libraries/config` قرار دارد، تنظیمات زبان انجام شده باشد.

**مثال**
```php
use function packages\base\url;


echo url("login", ["@lang" => "fa"], true);
/**
 * Output is:
 * https://domain.com/fa/login  or
 * https://domain.com/login/?%40lang=fa   
**/
```


**@hostname :**  از ایندکس @hosname .برای تولید آدرس به جای آدرس دامنه اصلی سایت استفاده می‌شود
برای تغییر دامنه باید آرگومان سوم تابع `packages\base\url` را برابر با true مقدار دهی کنیم.

اگر مقدار آرگومان سوم false باشد @hostname به عنوان پارامتر به ادامه ی آدرس اضافه می‌شود.

**مثال 1**
```php
use function packages\base\url;


echo base\url("login", ["@hostname" => "domain.com"], true);
/**
 * Output is:
 * https://domain.com/en/login  or
 * https://domain.com/login/?lang=en   or
 * https://domain.com/login     // if the Site isn't multi languages

```

**مثال 2**
```php
use function packages\base\url;


echo url("login", ["@hostname" => "domain.com"], false);
/**
 * Output is:
 * /en/login?%40hostname=domain.com  or
 * /login/?%40hostname=domain.com&lang=en   or
 * /login/?%40hostname=domain.com     // if the Site isn't multi languages

```

**@encode :** برای تعیین کردن Encoding صفحه استفاده میشود.

> نکته : آرگومان های تابع base\url() اختیاری هستند; در صورتی که به تابع آرگومانی ارسال نشود ادرس دامنه اصلی را برمیگرداند.

> نکته :  زمانی که از تابع `packages\base\url` برای ادرس دهی صفحات استفاده میشود ، به‌صورت خودکار زبان فعال را در آدرس قرار میدهد .
##### برای اطلاعات بیشتر به صفحه ‍[مترجم](translator.md) مراجعه کنید.


**مثال 1 :** 
```php
<?php
use packages\base;
?>
<!DOCTYPE html>
<html>
<body>

<h1>
   <a href="<?php echo base\url(); ?>"> home page </a> 
</h1>

/*output
    <a href="/"> home page </a> 
*/

</body>
</html>
```

**مثال 2 :** 
```php
/* نمونه فایل config.php

    'packages.base.translator.defaultlang' => 'fa_IR',
	'packages.base.translator.changelang' => 'uri',
    'packages.base.translator.changelang.type' => 'short'
*/ 
<?php
use packages\base;
?>
<!DOCTYPE html>
<html>
<body>

<h1>
   <a href="<?php echo base\url('about-us'); ?>"> about us </a> 
</h1>

/*output
    <a href="/fa/about-us"> about us </a> 
*/

</body>
</html>
```

**مثال 3 :** 
```php

/* نمونه فایل config.php

    'packages.base.translator.defaultlang' => 'fa_IR',
	'packages.base.translator.changelang' => 'uri',
    'packages.base.translator.changelang.type' => 'short'
*/    
<?php
use packages\base;
?>
<!DOCTYPE html>
<html>
<body>

<h1>
   <a href='<?php echo base\url("about-us", ["@hostname" => "test.com", "@lang" => "en", "key" => "value", "key2" => "value2"], true); ?>'> about us </a> 
</h1>

/*output
    <a href="http://test.com/en/about-us?key=value&key2=value2"> about us </a> 
*/

<h1>
   <a href='<?php echo base\url("about-us", ["@hostname" => "test.com", "@lang" => "en"]); ?>'> about us </a> 
</h1>

/*output
    <a href="/en/about-us?%40hostname=test.com"> about us </a> 
*/

</body>
</html>
```

**مثال 4 :** 
```php

/* نمونه فایل config.php

    'packages.base.translator.defaultlang' => 'fa_IR',
	'packages.base.translator.changelang' => 'parameter',
    'packages.base.translator.changelang.type' => 'complete'
*/    
<?php
use packages\base;
?>
<!DOCTYPE html>
<html>
<body>

<h1>
   <a href='<?php echo base\url("about-us", ["@hostname" => "test.com", "@lang" => "en"],true); ?>'> about us </a> 
</h1>

/*output
    <a href="http://test.com/about-us?%40lang=en_US"> about us </a> 
*/

<h1>
   <a href='<?php echo base\url("about-us", ["@hostname" => "test.com", "@lang" => "en", "key" => "value"]); ?>'> about us </a> 
</h1>

/*output
    <a href="/about-us?%40hostname=test.com&%40lang=en_US&key=value"> about us </a> 
*/

</body>
</html>
```

**مثال 5 :** 
```php
/* نمونه فایل config.php

    'packages.base.translator.defaultlang' => 'en_US',
	'packages.base.translator.changelang' => 'uri',
    'packages.base.translator.changelang.type' => 'short'
*/
<?php
namespace packages\my_package\controllers;
use packages\base\{response, controller};
use packages\my_package\User;

class User extends controller {

    public function delete($user): response {
        $user = User::byId($user['id']);
        if($user) {
            $user->delete();
			$this->response->setStatus(true);
            $this->response->Go(base\url('users'));
            /*
                /en/users
            */
        }
        return $this->response;
    }
}
?>
```

**مثال 6 :** 
```php
/* نمونه فایل config.php

    'packages.base.translator.defaultlang' => 'en_US',
	'packages.base.translator.changelang' => 'parameter',
    'packages.base.translator.changelang.type' => 'complete'
*/
<?php
namespace packages\my_package\controllers;
use packages\base\{response, controller};
use packages\my_package\User;

class User extends controller {

    public function insert(): response {

        $inputs = array(
            'name' => array(
                'type' => 'string'
            ),
            'lastname' => array(
                'type' => 'string',
                'optional' => true,
            ),
            'email' => array(
                'type' => 'email',
            )
        );
        $formdata = $this->checkinputs($inputs);
        $user = new User($formdata);
        $user->save();
        $this->response->Go(base\url('user/view/'.$user->id));
        /*
            /user/view/1?%40lang=en_US
        */
        return $this->response;
    }
}
?>
```


### آرگومان سوم 
از آرگومان سوم برای تولید آدرس کامل استفاده میشود اگر مقدار آن true باشد آدرس بطور کامل تولید می‌شود.
مقدار پیش فرض این آرگومان `false` است.

**توجه :** اگر مقدار آرگومان سوم برابر true و در آرگومان دوم @hostname مقدار دهی شده باشد، مقدار @hostname به عنوان دامنه اصلی در نظر گرفته می‌شود.

**مثال 1**
```php
use function packages\base\url;

// domain is domain.com
echo url("login", [], false); // default is false
/**
 * Output is:
 * /en/login   or
 * /login/?lang=en  or
 * /login   // if the Site isn't multi languages
*/
```

**مثال 2**
```php
use function packages\base\url;

// domain is domain.com
echo url("login", [], true);
/**
 * Output is:
 * https://domain.com/en/login  or
 * https://domain.com/login/?lang=en   or
 * https://domain.com/login     // if the Site isn't multi languages
 */
```

**مثال 3**
```php
use function packages\base\url;

// domain is domain.com
echo url("login", ["@hostname" => "newdomain.com"], true);
/**
 * Output is:
 * https://newdomain.com/en/login  or
 * https://newdomain.com/login/?lang=en   or
 * https://newdomain.com/login     // if the Site isn't multi languages

```


## لینک به فایل های استاتیک قالب
برای دسترسی به فایل های استاتیک در قالب مانند تصاویر از متد `packages\base\frontend\theme::url` استفاده میشود .
آرگومان ورودی متد آدرس فایل در قالب میباشد.

**مثال 1 :**
```php
<?php
use packages\base\frontend\theme;
?>

<!DOCTYPE html>
<html>
<body>

    <img src="<?php echo theme::url('assets/images/img.jpg');?>">

    /*output
        <img src="/packages/my_package/frontend/assets/images/img.jpg');?>">
    */

</body>
</html>
```

## لینک به فایل های استاتیک پکیج

برای دسترسی به فایل های موجود در پکیج از متد `packages\base\package::url` استفاده میشود.

### پوشه های ذخیره اطلاعات 
فایل های پکیج که در زمان اجرا نیاز میشود برنامه نویس از آنها استفاده کند، دارای سطح دسترسی متفاوتی هستند به همین دلیل باید هر فایل را در پوشه ای متناسب با سطح دسترسی آن ذخیره کنیم.

به طور کلی فایل ها دارای سطح دسترسی public, protected, private هستند که باید به ترتیب در پوشه های `storage/public` , `storage/protected` , `storage/private` ذخیره شوند; سطح دسترسی آنها به شرح زیر است:

**public :** فایل هایی که سطح دسترسی آزادانه دارند را در پوشه ی `storage/public` ذخیره میکنیم .
کاربران از طریق مرورگر و سایر پکیج ها از طریق کدنویسی، در صورت داشتن آدرس فایل میتوانند به آن دسترسی داشته باشند.

**protected :** سطح دسترسی این فایل ها تنها توسط پکیج ها میباشد و کاربران از طریق مرورگر نمیتوانند به ان دسترسی داشته باشند. این فایل ها در پوشه ی `storage/protected` ذخیره میشوند. پکیج ها درصورت داشتن آدرس فایل میتوانند از طریق کد نویسی آزادانه به فایل های این پوشه دسترسی داشته باشند.

**private :** این فایلها در پوشه ی `storage/private` ذخیره میشوند و تنها در همان پکیج از طریق کد نویسی میتوان به فایل ها دسترسی داشت.


**مثال 1 :**در مثال زیر میخواهیم فایلی را برای دانلود به کاربر بدهیم
```php
<?php
namespace packages\my_package\controllers;
use packages\base\{response, controller, Packages};

class Main extends controller {

    public function document(): response {

        $doc = packages::package("my_package")->url("storage/public/doc.pdf");
        $this->response->Go($doc);
        return $this->response;
    }
}
?>
```

**مثل 2 :** نمایش تصویر کاربر وارد شده در نوار بالای سایت
```php

use function packages\base\url;
use package\base\Packages;


<nav class="navbar navbar-default">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
		<a class="navbar-brand" href="#">Jalno.ir</a>
	</div>
	<div class="collapse navbar-collapse" id="navbar-collapse">
		<ul class="nav navbar-nav navbar-right">
			<li><a href="<?php echo url("dashboard"); ?>">پیشخوان</a></li>
			<li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
					<img src="<?php echo Packages::package("packagename")->url("public/user_avatars/{$this->user->id}-avatar.jpg"); ?>" alt="<?php echo $this->user->name; ?>">
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu">
					<li><a href="<?php echo url("profile"); ?>">پروفایل</a></li>
					<li role="separator" class="divider"></li>
					<li><a href="<?php echo url("logout"); ?>">خروج</a></li>
				</ul>
			</li>
		</ul>
		</div>
	</div>
</nav>
```