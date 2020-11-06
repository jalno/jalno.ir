# دایرکتوری 
جالنو کلاس `packages\base\IO\Directory` را برای مدیریت دایرکتوری ها در اختیار توسعه دهندگان قرار داده است. این کلاس بصورت abstract یا مجرد ایجاد شده و بنابراین برنامه نویس قادر به ایجاد شی بصورت مستقیم از این کلاس نمی‌باشد.
در حال حاضر چهار کلاس دیگر با نام های زیر از کلاس Directory مشتق شدند که با توجه به موقعیت نگهداری فایل استفاده می‌شوند:

| نام کلاس                                     | موقعیت نگهداری دایرکتوری                                |
|---------------------------------------------|-------------------------------------------|
| packages\base\IO\Directory\loca                  |      دایرکتوری های محلی
| packages\base\IO\Directory\tmp                   | دایرکتوری های موقت             |
| packages\base\IO\Directory\ftp                   |        دایرکتوری های ریموت                  |
| packages\base\IO\Directory\sftp                  |               دایرکتوری های ریموت                    |



__توجه__: یک شی از کلاس Directory حتما به آدرس یک دایرکتوری اشاره می‌کند، اما لزومی ندارد که آن دایرکتوری وجود داشته باشد.
گاهی قصد ایجاد یک دایرکتوری جدید را داریم، بنابراین ابتدا یک شی از زیرکلاس های دایرکتوری می‌سازیم و سپس اقدام به ایجاد دایرکتوری می‌کنیم.

### [متد ها](#directory_functions)

متد هایی که در  تمام زیر کلاس های Directory قابل فراخوانی هستند:

| نام متد                                     | شرح عملکرد                                |
|---------------------------------------------|-------------------------------------------|
| copyTo(directory $dest):  bool                   | کپی محتویات یک دایرکتوری در یک دایرکتوری دیگر       |
| copyFrom(directory $source):  bool               | کپی محتویات از یک دایرکتوری دیگر              |
| delete(): mixed                             | حذف دایرکتوری از دیسک                          |
| rename(string $newName):  bool              | تغییر نام                                 |
| move(directory $dest):  bool                     | انتقال یک دایرکتوری به یک دایرکتوری دیگر            |
| make():bool                                  | ایجاد دایرکتوری                    |
| files(bool $recursively):array                 | لیست فایل های موجود در دایرکتوری                     |
| items(bool $recursively):array               | لیست آیتم های موجود در دایرکتوری                     |
| directories(bool $recursively):array              | لیست دایرکتوری های موجود در دایرکتوری                     |
| file(string $name)                           |         فایلی را به دایرکتوری نسبت میدهد            |
| directory(string $name)                           |                 پوشه ای را به دایرکتوری نسبت میدهد     |
| size():  int                                | محاسبه حجم یک دایرکتوری                        |
| getPath(): string                           | دریافت آدرس یک دایرکتوری                       |
| isEmpty(): bool                             | مشخص کننده اینکه آیا دایرکتوری خالی است یا خیر  |
| getDirectory(): Directory                            | دسترسی به پوشه حاوی این دایرکتوری را فراهم می‌کند. |
| exists(): bool                              | بررسی وضعیت وجود دایرکتوری                     |

### [متغیر ها](#directory_variables)

| نام       | شرح                             |
|-----------|---------------------------------|
| basename  | نام پوشه در آن ذخیره شده است.   |
| directory | مسیر پوشه در آن ذخیره شده است.  |

__توجه__: متغیر های کلاس Directory در تمامی نوع ها به صورت مستقیم قابل دسترسی هستند.

## [دایرکتوری های محلی](#local_directories) 

اگر دایرکتوری که قصد دسترسی به آن را دارید در همان سروری است که جالنو بر روی آن نصب شده، از کلاس `packages\base\IO\Directory\Local` یک شی بسازید و آدرس دایرکتوری را به عنوان ورودی به آن بدهید.

علاوه بر متد های اصلی کلاس `Directory` متد زیر نیز برای دایرکتوری های محلی تعریف شده است.

| نام متد                                     | شرح عملکرد                                |
|---------------------------------------------|-------------------------------------------|
|getRealPath(): string                          | دریافت آدرس دقیق یک دایرکتوری                       |



