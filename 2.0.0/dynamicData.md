# داده‌های پویا
در برنامه همواره لازم است داده و یا اطلاعات پایه ای وب سایت در سمت قالب و توسط `جاوااسکریپت` استفاده شوند. مانند تنظیماتی که در Options انجام شده و یا اطلاعاتی که باید در این صفحه استفاده شوند و ... . فرمورک این اطلاعات را بصورت خودکار از پکیج های مختلف جمع آوری کرده به اطلاعات قابل خواندن توسط جاوااسکریپت تبدیل و قبل از بارگذاری فایل های اصلی در صفحه قرار میدهد. 

 برای ذخیره و مدیریت این دسته از اطلاعات در فرمورک کلاس `packages\base\frontend\events\ThrowDynamicData` ایجاد شده است. 

برای سهولت در دسترسی به کلاس `ThrowDynamicData`  در کلاس `packages\base\View` متد `dynamicData()` ایجاد شده است که به راحتی با فراخوانی این متد روی شئ کلاس View به کلاس ThrowDynamicData دسترسی خواهید داشت.

__برای اطلاعات بیشتر از ظاهر به صفحه [ظاهر View](view.md) مراجعه کنید.__

## [تنظیمات](#options)
__برای اطلاعات بیشتر از تنظیمات به صفحه [تنظیمات و پیکربندی](options.md) مراجعه کنید.__

تنظیمات اصلی سایت از جمله تنظیمات مربوط به زبان سایت مانند زبان اصلی، نوع قرار گیری زبان در آدرس و اطلاعات پایه سایت مانند اینکه سایت با www باز میشود و یا بدون آن را در صفحه و در متغیر جاوااسکریپتی `var options` قرار میدهد. از این پارامتر ها میتوان در تولید آدرس ها توسط جاوااسکریپت استفاده کرد.

**توجه :** تنظیماتی که به صورت خودکار توسط فرمورک اضافه شده با کلید های  packages.base.translator.defaultlang ، packages.base.translator.changelang ، packages.base.translator.changelang.type ، packages.base.routing.www
هستند.

میتوانید تنظیمات دیگر و یا حتی تنظیماتی که جدید اضافه کردید را نیز اضافه کنید تا در هنگام باز شدن صفحه قرار بگیرند.
در کلاس ThrowDynamicData با استفاده از متد‌های زیر میتوانید تنظیمات نمایش داده شده را مدیریت کنید.

### [تعریف تنظیم](#set_option)
با استفاده از متد `setOption` میتوانید تنظیمات جدیدی که اضافه کرده‌اید در صفحه اضافه کرده و از آن استفاده کنید. ورودی این متد نام تنظیم است.

**مثال**
```php
<?php
namespace themes\themename\views\packagename\posts;

use packages\base\{Options, views\Form};

class Prioritize extends Form {

    private $hasAccessToDelete = false;

    public function __beforeLoad() {
        
        $this->setTitle(t("posts.prioritize"));
        $this->addBodyClass("posts-prioritize");

        Options::set("packages.packagename.has_access_to_delete_service", $this->hasAccessToDelete);
        $this->dynamicData()->setOption("packages.packagename.has_access_to_delete_service");
    }

    public function hasAccessToDelete(bool $permission) {
        $this->hasAccessToDelete = $permission;
    }
}
```
خروجی کد فوق در صفحه html بصورت زیر میباشد
```html
<script>
var options = {"packages.base.translator.defaultlang":"fa_IR","packages.base.translator.changelang":"uri","packages.base.translator.changelang.type":"short","packages.base.routing.www":"nowww","packages.packagename.has_access_to_delete_service":false};var translator = {"lang":"fa_IR"};
</script>
```

### [بررسی تنظیم](#has_option)
 با فراخوانی متد `hasOption` میتوانید وجود یا عدم وجود تنظیمات ذخیره شده را بررسی کنید. خروجی متد boolean میباشد. 
با فراخوانی متد `getData` با ورودی `options` میتوانید به تمامی options های ذخیره شده در این کلاس (بصورت آرایه) دسترسی داشته باشید. 

**مثال**
```php
<?php
namespace themes\themename\views\packagename\posts;

use packages\base\{Options, views\Form};

class Prioritize extends Form {

    public function __beforeLoad() {
        
        $this->setTitle(t("posts.prioritize"));
        $this->addBodyClass("posts-prioritize");

        Options::load("packages.packagename.has_access_to_delete_service");

        $dynamicData = $this->dynamicData();

        if (!$dynamicData->hasOption("packages.packagename.has_access_to_delete_service")) {
            $dynamicData->setOption("packages.packagename.has_access_to_delete_service");
        }
    }
}
```
در مثال فوق تنظیم ذخیره شده با متد load در از پایگاه داده دریافت شده و سپس با متد hasOption بررسی می‌شود اگر این تنظیم در این رویداد اضافه نشده است، با فراخوانی متد setOption اضافه می‌شود.

