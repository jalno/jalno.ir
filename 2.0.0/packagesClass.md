# مدیریت فنی پکیج‌ها
در جالنو برای مدیریت فنی پکیج‌ها کلاس `packages\base\Packages` ایجاد شده است. 
در این کلاس امکان ثبت پکیج، فعال کردن زبان در پیکج، دسترسی به تمامی پکیج‌های فعال و همچنین دسترسی به هر پکیج بطور مجزا ایجاد شده است.

این کلاس توسط فرمورک استفاده میشود اما این امکان فراهم شده است تا زمانی که برنامه نویس قصد انجام عملیاتی خارج از روال فرمورک را دارد بتواند آزادانه با استفاده از این کلاس اقدام کند.

در کلاس Packages .متدهای زیر تعریف شده است متدها برای سهولت استفاده بصورت **استاتیک** تعریف شده‌اند

|  متد  | کاربرد  |
|---------|-------|
<<<<<<< HEAD
| package($name) |  دسترسی به پکیج‌ |
| get() | دسترسی به تمامی پکیج‌های فعال |
| register()  | ثبت پکیج  |
| registerTranslates($code) | فعال سازی زبان در پکیج |
=======
| <span class="display-block ltr">package(string $name): ?Package</span> |  دسترسی به پکیج‌ |
| <span class="display-block ltr">get(?array $names): array</span> | دسترسی به تمامی پکیج‌های فعال |
| <span class="display-block ltr">register(Package $package)</span>  | ثبت پکیج  |
| <span class="display-block ltr">registerTranslates(string $code)</span> | فعال سازی زبان پیشفرض |
>>>>>>> 327baee5ef5e0c428f0973a6ac987cbbed865401

## [دسترسی به پکیج‌ها](#packages_access)
در کلاس Packages متد‌های `package` و `get` برای دسترسی به پکیج‌ها تعریف شده‌اند. 
 
با فراخوانی متد `package` می‌توانید به هر یک از پکیج‌های فعال تعریف شده در پروژه دسترسی داشته باشید. خروجی این متد درصورتی که پکیج مشخص شده موجود باشد شئ از کلاس packages\base\Package میباشد که حاوی مشخصات پکیج مانند پکیج‌های وابسته ، فایل مسیریاب ،فایل‌های مترجم و بطور کلی تمامی تنظیماتی که در فایل ساختار پیکج (package.json) تنظیم شده است می‌باشد.

درصورتی که پکیج مشخص شده موجود نباشد استثنا‌`packages\base\IO\NotFoundException` پرتاب می‌شود.

```php
use packages\base\Packages;


$package = Packages::package("packagename");
```

متد `get` برای دسترسی به تمامی پکیج‌های فعال تعریف شده است. خروجی متد `get` آرایه‌ای از شئ‌های کلاس Package میباشد. میتوانید به آرگومان ورودی متد get آرایه‌ای از نام پکیج‌های مورد نیاز را بدهید در اینصورت خروجی متد آرایه‌ای از پکیج‌های خواسته شده میباشد. 

```php
use packages\base\Packages;


Packages::get();

Packages::get(["my_package", "PhpParser"]);
```

## [ثبت پکیج](#register)
متد `register` برای ثبت پکیج ایجاد شده است.
این متد زمانی که فرمورک پکیج‌ها را پیمایش و لود میکند توسط کلاس `packages\base\Loader` استفاده میشود. 
ورودی این متد شئ از کلاس `packages\base\Package` میباشد. 


## [فعال کردن زبان پکیج](#registerTranslates)
متد `registerTranslates` کد زبان کامل را گرفته و در پکیج‌ها فعال میکند. 
کد زبان میتواند زبان پیشفرض، زبان فعال و یا زبان دلخواه باشد.

از متد registerTranslates نیز زمان لود و ثبت پکیج‌ها در کلاس `packages\base\Loader` استفاده میشود.

```php
use packages\base\Packages;


Packages::registerTranslates("en_US");
```