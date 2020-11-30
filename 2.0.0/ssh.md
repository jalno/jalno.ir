# SSH
در جالنو برای اتصال به سرور از طریق پروتکل SSH2 کلاس `packages\base\SSH` ایجاد شده است. 
در این کلاس با مقداردهی هاست، پورت، نام کاربری و رمز عبور میتوانید به راحتی به سرور متصل شده و تمامی دستورات خط فرمان را در سرور اجرا کنید. 

متدهای زیر برای اتصال به سرور در کلاس SSH تعریف شده‌اند.

|  متد   |    کاربرد   |
|------------|---------|
| AuthByPassword(string $username,string $password):bool | احرازهویت  |
| execute($comment) | اجرا دستور  |
| connection() | اتصال ایجاد شده را برمیگرداند |
| getHost():string |  گرفتن آدرس هاست  |
| getPort():int | گرفتن پورت  |
| getUsername():string | گرفتن نام کاربری  |
| getPassword():string  |  گرفتن رمز عبور  |


## [برقراری ارتباط با سرور](#connection)
برای برقراری ارتباط با سرور لازم است ابتدا شئ از کلاس SSH ایجاد کنید و آدرس هاست و پورت مربوطه را به آن بدهید. 
اتصال ایجاد شده در متغیر $connection کلاس ذخیره میشود و با فراخوانی متد `connection()` میتوانید به آن دسترسی داشته باشید.

اگر آدرس هاست یا پورت وارد شده نادرست باشد استثنا `packages\base\ssh\ConnectionException` پرتاب میشود.

متد `AuthByPassword` عملیات احرازهویت را انجام میدهد. این متد در آرگومان اول نام کاربری و در آرگومان دوم رمزعبور را بصورت رشته میگیرد. 
خروجی متد در صورتی که احرازهویت تائید شود true و در غیر اینصورت false میباشد.

**مثال**
```php
<?php 
namespace packages\packagename\processes;
use packages\base\{Process, SSH};

class Main extends Process {
    
    public function index(): void
    {
        try {
            $ssh = new SSH("www.example.com", 7624);
            $ssh->AuthByPassword("ali", "123");

        } catch (SSH\ConnectionException $e) { }
    }
}
```

## [اجرا دستورات](#execute)
برای اجرای دستورات متد `execute` تعریف شده است. ورودی متد دستوری است که قصد اجرای آن را در سرور دارید و به‌صورت رشته میباشد. 
خروجی متد نتیجه‌ی دستور ارسال شده است.

لازم است قبل از اجرای دستورات، خروجی متد AuthByPassword بررسی شود. اگر خروجی متد AuthByPassword برابر `false` باشد و متد `execute` فراخوانی شود `Warning` دریافت میکنید. 

````
Warning: ssh2_exec(): Connection not authenticated
Warning: ssh2_fetch_stream() expects parameter 
Warning: stream_set_blocking() expects parameter
Warning: stream_get_contents() expects parameter
````

**مثال** از کد **خطا**
```php
<?php 
namespace packages\packagename\processes;
use packages\base\{Process, SSH};

class Main extends Process {
    
    public function index(): void
    {
        try {
            $ssh =  new SSH("www.example.com", 7624);
            $ssh->AuthByPassword("ali", "123");
            $execute = $ssh->execute("/usr/local/bin/php -i");
            print_r($execute);
        } catch (SSH\ConnectionException $e) { }
    }
}
```

**مثال**از کد **صحیح**
```php
<?php 
namespace packages\packagename\processes;
use packages\base\{Process, SSH};

class Main extends Process {
    
    public function index(): void
    {
        try {
            $ssh =  new SSH("www.example.com", 7624);
            $AuthByPassword = $ssh->AuthByPassword("ali", "123");
            if(!$AuthByPassword){
                throw new SSH\ConnectionException();
            }
            $execute = $ssh->execute("/usr/local/bin/php -i");
            print_r($execute);
        } catch (SSH\ConnectionException $e) { }
    }
}
```
