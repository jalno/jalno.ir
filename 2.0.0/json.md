# json
برای تبدیل آرایه به رشته میتوانید از متد های `packages\base\json`  استفاده کنید . دو تابع  که یکی برای تبدیل آرایه به رشته و دیگری برای تبدیل رشته json به آرایه استفاده میشود .
متد ها را میتوانید بدون هیچ نگرانی در هم ریختگی برای آرایه و یا رشته های زبان فارسی استفاده کنید .

## تبدیل آرایه به رشته
برای تبدیل یک آرایه به رشته (برای امور مختلف مانند ذخیره در پایگاه داده) باید از تابع `encode` استفاده کنید . این تابع در پارامتر خود یک مقدار از هر جنسی دریافت میکند و خروجی آن یک رشته خواهد بود .

	json\encode(input);

### ثابت `JSON_PRETTY_PRINT`
یک مقدار ثابت در زبان php است که میتوانید این مقدار را در پارامتر دوم تابع `encode` استفاده کنید . با تنظیم این ثابت، خروجی رشته به صورت مرتب شده خواهد بود .

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

## تبدیل رشته json به آرایه
برای تبدیل یک رشته (که باید حتما این رشته از نوع json باشد) باید از متد `decode` استفاده کنید . این متد در پارامتر اول یک رشته دریافت میکند . در صورتی که مقدار دوم این تابع را برابر `true` قرار دهید، خروجی تابع یک آرایه و در غیر اینصورت یک شئ خواهد بود .

	json\decode(string);

**مثال 1**
```php
<?php
namespace packages\packagename\controllers;
use packages\base\{Controller, Json};

class Test extends Controller {
    
    public function encodeArray(){

        $array = array(
            "name" => "jalno",
            "company" => "جی سرور",
            "domain" => "https://www.jalno.ir"
        );

        try {
            echo json\encode($array);
            echo json\encode($array, JSON_PRETTY_PRINT);
    
            /* output
                {"name":"jalno","company":"جی سرور","domain":"https:\/\/www.jalno.ir"}
    
                {
                    "name": "jalno",
                    "company": "جی سرور",
                    "domain": "https:\/\/www.jalno.ir"
                }
            */
        }catch(Json\JsonException $e) {
            echo "JsonException: {$e->getMessage()}";
        }
    }
}
```

**مثال 2**
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
        }
    }
}
```

## استثنا JsonException
زمان کار با کلاس Json ممکن است داده‌ای که برای encode\decode داده می‌شود باعث بروز خطا شود در اینصورت استثنا از جنس `packages\base\json\JsonException` پرتاب می‌شود. 

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
        }catch(Json\JsonException $e) {
            echo "JsonException: {$e->getMessage()}";
        }

        $question = new Model();
        $question->question = $inputs['question'];
        $question->options = $options;
        $question->save();

		$this->response->setStatus(true);
		return $this->response;
	}
}
```