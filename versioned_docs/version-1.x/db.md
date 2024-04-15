# ارتباط مستقیم با پایگاه داده

 از کلاس `packages\base\db` برای ارتباط با پایگاه داده استفاده میشود .
برای راحتی استفاده، متد های این کلاس به صورت ایستا و `static` نوشته شده که هر کدام یک عمل در زبان `SQL` را تشکیل میدهند .

### متد get
با استفاده از این متد میتوانید  اطلاعات را به صورت دسته جمعی از پایگاه داده دریافت کنید . نوع بازگشتی این متد آرایه ای از ردیف های جدول درخواستی است . پارامتر اول این متد نام جدول، پارامتر دوم تعداد ردیف ها و در پارامتر سوم، نام ستون و یا ستون های درخواستی از جدول را دریافت می کند .

    db::get(tablename, numrows, columns);

مثال 1

```php
$users = db::get("users");
// Query: SELECT * FROM `users`;

/*
$users = array(
    array(
        "id" => 1,
        "name" => "Sam smith",
        "email" => "alex@smith.com"
    ),
    array(
        "id" => 2,
        "name" => "Sam smith",
        "email" => "alex@smith.com"
    )
);
*/

```
همچنین میتوانید این متد را به صورت های زیر فراخوانی کنید

```php
$users = db::get("users", null, array("id"));
// Query: SELECT `id` FROM `users`;

/*
$users = array(
    array(
        "id" => 1
    ),
    array(
        "id" => 2
    )
);
*/
```

```php
$users = db::get("users", 1);
// Query: SELECT * FROM `users` LIMIT 1;

/*
$users = array(
    array(
        "id" => 1,
        "name" => "Sam smith",
        "email" => "alex@smith.com"
    )
);
*/
```

### متد getOne
با استفاده از این متد میتوانید ، اطلاعات فقط یک ردیف را از پایگاه داده دریافت کنید . نوع بازگشتی این متد یک آرایه است که نام ستون ها در کلید های این آرایه و مقدار هر ایندکس، مقدار آن است . پارامتر اول این متد نام جدول و  پارامتر دوم، نام ستون و یا ستون های درخواستی از جدول را دریافت می کند .

    db::getOne(tablename, columns);

مثال 1

```php
$user = db::getOne("users");
// Query: SELECT * FROM `users` LIMIT 1;

/*
$user = array(
    "id" => 1,
    "name" => "Sam smith",
    "email" => "alex@smith.com"
);
*/

```

مثال 2

```php
$user = db::getOne("users", array("name"));
// Query: SELECT `name` FROM `users` LIMIT 1;

/*
$user = array(
    "name" => "Sam smith",
);
*/

```

### متد getValue
این متد فقط مقدار  یک ستون جدول را از پایگاه داده دریافت میکند . نوع بازگشتی این متد یک بسته به تعداد مقدار های بازگشتی میتواند یک  مقدار ثابت و یا یک آرایه باشد که بسته به نوع ستون، نوع مقدار متفاوت خواهد بود . این متد در پارامتر اول نام جدول، پارامتر دوم نام ستون و در پارامتر سوم تعداد مقدارهای بازگشتی را دریافت میکند .

    db::getValue(tablename, column, limit);

مثال 1

```php
$count = db::getValue("users", "COUNT(*)");
// Query: SELECT COUNT(*) as `val` FROM `users` LIMIT 1;

echo "{$count} users found";
```

همچنین میتوانید این متد رو به صورت های زیر فراخوانی کنید

```php
$logins = db::getValue("users", "login"); 
// Query: SELECT `login` as `val` FROM `users` LIMIT 1;

$logins = db::getValue("posts", "title", null);
// Query: SELECT `title` as `val` FROM `posts`;
/*
Array
(
    [0] => Announcing GitHub Desktop 1.2
    [1] => GitHub Marketplace celebrates one year
    .
    .
    .
)
*/

$logins = db::getValue("posts", "title", 5);
// Query: SELECT `title` as `val` FROM `posts` LIMIT 5;
/*
Array
(
    [0] => Announcing GitHub Desktop 1.2
    [1] => GitHub Marketplace celebrates one year
    [2] => New improvements to the Slack and GitHub integration
    [3] => Ludum Dare 41—Games to play, hack on, and learn from
    [4] => GitHub contributes to UN free speech expert's report on content moderation
)
*/
```

### متد where
با استفاده از این متد میتوانید در یک جدول ، ردیف هایی که فقط با شرط عنوان شده در این متد مطابقت دارند را دریافت کنید . پارامتر اول این متد نام ستون و  در پارامتر دوم مقدار شرط دریافت می شود  .در پارامتر سوم عملگر شرط و در پارامتر چهارم ارتباط این شرط با شرط های دیگر مشخص میشود .

    db::where(column, value, operator, cond);

مثال 1

