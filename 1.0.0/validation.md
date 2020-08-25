#اعتبار سنجی
اطلاعات ارسال شده از سمت کاربر می بایست قبل از هرگونه عملیات، اعتبار سنجی شوند . بررسی رشته های دریافتی برای اطمینان از عدم وجود کد و یا کد های مخرب برنامه نویسی یکی از مهم ترین کارهایی است که در این بخش باید کنترل شوند .
فقط فیلد هایی که باید دریافت کنید را مشخص کنید تا مابقی فیلد ها ( که ممکن است توسط افراد مخرب در مقدار های ارسالی گنجانده شده اند ) نادیده گرفته شوند . میتوانید نوع و یا مقداری که انتطار دارید توسط کاربر از هر فیلد دریافت کنید را مشخص کنید . اعتبار سنج به صورت خودکار هر مقدار و یا نوعی  به غیر از آنچه مشخص شده دریافت کنید ، با پرتاب یک استثناء از جنس `package\base\inputValidation`  از ادامه عملیات جلوگیری خواهد کرد .
برای این موضوع میتوانید از متد `checkinputs`  کلاس `package\base\controller`   استفاده کنید . این متد در پارامتر خود یک آرایه دریافت میکند . کلید های این آرایه ، نام فیلد ها و در هر ایندکس، نوع، مقدار پیشفرض، مقدار های مورد انتظار، اختیاری بودن و مجاز به خالی بودن برای هر فیلد به صورت جداگانه مشخص می شود .

مثال 1
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{controller, response};
use \packages\packagename\user;
class Main extends controller {
	public function register(): response {
		$response = new response();
		$view = view::byName(views\register::class);
		$inputRules = array(
		    "firstname" => array(
		        "type" => "string",
		    ),
		    "lastname" => array(
			    "type" => "string",
			    "optional" => true,
			    "empty" => true,
		    ),
		    "email" => array(
			    "type" => "email",
		    ),
		    "cellphone" => array(
			    "type" => "cellphone",
		    ),
		    "state" => array(
			    "values" => array("Tehran", "Esfahan")
		    ),
		    "publish_email" => array(
			    "type" => "bool",
		    ),
		    "password" => array(),
		    "password_again" => array()
		);
		try {
	        $response->setStatus(false);
	        $inputs = $this->checkinputs($inputRules);
	        if ($inputs["password"] != $inputs["password_again"]) {
		        throw new inputValidation("password_again");
	        }
	        $user = new user();
	        $user->firstname = $inputs["firstname"];
	        if (isset($inputs["lastname"]) {
		        $user->lastname = $inputs["lastname"];
	        }
	        $user->email = $inputs["email"];
	        $user->cellphone = $inputs["cellphone"];
	        $user->password = md5($inputs["password"]);
	        $user->publish_email = $inputs["publish_email"];
	        $user->save();
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
مثال 2
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{controller, response};
use \packages\packagename\user;
class Main extends controller {
	public function login(): response {
	    $response = new response();
	    $view = view::byName(views\login::class);
	    $inputRules = array(
	        "username" => array(
	            "type" => "email",
	        ),
	        "password" => array()
	    );
	    try {
	        $response->setStatus(false);
	        $inputs = $this->checkinputs($inputRules);
	        $user = new user();
	        $user->where("email", $inputs["username"]);
	        $user->where("password", md5($inputs["password"]));
	        if (!$user = $user->getOne()) {
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

