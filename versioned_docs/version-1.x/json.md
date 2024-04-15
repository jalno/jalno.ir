
# json
برای تبدیل آرایه به رشته میتوانید از متد های `packages\base\json`  استفاده کنید . دو تابع  که یکی برای تبدیل آرایه به رشته و دیگری برای تبدیل رشته json به آرایه استفاده میشود .
متد ها را میتوانید بدون هیچ نگرانی در هم ریختگی برای آرایه و یا رشته های زبان فارسی استفاده کنید .

## تبدیل آرایه به رشته
برای تبدیل یک آرایه به رشته (برای امور مختلف مانند ذخیره در پایگاه داده) باید از تابع `encode` استفاده کنید . این تابع در پارامتر خود یک مقدار از هر جنسی دریافت میکند و خروجی آن یک رشته خواهد بود .

	json\encode(input);

### ثابت `JSON_PRETTY_PRINT`
یک مقدار ثابت در زبان php است که میتوانید این مقدار را در پارامتر دوم تابع `encode` استفاده کنید . با تنظیم این ثابت، خروجی رشته به صورت مرتب شده خواهد بود .

مثال
```php
$array = array("a"=>1,"b"=>2,"c"=>3,"d"=>4,"e"=>5);
echo json\encode($array);
echo json\encode($array, JSON_PRETTY_PRINT);
/*
{"a":1,"b":2,"c":3,"d":4,"e":5}
{
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4,
    "e": 5
}
\*/
```

## تبدیل رشته
برای تبدیل یک رشته (که باید حتما این رشته از نوع json باشد) باید از متد `decode` استفاده کنید . این متد در پارامتر اول یک رشته دریافت میکند . در صورتی که مقدار دوم این تابع را برابر `true` قرار دهید، خروجی تابع یک آرایه و در غیر اینصورت یک شئ خواهد بود .

	json\decode(string);

مثال 1
```php
$array = array(
	"name" => "jalno",
	"company" => "جی سرور",
	"domain" => "https://www.jeyserver.com"
);
echo json\encode($array);
echo json\encode($array, JSON_PRETTY_PRINT);
/* output

{"name":"jalno","company":"جی سرور","domain":"https:\/\/www.jeyserver.com"}

{
    "name": "jalno",
    "company": "جی سرور",
    "domain": "https:\/\/www.jeyserver.com"
}

*/
```
مثال 2
```php
$json = {"a":1,"b":2,"c":3,"d":4,"e":5};

var_dump(json\decode($json));
var_dump(json\decode($json, true));

/* output
object(stdClass)#1 (5) {
    ["a"] => int(1)
    ["b"] => int(2)
    ["c"] => int(3)
    ["d"] => int(4)
    ["e"] => int(5)
}

array(5) {
    ["a"] => int(1)
    ["b"] => int(2)
    ["c"] => int(3)
    ["d"] => int(4)
    ["e"] => int(5)
}
*/
```