### [حذف تنظیم](#delete_option)
با فراخوانی متد `deleteOption` میتوانید تنظیم اضافه شده را حذف کنید. آرگومان ورودی متد نام تنظیم میباشد.


**مثال**
```php
<?php
namespace themes\themename\views;

use packages\base\{Options, views\Form};

class Prioritize extends Form {

    public function __beforeLoad() {
        
        $this->setTitle(t("posts.prioritize"));
        $this->addBodyClass("posts-prioritize");
        
        $this->dynamicData()->deleteOption("packages.base.translator.defaultlang");
    }
}
```
### [تعریف داده](#set_data) 
متد `setData` برای تعریف اطلاعات، ایجاد شده است. 
این متد دو آرگومان ورودی میگیرد که در آرگومان اول یک رشته برای کلید داده و در آرگومان دوم مقدار داده مقداردهی می‌شود.

**مثال**
```php
<?php
namespace themes\themename\views;
use packages\base\{Options, views\Form};

class Edit extends Form {

	function __beforeLoad() {
		$this->setTitle(array(
			t("settings"),
			t("usertype.edit")
		));
        $this->addBodyClass("edit-usertype");
        
		$this->dynamicData()->setData("permissions", $this->buildPermissionsArray());
    }

    protected function buildPermissionsArray(): array {
        $item;
		foreach ($this->getData('permissions') as $permission) {
			$item[] = ["key" => $permission];
		}
		return $item;
	}
}
```
در مثال فوق در متد buildPermissionsArray مجوزها که با کلید permissions در کنترلر مقداردهی شده‌اند و با فراخوانی متد getData در دسترس می‌باشند.  (متد getData در کلاس packages\base\view تعریف شده است.)
با فراخوانی متد buildPermissionsArray در متد `setData`
 آرایه‌ای از مجوز‌ها تحت عنوان کلید permissions در داده های صفحه اضافه میشود. 

خروجی کد فوق در صفحه html بصورت زیر می‌باشد
```html
<script>
var options = {"packages.base.translator.defaultlang":"fa_IR","packages.base.translator.changelang":"uri","packages.base.translator.changelang.type":"short","packages.base.routing.www":"nowww"};var translator = {"lang":"fa_IR"}; var permissions = [{"key":"userpanel_users_list"},{"key":"userpanel_users_add"},{"key":"userpanel_users_view"},{"key":"userpanel_users_view_invisibles"}]
</script>
```

### [بررسی وجود داده](#has_data)
متد `hasData` برای بررسی وجود و یا عدم وجود یک کلید در داده ها تعریف شده است. آرگومان ورودی متد کلید داده‌ای است که میخواهید وجود آن را بررسی کنید.
خروجی متد boolean است.

### [حذف داده](#delete_data) 
متد `deleteData` برای حذف داده اضافه شده استفاده می‌شود. ورودی متد کلید تعریف شده برای داده میباشد.

**مثال**
```php
<?php
namespace themes\themename\views;
use packages\base\{Options, View};

class Delete extends View {

	function __beforeLoad() {
		$this->setTitle(array(
			t("settings"),
			t("usertype.delete")
        ));

        $dynamicData = $this->dynamicData();

        if ($dynamicData->hasData("permissions")) {
            $dynamicData->deleteData("permissions")
        }
    }
}
```

### [خواندن داده](#get_data) 
متد `getData` برای دریافت داده‌های اضافه شده استفاده میشود. آرگومان ورودی متد کلید تعریف شده برای داده میباشد.
اگر به متد آرگومانی ارسال نشود آرایه‌ای از تمامی داده‌های تعریف شده را برمیگرداند.


## [نحوه استفاده از داده های ذخیره شده در جاوااسکریپت](#use_js)
داده های ذخیره شده در DynamicData در جاوااسکریپت مورد استفاده قرار میگیرد. 

بطور مثال میخواهیم دکمه‌های حذف و ویرایش را فقط به کاربرانی که مجوز دسترسی دارند نمایش دهیم که مطابق کدهای زیر عمل میکنیم. 

**فایل view**
```php
<?php
namespace themes\themename\views;

use packages\base\views\Form;

class UsersList extends Form {
    public function __beforeLoad() {

        $permissions = $this->getData('permissions');

        $this->dynamicData()->setData("permissions", array(
            "users_edit" => $permissions['users_edit'],
            "users_delete" => $permissions['users_delete']
        ));
    }
}
```

**خروجی داده‌ها در تگ script**
```html
<script>
var options = {"packages.base.translator.defaultlang":"fa_IR","packages.base.translator.changelang":"uri","packages.base.translator.changelang.type":"short","packages.base.routing.www":"nowww"};var translator = {"lang":"fa_IR"};var permissions = {"users_edit":true,"users_delete":false};
</script>
```

**نحوه ی استفاده در فایل جاوااسکریپت**
```javascript
$(() => {
    if (!permissions["users_edit"]) {
        $(".btn_users_edit").css("display", "none");
    } 
    if (!permissions["users_delete"]) {
        $(".btn_users_delete").css("display", "none");
    }
});
```
