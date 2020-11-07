# لاگ ها

در جالنو از لاگ‌ها بجای کامنت ها استفاده می‌شود. استفاده از لاگ باعث افزایش خوانایی و بهبود UX ‌سایر برنامه نویسان میشود. همچنین لاگ ها باعث سهولت در عیب‌یابی پروژه ها میشوند.
در واقع لاگ ها توضیحاتی هستند که در بین کدها نوشته میشوند و هر کدام  متتناسب با سطحی که دارند بیانگر اطلاعات خاصی از برنامه می‌باشند. اطلاعاتی از جمله روند اجرا ، اطلاعات دقیق و پایه ای مانند کوئری های ارسال شده به دیتابیس ، ارور های دریافت شده و ... می‌باشد.

برای کار با لاگ‌ها کلاس `packages\base\Log` ایجاد شده است.
برای استفاده از لاگ ها باید ابتدا یک شی از کلاس Log از طریق متد `getInstance()` ساخته شود.

```php
$log = Log::getInstance();
```

لاگ‌ ها در مسیر `packages/base/storage/protected/logs` و به صورت خودکار لاگ های مربوط به هر روز در فایل جداگانه با تاریخ همان روز ذخیره میشوند.   
هر لاگ یک خط مجزا در فایل لاگ است که به ترتیب از ستون های زمان ذخیره، سطح ومتن لاگ تشکیل میشود.

## [پیکربندی](#configure)

تنظیمات مربوط به لاگ ها در فایل تنظیمات جالنو (`config.php`) که در مسیر `packages/base/libraries/config` قرار دارد ذخیره میشود.

#### [تعیین سطح لاگ ها](#configure_log_level)

با استفاده از تنظیم `packages.base.logging.level` مشخص میشود کدام سطح از لاگ ها ذخیره شوند.
اگر بخواهیم تمامی لاگ ها در فایل ذخیره شوند مقدار تنظیم را برابر با `debug` قرار میدهیم.

```php
'packages.base.logging.level' => 'debug' // info, warn, error, fatal, off
```

__نکته__: با فعال سازی این تنظیم تمامی لاگ ها از ابتدای بارگذاری جالنو ذخیره خواهد شد. میتوانید با استفاده از متد ```setLevel(string $level): void``` در ابتدای یک متد خواص، لاگ ها را فقط برای آن متد و  متد هایی که بعد از آن فراخوانی میشوند، فعال نمایید. این متد در تنها آرگومان خود یکی از سطوح لاگ را دریافت میکند.

#### [نمایش لاگ ها](#configure_off_on)

با استفاده از تنظیم `packages.base.logging.quiet` تعیین میشود لاگ ها در مرورگر نیز نمایش داده شوند یا خیر.
اگر برابر با true باشد لاگ‌ها فقط در فایل ذخیره شده و در مرورگر نمایش داده نمی‌شوند.

```php
'packages.base.logging.quiet' => true // false
```

## [سطوح لاگ](#log_levels)
لاگ‌ها دارای سطوح مختلفی هستند. که شامل موارد زیر میشوند :‌

**نکته :**
سطح بندی لاگ ها باعث می‌شود زمانی که به‌طور مثال قصد بررسی روند اجرای برنامه را داریم سطح لاگ را برابر `info` قراردهیم و یا زمانی که قصد بررسی دقیق برنامه و مشاهده اطلاعات پایه‌ای تر را داریم سطح لاگ را برابر `debug` تنظیم کنیم.

**نکته :** برای متدهای کار با سطوح لاگ می‌توان به تعداد دلخواه آرگومان تعریف کرد. ارگومان ها به ترتیب در متن لاگ آورده می‌شوند.

