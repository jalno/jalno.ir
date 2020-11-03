# ظاهر

در فریمورک برای ظاهر، کلاس `packages\base\view` ایجاد شده است. باید در قسمت frontend  کلاس‌ هایی برای ظاهر ایجاد شود. باید از کلاس ظاهر از کلاس `packages\base\view` ارث بری کند.
ظاهر رابط بین کنترلر و قالب است.

**توجه :** میتوانید مطابق ورژن قبل ظاهر را در دو قسمت backend و frontend تعریف کنید است. این دو قسمت از طریق رابطه ی پدر-فرزندی به یکدیگر متصل میشوند.
برای منظم بودن فایل ها، بهتر است تا در هر قسمت یک پوشه با نام views ایجاد شود و فایل های مرتبط با آن قسمت در آن تعریف شود.

```php
<?php
namespace themes\package_theme\views;
use backages\base\View;

class index extends View {
    
    
}
```

اگر صفحه مورد نظر دارای فرم باشد باید کلاس view از کلاس `packages\base\views\form` ارث بری کند . 
###### برای اطلاعات بیشتر به صفحه [فرم](form.md) مراجعه کنید.

```php
<?php
namespace themes\package_theme\views;
use packages\base\views\Form;

class add extends Form {
    
    
}
```

اگر صفحه دارای لیست باشد که لازم به صفحه‌بندی دارد، باید کلاس view از کلاس `packages\base\views\listview` ارث بری کند.
###### برای اطلاعات بیشتر به صفحه [صفحه‌بندی](listTrait.md) مراجعه کنید.

```php
<?php
namespace themes\package_theme\views;
use packages\base\views\Listview;

class UsersList extends Listview {
    
    
}
```

## قسمت frontend

##### برای اطلاعات بیشتر به صفحه ی [قالب](frontend.md) مراجعه کنید.

این فایل در پوشه ی معرفی شده به عنوان بخش قالب ایجاد می شود (بهتر است یک پوشه با نام views برای فایل های این قسمت ایجاد کنید).


```php
<?php
namespace themes\theme_name\views\news;
use backages\base\View as parentView;
// use packages\package_name\views\news\show as parentView;
use packages\package_name\Post;

class show extends parentView {
    protected $post;
    
    public function __beforeLoad() {
        $this->post = $this->getPost();
    }
    
    /**
     * اگر کلاس ظاهر در backend ایجاد شده باشد متدهای زیر در آن فایل تعریف می‌شوند. 
     */
    public function setPost(post $post) {
        $this->setData($post, "post");
    }
    
    protected function getPost() {
        return $this->getData("post");
    }
}
```
در مثال فوق اگر در backend نیز ظاهر تعریف شده باشد باید از فایل متناظر در backend ارث بری کند.


متد `__beforeLoad()` به صورت خودکار و قبل از بارگذاری قسمت قالب برنامه صدا زده خواهد شد .

برای ارتباط قسمت ظاهری و قسمت قالب (قسمتی که HTML را شامل می شود) نیاز هست تا در پوشه‌ای به نام html فایلی متناظر با فایل کلاس view ایجاد شود.

**توجه :** نام فایل قالب باید با نام فایل view یکسان باشد.

همچنین نیاز هست تا در فایل `theme.json` در پوشه ی frontend نام پوشه کلاس‌ها (views) تحت عنوان کلید autoload معرفی شود.

##### برای اطلاعات بیشتر به صفحه ی [بارگذاری خودکار]( autoloader.md) مراجعه کنید.


**نمونه فایل theme.json**
```json
{
    "name": "theme_name",
    "title": "Site Frontend",
    "version": "1.0.0",
	"autoload": {
        "directories": ["views"]
    }
}
```

## قسمت backend 
برای ظاهر فایل در پوشه ی اصلی پکیج تعریف می شود(بهتر است یک پوشه با نام views برای فایل های این قسمت ایجاد کنید
). این فایل به وسیله ی رابطه ی پدر-فرزندی به فایل `packages\base\view` متصل است .

