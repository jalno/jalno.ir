# خطاها در قالب
گاها لازم است خطاهایی که به وجود می‌آید در قالب نمایش داده شوند، برای نمایش و مدیریت این دسته از خطاها در فریمورک کلاس `packages\base\view\Error` ایجاد شده است. 

## نوع خطا
در فریمورک خطاها به چهاردسته زیر تقسیم می‌شوند که هرکدام بیانگر سطحی از خطا هستند. 

نوع خطا در متغیر `type` کلاس ذخیره می‌شود و مقدار پیش فرض آن `fatal` میباشد.

| سطح   | کاربرد                                      |
| ----- | ------------------------------------------- |
| success | پیام تایید                       |
| warning  | خطاهایی که روند اجرای برنامه را متوقف نمیکنند    |
| fatal  | خطاهایی که باید روند اجرای برنامه متوقف شود    |
| notice | اعلام مشکلاتی که در برنامه وجود دارد  |

**توجه :** `success` خطا نیست از آن برای نمایش پیام هایی در قالب با مضمون موفقیت آمیز بودن عملیاتی در اجرای برنامه استفاده می‌شود.

### مشخص کردن نوع خطا 
برای مشخص کردن نوع خطا از متد `setType` استفاده می‌شود.
در کلاس برای خطاها ثابت‌های `SUCCESS` , `WARNING` , `FATAL` , `NOTICE` تعریف شده است.
آرگومان ورودی این متد میتواند یکی از ثابت‌های فوق باشد. 
اگر ورودی متد به غیر از موارد فوق باشد استثنا type پرتاب می‌شود. 

همچنین متد `getType` نوع خطا را بصورت رشته برمیگرداند.

```php
use packages\base\view\Error;


$error = new Error();
$error->setType(Error::NOTICE);
```

## متن خطا
برای نمایش خطا لازم است متنی برای خطا ثبت شده باشد. با فراخوانی متد `setMessage` میتوانید متنی برای خطا ثبت کنید. آرگومان ورودی این متد یک رشته می‌باشد.

همچنین با فراخوانی متد `getMessage` میتوانید به متن پیام خطا دسترسی داشته باشید.

```php
use packages\base\view\Error;


$error = new Error();
$error->setMessage('This is error message!');
```

## انتقال داده
علاوه بر متن پیام خطا میتوانید داده هایی نیز مشخص کنید. با فراخوانی متد `setData` میتوانید داده‌ها را ثبت کنید. 
متد setData دو آرگومان ورودی میگیرد. آرگومان اول مقدار داده ( که از هر نوع داده‌ای میتواند باشد) میگیرد و آرگومان دوم، کلید مقدار تعریف شده می‌باشد، آرگومان دوم اختیاری است. 

متد `getData` داده های ثبت شده را برمیگرداند. متد یک آرگومان ورودی میگیرد که نام کلیدی است که زمان تنظیم داده‌ها تعیین شده است. درصورتی که به متد آرگومان ورودی داده نشود آرایه‌ای از تمامی داده‌های ثبت شده را برمیگرداند.


**مثال**
```php
<?php
use packages\base\{View, NotFound, Controller};
use packages\base\view\Error;
use packages\my_package\User;
use themes\my_theme\views;

class Users extends Controller {
    function insert($data) {
        $user = User::byId($data['id']);
        if(!$user) {
            throw new NotFound();
            
        }

        $view = View::byName(views\user\Insert::class);
        $this->response->setView($view);

        if(!$user->status) {
            $error = new Error();
            $error->setData($user->id, 'userId');
            $error->setData($user, 'userObj');
            $error->setMessage("وضعیت کاربر غیر فعال است.")
            $view->addError($error);
            return $this->response;
        }

        ....
    }
}
?>
```
در مثال فوق متد `addError` در کلاس `packages\base\view` برای انتقال خطاها به قالب تعریف شده است.


## کد خطا 
برای مدیریت بهتر خطاها میتوانید برای هر خطا کد مشخصی تعیین کنید که بیانگر علت خطای دریافتی میباشد. 
برای تعیین کد خطا از متد `setCode` استفاده می‌شود. آرگومان ورودی این متد رشته است.

همچنین میتوانید بجای فراخوانی متد setCode کدخطا را در شئ ایجاد شده از کلاس Error مشخص کنید.

همچنین برای دریافت کدخطا ثبت شده میتوانید متد `getCode` را فراخوانی کنید.

```php
use packages\base\{View, Controller, Http},
use packages\base\view\Error;
use packages\my_package\HostPlan;
use themes\my_theme\views;


public function order($data){
    $view = view::byName(Views\Order::class);

    if(Http::is_post()){
        $this->response->setStatus(false);
        $inputsRules = [
            'tld' => [
                'type' => ['number', 'string'],
            ],
            'hostPlan' => [
                'type' => 'number',
                'optional' => true
            ]
        ];
        try{
            $inputs = $this->checkinputs($inputsRules);
            
            if(isset($inputs['hostPlan'])){
                if(!$inputs['hostPlan'] = HostPlan::byId($inputs['hostPlan'])){
                    throw new hostPlanException();
                }
            }

            if($inputs["tld"] == 0){
			    throw new tldTransferDeniedException('tld');
            }   
        }catch(hostPlanException $e){
            $error = new Error();
            $error->setCode('hostPlanException');
            /**
             * or
             * $error = new Error("hostPlanException");
             */
            $view->addError($error);

        }catch(tldTransferDeniedException $e){
            $error = new Error();
            $error->setCode('tldTransferDeniedException');
            /**
             * or
             * $error = new Error('tldTransferDeniedException');
             */
            $view->addError($error);
        }

        $view->setDataForm($this->inputsvalue($inputsRules));
    }

    $this->response->setView($view);
    return $this->response;
}
```
همانطور که مشاهده میکنید در مثال فوق به دلیل وجود خطاهای مختلف برای مدیریت بهتره خطاها برای هر کدام کد خطا (setCode) مشخص شده است.

## trace 
در کلاس Error متغیر `traceMode` تعریف شده است که مشخص میکند چه اطلاعاتی از متغیرهای کلاس، زمان فراخوانی متد `jsonSerialize()` در خروجی نمایش داده شود.
برای traceMode ثابت های `NO_TRACE` و `SHORT_TRACE` و `FULL_TRACE` تعریف شده‌ است.
با فراخوانی متد `setTraceMode` میتوانید traceMode را مقدار دهی کنید. مقدار پیش فرض این متغیر FULL_TRACE  است. 
آرگومان ورودی متد setTraceMode یکی از ثابت های تعریف شده فوق میتواند باشد. 
هر یک از ثابت ها به شیوه زیر عمل میکنند :

**NO_TRACE :** فقط نوع خطا و پیام خطا را برمیگرداند.

**SHORT_TRACE :** در کلید trace اطلاعات فایل هایی که برای نمایش صفحه اجرا شده‌اند بصورت مختصر نمایش داده می‌شود.

**FULL_TRACE :** در کلید trace اطلاعات فایل هایی که برای نمایش صفحه اجرا شده‌اند در آرایه‌ای نمایش داده می‌شود.

همچنین با فراخوانی متد `getTraceMode` میتوانید  به مقدار traceMode دسترسی داشته باشید.

```php
$error = new Error();
$error->setTraceMode(Error::SHORT_TRACE)
```

## jsonSerialize
از متد `jsonSerialize()` برای تبدیل شئ کلاس Error به آرایه استفاده میشود.
با توجه به مقدار متغیر traceMode مشخص میشود کدام یک از متغیر‌های کلاس در آرایه نمایش داده شود.

