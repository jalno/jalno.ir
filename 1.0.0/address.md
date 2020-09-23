# تولید آدرس

در جالنوبرای تولید آدرس قابل دسترس در مرورگر از سه روش میتوان استفاده کرد که هر روش برای دسترسی به فایل های مختلفی استفاده میشود که به شرح زیر میباشد.

| متد / تابع      |                             دسترسی به  فایل                             |
|---------------------------------------------|-------------------------------------------|
| packages\base\url                           |      لینک به صفحات                        |
| packages\base\frontend\theme::url           |  لینک به فایل های استاتیک قالب            |
| packages\base\package::url                  | لینک به فایل های استاتیک پکیج             |


## لینک به صفحات 
برای ادرس دهی و لینک شدن به صفحات مختلف از تابع `packages\base\url` استفاده میشود . 
این تابع سه ارگومان ورودی میگیرد;

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

آرگومان دوم  آرایه میباشد که برای آن index های `@hostname` , `@lang`, `@encode`
تعریف شده هستند و همچنین میتوان index های دلخواه نیز برای آن تعریف کرد .

آرگومان سوم `boolean` است، که مقدار پیش فرض آن `false` میباشد. اگر ایندکس `@hostname` در آرایه آرگومان دوم تعریف شده باشد و مقدار آرگومان سوم true باشد مقدار `@hostname` را بعنوان دامین url قرار میدهد اما درصورتی که false  باشد `@hostname` را به ادامه ی url اضافه میکند.


### معرفی ایندکس های آرگومان دوم

در این آرایه سه ایندکس  `@hostname` , `@lang`, `@encode` تعریف شده است 
همچنین میتوانیم به تعداد دلخواه ایندکس تعریف کنیم و مقدار دهیم که این ایندکس ها به ادامه ی آدرس  url اضافه میشوند.

**مثال :**
```php
<?php
namespace packages\my_package\controllers;
use packages\base\{response, controller, http};
use packages\my_package\views;

class Main extends controller {

    public function login(): response {

        $view = view::byName(views\login::class);
        $this->response->setView($view);

        if(http::is_post()) {
            
            $inputRules = array(
                "username" => array(
                    "type" => "email",
                ),
                "password" => array()
            );
            
            $inputs = $this->checkinputs($inputRules);
            $user = new user();
            $user->where("email", $inputs["username"]);
            $user->where("password", md5($inputs["password"]));
            if ($user->getOne()) {
                $this->response->Go(base\url("userpanel"), ["key1" => "value1", "@lang" => "en"]);
                
                /* output
                    /en/userpanel?key1=value1 
                */
            }
        }
        return $this->response;
    }
}
?>
```

**@lang :** با استفاده از ایندکس @lang میتوانیم زبان مورد نظر را برای آدرس url تعیین کنیم. مقدار ایندکس میتواند کد زبان دو حرفی باشد.
درصورتی میتوانیم زبان را تعیین کنیم که تنظیات زبان در فایل `config.php` در مسیر `packages/base/libraries/config` مجوزه تغییر زبان را داده باشیم. 

#### تنظیمات زبان 
در فایل `config.php` در مسیر `packages/base/libraries/config` میتوانیم تنظیمات `زبان پیشفرض` و `تغییر زبان` و `امکان مخفف وارد کردن زبان` را انجام دهیم .

+ **زبان پیش فرض :** 
با استفاده از  آپشن `packages.base.translator.defaultlang` میتوانیم زبان پیش فرض سایت را مشخص کنیم. مقدار وارد شده باید کد زبان کامل باشد.
 اگر این آپشن مقدار دهی نشود, هر کد زبان کاملی را میپذیرد.
 کد زبان کامل از کد زبان دو حرفی_کد کشور دو حرفی تشکیل میشود 

```php
'packages.base.translator.defaultlang' => 'fa_IR' // or en_US
```

+ **تغییر زبان :**
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

+ **مخفف وارد کردن زبان :**
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

**@hostname :** با استفاده از ایندکس @hostname میتوانیم دامین url را تغییر دهیم در صورتی که @hostname تعریف نشده باشد دامین پروژه ای که در آن هستیم در نظر گرفته میشود 
در صورتی که میخواهیم @hostname 
به عنوان دامین قرار گیرد باید به آرگومان سوم تابع  base\url() 
مقدار ture بدهیم;
 در صورتی که آرگومان سوم مقدار false  داشته باشد @hostname به ادامه‌ی url اضافه میشود.

**@encode :** برای تعیین کردن Encoding صفحه استفاده میشود.

> نکته : آرگومان های تابع base\url() اختیاری هستند; در صورتی که به تابع آرگومانی ارسال نشود ادرس صفحه اصلی را برمیگرداند.

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
            $this->response->go(base\url('users'));
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
        $this->response->go(base\url('user/view/'.$user->id));
        /*
            /user/view/1?%40lang=en_US
        */
        return $this->response;
    }
}
?>
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
فایل های پکیج که در زمان اجرا نیاز میشود برنامه نویس از انها استفاده کند; دارای سطح دسترسی متفاوتی هستند به همین دلیل باید هر فایل را در پوشه ای متناسب با سطح دسترسی آن ذخیره کنیم.

به طور کلی فایل ها دارای سطح دسترسی public, protected, private هستند که باید به ترتیب در پوشه های `storage/public` , `storage/protected` , `storage/private` ذخیره شوند; سطح دسترسی آنها به شرح زیر است:

**public :** فایل هایی که سطح دسترسی آزادانه دارند را در پوشه ی `storage/public` ذخیره میکنیم .
کاربران از طریق مرورگر و سایر پکیج ها از طریق کدنویسی، در صورت داشتن آدرس فایل میتوانند به آن دسترسی داشته باشند.

**protected :** سطح دسترسی این فایل ها تنها توسط پکیج ها میباشد و کاربران از طریق مرورگر نمیتوانند به ان دسترسی داشته باشند. این فایل ها در پوشه ی `storage\protected` ذخیره میشوند. پکیج ها درصورت داشتن آدرس فایل میتوانند از طریق کد نویسی آزادانه به فایل های این پوشه دسترسی داشته باشند.

**private :** این فایلها در پوشه ی `storage\private` ذخیره میشوند و تنها در همان پکیج از طریق کد نویسی میتوان به فایل ها دسترسی داشت.


**مثال 1 :** میخواهیم فایلی را برای دانلود به کاربر بدهیم
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