نمونه فایل
```php
<?php
namespace packages\package_name\views\news;
use packages\base\View;
use packages\package_name\Post;
class show extends View {
    
    public function setPost(Post $post) {
        $this->setData($post, "post");
    }
    
    protected function getPost() {
        return $this->getData("post");
    }
}
```

نام پوشه این فایل (views) باید در فایل `package.json` پکیج اصلی تحت عنوان کلید autoload معرفی شود.

```json
{
    "routing": "routing.json",
	"frontend": ["frontend"],
	"autoload": {
		"directories": ["controllers", "Models", "views"]
	}
}
```

## فراخوانی ظاهر

##### برای اطلاعات بیشتر به صفحه ی [کنترلر](controller.md) مراجعه کنید

هر کنترلر با استفاده از کلاس `backages\base\view` و متد `byName`  یک ظاهر و در نتیجه یک قالب را فراخوانی میکند. اگر namespace داده شده به متد byName نادرست باشد
این کلاس با پرتاب یک استثناء از جنس کلاس `packages\base\NoViewException` از ادامه ی روند برنامه جلوگیری خواهد کرد.


**مثال 1 :** نمونه فایل کنترلر
```php
<?php
namespace packages\package_name\controllers;
use \packages\base\{Response, Controller, View, NotFound};
use \packages\package_name\Post;
use themes\theme_name\views;

class News extends controller {

	public function view($data): Response {
        $post = Post::byId($data["post_id"]);
        if (!$post) {
            throw new NotFound();
        }
        $response = new response(true);
        $view = View::byName(views\news\show::class);
        $view->setPost($post);
        $response->setView($view);
        return $this->response;
    }
}
```
در مثال فوق چون ظاهر فقط قسمت frontend تعریف شده است namespace کلاس view بصورت themes\theme_name\views استفاده شده است.


**مثال 2 :** نمونه فایل کنترلر (درصورت تعریف backend)
```php
<?php
namespace packages\package_name\controllers;
use packages\base\{Response, Controller, View, NotFound};
use packages\package_name\{Post, views};

class News extends controller {

	public function view($data): Response {
        $post = Post::byId($data["post_id"]);
        if (!$post) {
            throw new NotFound();
        }
        $response = new Response(true);
        $view = View::byName(views\news\show::class);
        $view->setPost($post);
        $response->setView($view);
        return $this->response;
    }
}
```
در مثال فوق چون ظاهر در دو قسمت frontend و backend تعریف شده است namespace کلاس view بصورت packages\package_name\views استفاده شده است.


## تنظیم نام صفحه
برای هر صفحه وب لازم است title مشخص شود در فریمورک برای تنظیم title متد `setTitle` تعریف شده است .
آرگومان ورودی این متد رشته میباشد. همچنین میتوانید آرایه‌ای از رشته ها نیز به متد بدهید، بطور خودکار عناصر آرایه به رشته تبدیل می‌شود.
متد setTitle در متد `__beforeLoad` فراخوانی می‌شود. 

تنظیم نام باعث می‌شود یکبار نام را مشخص کنید و هر در قسمت از سایت لازم بود از آن استفاده کنید. این این روش از امکان ناهماهنگی نوشتن نام سایت در قسمت‌های مختلف جلوگیری میکند.

**1 مثال**
```php
<?php 
namespace themes\theme_name\views;
use packages\base\views\Form;

class ContactUs extends Form {

    function __beforeLoad(){ 
        $this->setTitle('تماس با ما');
        
    }
}
```

**2 مثال**
```php
<?php 
namespace themes\theme_name\views;
use packages\base\View;

class Index extends View {

    function __beforeLoad(){ 
        $this->setTitle(
            ['ظاهر', 'مستندات', 'جالنو']
        );
        
    }
}
```

## گرفتن نام صفحه
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
 *      ['ظاهر', 'مستندات', 'جالنو']
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
 *      ['ظاهر', 'مستندات', 'جالنو']
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

