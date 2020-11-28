# CLI
کدهای php علاوه‌بر ساخت صفحات وب میتواند برای اجرای برنامه از طریق خط فرمان نیز استفاده شود؛ که به به همین منظور php از 
CLI که مخفف عبارت Command Line Interface یا رابط خط فرمان میباشد پشتیبانی میکند.

در جالنو برای کار با خط فرمان کلاس `packages\base\CLI` ایجاد شده است.

در کلاس CLI متدهای زیر تعریف شده است متدها برای سهولت استفاده بصورت استاتیک تعریف شده‌اند.

| متد |     کاربرد     |
|---------------|------------|
| set()  |   مقداردهی متغیرهای $request و $process کلاس  |
| getParameter($name) |  مقدار پارامتر دریافتی را برمیگرداند   |
| getParameters($params) |   تبدیل پارامترهای دریافتی به آرایه کلید مقدار   |
| readLine(string $message) |  گرفتن مقدار ورودی از خط فرمان   |


## [اجرا برنامه از طریق خط فرمان](#run)
برای اجرای برنامه لازم است از طریق ترمینال به پوشه روت پروژه رفته و فایل index.php را اجرا کنید. آدرس متدی که قصد اجرای آن را دارید در آرگومان process همراه دستور ارسال کنید. 

```shell
php index.php --process=packages/packagename/controllers/Main@index
```

در php آرگومان‌های ارسالی بصورت رشته دریافت میشود. در جالنو برای پردازش بهتر، آرگومان‌ها به آرایه کلید مقدار تبدیل میشوند.
زمانی که دستور فوق اجرا شود ابتدا متد `set` اجرا شده و آرگومان‌های ورودی را بصورت آرایه در متغیر $request['parameters'] کلاس ذخیره می‌کند. 
عملیات تبدیل آرگومان به آرایه توسط متد `getParameters` انجام میشود.
همچنین ID پروسس نیز در متغیر $process['pid'] کلاس دخیره می‌شود.


## [گرفتن مقدار آرگومان ورودی](#get_parameter)
با فراخوانی متد `getParameter` میتوانید به آرگومان ورودی دسترسی داشته باشید. 
ورودی این متد نام آرگومان میباشد.

آرگومان‌های ورودی باید بصورت `--key=value` وارد شوند. فرمورک آرگومان‌ها را به آرایه‌ای با کلید key و مقدار value تبدیل می‌شود.
اگر آرگومان ورودی بصورت `--arg` باشد به آرایه‌ای با کلید `arg` و مقدار `1` تبدیل می‌شود.

```shell
php index.php --process=packages/packagename/controllers/Main@index --name=ali --password=123456
```

```php
use packages\base\CLI;


echo CLI::getParameter("name");  //output: ali
echo CLI::getParameter("password");  //output: 123456
```

## [گرفتن مقدار ورودی از خط فرمان](#readLine)
با فراخوانی متد `readLine` میتوانید داده‌هایی را از خط‌ فرمان دریافت کنید. همچنین میتوانید رشته‌ای را به ورودی متد readLine داده تا قبل از دریافت ورودی از کاربر، متن را نمایش دهد. آرگومان ورودی متد اختیاری میباشد. 

خروجی متد readLine مقداری است که از ورودی دریافت شده است.


```php
use packages\base\CLI;


$email = CLI::readLine("please enter your email!\n");  
echo "your email is : ".$email."\n";
```

روند اجرای کد فوق بصورت زیر میباشد
```shell
php index.php --process=packages/jalno/controllers/Main@index
please enter your email!
email@example.com
your email is : email@example.com
```