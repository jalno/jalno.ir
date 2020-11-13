# تصاویر

جالنو کلاس `packages\base\Image` را برای مدیریت تصاویر در اختیار توسعه دهندگان قرار داده است. برخی از متدهای این کلاس بصورت abstract یا مجرد ایجاد شده‌اند و بنابراین برنامه نویس قادر به فراخوانی آن‌ها بصورت مستقیم از این کلاس نمی‌باشد. در حال حاضر کلاس `packages\base\Image\GD` از کلاس Image مشتق شده است.

در فرمورک برای فرمت‌های تصویر JPEG، GIF، PNG، WEBP بصورت مجزا کلاس ایجاد شده است و تمامی کلاس ها که در ادامه بیان می‌شود از کلاس GD ارث بری میکنند. 

|  کلاس |               فرمت تصویر  |
|---------------------------|------|
| packages\base\Image\GIF   | GIF  |
| packages\base\Image\JPEG  | JPEG |
| packages\base\Image\PNG   | PNG  |
| packages\base\Image\WEBP  | WEBP |


## [ایجاد شئ](#object)
یک شئ‌ از کلاس Image میتواند برای ایجاد تصویر جدید و یا تغییرات تصویر موجود مورد استفاده قرار گیرد که برای هر یک از موارد مقدار دهی آرگومان های متد سازنده متفاوت میباشد. 

