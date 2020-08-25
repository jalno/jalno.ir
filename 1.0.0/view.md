#ظاهر
شامل دو قسمت که یکی در backend و  دیگری در frontend است. این دو قسمت از طریق رابطه ی پدر-فرزندی به یکدیگر متصل و رابط بین کنترلر و قالب  هستند.

برای منظم بودن فایل ها، بهتر است تا در هر قسمت یک پوشه با نام views ایجاد شود و فایل های مرتبط با آن قسمت در آن تعریف شود .

##فراخوانی ظاهر
##### برای اطلاعات بیشتر به صفحه ی [کنترلر](controller.md) مراجعه کنید
هر کنترلر با استفاده از کلاس `backages\base\view` و متد `byName`  یک ظاهر و در نتیجه یک قالب را فراخوانی میکند. در صورتی که هر یک از فایل ها در فایل `autoloader.json` مرتبط با آن قسمت و یا در فایل `theme.json` در قسمت ظاهری تعریف نشده باشد، این کلاس با پرتاب یک استثناء از جنس کلاس `packages\base\NoViewException` از ادامه ی روند برنامه جلوگیری خواهد کرد .

نمونه فایل
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{response, controller, view, NotFound};
use \packages\packagename\{post, views};
class News extends controller {
	public function view($data): response {
        $post = post::byId($data["post_id"]);
        if (!$post) {
            throw new NotFound();
        }
        $response = new response(true);
        $view = view::byName(views\news\show::class);
        $view->setPost($post);
        $response->setView($view);
        return $this->response;
    }
}
```

##قسمت backend 
یک فایل در پوشه ی اصلی پکیج تعریف می شود(بهتر است یک پوشه با نام views برای فایل های این قسمت ایجاد کنید
). این فایل به وسیله ی رابطه ی پدر-فرزندی به فایل `packages\base\view` متصل است .

نمونه فایل
```php
<?php
namespace packages\packagename\views\news;
use \packages\base\view;
use \packages\packagename\post;
class show extends view {
    public function setPost(post $post) {
        $this->setData($post, "post");
    }
    protected function getPost() {
        return $this->getData("post");
    }
}
```
برای استفاده در فایل `autoloader.json` در پوشه ی اصلی پکیج باید این فایل معرفی شود .

نمونه فایل 
```json
{
    "files":[
        {
            "classes":["views\\news\\show"],
            "file":"views/news/show.php"
        }
    ]
}
```
##قسمت frontend
##### برای اطلاعات بیشتر به صفحه ی [قالب](frontend.md) مراجعه کنید
این فایل در پوشه ی معرفی شده به عنوان بخش قالب ایجاد می شود (بهتر است یک پوشه با نام views برای فایل های این قسمت ایجاد کنید).

فایل این قسمت به وسیله ی رابطه ی پدر-فرزندی به فایل متناظر از قسمت backend متصل است،

نمونه فایل
```php
<?php
namespace themes\frontname\views\news;
use \packages\packagename\views\news\show as parentView;
class show extends parentView {
    protected $post;
    public function __beforeLoad() {
        $this->post = $this->getPost();
    }
}
```
متد `__beforeLoad()` به صورت خودکار و قبل از بارگذاری قسمت قالب برنامه صدا زده خواهد شد .

همچنین نیاز هست تا در فایل `autoloader.json` در پوشه ی frontend این فایل برای استفاده معرفی شود .

نمونه فایل
```json
{
	"files":[
		{
			"classes":["views\\news\\show"],
			"file":"views/news/show.php"
		}
	]
}
```
<div class="alert alert-info text-center">
برای اطلاعات بیشتر به صفحه ی <a href="autoloader.md">بارگذاری خودکار</a> مراجعه کنید
</div>
برای ارتباط قسمت ظاهری و قسمت قالب (قسمتی که HTML را شامل می شود) نیاز هست تا در فایل  `theme.json` در کلیدی با عنوان `views`  رابطه ی این دوفایل و فایل html را معرفی کنید.

نمونه فایل
```json
{
    "name": "frontname",
    "title": "Site Frontend",
    "version": "1.0.0",
    "views": [
        {
            "name": "\\themes\\frontname\\views\\news\\show",
            "parent": "\\packages\\packagename\\views\\news\\show",
            "file": "html/news/show.php"
        }
    ]
}
```
<div class="alert alert-info text-center">
برای اطلاعات بیشتر به صفحه ی <a href="frontend.md">قالب</a> مراجعه کنید
</div>
