# رویداد
در برنامه رویدادها یا event های بسیاری وجود دارد که لازم است در ازای آن رویداد، عملیاتی انجام شود. درواقع listener یا شنونده هایی برای رویداد تعریف میشود که منتظر هستند تا رویداد آنها را صدا بزند تا عملیات تعریف شده در listener انجام شود. 

بطور مثال افزودن مقاله جدید رویداد است که لازم است بعد از آن رویداد ایمیلی برای اطلاع رسانی ارسال شود، عملیات ارسال ایمیل در listener انجام می‌شود.

**توجه :** هر رویداد میتواند چندین شنونده مجزا داشته باشد.

در فریمورک برای کار با رویداد ها کلاس `packages\base\event` تعریف شده است. 
بهتر است برای یکپارچگی بیشتر کدهای مربوط به رویدادها را در پوشه‌ای به نام events و شنونده‌ها را در پوشه ای به نام listeners ایجاد کنید.

رویدادها و شنونده‌ی مربوط به آن در فایل package.json پوشه اصلی تحت عنوان کلید `events` معرفی می‌شوند.

namespace مربوط به هر event را در کلید `name` و شنونده مربوط به آن در کلید `listener` معرفی میشود.

**نکته :** اگر هر کدام از رویداد یا شنونده، در پکیج اصلی پروژه تعریف شده باشد لازم به نوشتن `packages/my_package` در ابتدای namespace آن نیست.

**نمونه فایل package.json**
```json
"events": [
    {
        "name":"packages/userpanel/events/search",
        "listener": "listeners/search@find"
    },
    {
        "name":"packages/userpanel/events/search",
        "listener": "listeners/users@list"
    },
    {
        "name":"packages/sms/events/templates",
        "listener": "listeners/sms@templates"
    },
    {
        "name":"packages/email/events/templates",
        "listener": "listeners/email@templates"
    }
]
```
در مثال فوق برای رویداد packages/userpanel/events/search دو شنونده مجزا listeners/search@find و listeners/users@list تعریف شده است.


## اجرا رویداد
 برای استفاده از رویداد لازم است ابتدا شئ از کلاس رویداد ایجاد شود و متد `trigger()` روی شئ فراخوانی شود.
متد trigger در کلاس `packages\base\events` تعریف شده است و برای اجرای رویداد فراخونی می‌شود.

اگر در ثبت یک رویداد لازم به استفاده از مقدار متغیری باشید میتوانید آن را در هنگام ایجاد شئ از کلاس رویداد مقداردهی کنید.
بطور مثال اگر در ثبت نام کاربر برای ارسال ایمیل تایید لازم به استفاده از مشخصات کاربر باشید، میتوانید اطلاعات مورد نیاز را هنگام ایجاد شئ کلاس event در شئ کلاس مقدار دهی کنید.

**نمونه فایل کنترلر**
```php
use packages\my_package\events\Email;
use packages\my_package\User;


public function insert() {
    $rules = array(
        'name' => array(
            'type' => 'string',
        ),
        'lastname' => array(
            'type' => 'string',
            'optional' => true,
        ),
        'email' => array(
            'type' => 'email',
        )
    );
    $inputs = $this->checkInputs($rules);
    $user = new User($inputs);
    $user->save();

    $emailEvent = new Email($user);
    $emailEvent->trigger();

    return $this->response;
}
```
در مثال فوق کاربر ثبت شده به شئ رویداد Email داده میشود.
###### برای اطلاعات بیشتر در رابطه با کار با پایگاه داده به صفحه [ارتباط شئ گرا پایگاه داده](dbObject.md) مراجعه کنید.


## ایجاد کلاس رویداد
بهتر است کلاس هایی که برای رویدادها تعریف میشود در پوشه events ایجاد شوند. 

باید کلاس رویداد از کلاس `packages\base\event` ارث بری کند.

**مثال** 
```php
<?php
namespace packages\my_package\events;

use packages\base\Event;
use packages\userpanel\{User};
use packages\notifications\Notifiable;

class Email extends Event {
	private $user;
	public function __construct(User $user) {
		$this->user = $user;
    }
    
    public function getName(): string {
        return $this->user->name.' '.$this->user->lastname ;
    }

    public function getEmail(): string {
        return $this->user->email;
    }
}
```

## ایجاد کلاس شنونده
بهتر است کلاس هایی که برای شنونده ها ایجاد میشود در پوشه‌ای مجزا به نام listeners ایجاد شوند.

هنگام معرفی رویداد‌‌ها در فایل package.json برای شنونده‌‌ها متد مشخص شده است. ورودی این متد شئ از کلاس رویداد است که از طریق آن میتوان به متغیرها و متدهای کلاس دسترسی داشت.

**مثال**
```php
/**
 * نمونه فایل package.json
 * 
 * [
 *  {
 *      "name":"packages\my_package\events\Email",
 *      "listener": "listeners/Email@templates"
 *  }
 * ]
 **/
<?php
namespace packages\my_package\listeners;
use packages\my_package\events\Email;

class Email {
    public $userEmail;
    public $name;
    const $SENDER = "email@example.com";

	public function templates(Email $event){
        $this->name = Email::getName();
        $this->userEmail = Email::getEmail();
        $this->sendEmail();
    }
    
    private function sendEmail() {
        $subject = "register successfully";
        $body = $this->name. " Your registration completed successfully";

        mail($this->userEmail, $subject, $body, self::SENDER);
    }
}

```