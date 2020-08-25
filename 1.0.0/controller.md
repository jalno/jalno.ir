#کنترلر 
توسط مسیر یاب صدا زده خواهد شد. رابط بین مدل (Model) و View است.

  مثال
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{response, controller, NotFound, view};
use \packages\packagename\views;
class Main extends controller {
    public function index(): response {
        $view = view::byName(views\index::class);
        $response = new response(true);
        $response->setView($view);
        return $response;
    }
}
```

وظیفه اعتبار سنجی، ارتباط با با مدل ها  و در نتیجه پایگاه داده و برگشت پاسخ از جمله مواردی است که باید در کنترلر انجام شود.در صورتی که مسیریاب پارامتری داشته باشد، پارامتر های مسیریاب را گرفته و پردازش خواهد کرد. در صورتی که باید صفحه ای نشان دهد، یک شئ از کلاس `view` ایجاد و در پاسخ برمیگرداند.

<div class="alert alert-info text-center">
برای اطلاعات بیشتر به صفحه ی <a href="response.md">پاسخ</a> مراجعه کنید
</div>

```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{response, controller, NotFound, view};
use \packages\packagename\{views, post};
class Main extends controller {
    public function view($data): response {
        $post = post::byId($data['post_id']);
        if (!$post) {
            throw new NotFound();
        }
        $view = view::byName(views\posts\view::class);
        $view->setPost($post);
        $response = new response(true);
        $response->setView($view);
        return $response;
    }
}
```

در کنترلر برای عدم توقف برنامه بعد از پرتاب استثناهای مدل ها و اعتبار سنج، باید استثناها را پیشبینی و برای هریک `catch` مناسب بنویسید. هر استثنارا گرفته و تفسیر آن را برای نمایش ارسال می کند.همچنین اطلاعات ارسال شده از طریق فرم را قبل از هرگونه عملی از نظر نوع( و موارد مشخص شده) اعتبار سنجی میکند. در صورتی که در اعتبار سنجی مشکلی  باشد، پاسخ اعتبار سنج را گرفته و برای نمایش به کاربر  به `view`  ذخیره می کند .

<div class="alert alert-info text-center">
برای اطلاعات بیشتر به صفحه ی <a href="validation.md">اعتبار سنجی</a> مراجعه کنید
</div>

```php
<?php
namespace packages\packagename\controllers;
use \packages\base;
use \packages\base\{controller, response, inputValidation, views\FormError};
use \packages\packagename\user;
class Main extends controller {
	public function login(): response {
	    $response = new response(false);
	    $view = view::byName(views\login::class);
	    $inputRules = array(
	        "username" => array(
	            "type" => "email",
	        ),
	        "password" => array()
	    );
	    try {
	        $inputs = $this->checkinputs($inputRules);
	        $user = new user();
	        $user->where("email", $inputs["username"]);
	        $user->where("password", md5($inputs["password"]));
	        if (!$user->has()) {
	            throw new inputValidation("username");
	        }
	        $response->setStatus(true);
	        $response->Go(base\url("userpanel"));
	    } catch(inputValidation $error) {
	        $view->setFormError(FormError::fromException($error));
	    }
	    $response->setView($view);
	    return $response;
	}
}
```