```php
db::where("id", 1);
$user = db::getOne("users");
// Query: SELECT * FROM `users` WHERE `id` = 1 LIMIT 1;

/*
$user = array(
    "id" => 1,
    "name" => "Sam smith",
    "email" => "alex@smith.com"
);
*/
```

مثال 2

```php
db::where("id", 1);
db::where("name", "John", "=", "OR");
$users = db::get("users");
// Query: SELECT * FROM `users` WHERE `id` = 1 OR `name` = "John";

/*
$users = array(
    array(
        "id" => 1,
        "name" => "Sam smith",
        "email" => "alex@smith.com"
    ),
    array(
        "id" => 5,
        "name" => "John",
        "email" => "John@some.com"
    )
);
*/

```

مثال 3

```php
db::where("id", 2, ">=");
$users = db::get("users");
// Query: SELECT * FROM `users` WHERE `id` >= 2;

/*
$users = array(
    array(
        "id" => 2,
        "name" => "Sam smith",
        "email" => "alex@smith.com"
    ),
    array(
        "id" => 5,
        "name" => "John",
        "email" => "John@some.com"
    )
);
*/
```

مثال 4

```php
db::where("id", array(2, 5), "IN");
$users = db::get("users");
// Query: SELECT * FROM `users` WHERE `id` IN (2, 5);

/*
$users = array(
    array(
        "id" => 2,
        "name" => "Sam smith",
        "email" => "alex@smith.com"
    ),
    array(
        "id" => 5,
        "name" => "John",
        "email" => "John@some.com"
    )
);
*/
```

### متد orWhere
این متد معادل متد `where` و مقدار `OR` در پارامتر چهارم است ..

    db::orWhere(column, value, operator);

مثال 1

```php
db::where("id", 1);
db::orWhere("name", "John");
$users = db::get("users");
// Query: SELECT * FROM `users` WHERE `id` = 1 OR `name` = "John";

/*
$users = array(
    array(
        "id" => 1,
        "name" => "Sam smith",
        "email" => "alex@smith.com"
    ),
    array(
        "id" => 5,
        "name" => "John",
        "email" => "John@some.com"
    )
);
*/
```

### متد insert
برای ذخیره اطلاعات در پایگاه داده استفاده میشود . پارامتر اول این متد نام جدول و در پارامتر دوم آرایه ای از اطلاعات را دریافت میکند . ایندکس های این آرایه نام های ستون جدول و مقدار آن ها، مقدار همان ستون خواهد بود .
نوع بازگشتی این متد در صورت درج مقدار ستون auto increment جدول و یا در صورت خطا مقدار false می باشد.

    db::insert(tablename, insertdata);

مثال 1

```php
$data = array(
    "name" => "Peter",
    "email" => "Peter@some.com"
);
$result = db::insert("users", $data);
// Query: INSERT INTO `users` (`name`, `email`) VALUES ("Petter", "Peter@some.com");

if (!$result) {
    echo "insert failed";
}
```

### متد update
از این متد برای تغییر مقادیر ستون و یا ستون های اطلاعات جدول پایگاه داده استفاده می شود . پارامتر اول این متد نام جدول، پارامتر دوم آرایه ای از مقادیر و در پارامتر سوم حداکثر تعداد ردیف هایی که اطلاعات آن ها تغییر میکند مشخص می شود .
نوع بازگشتی این متد در صورت درج اطلاعات `true` و در غیر این صورت `false` خواهد بود .

    db::update(tablename, updatedata, limit);

مثال 1

```php
db::where("id", 1);
$user = db::getOne("users", array("name"));
// Query: SELECT `name` FROM `users` WHERE `id` = 1;

/*
$user = array(
    "name" => "Sam smith",
);
*/
$data = array(
    "name" => "Peter"
);
db::where("id", 1);
$result = db::update("users", $data, null);
// Query: UPDATE `users` SET `name` = "Peter" WHERE `id` = 1;
if (!$result) {
    throw new \Exception("update Failed");
}
db::where("id", 1);
$user = db::getOne("users", array("name"));
// Query: SELECT `name` FROM `users` WHERE `id` = 1;
/*
$user = array(
    "name" => "Peter",
);
*/
```

### متد delete
این متد برای حذف  ردیف جدول استفاده میشود . پارامتر اول این متد نام جدول و پارامتر دوم حداکثر تعداد ردیف های حذف را دریافت میکند . در صورتی که قبل از این متد با استفاده از متد `where` شرطی گذاشته نشود ، تمامی ردیف های آن جدول حذف خواهند شد .
نوع بازگشتی این متد در صورت حذف ردیف `true` و در غیر این صورت `false` خواهد بود .

    db::delete(tablename, limit);

مثال 1

```php
db::where("id", 1);
$result = db::delete("users");
// Query: DELETE FROM `users` WHERE `id` = 1;
if ($result) {
    echo "successfully deleted";
}
```

