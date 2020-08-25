
#کلمه عبور
گاها نیاز هست تا اطلاعاتی مانند کلمات عبور  به نحوی غیر قابل بازیابی در پایگاه داده ذخیره شوند تا زیان حاصل در زمانی که پایگاه داده در دسترس اشخاص مخرب قرار گرفته، در کمترین حد ممکن باشد . به همین منظور میتوانید از کلاس `packages/base/utility/password`  استفاده کنید . این کلاس دو متد ایستا `static` که یکی برای تبدیل کلمه عبور به رشته ی کد شده  و دیگری برای برای مقایسه و تایید کلمه عبور واردی از طرف کاربر و رشته قبلا کد شده استفاده میشود . برای تبدیل کلمه عبور به رشته ی کد شده، از الگریتم های  پیشرفته رمزنگاری استفاده شده است و همین باعث شده تا رشته ی کد گذاری شده غیر قابل بازیابی و ناخوانا باشد .

##تبدیل کلمه عبور به رشته کد شده
این تابع در پارامتر خود یک کلمه عبور از جنس رشته دریافت  و خروجی آن یک رشته کد شده می باشد .

	password::hash(string);

مثال
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{controller, response, inputValidation, views\FormError, utility\password, db\duplicateRecord};
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
            "accept_terms" => array(
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
            if (!$inputs["accept_terms"]) {
	            throw new inputValidation("accept_terms");
            }
            $user = new user();
            $user->firstname = $inputs["firstname"];
            if (isset($inputs["lastname"]) {
                $user->lastname = $inputs["lastname"];
            }
            $user->email = $inputs["email"];
            $user->cellphone = $inputs["cellphone"];
            $user->password = password::hash($inputs["password"]);
            $user->save();
            $response->setStatus(true);
            $response->Go(base\url("userpanel"));
        } catch(inputValidation $error) {
            $view->setFormError(FormError::fromException($error));
        } catch(duplicateRecord $error) {
            $view->setFormError(FormError::fromException($error));
        }
        $response->setView($view);
        return $response;
    }
}
```
##بررسی و تایید
با استفاده از تابع `verify` میتوانید یک رشته را با رشته ی کد شده مقایسه کنید . این تابع در پارامتر اول خود یک رشته و در پارامتر دوم رشته کد شده را دریافت میکند .خروجی این متد در صورتی که مقدار رشته کد شده با رشته یکی باشد `true` و در غیر اینصورت `fasle` خواهد بود .

	password::verify(string, hash);

مثال
```php
<?php
namespace packages\packagename\controllers;
use \packages\base\{controller, response, inputValidation, views\FormError, utility\password};
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
            if (!$user = $user->getOne()) {
                throw new inputValidation("username");
            }
            if (!password::verify($inputs["password"], $user->password)) {
	            throw new inputValidation("password");
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
 

