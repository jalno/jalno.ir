# ارتباط شئ گرا با پایگاه داده
از کلاس `dbObject` برای نمونه سازی جداول پایگاه داده استفاده می شود .
در این ارتباط برای هر جدول یک کلاس متناظر تعریف می شود . نام ستون ها در کلید های یک آرایه و در مقدار هر کدام اطلاعاتی از جمله نوع، اجباری و یکتا بودن هر ستون مشخص می شود.
مزیت این روش بر ارتباط مستقیم ، شئ گرا بودن این ارتباط و مشخص بودن نوع، اجباری و یکتا بودن هر ستون است . از تکرار چند باره بررسی مقادیر ستون ها جلوگیری کرده، در صورتی مقدار ستونی با آنچه مشخص شده مغایرت داشته باشد، یا مقداری برای ستون های اجباری مشخص نشده باشد و یا مقدار ستون های یکتا، تکراری باشد، به صورت خودکار قبل از ارسال درخواست برای پایگاه داده بررسی و با پرتاب استثناهای به ترتیب   `package\base\db\InputRequired`، `package\base\db\InputDataType` و `package\base\db\duplicateRecord` از ادامه روند جلوگیری خواهد کرد .

### کلاس جدول users
```php
<?php
namespace packages\packagename;
use packages\base\db\dbObject;
class user extends dbObject {
    protected $dbTable = "users";
    protected $primaryKey = "id";
    protected $dbFields = array(
        "firstname" => array("type" => "text", "required" => true),
        "lastname" => array("type" => "text"),
        "email" => array("type" => "text", "unique" => "true"),
        "cellphone" => array("type" => "text", "required" => true, "unique" => "true"),
        "password" => array("type" => "text", "required" => true),
        "city" => array("type" => "int"),
        "status" => array("type" => "int", "required" => true)
    );
    protected $relations = array(
        "city" => array("hasOne", state\city::class, "type")
    );
}
```

## متد get
با استفاده از این متد میتوانید  اطلاعات را به صورت دسته جمعی از پایگاه داده دریافت کنید . نوع بازگشتی این متد آرایه ای از شی های متناظر جدول درخواستی است . پارامتر اول تعداد ردیف ها و در پارامتر دوم، نام ستون و یا ستون های درخواستی از جدول را دریافت می کند .

```php
$user = new user();
$user->get(limit, columns);

user::get(limit, columns);
```

مثال 1
```php
$user = new user();
$users = $user->get(); // or user::get()
foreach ($users as $user) {
	print_r($user->toArray());
}
/* output
array(
	"id"=> 1,
	"firstname" => "Sam smith",
	"email" => "alex@smith.com"
);
array(
	"id"=> 2,
	"firstname" => "John",
	"email" => "John@some.com"
);
*/
```
مثال 2
```php
$user = new user();
$users = $user->get(null, array("firstname")); // or user::get(null, array("firstname"))
foreach ($users as $user) {
	echo $user->firstname;
}
/* output
Sam smith
John
*/
```
## متد getOne
با استفاده از این متد میتوانید ، اطلاعات فقط یک ردیف را از پایگاه داده دریافت کنید . نوع بازگشتی این متد یک شئ از کلاس متناظر است .    این متد در پارامتر خود  نام ستون و یا ستون های درخواستی از جدول را دریافت می کند .

```php
$user = new user();
$user = $user->getOne(columns);
```

مثال 1
```php
$user = new user();
$user = $user->getOne();
echo $user->id;
echo $user->firstname;
echo $user->email;
/* output
1
Sam smith
alex@smith.com
*/
```
مثال 2
```php
$user = new user();
$user = $user->getOne(array("firstname", "email"));
echo $user->firstname;
echo $user->email;
/* output
Sam smith
alex@smith.com
\*/
```
## متد getValue
این متد فقط مقدار  یک ستون جدول را از پایگاه داده دریافت میکند . نوع بازگشتی این متد یک بسته به تعداد مقدار های بازگشتی میتواند یک  مقدار ثابت و یا یک آرایه باشد که بسته به نوع ستون، نوع مقدار متفاوت خواهد بود . این متد در تنها پارامتر نام ستون دریافت میکند .

```php
$user = new user();
$user->getValue(column);
```

مثال 1

```php
$user = new user();
$count = $user->getValue("count(*)");
echo "{$count} users found";

$user = new user();
$username = $user->getValue("firstname");
echo "firstname is : {$username}";
```
## متد where
با استفاده از این متد میتوانید در یک جدول ، ردیف هایی که فقط با شرط عنوان شده در این متد مطابقت دارند را دریافت کنید . پارامتر اول این متد نام ستون جدول و  در پارامتر دوم مقدار شرط دریافت می شود  .در پارامتر سوم  نوع رابطه ی ستون و مقدار آن و در پارامتر چهارم ارتباط این شرط با شرط های دیگر مشخص میشود .

```php
$user = new user();
$user->where(column, value, operator, cond);
```

مثال 1

```php
$user = new user();
$user->where("id", 1);
$user = $user->getOne(array("firstname"));
/* output
Sam smith
*/
```

