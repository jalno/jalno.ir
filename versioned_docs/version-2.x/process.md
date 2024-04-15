
# روند
اجرای برنامه و یا دستور هایی از طریق دستورات خط فرمان و یا اجرای بخشی از برنامه به صورت موازی و در زمینه از جمله مواردی هست که میتوانید با استفاده از کلاس `pakcages\base\process` انجام دهید. نتیجه هر روند باید پاسخی از جنس کلاس `packages\base\response` باشد .

##### برای اطلاعات بیشتر به صفحه ی [پاسخ](response.md) مراجعه کنید

نمونه-۱ یک فایل روند
```php
<?php
namespace packages\packagename\processes;
use packages\base\{process, response};
use packages\packagename\ticket;
class tickets extents process {
	public function auto_close(): response {
		$response = new response(false);
		$ticket = new ticket();
		$ticket->where("status", 1); // ticket answered
		$ticket->where("answered_at", time() - 86400, "<=");
		$tickets = $ticket->get();
		foreach ($tickets as $ticket) {
			$ticket->status = 4; // ticket closed
			$ticket->save();
		}
		$response->setStatus(true);
		return $response;
	}
}
``` 
نمونه-2 فایل روند
```php
<?php
namespace packages\packagename\processes;
use packages\base\{process, response};
use packages\packagename\phpmailer;
class Email extends process {
	public function send(array $parameter): response {
		$mail = new phpmailer();
		$mail->setFrom($parameter["sender"], $parameter["sender_name"]);
		$mail->addAddress($parameter["send_to"]);
		$mail->Subject = "Jeyserver Support";
		$mail->Body = "Your request has been done !"
		$result = $mail->send();
		return new response($result);
	}
}
```

## فراخوانی روند ها
از دو طریق خط فرمان و یا نمونه سازی کلاس `process` میتوان کلاس های روندی را فراخوانی و اجرا کرد .

### فراخوانی از طریق خط فرمان
از طریق دستورات خط فرمان به مسیر نصب پروژه بروید و فایل `index.php`  همراه با نام کلاس و متد روند که  با استفاده از `@` به یکدیگر متصل شده اند را در پارامتری با نام `process`  اجرا کنید  .

```bash
cd /home/projectname/webserver
php index.php --process=packages/packagename/processes/tickets@auto_close
```
### فراخوانی از طریق نمونه سازی
##### برای اطلاعات بیشتر به صفحه ی [ارتباط شئ گرا با پایگاه داده](dbObject.md) مراجعه کنید
برای نمونه سازی از کلاس `process` باید یک نام و یک پارامتر مشخص کنید . نامی که برای روند مشخص میکنید، کلاس و متد مدنظر فراخوانی است . در صورتی که روند کلاس و یا متدی با نام مشخص شده پیدا نکند، با پرتاب استثنایی از جنس `packages\base\proccessClass` از ادامه برنامه جلوگیری خواهد کرد .همچنین  پارامتر های ارسالی عینا برای متد روندی ارسال خواهند شد . پس از ذخیره نمیونه، میتوانید روند را با یکی از سه روش زیر فراخوانی کنید .

#### اجرای روند در زمینه
برای اجرای روند به صورت موازی و در زمینه  باید از متد `background_run` استفاده کنید .

مثال
```php
<?php
namespace packages\pckagesname\controllers;
use packages\base\{controller, process};
class Main extends controller {
	public function request_done(): response {
		$process = new process();
      $process->name = "packages\\packagename\\processes\\Email@send";
      $process->parameters = array(
	      "sender" => "support@jeyserver.com",
	      "sender_name" => "Jey Support",
	      "send_to" => "client@email.com",
      );
      $process->save();
      $process->background_run();
  		$response = new response(true);
  		$view = view::byName(views\tickets_list::class);
  		$response->setData("message (will be) sent", "message");
  		$response->setView($view);
  		return $response;
	}
}
```
#### اجرا و انتظار برنامه برای دریافت پاسخ
از دو طریق میتوان برنامه را اجرا و منتظر پاسخ آن بود :

مثال 1
```php
<?php
namespace packages\pckagesname\controllers;
use packages\base\{controller, process};
class Main extends controller {
	public function request_done(): response {
		$response = new response(true);
  		$view = view::byName(views\tickets_list::class);
		$process = new process();
      $process->name = "packages\\packagename\\processes\\Email@send";
      $process->parameters = array(
	      "sender" => "support@jeyserver.com",
	      "sender_name" => "Jey Support",
	      "send_to" => "client@email.com",
      );
      $process->save();
      $process->run();
  		$is_done = $proccess->waitFor(10) // 10 second
	  	if ($is_done) {
		  	$response->setData("message sent", "message");
	  	} else {
		  	$response->setData("message will be sent", "message");
	  	}
  		$response->setView($view);
  		return $response;
	}
}
```
مثال 2
```php
<?php
namespace packages\pckagesname\controllers;
use packages\base\{controller, process};
class Main extends controller {
	public function request_done(): response {
		$response = new response(true);
  		$view = view::byName(views\tickets_list::class);
		$process = new process();
      $process->name = "packages\\packagename\\processes\\Email@send";
      $process->parameters = array(
	      "sender" => "support@jeyserver.com",
	      "sender_name" => "Jey Support",
	      "send_to" => "client@email.com",
      );
      $process->save();
  		$is_done = $proccess->runAndWaitFor(10) // 10 second
	  	if ($is_done) {
		  	$response->setData("message sent", "message");
	  	} else {
		  	$response->setData("message will be sent", "message");
	  	}
  		$response->setView($view);
  		return $response;
	}
}
```
## بررسی وضعیت روند
با استفاده از متد `isRunning`  میتوانید از وضعیت روند مطلع شوید. خروجی این متد در صورتی که روند درحال اجرا باشد `true` و در غیر اینصورت `false` خواهد بود .