### متد orderBy
از این متد برای چینش ردیف های گرفته شده از پایگاه داده استفاده میشود . این متد در پارامتر اول نام ستون و در پارامتر دوم نوع چینش صعودی و یا نزولی ردیف ها را دریافت می کند .

	db::orderBy(orderByField, orderbyDirection);

مثال 1
```php
db::orderBy("id", "DESC");
$users = db::get("users");
// Query: SELECT * FROM `users` ORDER BY `id` DESC;
/*
$users = array(
	array(
        "id" => 5,
        "name" => "John",
        "email" => "John@some.com"
    ),
    array(
        "id" => 1,
        "name" => "Sam smith",
        "email" => "alex@smith.com"
    )
);
*/
```

مثال 2
```php
db::orderBy("name", "ASC");
$users = db::get("users", null, array("name"));
// Query: SELECT `name` FROM `users` ORDER BY `name` ASC;
/*
$users = array(
	array(
        "name" => "John",
    ),
    array(
        "name" => "Sam smith",
    )
);
*/
```

### متد groupBy
از این متد برای یکسان سازی اطلاعات دریافتی از پایگاه داده استفاده میشود(حذف ردیف های با مقدار های تکراری در ستون مشخص شده). در تنها پارامتر این متد نام ستون دریافت می شود .

	db::groupBy(groupByField);

مثال 1
```php
$users = db::get("users", null, array("name"));
// Query: SELECT `name` FROM `users`;
/*
$users = array(
	array(
        "name" => "Sam smith",
    ),
    array(
        "name" => "Sam smith",
    )
);
*/

db::groupBy("name");
$users = db::get("users", null, array("name"));
// Query: SELECT `name` FROM `users` GROUP BY `name`;
/*
$users = array(
	array(
        "name" => "Sam smith",
    )
);
*/
```

### متد has
از این متد برای بررسی وجود و یا عدم وجود اطلاعات در پایگاه داده استفاده می شود . این متد در پارامتر خود نام جدول را دریافت میکند .
خروجی این متد در صورت یافتن ردیفی با شرایطی که قبل از آن تعریف شده باشد ، `true` و در غیر اینصورت `false` خواهد بود .

	db::has(tableName);

مثال 1
```php
db::where("email", "John@some.com");
$has = db::has("users");
if ($has) {
	return "the email address already taken";
}
```

### متد join
با استفاده از این متد میتوانید دو جدول از پایگاه داده را به یکدیگر متصل کنید . پارامتر اول این متد نام جدولی که قصد متصل کردن آن را دارید و در پارامتر دوم شرط اتصال و در پارامتر سوم، نوع اتصال را وارد میکنید .

    db::join(jointable, joincondition, jointype);

```php
db::join("users u", "p.tenantID=u.tenantID", "LEFT");
db::where("u.id", 6);
$products = db::get ("products p", null, array("u.name", "p.productName"));
// Query: SELECT `u`.`name`, `p`.`productNumber` FROM `products` AS `p` LEFT JOIN `users` `u` ON `p`.`tenantID` = `u`.`tenantID` WHERE `u`.`id` = 6;

```

#### متد joinWhere
اتصال دو جدول از پایگاه داده با شرط مشخص شده .

```php
db::join("users u", "p.tenantID=u.tenantID", "LEFT");
db::joinWhere("users u", "u.tenantID", 5);
$products = db::get ("products p", null, "u.name, p.productName");
// Query: SELECT `u`.`name`, `p`.`productNumber` FROM `products` AS `p` LEFT JOIN `users` `u` ON `p`.`tenantID` = `u`.`tenantID` AND `u`.`tenantID` = 5;
```

#### متد joinOrWhere
اتصال دو جدول از پایگاه داده با شرط مشخص شده در صورتی که وجود داشته باشد .

```php
db::join("users u", "p.tenantID=u.tenantID", "LEFT");
db::joinOrWhere("users u", "u.tenantID", 5);
$products = db::get ("products p", null, "u.name, p.productName");
// Query: SELECT `u`.`name`, `p`.`productNumber` FROM `products` AS `p` LEFT JOIN `users` `u` ON `p`.`tenantID` = `u`.`tenantID` OR `u`.`tenantID` = 5;
```

### متد getLastQuery
با استفاده از این متد میتوانید آخرین درخواست ارسال شده به سمت پایگاه داده را مشاهده کنید .

	db::getLastQuery();

```php
db::get("users");
echo db::getLastQuery();
// Query: SELECT * FROM `users`;
```

### متد getLastError
آخرین خطای دریافت شده از پایگاه داده را نشان خواهد داد .

	db::getLastError();


### متد getLastErrno
کد آخرین خطای دریافت شده از پایگاه داده را نشان خواهد داد .

	db::getLastErrno();