### ایجاد تصویر جدید
زمانی که قصد ایجاد تصویر جدید را دارید، شئ از کلاس فرمتی که برای تصویر در نظر دارید ایجاد میکنید. 
متد سازنده سه آرگومان ورودی میگیرد. 
آرگومان اول عرض تصویر،‌آرگومان دوم ارتفاع و آگومان سوم رنگ زمینه تصویر میباشد
که آرگومان سوم باید از جنس کلاس [Color](#color) باشد.

**توجه :** ابعاد تصویر برحسب px میباشند.

در مثال های زیر تصویری با عرض 200px و ارتفاع 150px و رنگ زمینه مشکی در فرمت مشخص شده ایجاد می‌شود.


```php
use packages\base\Image;

// ایجاد تصویر با فرمت JPEG
$image = new Image\JPEG(200, 150, Image\Color::fromRGB(0, 0, 0));

// ایجاد تصویر با فرمت PNG
$image = new Image\PNG(200, 150, Image\Color::fromRGB(0, 0, 0));

// ایجاد تصویر با فرمت GIF
$image = new Image\GIF(200, 150, Image\Color::fromRGB(0, 0, 0));

// ایجاد تصویر با فرمت WEBP
$image = new Image\WEBP(200, 150, Image\Color::fromRGB(0, 0, 0));
```

### فایل یا تصویر موجود
زمانی که قصد کار روی تصویر موجودی را دارید، شئ از کلاس فرمت تصویر ایجاد میکنید. متد سازنده یک آرگومان ورودی میگیرد که شئ از کلاس [file](file.md) و یا کلاس Image میباشد.

**توجه :** فایل معرفی شده حتما باید وجود داشته باشد درصورتی که فایل موجود نباشد استثنا از جنس NotFoundException پرتاب می‌شود.

**توجه :** اگر شئ ایجاد شده از کلاس فایل مربوط به (بطور مثال) تصویری با فرمت jpeg باشد اما شئ‌ از کلاس Image\PNG ایجاد شود warning دریافت میکنید.

مثال از کد **خطا**
```php
use packages\base\Image;


$file = new File\Local("packages/my_package/storage/images/image.jpg");
$image = new Image\PNG($file);
```

**خروجی**
````
Warning: imagecreatefrompng(): 'packages/my_package/storage/images/image.jpg' is not a valid PNG file 
````

مثال از کد **صحیح**
```php
use packages\base\Image;


$image = new Image\JPEG(new File\Local("packages/my_package/storage/images/image.jpeg"));


$image = new Image\PNG(new File\Local("packages/my_package/storage/images/image.png"));


$image = new Image\GIF(new File\Local("packages/my_package/storage/images/image.gif"));


$image = new Image\WEBP(new File\Local("packages/my_package/storage/images/image.webp"));
```



## [متدها](#methods)
برای کار با تصاویر متدهای زیر ایجاد شده است که در تمامی کلاس های فوق  میتوانید آن‌ها را فراخوانی کنید.


|  متد |                کاربرد  |
|---------------------------|------|
| saveToFile(File $file, int $quality)  | ذخیره تصویر در مکان مشخص |
| save(int $quality)  | ذخیره تصویر |
| getFile()   | شئ از کلاس File برمیگرداند  |
| getWidth()  |   خواندن عرض تصویر|
| getHeight()  |  خواندن ارتفاع تصویر|
| getExtension  |  خواندن فرمت تصویر|
| resize(int $width, int $height)  |  تغییر ابعاد تصویر|
| resizeToHeight(int $height)  | تغییر ارتفاع تصویر |
| resizeToWidth(int $width)  | تغییر عرض تصویر |
| scale(int $scale)  | زوم تصویر |
| colorAt(int $x, int $y)  | خواندن رنگ پیکسل مشخصی از تصویر |
| setColorAt  | رنگ کردن پیکسل مشخص  |
| paste(Image $image, int $x, int $y)  | جایگذاری در بخشی از تصویر |
| copy(int $x, int $y, int $width, $height)  | کپی کردن قسمتی از تصویر |
| rotate(float $angle, Image\Color $bg)  | چرخش تصویر |
| fromFormat(File $file)   |  تبدیل شئ فایل به شئ کلاس تصویر |
| fromContent(File $file)  | تبدیل شئ فایل به شئ کلاس تصویر |


## [ذخیره تصویر](#save_image)
اطلاعاتی که از سمت کاربر ارسال می‌شود میتواند تصویر باشد برای ذخیره تصویر دریافتی نیز باید از متدهای کلاس image استفاده کنید. 

متدهای `saveToFile` و `save` برای ذخیره تصاویر استفاده میشود. 

متد `save` برای ذخیره تصویری که وجود دارد استفاده می‌شود و تغییرات را در همان تصویر قبلی ذخیره میکند. متد save آرگومان ورودی ندارد.

متد `saveToFile` تصویر را در مکان جدیدی ذخیره میکند. آرگومان ورودی شئ از کلاس [File](file.md) میباشد.

**توجه** اگر شئ فایل، آدرس فایلی باشد که موجود است فایل جدید **جایگزین** فایل قبلی میشود.

**مثال**
```php
<?php
namespace packages\my_package\controllers;
use packages\base\{Image, IO\File, Packages};
use packages\my_package\User;

class profile extends controller{

    function update($data) {
        $inputs = array(
			'name' => array(
				'type' => 'string'
			),
			'lastname' => array(
				'type' => 'string'
            ),
            'avatar' => array(
				'optional' => true,
				'type' => 'image'
            )
        );

        $formdata = $this->checkinputs($inputs);
        
        if (isset($formdata['avatar'])) {

            $tmpfile = new file\tmp();  // ایجاد فایل موقت
            $formdata['avatar']->resize(200, 200)->saveToFile($tmpfile);    
            
            $formdata['avatar'] = 'storage/public_avatar/' . $tmpfile->md5() . '.' . $formdata['avatar']->getExtension();
            
            $avatar = new file\Local(Packages::package('my_package')->getFilePath($formdata['avatar']));
			$directory = $avatar->getDirectory();
			if (!$directory->exists()) {
				$directory->make(true);
			}
			$tmpfile->copyTo($avatar);
        }
        
        return $this->response;
    }
}
```

در مثال فوق فیلد avatar که از نوع تصویر مشخص شده است، بعد از اعتبارسنجی   ($formdata['avatar'])  شي از جنس کلاس Image میباشد.

تصویر دریافتی را با متد `resize` به ابعاد 200px * 200px تغییر اندازه میدهیم و با متد `saveToFile` در فایل موقت ($tmpfile) ذخیره میکنیم.

سپس در $formdata['avatar'] آدرس محل ذخیره تصویر را به همراه نام آن ایجاد میکنیم.
 با استفاده از $tmpfile->md5 براساس هش md5 نام جدید و یکتا برای تصویر ایجاد میکنیم، و با استفاده از $formdata['avatar']->getExtension() فرمت تصویر را مشخص میکنیم. 

سپس در $avatar شئ‌از کلاس File برای فایل جدید ایجاد میکنیم.
و در نهایت فایل موقت (که تصویر ارسالی کاربر در آن ذخیره شده است ) را آدرسی که برای آن ایجاد کرده‌ایم ($avatar) ذخیره میکنیم.


## [ترسیم تصویر](#set_color_at) 
با استفاده از متد `setColorAt` میتوانید تصویری را ترسیم کنید. 
نحوه ی کار متد به اینصورت است که موقعیت پیکسل را گرفته و مصابق رنگ تعیین شده آن پیکسل را رنگ میکند. در واقع برای ترستم تصویر لازم است پیکسل به پیکسل پیش برویم. 

متد setColorAt سه آرگومان ورودی میگیرد، آرگومان اول موقعیت پیکسل در محور x و آرگومان دوم موقعیت پیکسل در محور y میباشد; و در آرگومان سوم رنگ مورد نظر را میگیرد که از جنس کلاس [Color](#color) می‌باشد.

در مثال زیر قصد ترسیم یک ضربدر در وسط تصویر داریم.

**1 مثال**
```php
<?php
namespace packages\my_package\controllers;
use packages\base\{Image, IO\File, Packages};
use packages\my_package\User;

class Drawing extends controller{

    function closeSign() {
        
        $image = new Image\PNG(100, 100 , Image\Color::fromRGB(255, 255, 255));

        $yellow = Image\Color::fromRGB(248, 195, 13);

        for ($i = 1; $i < 100; $i++) {
            $image->setColorAt( $i, $i, $yellow);
            $image->setColorAt( $i, 100-$i, $yellow);
        }

        $image->saveToFile(new File\Local("packages/my_package/images/closeSign.png"));
    }
}
```
در مثال فوق ابتدا یک تصویر با فرمت png و ابعاد 100px * 100px ایجاد میکنیم. 
سپس در حلقه  for موقعیت پیکسل ها را مشخص میکنیم. 
بطور مثال زمانی که $i = 4 است.

$image->setColorAt( 4, 96, $yellow) : پیکسلی که x آن برابر 4 و y آن برابر 96 باشد، رنگ آن زرد می‌شود. 

تصویر ایجاد شده در کد فوق بصورت زیر می‌باشد.

![closeSign](../images/closeSign.png)


### خواندن رنگ پیکسل 
همچنین متد `colorAt` رنگ پیکسل را مشخص شده را برمیگرداند. 
خروجی این متد از جنس کلاس [Color](#color) می‌باشد.

متد colorAt دو آرگومان ورودی میگیرد که آرگومان اول موقعیت پیکسل روی محور x و آرگومان دوم موقعیت پیکسل روی محور y میباشد.


**مثال 2**
```php
$image = new Image\PNG(new File\Local("packages/my_package/images/closeSign.png");

$color = $image->colorAt(4, 96);
/**
 * $color :
 * packages\base\Image\Color Object
    (
        [r:packages\base\Image\Color:private] => 248
        [g:packages\base\Image\Color:private] => 195
        [b:packages\base\Image\Color:private] => 13
        [a:packages\base\Image\Color:private] => 1
    )
    */
```
اگر تصویر $image را تصویر ایجاد شده در مثال 1 در نظر بگیریم در متغیر $color شئ از کلاس Color ذخیره می‌شود.


## [کپی کردن قسمتی از یک تصویر](#copy)
با استفاده از متد `copy` میتوانید قسمتی از یک تصویر را کپی کنید.
برای مشخص کردن قسمتی که قصد کپی کردن آن را دارید، باید مختصات یک پیکسل را مشخص کنید و عرض و ارتفاع برای آن مشخص کنید.
متد copy چهار آرگومان ورودی میگیرد. آرگومان اول موقعیت پیکسل روی محور x ، آرگومان دوم موقعیت پیکسل روی محور y ، در آرگومان سوم عرض و آرگومان چهارم ارتفاع آن قسمت می‌باشد.

با فراخوانی متد`paste` میتوانید تصویری را در تصویر دیگی جایگذاری کنید. 
متد paste چهار آرگومان ورودی میگیرد. آرگومان اول تصویری که قصد دارید آن را جایگذاری کنید، آرگومان دوم موقعیت پیکسل جایگذاری روی محور x و آرگومان سوم موقعیت پیکسل جایگذاری روی محور y میباشد. آرگومان چهارم درصد شفافیت تصویر را مشخص میکند که عددی بین 0 و 1 میباشد.

**توجه :** درصد شفافیت تصویر تنها برای تصاویر با فرمت png در نظر گرفته میشود برای سایر فرمت ها همواره 1 در نظر گرفته میشود.

**مثال**
```php
<?php
namespace packages\my_package\controllers;
use packages\base\{Image, IO\File, Packages};
use packages\my_package\User;

class Drawing extends controller{

    function square() {
        
        $image = new Image\JPEG(200, 200 , Image\Color::fromRGB(255, 255, 255));

        $red = Image\Color::fromRGB(255, 0, 0);

        for ($i = 51; $i < 151; $i++) {
            for ($j=51; $j < 151; $j++) { 
                $image->setColorAt( $i, $j, $red);
            }
        }

        $image->saveToFile(new File\Local("packages/my_package/images/square.png"));

        $partOfImage = $image->copy(51, 51, 100, 50);
        
        $new = new Image\PNG(200, 200 , Image\Color::fromRGB(0, 0, 0));
        $new->paste($partOfImage, 50, 50, 0.5);
        $new->saveToFile(new File\Local("packages/my_package/images/new_square.png"));
    }
}
```
در مثال فوق تصویر یک مربع به رنگ قرمز با ابعاد 100px * 100px در وسط یک عکس ایجاد شده است.

سپس با فراخوانی متد copy قسمت بالایی مربع به شکل مستطیلی با ابعاد 100px * 50px کپی شده است.
تصویر جدیدی با رنگ زمینه مشکی ایجاد شده و مستطیل کپی شده، از پیکسل با مختصات (50,50) و با درصد شفافیت 0.5 جایگذاری میشود.

تصاویر ایجاد شده بصورت زیر میباشند.

![square](../images/square.png)
![square](../images/new_square.png)

## [تغییر اندازه](#resize)
برای تغییر اندازه تصویر متد `resize` ایجاد شده است. دو آرگومان ورودی میگیرد که آرگومان اول اندازه عرض و آرگومان دوم ارتفاع میباشد. 

همچنین متدهای `resizeToHeight` و `resizeToWidth` برای تغییر اندازه مجزا ابعاد ایجاد شده است.

**توجه :** برای ذخیره تصاویری که متد resize و resizeToHeight و resizeToWidth روی آن فراخوانی شده است باید از متد `saveToFile` استفاده شود. نمیتوانید متد `save` را برای آن فراخوانی کنید.

**مثال**
```php
<?php
namespace packages\my_package\controllers;
use packages\base\{Image, IO\File, Packages};
use packages\my_package\User;

class Picture extends controller {

    function resizePic() {
        
        $image = new Image\JPEG(new File\Local("packages/my_package/img.jpeg"));
        $image->resize(150, 150)->saveToFile(new File\Local("packages/my_package/newImg.jpeg"));
    }

    function resizeHeight () {
        
        $image = new Image\JPEG(new File\Local("packages/my_package/img.jpeg"));
        $image->resizeToHeight(200)->saveToFile(new File\Local("packages/my_package/newImg.jpeg"));
    }

    function resizeWidth () {
        
        $image = new Image\JPEG(new File\Local("packages/my_package/img.jpeg"));
        $image->resizeToWidth(250)->saveToFile(new File\Local("packages/my_package/newImg.jpeg"));
    }
}
```

## [زوم کردن تصویر](#scale)
گاها لازم است تصویر زوم شده و ذخیره شود برای این منظور متد `scale` ایجاد شده است. 
ورودی متد scale عدد صحیح از درصد زوم شدن عکس میباشد. 

**توجه :** برای ذخیره تصاویری که متد scale روی آن فراخوانی شده است باید از متد `saveToFile` استفاده شود. نمیتوانید متد `save` را برای آن فراخوانی کنید.

**مثال**
```php
<?php
namespace packages\my_package\controllers;
use packages\base\{Image, IO\File, Packages};
use packages\my_package\User;

class Picture extends controller{

    function scale() {
        $image = new Image\JPEG(new File\Local("packages/my_package/images/image.jpeg"));

        $image->scale(5)->saveToFile(new File\Local("packages/my_package/images/newImage.jpeg"));
        
    }
}
```
در مثال فوق تصویر به اندازه 5٪ اندازه اولیه تغییر پیدا میکند. 

**توجه :** اگر بخواهید اندازه تصویر دوبرابر شود باید به متد scale عدد 200 داده شود.


## [چرخش تصویر](#rotate)
در کلاس  Image برای چرخش تصویر متد `rotate` ایجاد شده است. 
این متد دو آرگومان ورودی میگیرد که در آرگومان اول زاویه چرخش و در آرگومان دوم رنگ زمینه برای تصویر جدید می‌باشد.

**توجه :** برای ذخیره تصاویری که متد rotate روی آن فراخوانی شده است باید از متد `saveToFile` استفاده شود. نمیتوانید متد `save` را برای آن فراخوانی کنید.

**مثال**
```php
<?php
namespace packages\my_package\controllers;
use packages\base\{Image, IO\File, Packages};
use packages\my_package\User;

class Picture extends controller{

    function rotate() {
        $image = new Image\PNG(new File\Local("packages/my_package/images/phpLogo.png"));
        $image->rotate(180, Image\Color::fromRGB(0,0,0,))->saveToFile(new File\Local("packages/my_package/images/newPhpLogo.png"));
        
    }
}
```

تصویر ایجاد شده در کد فوق بصورت زیر می‌باشد.

![phpLogo](../images/phpLogo.png)
![newPhpLogo](../images/newPhpLogo.png)

## [تبدیل شئ فایل به شئ کلاس تصویر](#convert_file_to_image)
گاها لازم است تصویری که شئ از جنس کلاس [File](file.md) است به شئ از کلاس Image تبدیل شود; برای این منظور دو متد `fromFormat` و `fromContent` ایجاد شده است. 

آرگومان ورودی هر دو متد شئ از کلاس File میباشد. تفاوت متدها در نوع شناسایی فرمت تصویر میباشد. 

متد `fromFormat` فرمت تصویر را با توجه به فرمت فایل معرفی شده شناسایی میکند. 

متد `fromContent` فرمت تصویر را با توجه به محتوای فایل معرفی شده شناسایی میکند. 

**مثال**
```php
use packages\base\Image;

$image = Image::fromContent(new File\Local("packages/my_package/images/img.png"));

// or 

$image = Image::fromFormat(new File\Local("packages/my_package/images/img.png"));

/**
 * packages\base\Image\PNG Object
    (
        [image:protected] => Resource id #1180
        [file:protected] => packages\base\IO\file\local Object
            (
                [directory] => packages/my_package/images
                [basename] => img.png
            )

    )
    */
```