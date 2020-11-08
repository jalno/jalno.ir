# ظاهر

در فریمورک برای ظاهر، کلاس `packages\base\view` ایجاد شده است. باید در قسمت frontend  کلاس‌ هایی برای ظاهر ایجاد شود. باید از کلاس ظاهر از کلاس `packages\base\view` ارث بری کند.
ظاهر رابط بین کنترلر و قالب است.

**توجه :** میتوانید مطابق ورژن قبل ظاهر را در دو قسمت backend و frontend تعریف کنید. این دو قسمت از طریق رابطه ی پدر-فرزندی به یکدیگر متصل میشوند.
برای منظم بودن فایل ها، بهتر است تا در هر قسمت یک پوشه با نام views ایجاد شود و فایل های مرتبط با آن قسمت در آن تعریف شود.

```php
<?php
namespace themes\package_theme\views;
use packages\base\View;

class index extends View {
    
    
}
```

اگر صفحه مورد نظر دارای فرم باشد باید کلاس view از کلاس `packages\base\views\form` ارث بری کند . 
__برای اطلاعات بیشتر به صفحه [فرم](form.md) مراجعه کنید.__

```php
<?php
namespace themes\package_theme\views;
use packages\base\views\Form;

class add extends Form {
    
    
}
```

اگر صفحه دارای لیست باشد که لازم به صفحه‌بندی دارد، باید کلاس view از کلاس `packages\base\views\listview` ارث بری کند.
__برای اطلاعات بیشتر به صفحه [صفحه‌بندی](listTrait.md) مراجعه کنید.__

```php
<?php
namespace themes\package_theme\views;
use packages\base\views\Listview;

class UsersList extends Listview {
    
    
}
```

## قسمت frontend

__برای اطلاعات بیشتر به صفحه ی [قالب](frontend.md) مراجعه کنید.__

این فایل در پوشه ی معرفی شده به عنوان بخش قالب ایجاد می شود (بهتر است یک پوشه با نام views برای فایل های این قسمت ایجاد کنید).


```php
<?php
namespace themes\theme_name\views\news;
use packages\base\View as parentView;
// use packages\package_name\views\news\show as parentView;
use packages\package_name\Post;

class show extends parentView {
    protected $post;
    
    public function __beforeLoad() {
        $this->post = $this->getPost();
    }
    
    /**
     * اگر کلاس ظاهر در backend ایجاد شده باشد متدهای زیر در فایل backend تعریف می‌شوند. 
     */
    public function setPost(post $post) {
        $this->setData($post, "post");
    }
    
    protected function getPost() {
        return $this->getData("post");
    }
}
```
در مثال فوق اگر در backend نیز ظاهر تعریف شده باشد باید این کلاس از فایل متناظر در backend ارث بری کند.


متد `__beforeLoad()` به صورت خودکار و قبل از بارگذاری قسمت قالب برنامه صدا زده خواهد شد .

برای ارتباط قسمت ظاهری و قسمت قالب (قسمتی که HTML را شامل می شود) نیاز است تا در پوشه‌ای به نام html فایلی متناظر با فایل کلاس view ایجاد شود.

**توجه :** نام فایل قالب باید با نام فایل view یکسان باشد.

همچنین لازم است تا در فایل `theme.json` که در پوشه‌ی frontend قرار دارد، نام پوشه کلاس‌ها (views) تحت عنوان کلید autoload معرفی شود.

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
برای ظاهر فایل در پوشه‌ی اصلی پکیج تعریف می شود(بهتر است یک پوشه با نام views برای فایل های این قسمت ایجاد کنید
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

هر کنترلر با استفاده از کلاس `packages\base\view` و متد `byName`  یک ظاهر و در نتیجه یک قالب را فراخوانی میکند. اگر namespace داده شده به متد byName نادرست باشد
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
        $view = View::byName(views\news\show::class);
        $view->setPost($post);
        $this->response->setView($view);
        return $this->response;
    }
}
```
در مثال فوق چون ظاهر فقط قسمت frontend تعریف شده است namespace کلاس view بصورت themes\theme_name\views استفاده شده است.

متد setPost در کلاس ظاهر تعریف شده است.

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

تنظیم نام باعث می‌شود یکبار نام را مشخص کنید و هر در قسمت از سایت لازم بود از آن استفاده کنید. این روش از امکان ناهماهنگی نوشتن نام سایت در قسمت‌های مختلف جلوگیری میکند.

برای بهبود کدنویسی میتوانید از مترجم ها و فایل‌های ذخیره نوشته استفاده کنید. با استفاده از فایل های ذخیره نوشته مجبور به نوشتن متن‌‌ها در بین کدها نخواهید بود

##### برای اطلاعات بیشتر به صفحه ی [مترجم](translator.md) مراجعه کنید.

**1 مثال**
```php
<?php 
namespace themes\theme_name\views;
use packages\base\views\Form;

class ContactUs extends Form {