## تنظیم توضیحات 
برای تنظیم توضیحات مربوط به صفحه که در تگ meta قرار میگیرد از متد `setDescription` استفاده می‌شود. این توضیحات میتواند در جستجوی موتورهای جستجوگر اهمیت بسیاری داشته باشد.
متد setDescription در متد __beforeLoad فراخوانی می‌شود.


**1 مثال**
```php
<?php 
namespace themes\theme_name\views;
use packages\base\View;

class Index extends View {

    function __beforeLoad(){ 
        $description = "آموزش ها و مقالات کاربردی برای وبمستران";
        $this->setDescription($description);
        
    }
}
```

برای بهبود کدنویسی میتوانید از مترجم ها و فایل‌های ذخیره نوشته استفاده کنید. با استفاده از فایل های ذخیره نوشته مجبور به نوشتن متن‌‌ها در بین کدها نخواهید بود

##### برای اطلاعات بیشتر به صفحه ی [مترجم](translator.md) مراجعه کنید.

**2 مثال :** استفاده از مترجم
```php
<?php 
namespace themes\theme_name\views;
use packages\base\View;

class Index extends View {

    function __beforeLoad(){ 
        $this->setDescription(t("site.decription"));
        
    }
}
```

## گرفتن توضیحات
پس از تنظیم توضیحات صفحه با فراخوانی متد `getDescription()` میتوانید متن توضیحات را دریافت کنید.

**مثال**
```php
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
		$description = $this->getDescription();
		if($description){
			echo("<meta content=\"{$description}\" name=\"description\" />");
		}
    ?>
</head>
```

## اضافه و حذف کردن کد css 
فایل مربوط به کدهایی css در فایل theme.json پوشه frontend معرفی می‌شود. اما گاها لازم است برخی از کدها بصورت inline تعریف شود و یا صرفا برای یکی از صفحات تعریف شود در این موارد میتوانید متد‌های `addCSS` و `addCSSFile` را فراخوانی کنید. 

**توجه :** متدهای `addCSS` و `addCSSFile` باید در متد __beforeLoad فراخوانی شوند.

برای هر استایلی که تعریف میشود میتوانید نام مشخص کنید در این صورت اگر در شرایطی خاص لازم به حذف استایل داشته باشید، میتوانید نام استایل را به آرگومان ورودی متد `removeCSS` ارسال کنید.
همچنین با فراخوانی متد `clearCSSAssets` میتوانید تمامی استایل‌ها را حذف کنید. این متد آرگومان ورودی ندارد.

با فراخوانی متد `clearAssets` علاوه بر کدهای css کدهای js نیز حذف می‌شوند.

```php
function __beforeLoad(){ 
    $this->removeCSS("bodyStyle");
    /**
     * $this->clearCSSAssets();
     * $this->clearAssets();
     */
    
}
```

متد `addCSS` دو آرگومان ورودی میگیرد. آرگومان اول کد استایل و آرگومان دوم نام برای استایل میباشد. آرگومان دوم اختیاری میباشد.

```php
function __beforeLoad(){ 
    $this->addCSS("body{background: antiquewhite}", "bodyStyle");
    
}
```

متد `addCSSFile` فایل جدید برای استایل اضافه میکند. متد سه آرگومان ورودی میگیرد. 
آرگومان اول آدرس فایل را بصورت رشته میگیرد، آرگومان دوم نام استایل و آرگومان سوم لود شدن و یا نشدن فایل را مشخص میکند; درصورتی که آرگومان سوم true باشد فایل معرفی شده در صفحه لود نمی‌شود. مقدار پیشفرض این متد false است.
آرگومان دوم و سوم اختیاری هستند.

```php
function __beforeLoad(){ 
    $this->addCSSFile("/packages/my_package/newStyle.css", 'newStyle');
    
}
```