توجه: اگر ابتدای آدرس وارد شده / وجود نداشته باشد، آدرس دهی بصورت نسبی و از پوشه اصلی پروژه (همان پوشه ای که فایل index.php و پوشه ی packages در آن موجود است) شروع می‌شود.
 برای کسب اطلاعات بیشتر در خصوص آدرس دهی نسبی به [این مقاله](https://www.jeyserver.com/fa/blog/absolute-relative-pathnames-unix) مراجعه کنید.

**مثال 1**:
```php
use packages\base\IO\Directory;

$directory = new Directory\Local("/home/ali/public_html/");



```

**مثال 2**:
```php
use packages\base\IO\Directory;

$directory = new Directory\Local("packages/base");
```

**مثال 3**:
```php
<?php
namespace package\packagename\controllers;

use packages\base\{Controller, Response, IO\Directory, view\Error, Packages};

class Directories extends Controller {
    public function Make(): Response {
        $inputs = $this->checkInputs(array(
            "name" => array(
                "type" => "string",
            ),
        ));
        $directory = new Directory\Local("packages/packagename/storage/private/" . $inputs["name"]);
        /**
         * Or you can use Package::getDirectory instead
         * $directory = Packages::package("packagename")->getDirectory("storage/private/" . $inputs["name"]);
         */
        if ($directory->exists()) {
            throw new Error("already_exists");
        }
        $directory->make(true);
        $this->response->setData($directory->getPath(), "path");
        $this->response->setStatus(true);
        return $this->response;
    }
}

```

## [دایرکتوری های موقت](#local_template_directory)

اگر نیاز دارید تا دایرکتوری بصورت موقت ساخته شود از کلاس `packages\base\IO\Directory\Tmp` نمونه بسازید. این کلاس هیچ ورودی در سازنده ی خود دریافت نمی‌کند و بصورت خودکار یک دایرکتوری محلی را پوشه ی پیشنهاد شده توسط سیستم عامل ایجاد می‌کند.

__توجه__: هر دایرکتوری موقت یک دایرکتوری محلی نیز بوده و تمام قابلیت ها و توانایی های `packages\base\IO\Directory\Local` را دارد.

__نکته__: دایرکتوری موقت به محض ایجاد شی Tmp ایجاد می‌شود و اماده خواندن و نوشتن است و به محض پاک شدن آن شی ، از روی هارد دیسک نیز حذف خواهد شد.
حذف شی یا صراحتا با دستور [unset](https://www.php.net/unset) و یا بصورت ضمنی توسط [garbage collector](https://www.php.net/manual/en/features.gc.php) مفسر php انجام خواهد شد.

**مثال 1**:
```php
use packages\base\IO\Directory;

$tmp = new Directory\Tmp();   

```

**مثال 2**:
```php
<?php
namespace package\packagename\controllers;

use packages\base\{Controller, Response, IO\Directory, view\Error, Packages};

class Directories extends Controller {
    public function Swap(): Response {
        $inputs = $this->checkInputs(array(
            "src" => array(
                "type" => "string",
            ),
            "dest" => array(
                "type" => "string",
            ),
        ));
        $source = new Directory\Local("packages/packagename/storage/private/" . $inputs["src"]);
        /**
         * Or you can use Package::getDirectory instead
         * $source = Packages::package("packagename")->getDirectory("storage/private/" . $inputs["src"]);
         */
        if (!$source->exists()) {
            throw new Error("source_isnot_exists");
        }
        $destination = new Directory\Local("packages/packagename/storage/private/" . $inputs["dest"]);
        /**
         * Or you can use Package::getDirectory instead
         * $destination = Packages::package("packagename")->getDirectory("storage/private/" . $inputs["dest"]);
         */
        if (!$destination->exists()) {
            throw new Error("destination_isnot_exists");
        }
        $tmp = new Directory\Tmp();
        $source->copyTo($tmp);
        $destination->copyTo($source);
        $destination->copyFrom($tmp); // Or $tmp->copyTo($destination);
        $this->response->setStatus(true);
        return $this->response;
    }
}   

```

## [دایرکتوری های ریموت / FTP](#ftp_directories)

برای دسترسی به دایرکتوری هایی که بر روی سرور های دیگر هستند، از کلاس  `packages\base\IO\Directory\Ftp` میتوان استفاده کرد.
برای دسترسی به دایرکتوری ها ابتدا یک شی از کلاس Ftp میسازیم آدرس دایرکتوری مورد نظر در سرور را به آن میدهیم و سپس مشخصات سرور را تنظیم میکنیم.


**مثال 1:**
```php
use packages\base\IO\Directory;

$ftp = new Directory\Ftp('public_html/packages/test/dir');
$ftp->hostname = "test.com";
$ftp->password = "123";
$ftp->username = "ali";
```
__توجه__: درصورتی که مشخصات سرور وارد شده اشتباه باشد `Warning: ftp_connect(): php_network_getaddresses: getaddrinfo failed: Name or service not known` دریافت میکنیم.

**مثال 2**:
```php
<?php
namespace package\packagename\controllers;

use packages\base\{Controller, Response, IO\Directory, view\Error, Packages};

class Directories extends Controller {
    public function UploadViewFTP(): Response {
        $inputs = $this->checkInputs(array(
            "src" => array(
                "type" => "string",
            ),
            "dest" => array(
                "type" => "string",
            ),
            "hostname" => array(
                "type" => "string",
            ),
            "username" => array(
                "type" => "string",
            ),
            "password" => array(
                "type" => "string",
            ),
        ));
        $source = new Directory\Local("packages/packagename/storage/private/" . $inputs["src"]);
        /**
         * Or you can use Package::getDirectory instead
         * $source = Packages::package("packagename")->getDirectory("storage/private/" . $inputs["src"]);
         */
        if (!$source->exists()) {
            throw new Error("source_isnot_exists");
        }
        $destination = new Directory\Ftp($inputs["dest"]);
        $destination->hostname = $inputs["hostname"];
        $destination->username = $inputs["username"];
        $destination->password = $inputs["password"];
        if (!$destination->exists()) {
            $destination->make(true);
        }
        $source->copyTo($destination);
        $this->response->setStatus(true);
        return $this->response;
    }
}   

```

## [دایرکتوری های ریموت / SFTP](#sftp_directories)

برای دسترسی به دایرکتوری های ریموت از کانال SSH2 از کلاس `packages\base\IO\Directory\Sftp` نیز میتوان استفاده کرد.
برای دسترسی به دایرکتوری ها ابتدایک شی از کلاس Sftp میسازیم؛ آدرس دایرکتوری مورد نظر در سرور را به آن میدهیم و سپس مشخصات سرور را تنظیم میکنیم.

**مثال:**
```php
use packages\base\IO\Directory;

$sftp = new Directory\Sftp('public_html/packages/test/dir');
$sftp->hostname = "test.com";
$sftp->password = "123";
$sftp->username = "ali";
$sftp->port = 7624;
```
__توجه__: درصورتی که مشخصات سرور وارد شده اشتباه باشد `exception: packages\base\ssh\ConnectionException` دریافت میکنیم.

**مثال 2**:
```php
<?php
namespace package\packagename\controllers;

use packages\base\{Controller, Response, IO\Directory, view\Error, Packages};

class Directories extends Controller {
    public function UploadViewSFTP(): Response {
        $inputs = $this->checkInputs(array(
            "src" => array(
                "type" => "string",
            ),
            "dest" => array(
                "type" => "string",
            ),
            "hostname" => array(
                "type" => "string",
            ),
            "username" => array(
                "type" => "string",
            ),
            "password" => array(
                "type" => "string",
            ),
            "port" => array(
                "type" => "number",
                "min" => 1,
                "max" => 65535,
                "default" => 22,
                "optional" => true,
            ),
        ));
        $source = new Directory\Local("packages/packagename/storage/private/" . $inputs["src"]);
        /**
         * Or you can use Package::getDirectory instead
         * $source = Packages::package("packagename")->getDirectory("storage/private/" . $inputs["src"]);
         */
        if (!$source->exists()) {
            throw new Error("source_isnot_exists");
        }
        $destination = new Directory\Sftp($inputs["dest"]);
        $destination->hostname = $inputs["hostname"];
        $destination->username = $inputs["username"];
        $destination->password = $inputs["password"];
        $destination->port = $inputs["port"];
        if (!$destination->exists()) {
            $destination->make(true);
        }
        $source->copyTo($destination);
        $this->response->setStatus(true);
        return $this->response;
    }
}   

```

## [ایجاد دایرکتوری](#howto_make_directories) 

برای ایجاد یک دایرکتوری از متد `make()` استفاده میشود.
این متد در ورودی خود یک مقدار boolean دریافت میکند; اگر مقدار `true` به متد داده شود تمامی پوشه های تو در تو نیز ایجاد میشوند .
درصورتی که مقدار `false` به متد داده شود تنها آخرین دایرکتوری در مسیر مشخص شده ساخته میشود 

__نکته__: مقدار آرگومان ورودی متد `make()` به صورت پیش فرض `false` است.

__توجه__: اگر به متد مقدار false داده شود و دایرکتوری والد آن وجود نداشته باشد warning دریافت میکنیم. 

__توجه__:‌درصورتی که دایرکتوری وجود داشته باشد  warning دریافت میکنیم.



**مثال 1** از کد **خطا**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/non-exists-directory/dir");
$dir->make(); // or -> $dir->make(false);   // Warning: mkdir(): No such file or directory

```


**مثال 2** از کد **خطا**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/directory/exists-dir");
$dir->make(); // or -> $dir->make(false);   // Warning: mkdir(): File exists

```


**مثال 1**:
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/non-exists-directory/dir");
if (!$dir->exists()) {
    $dir->make(true);
}
```
در مثال فوق علاوه بر دایرکتوری dir اگر دایرکتوری های والد آن وجود نداشته باشد نیز ایجاد میشود.

**مثال 2**:
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/non-exists-directory/dir");
if (!$dir->exists() and $dir->getDirectory()->exists()) {
    $dir->make();
}
```
در مثال فوق تنها دایرکتوری dir ایجاد میشود بنابراین باید ابتدا از وجود دایرکتوری های والد آن اطمینان حاصل شود.

**مثال 3:**
```php
use packages\base\IO\Directory;

$ftp = new Directory\Ftp('public_html/packages/test/dir');
$ftp->hostname = "test.com";
$ftp->password = "123";
$ftp->username = "ali";

if (!$ftp->exists()) {
    $ftp->make(true);
}
```

**مثال 4:**
```php
use packages\base\IO\Directory;

$sftp = new Directory\Sftp('public_html/packages/test/dir');
$sftp->hostname = "test.com";
$sftp->password = "123";
$sftp->username = "ali";
$sftp->port = 7624;

if (!$sftp->exists()) {
    $sftp->make(true);
}
```



## [حذف دایرکتوری](#howto_delete_directories)

برای حذف دایرکتوری از متد `delete()` استفاده میشود . 

__توجه__: در صورت عدم وجود دایرکتوری warning دریافت میکنیم.


**مثال** از کد **خطا**:
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/non-exists-directory");
$dir->delete(); // Warning: scandir(packages/jalno/non-exists-directory): failed to open dir: No such file or directory

```

**مثال 1:**
```php
use packages\base\IO\Directory;

$dir = new IO\directory\local("packages/jalno/directory");
if ($dir->exists()) {
    $dir->delete();
}
```
**مثال 2:**
```php
use packages\base\IO\Directory;

$ftp = new Directory\Ftp('public_html/packages/test/dir');
$ftp->hostname = "test.com";
$ftp->password = "123";
$ftp->username = "ali";
if ($ftp->exists()) {
    $ftp->delete();
}
```

**مثال 3:**
```php
use packages\base\IO\Directory;

$sftp = new Directory\Sftp('public_html/packages/test/dir');
$sftp->hostname = "test.com";
$sftp->password = "123";
$sftp->username = "ali";
$sftp->port = 7624;

if ($sftp->exists()) {
    $sftp->delete();
}
```


## [انتقال دایرکتوری ](#howto_transfer_directories)

برای انتقال دایرکتوری از متد `move()` استفاده میشود . این متد برای آرگومان ورودی یک شی از کلاس های مشتق شده از کلاس `packages\base\IO\Directory` دریافت میکند و مقدار بازگشتی آن boolean میباشد.

__توجه__ : درصورت موجود نبودن  دایرکتوری مبدا warning دریافت میکنیم 


__توجه__: باید توجه داشته باشیم قبل از صدا زدن متد `move()` از **عدم** وجود دایرکتوری **مقصد** اطمینان حاصل کنیم.


**مثال از کد خطا :**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/non-exists-directory");
$destination = new Directory\Local("packages/jalno/directory");

$dir->move($destination); // Warning: rename(packages/jalno/non-exists-directory,packages/jalno/directory/non-exists-directory): No such file or directory
        
```

**مثال 1 از کد درست :**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/directory");
$destination = new Directory\Local("packages/jalno/newDirectory");

if ($dir->exists() and !$destination->exists()) {
    $dir->move($destination);  
}
        
```


**مثال 2 از کد درست :**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/directory");
$destination = new Directory\Tmp();

if ($dir->exists()) {
    $dir->move($destination);  
}
        
```

**مثال 3 از کد درست:**
```php
use packages\base\IO\Directory;

$ftp = new Directory\Ftp('public_html/packages/test/dir');
$ftp->hostname = "test.com";
$ftp->password = "123";
$ftp->username = "ali";

$destination = new Directory\Ftp('public_html/packages/test/newDir');
$destination->hostname = "test.com";
$destination->password = "123";
$destination->username = "ali";

if ($ftp->exists() and !$destination->exists()) {
    $ftp->move($destination);
}
```

**مثال 4 از کد درست:**
```php
use packages\base\IO\Directory;

$sftp = new Directory\Sftp('public_html/packages/test/dir');
$sftp->hostname = "test.com";
$sftp->password = "123";
$sftp->username = "ali";
$sftp->port = 7624;

$local = new Directory\Local("packages/jalno/dir");

if ($sftp->exists() and !$local->exists()) {
    $sftp->move($local);
}
```


## [محاسبه حجم دایرکتوری](#howto_get_directories_size) 

برای محاسبه حجم دایرکتوری از متد `size()` استفاده میشود . حجم محاسبه شده در مبنای بایت میباشد.

__توجه__ : درصورت موجود نبودن  دایرکتوری  warning دریافت میکنیم 

**مثال از کد خطا :**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/non-exists-directory");

echo $dir->size(); // Warning: scandir(packages/jalno/non-exists-directory): failed to open dir: No such file or directory 
```

**مثال از کد درست :**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/directory");

if ($dir->exists()) {
    echo $dir->size();
}
        
```


## [کپی دایرکتوری](#howto_copy_directories) 

برای کپی کردن **محتویات** موجود در یک دایرکتوری در دایرکتوری دیگر از متد `copyTo()` استفاده میشود.
آرگومان ورودی این متد یک شی از کلاس های مشتق شده از کلاس `packages\base\IO\Directory` میباشد.

__نکته__:‌ اگر دایرکتوری مقصد وجود نداشته باشد ، ایجاد میشود.

__توجه__: در صورت عدم وجود دایرکتوری مبدا warning دریافت میکنیم.

**نکته مهم**: برنامه نویسان باید توجه داشته باشند اگر در دایرکتوری مبدا فایل (یا دایرکتوری) با نامی مشابه در دایرکتوری مقصد وجود داشته باشد فایل (یا دایرکتوری ) در دایرکتوری مقصد جایگزین میشود.

**مثال** از کد **خطا**
```php
use packages\base\IO\Directory;

$source = new Directory\Local("packages/jalno/non-exists-directory");
$destination = new Directory\Local("packages/jalno/new");

$source->copyTo($destination);     // Warning: scandir(packages/jalno/non-exists-directory): failed to open dir: No such file or directory
        
```

**مثال 1** از کد **درست**
```php
use packages\base\IO\Directory;

$source = new Directory\Local("packages/jalno/directory/dir");
$destination = new Directory\Local("packages/jalno/new/dir");

if ($source->exists()) {
    $source->copyTo($destination);     
}
```

**مثال 2** از کد **درست**
```php
use packages\base\IO\Directory;

$source = new Directory\Local("packages/jalno/directory/dir");
$tmp = new Directory\Tmp();

if ($source->exists()) {
    $source->copyTo($tmp);     
}
```

**مثال 3 از کد درست:**
```php
use packages\base\IO\Directory;

$ftp = new Directory\Ftp('public_html/packages/test/dir');
$ftp->hostname = "test.com";
$ftp->password = "123";
$ftp->username = "ali";

$destination = new Directory\Ftp('public_html/packages/test/newDir');
$destination->hostname = "test.com";
$destination->password = "123";
$destination->username = "ali";

if ($ftp->exists()) {
    $ftp->copyTo($destination);
}
```

**مثال 4 از کد درست:**
```php
use packages\base\IO\Directory;

$ftp = new Directory\Ftp('public_html/packages/test/dir');
$ftp->hostname = "test.com";
$ftp->password = "123";
$ftp->username = "ali";

$local = new Directory\Local('packages/jalno/dir');

if ($local->exists()) {
    $local->copyTo($ftp);
}
```


**مثال 5 از کد درست:**
```php
use packages\base\IO\Directory;

$sftp = new Directory\Sftp('public_html/packages/test/dir');
$sftp->hostname = "test.com";
$sftp->password = "123";
$sftp->username = "ali";
$sftp->port = 7624;

$tmp = new Directory\Tmp();

if ($sftp->exists()) {
    $sftp->copyTo($tmp);
}
```

برای کپی کردن محتویات **از** دایرکتوری دیگر از متد `copyFrom()` استفاده میشود 

>توجه:‌باید از موجود بودن دایرکتوری که قصد داریم محتویات را از آن کپی کنیم اطمینان حاصل شود.

**مثال ** از کد **درست**
```php
use packages\base\IO\Directory;

$destination = new Directory\Local("packages/jalno/directory/dir");
$source = new Directory\Local("packages/jalno/copy-items");

if ($source->exists()) {
    $destination->copyFrom($source);     
}
```

**مثال ** از کد **غلط**
```php
use packages\base\IO\Directory;

$destination = new Directory\Local("packages/jalno/directory/dir");
$source = new Directory\Local("packages/jalno/non-exists-directory");

$destination->copyFrom($source);   // Warning: scandir(packages/jalno/non-exists-directory): failed to open dir: No such file or directory

```


## [تغییرنام دایرکتوری](#howto_rename_directories) 

برای تغییر نام دایرکتوری ها از متد `rename()` استفاده میشود 
آرگومان ورودی این متد از جنس  `string` است, نام جدید برای متد ارسال میشود.

__توجه__: در صورت عدم وجود دایرکتوری warning دریافت میکنیم.

__توجه__: اگر دایرکتوری با نامی مشابه نام جدید در دایرکتوری والد وجود داشته باشد و خالی نباشد warning دریافت میکنیم.

**مثال 1** از کد **غلط**
```php
use packages\base\IO\Directory;

$directory = new Directory\Local("packages/jalno/non-exists-directory");
$directory->rename("newName");    // Warning: rename(packages/jalno/non-exists-directory,packages/jalno/newName): No such file or directory 
```

**مثال 2** از کد **غلط**
```php
use packages\base\IO\Directory;

$directory = new Directory\Local("packages/jalno/directory");
$directory->rename("newName");   // Warning: rename(packages/jalno/directory,packages/jalno/newName): Directory not empty
```

**مثال 1** از کد **درست**
```php
use packages\base\IO\Directory;

$directory = new Directory\Local("packages/jalno/directory");
$checkExistsDir = $directory->getDirectory()->directory("newName")->exists();

if ($directory->exists() and !$checkExistsDir) {
    $directory->rename("newName");
}
```

**مثال 2** از کد **درست**
```php
use packages\base\IO\Directory;

$directory = new Directory\Ftp('public_html/packages/test/dir');
$directory->hostname = "test.com";
$directory->password = "123";
$directory->username = "ali";

$checkExistsDir = $directory->getDirectory()->directory("newName")->exists();

if ($directory->exists() and !$checkExistsDir) {
    $directory->rename("newName");
}

```


**مثال 3** از کد **درست**
```php
use packages\base\IO\Directory;

$directory = new Directory\Sftp('public_html/packages/test/dir');
$directory->hostname = "test.com";
$directory->password = "123";
$directory->username = "ali";
$directory->port = 7624;

$checkExistsDir = $directory->getDirectory()->directory("newName")->exists();

if ($directory->exists() and !$checkExistsDir) {
    $directory->rename("newName");
}

```


## [لیست پوشه های موجود در دایرکتوری](#howto_get_directories_directory_list)

با استفاده از متد `directories()` لیست پوشه های موجود در دایرکتوری را دریافت میکنیم . آرگومان ورودی متد `boolean` میباشد.
اگر مقدار `true` به متد ارسال شود دایرکتوری های تو‌در‌تو را نیز برمیگرداند و 
اگر مقدار `false` به متد ارسال شود تنها پوشه های اولیه را بر میگرداند. خروجی این متد یک آرایه بوده که هر خانه از آن یک شئ از کلاس Directory میباشد.

__نکته__: آرگومان ورودی بصورت پیش فرض `true` میباشد.

__توجه__: اگر دایرکتوری وجود نداشته باشد warning دریافت میکنیم.

**مثال** از کد **خطا**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/non-exists-directory");            
$directories = $dir->directories();     // Warning: scandir(packages/jalno/non-exists-directory): failed to open dir: No such file or directory 
```

**مثال 1 از کد درست:**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/directory");    
if ($dir->exists()) {
    $directories = $dir->directories(false);
    print_r($directories);
}

/* output
Array
(
    [0] => packages\base\IO\directory\local Object
        (
            [directory] => packages/jalno/directory
            [basename] => dir1
        )

)
*/

```

**مثال 2 از کد درست:**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/directory");  
if ($dir->exists()) {          
    $directories = $dir->directories(true);
    print_r($directories);
}

/* output
Array
(
    [0] => packages\base\IO\directory\local Object
        (
            [directory] => packages/jalno/directory
            [basename] => dir1
        )

    [1] => packages\base\IO\directory\local Object
        (
            [directory] => packages/jalno/directory/dir1
            [basename] => dir1.1
        )

    [2] => packages\base\IO\directory\local Object
        (
            [directory] => packages/jalno/directory/dir1/dir1.1
            [basename] => dir1.1.1
        )

)
*/

```

**مثال 3** از کد **درست**
```php
use packages\base\IO\Directory;

$ftp = new Directory\Ftp('public_html/packages/test/dir');
$ftp->hostname = "test.com";
$ftp->password = "123";
$ftp->username = "ali";

if ($ftp->exists()) {
    $directories = $ftp->directories(false);
    
    foreach ($directories as $directory) {
        echo "directory: " . $directory->directory . " - basename: " . $directory->basename . "<br>";
    }
}

/** output
 * directory: public_html/packages/test/dir - basename: dir1
 */

```


**مثال 4** از کد **درست**
```php
use packages\base\IO\Directory;

$tmp = new Directory\Tmp();
        
$file = $tmp->file("newFile.txt");
$file->touch();

$dir = $tmp->directory("dir");
$dir->make();

print_r($tmp->directories());

/* output
Array
(
    [0] => packages\base\IO\directory\local Object
        (
            [directory] => /tmp/L7lHwsjRp
            [basename] => dir
        )

)
*/

```


**مثال 5** از کد **درست**
```php
use packages\base\IO\Directory;

$sftp = new Directory\Sftp('public_html/packages/test/dir');
$sftp->hostname = "test.com";
$sftp->password = "123";
$sftp->username = "ali";
$sftp->port = 7624;

if ($sftp->exists()) {
    $directories = $sftp->directories(false);
    foreach ($directories as $directory) {
        echo "directory: ".$directory->directory." - basename: ".$directory->basename."<br>";
    }
}

/* output

directory: public_html/packages/test/dir - basename: dir1
*/

```


## [لیست فایل های موجود در دایرکتوری](#howto_get_directories_file_list)

برای دریافت لیست فایل های موجود در دیرکتوری از متد `files()` استفاده میشود. 
آرگومان ورودی این متد boolean میباشد .
اگر مقدار `true` به متد ارسال شود فایل های داخلی را نیز برمیگرداند و 
اگر مقدار `false` به متد ارسال شود تنها فایل های موجود در دایرکتوری اصلی را بر میگرداند. خروجی این متد یک آرایه بوده که هر خانه از آن یک شئ از کلاس File میباشد.

__نکته__: آرگومان ورودی بصورت پیش فرض `true` میباشد.

__توجه__: اگر دایرکتوری وجود نداشته باشد warning دریافت میکنیم.


**مثال** از کد **خطا**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/non-exists-directory");            
$files = $dir->files();     // Warning: scandir(packages/jalno/non-exists-directory): failed to open dir: No such file or directory 
```


**مثال 1**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/directory");   
if ($dir->exists()) {         
    $files = $dir->files(false);
    print_r($files);
}

/* output
Array
(
    [0] => packages\base\IO\file\local Object
        (
            [directory] => packages/jalno/directory
            [basename] => file1
        )
)
*/

```

**مثال 2**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/directory");
if ($dir->exists()) {             
    $files = $dir->files(true);
    print_r($files);
}

/* output
Array
(
    [0] => packages\base\IO\file\local Object
        (
            [directory] => packages/jalno/directory/dir1/dir1.1
            [basename] => file1.1
        )

    [1] => packages\base\IO\file\local Object
        (
            [directory] => packages/jalno/directory
            [basename] => file1
        )

)
*/

```

**مثال 3**
```php
use packages\base\IO\Directory;

$tmp = new Directory\Tmp();
        
$file = $tmp->file("newFile.txt");
$file->touch();

$dir = $tmp->directory("dir");
$dir->make();

print_r($tmp->files());

/* output
Array
(
    [0] => packages\base\IO\file\local Object
        (
            [directory] => /tmp/ka3Dg5w4K
            [basename] => newFile.txt
        )

)
*/

```

**مثال 4**
```php
use packages\base\IO\Directory;

$ftp = new Directory\Ftp('public_html/packages/test/dir');
$ftp->hostname = "test.com";
$ftp->password = "123";
$ftp->username = "ali";  

if ($ftp->exists()) {         
    $files = $ftp->files(false);
    
    foreach ($files as $file) {
        echo "directory: ".$file->directory." - basename: ".$file->basename."<br>";
    }
}

/* output

directory: public_html/packages/test/dir - basename: file1
*/

```

**مثال 5**
```php
use packages\base\IO\Directory;

$sftp = new Directory\Sftp('public_html/packages/test/dir');
$sftp->hostname = "test.com";
$sftp->password = "123";
$sftp->username = "ali";  

if ($sftp->exists()) {         
    $files = $sftp->files(false);
    
    foreach ($files as $file) {
        echo "directory: ".$file->directory." - basename: ".$file->basename."<br>";
    }
}

/* output

directory: public_html/packages/test/dir - basename: file1
*/

```


## [لیست آیتم های موجود در دایرکتوری](#howto_get_directories_items_list)

برای دریافت لیست آیتم های موجود در دیرکتوری از متد `items()` استفاده میکنیم. 
آرگومان ورودی این متد boolean میباشد .
اگر مقدار `true` به متد ارسال شود آیتم های داخلی را نیز برمیگرداند و 
اگر مقدار `false` به متد ارسال شود تنها آیتم های موجود در دایرکتوری اصلی را بر میگرداند. خروجی این متد یک آرایه از شئ های File و Directory است.

نکته: آرگومان ورودی بصورت پیش فرض `true` میباشد.

توجه: اگر دایرکتوری وجود نداشته باشد warning دریافت میکنیم.

**مثال** از کد **خطا**
```php
use packages\base\IO\Directory;

$dir = new Directory\Local("packages/jalno/non-exists-directory");            
$items = $dir->items();     // Warning: scandir(packages/jalno/non-exists-directory): failed to open dir: No such file or directory 
```

**مثال 1 از کد درست:**
```php

$dir = new IO\directory\local("packages/jalno/directory");    
if ($dir->exists()) {          
    $items = $dir->items(false);
    print_r($items);
}

/*output
Array
(
    [0] => packages\base\IO\directory\local Object
        (
            [directory] => packages/jalno/directory
            [basename] => dir1
        )

    [1] => packages\base\IO\file\local Object
        (
            [directory] => packages/jalno/directory
            [basename] => file1
        )

)
*/

```

**مثال 2 از کد درست:**
```php

$dir = new IO\directory\local("packages/jalno/directory");            
if ($dir->exists()) {          
    $items = $dir->items(true);
    print_r($items);
}

/*output
Array
(
    [0] => packages\base\IO\directory\local Object
        (
            [directory] => packages/jalno/directory
            [basename] => dir1
        )

    [1] => packages\base\IO\directory\local Object
        (
            [directory] => packages/jalno/directory/dir1
            [basename] => dir1.1
        )

    [2] => packages\base\IO\directory\local Object
        (
            [directory] => packages/jalno/directory/dir1/dir1.1
            [basename] => dir1.1.1
        )

    [3] => packages\base\IO\file\local Object
        (
            [directory] => packages/jalno/directory/dir1/dir1.1
            [basename] => file1.1
        )

    [4] => packages\base\IO\file\local Object
        (
            [directory] => packages/jalno/directory
            [basename] => file1
        )

)
*/

```

**مثال 3 از کد درست:**
```php
use packages\base\IO\Directory;

$tmp = new Directory\Tmp();
        
$file = $tmp->file("newFile.txt");
$file->touch();

$dir = $tmp->directory("dir");
$dir->make();

print_r($tmp->items());

/* output
Array
(
    [0] => packages\base\IO\directory\local Object
        (
            [directory] => /tmp/1iQGbNTY9
            [basename] => dir
        )

    [1] => packages\base\IO\file\local Object
        (
            [directory] => /tmp/1iQGbNTY9
            [basename] => newFile.txt
        )

)
*/

```

**مثال 4 از کد درست:**
```php

$ftp = new Directory\Ftp('public_html/packages/test/dir');
$ftp->hostname = "test.com";
$ftp->password = "123";
$ftp->username = "ali";  

if ($ftp->exists()) {          
    $items = $ftp->items(false);
    foreach ($items as $item) {
        echo "directory: " . $item->directory . " - basename: " . $item->basename . "\n";
    }
}

/* output
directory: public_html/packages/test/dir - basename: dir1
directory: public_html/packages/test/dir - basename: file1
*/

```


**مثال 5 از کد درست:**
```php

$sftp = new Directory\Sftp('public_html/packages/test/dir');
$sftp->hostname = "test.com";
$sftp->password = "123";
$sftp->username = "ali";  
$sftp->port = 7624;  

if ($sftp->exists()) {          
    $items = $sftp->items(false);

    foreach ($items as $item) {
        echo "directory: " . $item->directory . " - basename: " . $item->basename . "\n";
    }
}

/* output
directory: public_html/packages/test/dir - basename: dir1
directory: public_html/packages/test/dir - basename: file1
*/

```