    function __beforeLoad(){ 
        $this->setTitle('تماس با ما');
        
        /**
         * استفاده از مترجم
         * 
         * $this->setTitle(t(title.contactUs));
         */
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

همچنین با فراخوانی متد `getCSSAssets` فایل‌های css .اضافه شده به صفحه در دسترس میباشند

```php
function __beforeLoad(){ 

    if(isset($this->getData('bg'))) {
        $this->removeCSS("bodyStyle");
    }

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

همچنین با فراخوانی متد `getJSAssets` فایل‌های js اضافه شده به صفحه در دسترس میباشند

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

## انتقال داده 
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

## خطاها
برای نمایش خطاهایی که لازم است در قالب نمایش داده شود متد `addError` تعریف شده است. این یک آرگومان ورودی میگیرد که شئ از کلاس `packages\base\view\Error` می‌باشد.

###### برای اطلاعات بیشتر به صفحه  [خطا ظاهر](view_error.md) مراجعه کنید.

خطاهای ثبت شده را با متد‌‌‌های `getError` و `getErrors` میتوانید دریافت کنید. 
متد getError یک شئ از کلاس Error برمی‌گرداند که اولین خطا ثبت شده است و متد getErrors آرایه‌ای از اشیا کلاس Error که تمامی خطاهای ثبت شده است را برمیگرداند.

**مثال 1 :** نمونه فایل کنترلر
```php
use packages\base\{View, Http};
use packages\base\view\Error;
use packages\my_package\Classroom;
use packages\my_package\Student;
use themes\my_theme\views;

function addStudentToClass() {
    
    $view = View::byName(views\AddStudent::class);
    $this->response->setView($view);
    
    if(Http::is_post()){
        $inputRules = [
            'student' => [
                'type' => 'int'
            ]
        ];
        $this->response->setStatus(false);
        $inputs = $this->checkinputs($inputRules);
        
        $student = Student::byId($inputs['student']);
        if(!$student->status) {
            $error = new Error();
            $error->setMessage("وضعیت دانش آموز وارد شده غیرفعال است");
            $view->addError($error);
            return $this->response;
        }

        $obj = new Classroom();
        $obj->student = $student->id;
        $obj->save();
    }
    return $this->response;
}
```
در مثال فوق اگر وضعیت کاربر غیر فعال باشد شئ‌ از کلاس Error ایجاد میشود، در این کلاس متد setMessage برای مشخص کردن متن خطا تعریف شده است.
نهایتا شئ ایجاد شده از کلاس Error به متد addError برای نمایش خطا در قالب داده می‌شود.


**مثال 2 :** نمایش خطا در قالب
```php
<body>
    <?php
    if($this->getError()) {
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
namespace themes\package_theme\views;
use packages\base\View;
use themes\clipone\viewTrait;

class index extends View {
    use viewTrait;
    
}
```

**مثال 3**
```php
<div class="container">
    <?php
        $errorcode = $this->getErrorsHTML();
        if($errorcode){
    ?>
    <div class="row">
        <div class="col-xs-12"><?php echo $errorcode; ?></div>
    </div>
    <?php
        }
    ?>
</div>
```
در مثال فوق هر تعداد خطا که ثبت شده باشد نمایش داده میشود. پکیج طبق نوع هر خطا متن آن را در کلاس‌های alert متناسب با آن نمایش میدهد.

## افزودن فایل‌های ظاهری
برای افزودن فایل های ظاهری(css و js) به قالب که در فایل theme.json در کلید assets تنظیم شده‌اند. از متد `setSource` استفاده میشود. متد یک آرگومان ورودی میگیرد که شئ از کلاس `packages\base\frontend\Source` است.

زمانی که متد setView در کنترلر فراخوانی می‌شود، فایل theme.json قالب خوانده می‌شود و قسمت assets برای پیدا کردن فایل های css و  js جستجو میشود و به صفحه اضافه می‌شود.

با استفاده از پکیج `node_webpack`قبل از باز شدن صفحه، پکیج تمامی اقدامات فوق را حذف کرده و فایل های نهایی webpack را جایگزین میکند.

###### برای اطلاعات بیشتر به صفحه [node_webpack](node_webpack.md) مراجعه کنید.

با فراخوانی متد `getSource()` شئ از کلاس `packages\base\frontend\Source` برمیگردد که مشخصات قالب مانند نام تعیین شده در فایل theme.json، پوشه قالب ، فایل های استایل و جاوااسکریپت، مشخصات مترجم ها و رویدادهای قالب در آن مشخص شده است.

```php
$this->getSource();
```

## دریافت اطلاعات کامل ظاهر
میتوانید با فراخوانی متد `dynamicData` اطلاعات ظاهر از جمله title, description, فایل و پوشه قالب، محل ذخیره فایل‌های ‌‌assets و ارورهای ثبت شده و تمامی اطلاعات توضیح داده شده در فوق که میتوانید برای ظاهر تعریف کنید در دسترس هستند. خروجی متد dynamicData شئ از کلاس `packages\base\frontend\events\throwDynamicData` میباشد.