| سطح   | کاربرد                                      |
| ----- | ------------------------------------------- |
| [debug](#debug_level) | اطلاعات کامل برنامه که میتواند اطلاعات حساس و یا روند برنامه باشد                         |
| [info](#info_level)  | توضیحات روند اجرا برنامه                    |
| [warn](#warn_level)  | توضیحاتی از روند برنامه که نیاز به بررسی و یا حساسیت بیشتری داشته باشد به حالت هشداری نمایش داده میشود      |
| [error](#error_level) | برای نمایش خطاهای برنامه استفاده میشود |
| [fatal](#fatal_level) | خطاهایی که برنامه را متوقف میکند            |

### [سطح debug](#debug_level)
از سطح `debug()` برای مشخص کردن اطلاعات پایه ای مانند کوئری ارسال شده به دیتابیس استفاده میشود. debug اطلاعات ریز و جزئی تر را در لاگ ذخیره می‌کند.

**مثال**
```php
use packages\base\Log;

Log::setLevel("debug"); // Log::setLevel("info");
$log = Log::getInstance();
$log->debug("current service status: ", $service->service->status);
if ($service->service->status == Service::SUSPENDED) {
    $log->info("unsuspending");
    if ($this->dryRun) {
        $log->reply("dry-Run");
    } else {
        $service->service->unsuspend();
        $log->reply("Success");
    }
}
return;
```
در مثال فوق روند برنامه با استفاده از متد های debug و info نوشته شده است. اگر سطع لاگ بر روی debug تنظیم شده باشد، تمامی روند برنامه و اگر سطح بر روی info تنظیم شده باشد، فقط روند های برنامه که با استفاده از متد info نوشته شده اند، ذخیره خواهند شد.

همچنین در جالنو به صورت خودکار تمامی اقدامات مهم و حیاتی که برای عیب یابی و دیباگ نیاز هستند، با استفاده از سطح لاگ debug نوشته شده اند. اگر سطع لاگ را بر روی debug تنظیم کرده باشید، این اطلاعات نیز ذخیره و یا نمایش داده میشوند.

**مثال از نمونه فایل لاگ**
```log
2020-10-19 11:37:46.15401000 +00:00 [DEBUG]	SQL Query: SELECT  value AS retval FROM options WHERE  name = 'packages.base.translator.active.langs'  LIMIT 1
2020-10-19 11:37:46.15945600 +00:00 [DEBUG]	SQL Query: SELECT  value AS retval FROM options WHERE  name = 'packages.base.cache'  LIMIT 1
```

### [سطح info](#info_level)

از `info()` برای ذخیره کردن توضیحاتی از روند اجرای برنامه استفاده می‌شود. در مثال زیر می‌خواهیم کاربری را طبق مشخصه شماره موبایل در دیتابیس پیدا کنیم;
این توضیحات را با استفاده از info در لاگ ذخیره می‌کنیم.

**مثال 1**

```php
use packages\base\Log;

// Log::setLevel("info");
$log = Log::getInstance();
if (!$user and isset($parameters["inputs"]["cellphone"])) {
    $log->info("try to find user by cellphone:", $parameters["inputs"]["cellphone"]);
    $user = (new User)->where("cellphone", $parameters["inputs"]["cellphone"])->getOne();
    if ($user) {
        $log->reply("found, #", $user->id);
    } else {
        $log->reply("notfound");
    }
}
```

**نمونه info در فایل لاگ**
```log
2020-10-17 14:55:48.93523900 +00:00 [INFO]		method: get
2020-10-17 14:55:48.93526500 +00:00 [INFO]		scheme: http
2020-10-17 14:55:48.93529600 +00:00 [INFO]		hostname: www.domain.com
2020-10-17 14:55:48.93533500 +00:00 [INFO]		uri: /favicon.ico
2020-10-17 14:55:48.93536400 +00:00 [INFO]		url parameters: []
2020-10-17 14:57:35.77234100 +00:00 [INFO]			try to find user by cellphone: 09131234567 : notfound
```
اگر سطع لاگ بر روی debug تنظیم شده باشد، نمونه فایل به صورت زیر خواهد بود.   

**نمونه فایل**
```log
2020-10-17 14:57:35.77234100 +00:00 [INFO]			try to find user by cellphone: 09131234567
2020-10-17 14:37:36.15945600 +00:00 [DEBUG]         SQL Query: SELECT  * FROM userpanel_users WHERE  cellphone = '09131234567'  LIMIT 1
2020-10-17 14:57:36.77234100 +00:00 [INFO]			try to find user by cellphone: 09131234567 : notfound
```

**مثال 2**
```php
use packages\base\Log;

Log::setLevel("info");
$l = Log::getInstance();
$l->info("change teacher name of class", $class->id);

if($inputs['name']){
    $class->teacher_name = $inputs['name'];
}
```

**مثال 3**
```php
use packages\base\Log;

Log::setLevel("info");
$l = Log::getInstance();
$l->info("get logs that has not title");

$type = db::subQuery();
$type->where("name", "userpanel_users_edit");
$types = $type->get("userpanel_usertypes_permissions", null, "userpanel_usertypes_permissions.type");
```
### [سطح error](#error_level)
از `error()` برای ذخیره خطا های برنامه استفاده میشود. این خطا ها میتوانند خطاهای مهلک و یا میتوانند جواب های ناخواسته در روند برنامه باشند.

__نکته__: اگر سطح لاگ بر روی debug و یا حتی info تنظیم شده باشد، لاگ های این سطح نیز ذخیره خواهند شد.

**مثال**
```php
use packages\base\Log;
use packages\base\View\Error;

$log = Log::getInstance();
$log->info("Get services");
$services = (new Service)->where("server_id", $data["server"])->get();
if (!$services) {
    $log->error("Unable to find any service");
    throw new Error("Unable to find any service");
}
```

**نمونه فایل لاگ**
```log
2020-10-20 13:51:56.41038100 +00:00 [INFO]		Get services
2020-10-20 13:51:56.41041900 +00:00 [ERROR]		Unable to find any service
```

### [سطح fatal](#fatal_level)
از `fatal()` برای ذخیره توضیح خطاهایی استفاده میشود که باعث میشوند اجرای برنامه متوقف شود.
در مثال زیر به دلیل تنظیم نشدن host برنامه متوقف می‌شود. توضیحات توقف برنامه با استفاده از fatal در لاگ ذخیره می‌شود. 

__نکته__: اگر سطح لاگ بر روی debug، error و یا حتی info تنظیم شده باشد، لاگ های این سطح نیز ذخیره خواهند شد.

__نکته__: اگر سطح لاگ بر روی fatal تنظیم شده باشد، فقط لاگ های fatal ذخیره خواهند شد.

**مثال**
```php
use packages\base\Log;

Log::setLevel("fatal");
$log = Log::getInstance();
if (empty($this->host)) {
    $log->fatal('MySQL host is not set');
    throw new \Exception('MySQL host is not set');
}
```

**نمونه fatal در فایل لاگ**
```php
2020-10-17 19:11:17.43898700 +00:00 [FATAL]			MySQL host is not set
```

### [سطح warn](#warn_level)
از `warn()` برای ذخیره روند هایی از برنامه استفاده میکنیم که حساسیت بیشتری داشته و یا نیاز به بررسی دارند.
مانند کوئری هایی که نتیجه ی آن چندان مورد قبول نیست.

__نکته__: اگر سطح لاگ بر روی debug و یا حتی info تنظیم شده باشد، لاگ های این سطح نیز ذخیره خواهند شد.

**مثال**
```php
use packages\base\Log;

Log::setLevel("info");
$log = Log::getInstance();
$log->info("FOUND. ip", $dir->basename, "is blong to server", $param->server);
$server = (new Server)->where("status", Server::ACTIVE)->byId($param->server);
if (!$server) {
    $log->reply()->warn("is not exists or is disabled");
    return;
}
```
در مثال فوق سرویس هایی که فعال هستند را از دیتابیس میگیریم; اگر هیچ سرویسی دریافت نکنیم نتیجه غیر منطقی است اما برنامه از روند خود خارج نمی‌شود.

**نمونه فایل لاگ**
```log
2020-10-20 13:34:43.07133600 +00:00 [INFO]		FOUND. ip 127.0.0.2 is blong to server 127.0.0.1
2020-10-20 13:34:43.07137900 +00:00 [WARN]		FOUND. ip 127.0.0.2 is blong to server 127.0.0.1: is not exists or is disabled
```

### [سطح reply](#reply_level)
از متد `reply()` برای مشخص کردن نتیجه میتوان استفاده کرد.
زمانی که در سطوح مختلف لاگ روندی از اجرای برنامه و یا اطلاعاتی پایه ای مانند کوئری ارسال شده به دیتابیس نوشته می‌شود که میتواند نتیجه ای داشته باشد، نتیجه با استفاده از متد reply مشخص میشود. متد reply نتیجه را در ادامه ی اخرین خط لاگ ذخیره میکند.

برای این متد میتوان به تعداد دلخواه آرگومان ورودی تعریف کرد. در نهایت ارگومان ها بصورت رشته تبدیل شده و در فایل لاگ ذخیره می‌شوند.

__نکته__: لاگ های این سطح در تمامی سطوح لاگ تنظیم شده ذخیره میشود.

**نکته :** اگر بخواهیم level نتیجه ای که توسط reply مشخص میشود را تعیین کنیم level مورد نظر را روی متد reply صدا میزنیم.

```php
$log->reply()->debug("log message");
$log->reply()->error("log message");
$log->reply()->fatal("log message");
$log->reply()->warn("log message");
```

**مثال 1**
```php
use packages\base\Log;

public function findUser($data) {
    Log::setLevel("info");
    $log = Log::getInstance();
    $log->info("try to find user by id: '{$data["id"]}'");
    $user = User::byId($data['id']);
    if($user){
        $log->reply("found user");
    }else {
        $log->reply()->warn("notfound");
    }
}
```
در مثال فوق در info مشخص شده که کاربر با id مشخص را جستجو میکند. در ادامه نتیجه ی پیدا شدن و یا نشدن آن در reply مشخص شده است. .


**نمونه فایل log**
```php
2020-10-18 16:49:10.61545200 +00:00 [INFO]		try to find user by id: '149': found user
```

در مثال زیر با استفاده از دیباگ مشخص شده که در این قسمت قصد اتصال به mysql را داریم.
سپس با استفاده از reply نتیجه مشخص شده است.

**2 مثال :** لاگ های تودرتو
```php
use packages\base\Log;

public function mysqli() {
    Log::setLevel("debug");
    if (!$this->_mysqli) {
        $log = log::getInstance();
        $log->debug("connect to mysql");
        $this->connect();
        $log->reply("Success");
    }
    return $this->_mysqli;
}
public function connect() {
    if ($this->isSubQuery) {
        return;
    }
    $log = log::getInstance();

    if (false and true or empty($this->host)) {
        $log->warn('MySQL host is not set');
        throw new \Exception('MySQL host is not set');
    }
    $log->info('connect to '.$this->username.'@'.$this->host.':'.$this->port.'/'.$this->db);
    $this->_mysqli = @new \mysqli($this->host, $this->username, $this->password, $this->db, $this->port);

    if ($this->_mysqli->connect_error) {
        $mysqli = $this->_mysqli;
        $this->_mysqli = null;
        $log->reply()->fatal($mysqli->connect_errno . ': ' . $mysqli->connect_error);
        throw new \Exception('Connect Error ' . $mysqli->connect_errno . ': ' . $mysqli->connect_error);
    }
    $log->reply("Success");
    if ($this->charset) {
        $log->debug("set charset to", $this->charset);
        $this->_mysqli->set_charset($this->charset);
        $log->reply("Success");
    }
}
```

**نمونه فایل log**
```php
2020-10-18 18:22:54.89225800 +00:00 [DEBUG]		connect to mysql
2020-10-18 18:22:54.89238400 +00:00 [INFO]			connect to root@localhost:3306/jalno
2020-10-18 18:22:54.89283600 +00:00 [INFO]			connect to root@localhost:3306/jalno: Success
2020-10-18 18:22:54.89292100 +00:00 [DEBUG]			set charset to utf8mb4
2020-10-18 18:22:54.89311100 +00:00 [DEBUG]			set charset to utf8mb4: Success
2020-10-18 18:22:54.89320200 +00:00 [DEBUG]		connect to mysql: Success
```
در مثال فوق بعد از debug متد connect صدا زده شده که در آن با info مشخصات اتصال مشخص شده است نهایتا در reply نتیجه اتصال مشخص شده است.
reply به ادامه آخرین متد صدا زده شده از شی متناظر اضافه می‌شود.

**مثال 3 :** تعیین level برای reply
```php
use packages\base\Log;
use packages\base\Exception;

function check($data) {
    $log = Log::getInstance();
    $log->info("try to find user by id: '{$data["id"]}'");
    $user = User::byId($data['id']);
    if($user){
        $log->reply("found user");
        $log->info("verify status");
        if ($usre->status != 1) {
            $log->reply()->fatal("invalid user status");
            throw new Exception("invalid user status");
        }
    }else {
        $log->reply()->warn("notfound");
    }
}
```

**نمونه فایل لاگ**
```php
2020-10-18 18:22:54.94021900 +00:00 [INFO]		try to find user by id: '{149}'
2020-10-18 18:22:54.94025300 +00:00 [INFO]		try to find user by id: '{149}': found user
2020-10-18 18:22:54.94028300 +00:00 [INFO]		verify status
2020-10-18 18:22:54.94031400 +00:00 [FATAL]		verify status: invalid user status
```
**مثال 4**
```php
public function findUser(string $email) {
    $log = Log::getInstance();
    $log->info("try to find user by email: ", $email);
    $user = User::where('email', $email)->getOne();
    if($user){
        $log->reply("found user, id: '{$user->id}'");
        return $user->id;
    }else {
        $log->reply()->warn("notfound");
        return false;
    }
}

public function showInfo($data) {
    Log::setLevel("info");
    $log = Log::getInstance();
    $log->info("get user by email: ", $data["email"]);
    $user = $this->findUser($data["email"]);
    if ($user) {
        $log->info("show user information");
        $view->info = $user;
    }
}
```
**فایل لاگ**
```log
2020-10-18 20:59:45.85419300 +00:00 [INFO]			get user by email:  email@yahoo.com
2020-10-18 20:59:45.85426100 +00:00 [INFO]				try to find user by email:  email@yahoo.com
2020-10-18 20:59:45.85431200 +00:00 [INFO]				try to find user by email:  email@yahoo.com: found user, id: '{180}'
2020-10-18 20:59:45.85436200 +00:00 [INFO]			show user information
```

### [تنظیم فایل لاگ](#setfile)
با استفاده از متد `setFile(string $path): void` می‌توان فایل ذخیره لاگ ها را تغییر داد. ارگومان ورودی این متد string میباشد، که آدرس فایل مورد نظر را دریافت می‌کند.

**توجه :** متد setFile در هر متدی صدا زده شود لاگ‌های همان متد در فایل تعریف شده ذخیره می‌شوند.

```php
use packages\base\Log;

Log::setFile("packages/my_package/storage/private/logs/logname.log");
```

### [اضافه کردن متن به لاگ](#append)
از متد `append()` برای اضافه کردن متن به ادامه ی یک لاگ استفاده می‌شود.

**توجه :** متن به ادامه ی آخرین لاگ ذخیره شده اضافه میشود.

```php
use packages\base\Log;
use packages\base\View\Error;

$log = Log::getInstance();
$log->info("Get services");
$services = (new Service)->where("server_id", $data["server"])->get();
if (!$services) {
    $log->error("Unable to find any service");
    throw new Error("Unable to find any service");
}
$log->reply(count($services), " services found");
if (count($services) > 1) {
    $log->append(". Show services to select");

```
**نمونه فایل لاگ**
```log
2020-10-20 13:51:56.41038100 +00:00 [INFO]		Get services
2020-10-20 13:51:56.41041900 +00:00 [INFO]		Get services: 2 services found
2020-10-20 13:51:56.41042300 +00:00 [INFO]		Get services: 2 services found. Show services to select
```
