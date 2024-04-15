# SSH
در جالنو برای اتصال به سرور از طریق پروتکل SSH2 کلاس `packages\base\SSH` ایجاد شده است. 
در این کلاس با مقداردهی آدرس دامنه و یا آیپی، پورت، نام کاربری و رمز عبور میتوانید به راحتی به سرور متصل شده و تمامی دستورات خط فرمان را در سرور اجرا کنید. 

متدهای زیر برای اتصال به سرور در کلاس SSH تعریف شده‌اند.

|  متد   |    کاربرد   |
|------------|---------|
| <span class="display-block ltr">AuthByPassword(string $username, string $password): bool</span> | احرازهویت  |
| <span class="display-block ltr">execute(string $comment)</span> | اجرا دستور  |
| <span class="display-block ltr">connection()</span> | اتصال ایجاد شده را برمیگرداند |
| <span class="display-block ltr">getHost(): string</span> |  گرفتن آدرس دامنه و یا آی پی  |
| <span class="display-block ltr">getPort(): int</span> | گرفتن پورت  |
| <span class="display-block ltr">getUsername(): string</span> | گرفتن نام کاربری  |
| <span class="display-block ltr">getPassword(): string</span> |  گرفتن رمز عبور  |


## برقراری ارتباط با سرور {#connection}
برای برقراری ارتباط با سرور لازم است ابتدا شئ از کلاس SSH ایجاد کنید و آدرس هاست و پورت مربوطه را به آن بدهید. 
اتصال ایجاد شده در متغیر <span class="d-inline ltr">$connection</span> کلاس ذخیره میشود و با فراخوانی متد `connection()` میتوانید به آن دسترسی داشته باشید.

اگر آدرس هاست یا پورت وارد شده نادرست باشد استثنا `\packages\base\ssh\ConnectionException` پرتاب میشود.

متد `AuthByPassword` عملیات احرازهویت را انجام میدهد. این متد در آرگومان اول نام کاربری و در آرگومان دوم رمزعبور را بصورت رشته میگیرد. 
خروجی متد در صورتی که احرازهویت تائید شود true و در غیر اینصورت false میباشد.

**مثال**
```php
<?php 
namespace packages\packagename\processes;

use packages\base\{Process, SSH};

class Main extends Process {

    public function index(): void {
        try {
            $ssh = new SSH("www.example.com", 25143);
            $ssh->AuthByPassword("ali", "123");

        } catch (SSH\ConnectionException $e) { }
    }
}
```

## اجرا دستورات {#execute}
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
    
    public function index(): void {
        try {
            $ssh =  new SSH("www.example.com", 25143);
            $ssh->AuthByPassword("ali", "123");
            $response = $ssh->execute("/usr/local/bin/php -i");
            print_r($response);
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
    
    public function index(): void {
        try {
            $ssh =  new SSH("www.example.com", 25143);
            $AuthByPassword = $ssh->AuthByPassword("ali", "123");
            if(!$AuthByPassword){
                throw new SSH\ConnectionException();
            }
            $response = $ssh->execute("/usr/local/bin/php -i");
            print_r($response);
        } catch (SSH\ConnectionException $e) { }
    }
}
```
