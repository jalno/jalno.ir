# json
برای تبدیل آرایه به رشته میتوانید از متد های `packages\base\json`  استفاده کنید . دو تابع  که یکی برای تبدیل آرایه به رشته و دیگری برای تبدیل رشته json به آرایه استفاده میشود .
متد ها را میتوانید بدون هیچ نگرانی در هم ریختگی برای آرایه و یا رشته های زبان فارسی استفاده کنید .

## تبدیل آرایه به رشته {#encode}
برای تبدیل یک آرایه به رشته (برای امور مختلف مانند ذخیره در پایگاه داده) باید از تابع `encode` استفاده کنید . این تابع در آرگومان اول یک مقدار از هر جنسی دریافت میکند و در آرگومان دوم ثابت‌های مربوط به json_encode که در php تعریف شده است را دریافت میکند. (آرگومان دوم اختیاری‌است.) خروجی این متد یک رشته خواهد بود.

```php
json\encode($input, $option);
```

**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Json};

class Test extends Controller {
    
    public function encodeArray(){

        $array = array("a" => 1, "b" => 2, "c" => 3, "d" => 4, "e" => 5);
        try {
            echo json\encode($array);
            echo json\encode($array, JSON_PRETTY_PRINT);
            /* output
                {"a":1,"b":2,"c":3,"d":4,"e":5}
                {
                    "a": 1,
                    "b": 2,
                    "c": 3,
                    "d": 4,
                    "e": 5
                }
            */
        }catch(Json\JsonException $e) {
            echo "JsonException: {$e->getMessage()}";
        }
    }
}
```

## تبدیل رشته json به آرایه {#decode}
برای تبدیل یک رشته (که باید حتما این رشته از نوع json باشد) باید از متد `decode` استفاده کنید . این متد در پارامتر اول یک رشته دریافت میکند . در صورتی که مقدار دوم این تابع را برابر `true` قرار دهید، خروجی تابع یک آرایه و در غیر اینصورت یک شئ خواهد بود .

```php
json\decode(string);
```

**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Json};

class Test extends Controller {
    
    public function decodeJson(){

		$json = {"a":1, "b":2, "c":3, "d":4, "e":5};

        try {
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
        }catch(Json\JsonException $e) {
            echo "JsonException: {$e->getMessage()}";
        }
    }
}
```

## استثنا JsonException {#json_exception}
زمان کار با کلاس Json ممکن است عملیات encode\decode کردن داده بدرستی انجام نشود (ممکن است ورودی اشتباه بوده و یا گاها روند عملیات بدرستی پیش نرود) و باعث بروز خطا شود؛ در اینصورت استثنا از جنس packages\base\json\JsonException پرتاب می‌شود.

فراخوانی متد `getMessage()` روی شئ JsonException علت خطای بوجود آماده را برمیگرداند.

**مثال**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Json};
use packages\packagename\Question as Model;

class Questions extends Controller {
    
    public function insert(){

		$inputRules = [
			'question' => [
				'type' => 'string'
			],
			'options' => []
		];

		$this->response->setStatus(false);
		$inputs = $this->checkinputs($inputRules);
		
        $options = [];
        try {
            foreach($inputs['options'] as $key => $row){
                $options[] = [	
                    'label' => $row,
                    'value' => $key	
                ];
            }   
            $options = Json\encode($option);

            $question = new Model();
            $question->question = $inputs['question'];
            $question->options = $options;
            $question->save();
            $this->response->setStatus(true);

        }catch(Json\JsonException $e) {
            echo "JsonException: {$e->getMessage()}";
        }

        return $this->response;
	}
}
```