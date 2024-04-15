# حافظه موقت

برای محاسبه هایی که پردازش سنگینی دارند و  یا برای جلوگیری از تکرار ارتباط با پایگاه داده (برای دریافت داده هایی که اطلاعات آن به ندرت تغییر میکند)، گاها نیاز هست تا نتیجه ی محاسبه و یا نتیجه ی اطلاعات دریافت شده، ذخیره شود . برای این منظور میتوانید از کلاس `packages\base\cache` استفاده کنید .
برای هر داده که ذخیره می شود،میتوان مدت زمان انقضا مشخص کرد و داده ها پس از گذشت زمان معین به صورت خودکار پاک و دیگر در دسترس نخواهند بود  . ذخیره سازی داده ها  در این کلاس به سه روش انجام میپذیرد .

+ ذخیره داده ها در فایل
+ ذخیره داده ها در پایگاه داده (Database)
+ ذخیره داده ها با استفاده از Memcache

## مشخص کردن روش ذخیره داده {#configure_cache_method}
__برای اطلاعات بیشتر به صفحه ی [تنظیمات](options) مراجعه کنید__
با افزودن یک تنظیم در تنظیمات با عنوان `packages.base.cache`  و یکی از مقادیر `file` (برای  ذخیره داده ها در فایل)، `memcache` (ذخیره داده ها با استفاده از memcache) و یا `database` (ذخیره داده ها در پایگاه داده)  میتوانید روش ذخیره سازی را مشخص کنید  .
اگر روش ذخیره سازی مشخص نشده باشد  به صورت خودکار از روش ذخیره سازی داده ها در فایل استفاده خواهد شد .
استفاده از هر سه روش یکسان خواهد بود و کلاس `cache`  به صورت خودکار داده ها را با روش مشخص شده ذخیره و مدیریت خواهد کرد .
فراخوانی و متد های این کلاس هم به صورت ایستا `static` و هم به صورت نمونه سازی و شئ گرا میسر است .

## ذخیره داده ها

    cache::set(name, value, timeout);

این متد در پارامتر اول نام/کلید دلخواه، در پارامتر دوم داده را دریافت میکند . در پارامتر سوم میتوانید مدت زمان انقضای این ذخیره سازی را به صورت ثانیه مشخص کنید .
توجه داشته باشید نامی که در پارامتر اول این متد مشخص میکنید، باید به صورت یکتا در کل برنامه باشد، در غیر اینصورت داده های جدید جایگزین داده های قبلی خواهد شد .

## بررسی موجود بودن داده
با استفاده از متد `has`  کلاس `cache` میتوانید از موجود بودن داده ها اطمینان کسب کنید . این متد در پارامتر اول نام کلید را دریافت میکند . خروجی این متد در صورت یافتن داده با کلید مشخص شده `true` و در غیر اینصورت `false` خواهد بود .

    cache::has(name);

## دریافت داده ها
برای دریافت داده ها باید از متد `get` کلاس `cache` استفاده کرد . این متد نام کلیدی که در پارامتر خود دریافت میکند را در بین داده های ذخیره شده، جستجو میکند . در صورتی که داده ای با کلید مشخص شده پیدا کند، مقدار کلید و در غیر اینصورت `null`  بر میگرداند .

    cache::get(name);

## حذف داده ها
هرچند داده ها پس از گذشت زمان انقضای مشخص شده پاک خواهند شد، ولی میتوانید با استفاده از متد `delete` داده های کلید مشخصی را پاک کنید . این متد کلیدی که در پارامتر خود دریافت میکند را در بین داده های ذخیره شده جستجو و در صورت یافتن آن ها را پاک می کند .

    cache::delete(name);

مثال

```php
<?php
namespace pakcages\packagename\controllers;
use packages\base\{controller, cache};
use packages\packagename\plan;
class Main extend controller {
    public function getEconomicPlans() {
        $response = new response(true);
        $cache = new cache();
        if ($cache->has("pakcages.packagename.controllers.economicPlans")) {
            $plans = $cache->get("pakcages.packagename.controllers.economicPlans");
        } else {
            $plan = new plan();
            $plan->where("status", plan::active);
            $plan->where("economic", plan::economic);
            $plans = $plan->get();
            $cache->set("pakcages.packagename.controllers.economicPlans", $plans, 86400);
            // 86400 s = 1 day
        }
        $response->setData($plans, "plans");
        return $response;
    }
}
```

مثال

```php
<?php
namespace pakcages\packagename\controllers;
use packages\base\{controller, cache};
class Main extend controller {
    public function update_economic_plans() {
        $response = new response(true);
        cache::delete("pakcages.packagename.controllers.economicPlans");
        $response->Go(base\url("plans/economic"));
        return $response;
    }
}
```