## اضافه و حذف کردن کد js 
فایل مربوط به کدهای js در فایل theme.json پوشه frontend معرفی می‌شود. اما گاها لازم است برخی از کدها بصورت inline تعریف شود و یا صرفا برای یکی از صفحات تعریف شود در این موارد میتوانید متد‌های `addJS` و `addJSFile` را فراخوانی کنید. 

**توجه :** متدهای `addJS` و `addJSFile` باید در متد __beforeLoad فراخوانی شوند.

برای هر کد جاوااسکریپت که تعریف میشود میتوانید نام مشخص کنید در این صورت اگر در شرایطی خاص لازم به حذف کد داشته باشید، میتوانید نام کد را به آرگومان ورودی متد `removeJS` ارسال کنید.
همچنین با فراخوانی متد `clearJSAssets` میتوانید تمامی کدهای جاوااسکریپت را حذف کنید. این متد آرگومان ورودی ندارد.

با فراخوانی متد `clearAssets` علاوه بر کدهای js کدهای css نیز حذف می‌شوند.

```php
function __beforeLoad(){ 
    $this->removeJS("indexJS");
    /**
     * $this->clearJSAssets();
     * $this->clearAssets();
     */
    
}
```

متد `addJS` دو آرگومان ورودی میگیرد. آرگومان اول کد جاوااسکریپت و آرگومان دوم نام برای کد میباشد. آرگومان دوم اختیاری میباشد.

```php
function __beforeLoad(){ 
    $this->addJS("alert('hello')", "helloAlert);
    
}
```

متد `addJSFile` فایل جدید جاوااسکریپت اضافه میکند. متد دو آرگومان ورودی میگیرد. 
آرگومان اول آدرس فایل را بصورت رشته میگیرد، آرگومان دوم نام مورد نظر برای کدهای جاوااسکریپت را میگیرد. آرگومان دوم اختیاری است

```php
function __beforeLoad(){ 
    $this->addJSFile("/packages/my_package/newJS.js", 'indexJS');
    
}
```

## افزودن و دریافت داده
با فراخوانی متد `setData` میتوانید داده ای را تنظیم و هر زمان به آن لازم داشتید با فراخوانی متد `getData` به آن دسترسی داشته باشید. 

متد `setData` دو آرگومان ورودی میگیرد. آرگومان اول داده مورد نظر است، داده ها از هر نوع داده‌ای میتوانند باشند و آرگومان دوم کلید برای داده است که آرگومان دوم اختیاریست.

**مثال 1:** نمونه فایل کنترلر
```php
use packages\my_package\Aboutus;

function aboutus(){
    $view = View::byName(views\main\Aboutus::class);
    $view->setData(AboutUs::getOne(), "about-us");
    $this->response->setView($view);
    return $this->response;
}
```

**مثال 2 :** نمونه فایل html
```php
<div class="container">
    <p>
        <?php echo $this->getData('about-us'); ?>
    </p>
</div>
```

## تنظیم فایل
با فراخوانی متد `setFile` میتوانید فایلی را تنظیم کنید. و با فراخوانی متد `getFile` به آن دسترسی داشته باشید این فایل جایگزین صفحه قالب اصلی می‌شود.
آرگومان ورودی متد setFile شئ از کلاس File میباشد.

**نکته :** اگر متد setFile در کنترلر فراخوانی شود دیگر نیاز به فراخوانی متد getFile نیست; بطور خودکار فایل جایگزین قالب  می‌شود.

**مثال 1 :** نمونه فایل کنترلر
```php
use packages\my_package\Post;

function posts(){
    $view = View::byName(views\Post::class);
    $posts = Post::get()
    if(!$posts) {
        $view->setFile(new File\Local("packages/my_package/frontend/no-content.html"));
    }
    $this->response->setView($view);
    return $this->response;
}
```


**مثال 2 :** نمونه فایل view
```php
function __beforeLoad(){ 
    $this->setFile(new File\Local("packages/my_package/frontend/no-content.html"));
    
}
```