مثال 2

```php
$user = new user()
$user->where("id", 1);
$user->where("firstname", "John", "=", "OR");
$users = $user->get();
foreach ($users as $user) {
	echo $user->id;
	echo $user->firstname;
	echo $user->email;
}
/* output
1
Sam smith
alex@smith.com

2
John
John@some.com
*/
```

مثال 3

```php
$user = new user();
$user->where("id", 2, ">=");
$users = $user->get(array("id", "firstname"));
foreach ($users as $user) {
	echo $user->id;
	echo $user->firstname;
}
/* output
2
John
\*/
```
## متد byId
این متد برای دریافت یک ردیف با شناسه مشخص شده می باشد . این متد را میتوان با استفاده از دو متد `where` و `getOne` معادل سازی نمود .

```php
$user = new user();
$user->byId(id);

user::byId(id);
```

مثال
```php
$user = new user();
$user->where("id", 1);
$user = $user->getOne();
echo $user->firstname; // Sam smith

$user = user::byId(1);
echo $user->firstname; // Sam smith
```
## متد orWhere
این متد معادل متد `where` و مقدار `OR` در پارامتر چهارم است .

```php
$user = new user();
$user->orWhere(column, value, operator);
```

مثال
```php
$user = new user()
$user->where("id", 1);
$user->orWhere("firstname", "John", "=");
$users = $user->get();
foreach ($users as $user) {
	echo $user->id;
	echo $user->firstname;
	echo $user->email;
}
/* output
1
Sam smith
alex@smith.com

2
John
John@some.com
\*/
```
## متد save
با فراخوانی این متد ، در صورتی که قبلا اطلاعات از پایگاه داده گرفته شده باشد، تغییرات در پایگاه داده بروزرسانی خواهند شد و در غیر این صورت با اطلاعات، یک ردیف جدید در جدول متناظر ایجاد خواهد شد . 
خروجی این متد، در صورت بروزرسانی و یا ذخیره موفق اطلاعات در پایگاه اطلاعات `true` و در غیر اینصورت `false` خواهد بود .

```php
$user = new user();
$user->save();
```

مثال 1
```php
$user = new user();
$user->where("id", 1);
$user = $user->getOne();
echo $user->firstname; // Sam smith
$user->firstname = "something else";
$user->save();
// update users set firstname = "something else" where id = 1
echo $user->firstname; // something else
```
مثال 2
```php
$user = new user();
$user->firstname = "Jack";
$user->email = "Jack@email.com";
$user->save();
// insert new user with Jack for firstname
```
## متد delete
این متد برای حذف  ردیف جدول استفاده میشود . در صورتی که قبل از این متد با استفاده از متد `where` شرطی گذاشته نشود ، تمامی ردیف های آن جدول حذف خواهند شد .
نوع بازگشتی این متد در صورت حذف ردیف `true` و در غیر این صورت `false` خواهد بود .

```php
$user = new user();
$user->delete();
```

مثال 1

```php
$user = new user();
$user->where("id", 1);
$result = $user->delete();
if ($result) {
    echo "successfully deleted";
}
```
## متد orderBy
از این متد برای چینش ردیف های گرفته شده از پایگاه داده استفاده میشود . این متد در پارامتر اول نام ستون و در پارامتر دوم نوع چینش صعودی و یا نزولی ردیف ها را دریافت می کند .

```php
$user->orderBy(orderByField, orderbyDirection);
```

مثال 1
```php
$user = new user();
$user->orderBy("id", "DESC");
$users = $user->get();
foreach ($users as $user) {
	echo $user->id;
	echo $user->firstname;
}
/* output
5
Jack

4
John

1
Sam smith
*/
```

مثال 2

```php
$user = new user();
$user->orderBy("name", "ASC");
$users = $user->get(null, array("firstname"));
foreach ($users as $user) {
	echo $user->firstname;
}
/* output
John
Sam smith
*/
```
### متد groupBy
از این متد برای یکسان سازی اطلاعات دریافتی (حذف ردیف های با مقدار های تکراری در ستون مشخص شده) از پایگاه داده استفاده میشود . در پارامتر این متد نام ستون دریافت می شود .

```php
$user = new user();
$user->groupBy(groupByField);
```

مثال 1

```php
$users = user::get(null, array("firstname"));
foreach ($users as $user) {
	echo $user->firstname;
}
/* output
Sam smith
Sam smith
*/

$user = new user();
$user->groupBy("firstname");
$users = $user->get(null, array("firstname"));
/* output
Sam smith
*/
```
## متد has
از این متد برای بررسی وجود و یا عدم وجود اطلاعات در پایگاه داده استفاده می شود .
خروجی این متد در صورت یافتن ردیفی با شرایطی که قبل از آن تعریف شده باشد ، `true` و در غیر اینصورت `false` خواهد بود .

```php
$user = new user();
$user->has();
```

مثال 1

```php
$user = new user();
$user->where("email", "John@some.com");
$has = $user->has();
if ($has) {
    return "the email address already taken";
}
```
