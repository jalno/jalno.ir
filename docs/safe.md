
# ایمن سازی
کلاس `packages/base/utility/safe`  برای ایمن سازی محتویات رشته ها، اعداد و تاریخ ها استفاده میشود . متد های این کلاس برای راحتی استفاده به صورت ایستا `static` نوشته شده است .
توجه داشته باشید در صورتی که از اعتبار سنج برای بررسی اطلاعات ورودی استفاده میکنید ، اعتبار سنج به صورت خودکار تمامی این موارد را انجام می دهد .

##### برای اطلاعات بیشتر به صفحه ی [اعتبار سنجی](validation.md) مراجعه کنید

## ایمن سازی رشته
رشته های دریافتی از سمت کاربر باید قبل از هر گونه استفاده از لحاظ محتویات ایمن سازی شود . ممکن است رشته کد های مخربی در رشته های دریافتی از سمت کاربر دریافت شوند که باعث اختلال در برنامه شوند . با استفاده از متد `string` میتوانید یک محتویات رشته را برای استفاده ایمن کنید . این متد در پارامتر خود رشته را گرفته و با پردازش هایی محتویات آن را ایمن سازی کرده و در خروجی باز برگشت می دهد .

```php
safe::string(string);
```

## ایمن سازی اعداد
تعیین محدوده و تبدیل یک رشته اعداد به عدد از جمله مواردی است که توسط متد `number` انجام میشود . این متد در پارامتر خود یک رشته و یا یک عدد دریافت میکند . در پارامتر دوم با مقدار true و یا false  محدوده مجاز منفی بودن عدد را میتوانید مشخص کنید . این متد  پس از بررسی رشته و یا بررسی محدوده عدد، مقدار عددی آن را در خروجی برگشت می دهد .

```php
safe::number(num, negative);
```

## ایمن سازی تاریخ
با استفاده از متد `date` و یا `is_date`  میتوانید از صحت یک رشته به عنوان یک تاریخ مطمئن شوید . این متد در پارامتر اول خود یک رشته گرفته و پس از ایمن سازی یک آرایه که شامل خانه های سال، ماه و روز است برگشت می دهد .

```php
safe::date(string);
```

## ایمن سازی آدرس Email
متد `is_email`  یک آدرس Email را از نظر فرمت یک آدرس ایمیل اعتبار سنجی می کند . خروجی این متد در صورتی که آدرس ایمیل صحیح باشد `true` و در غیر اینصورت `false` خواهد بود .

```php
safe::is_email(string);
```

## ایمن سازی شماره همراه
با استفاده از متد ‍`is_cellphone_ir` و یا `cellphone_ir` میتوانید از یک شماره به عنوان شماره همراه اطمینان کسب کنید . همانطور که از نام متد ها مشخص است ، این ایمن سازی فقط برای شماره همراه های ایرانی کاربرد دارد .
متد `cellphone_ir`  شماره همراه را فقط بر اساس طول آن  ایمن سازی میکند .در صورتی که ایمن سازی انجام شده تایید شود، خروجی این متد برای یکسان سازی همان شماره همراه به همراه کد ایران (98) در ابتدای آن و در غیر این صورت `false` خواهد بود .
ولی متد `is_cellphone_ir` شماره همراه را براساس محتویات آن و پیش شماره شرکت های اپراتور ایرانی نیز ایمن سازی میکند، خروجی این متد در صورت تایید صحت شماره همراه `true` و در غیر اینصورت `false` خواهد بود .

```php
safe::is_cellphone_ir(string);
safe::cellphone_ir(string);
```

## ایمن سازی آی پی
متد `is_ip4` میتواند یک آی پی را انظر فرمت و طول ایمن سازی نماید . خروجی این متد در صورت تایید ایمن سازی `true` و در غیر اینصورت `false` خواهد بود .

```php
safe::is_ip4(string);
```

مثال
```php
$string= safe::string("jalno supported by 'jeyserver'");
echo $string;
/* output
jalno supported by jeyserver
*/

$date = "1397/02/03 12:00";
if ($result = safe::is_date($date)) {
	print_r($result);
} else {
	echo "Invalid date.";
}
/* output
Array
(
    [Y] => 1397
    [m] => 02
    [d] => 03
    [h] => 12
    [i] => 00
)
*/

$cellphone = "09123456789";
if (safe::is_cellphone_ir($cellphone)) {
	echo safe::cellphone_ir($cellphone);
} else {
	echo "Invalid cellphone.";
}
/* output
989123456789
*/

$ip = "127.0.0.1";
var_dump(safe::is_ip4($ip));
/* output
bool(true)
*/
```

