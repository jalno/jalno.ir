# [داده‌های پویا](#DynamicData)
در برنامه همواره لازم است داده و یا اطلاعاتی در سمت ظاهر ذخیره شوند. مانند تنظیماتی که در Options انجام شده و در این صفحه استفاده شده، زبان فعال در برنامه و ... این اطلاعات در `جاوااسکریپت` مورد استفاده قرار میگیرد. فرمورک این اطلاعات را بصورت خودکار به اطلاعات قابل خواندن توسط جاوااسکریپت تبدیل و قبل از بارگذاری فایل های اصلی در صفحه قرار میدهد. 

 برای ذخیره و مدیریت این دسته از اطلاعات در فرمورک کلاس `packages\base\frontend\events\ThrowDynamicData` ایجاد شده است. 

برای سهولت در دسترسی به کلاس `ThrowDynamicData`  در کلاس `packages\base\View` متد `dynamicData()` ایجاد شده است که به راحتی با فراخوانی این متد روی شئ کلاس View به کلاس ThrowDynamicData دسترسی خواهید داشت.

__برای اطلاعات بیشتر از ظاهر به صفحه [ظاهر View](view.md) مراجعه کنید.__


## [تنظیمات](#options)
__برای اطلاعات بیشتر از تنظیمات به صفحه [تنظیمات و پیکربندی](options.md) مراجعه کنید.__

تنظیماتی که مربوط به صفحه‌ای است که باز شده است،‌ در `var options` تگ script که در صفحه اضافه شده است قابل رویت می‌باشد.  
در کلاس ThrowDynamicData با استفاده از متد‌های زیر میتوانید تنظیمات نمایش داده شده را مدیریت کنید.
مقادیر مربوط به تنظیمات در متغیر $data['options'] کلاس ذخیره می‌شود.

**توجه :** تنظیمات packages.base.translator.defaultlang ، packages.base.translator.changelang ، packages.base.translator.changelang.type ، packages.base.routing.www
بصورت خودکار در $data['options'] ذخیره می‌شوند.

### [تعریف تنظیم](#set_option)
با استفاده از متد `setOption($name)` میتوانید تنظیمات جدیدی که اضافه کرده‌اید در صفحه نیز نمایش دهید و از آن استفاده کنید. ورودی این متد نام تنظیم است،‌ نام تنظیم به عنوان کلید و مقدار آن، مقدار تنظیم میباشد. 

**مثال**
```php
<?php
namespace themes\themename\views;

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
در مثال فوق با فراخوانی متد set تنظیم جدیدی برای صفحه اضافه میشود و سپس با فراخوانی متد setOption این تنظیم در صفحه نیز نمایش داده می‌شود.

خروجی کد فوق در صفحه html بصورت زیر میباشد
```html
<script>
var options = {"packages.base.translator.defaultlang":"fa_IR","packages.base.translator.changelang":"uri","packages.base.translator.changelang.type":"short","packages.base.routing.www":"nowww","packages.packagename.has_access_to_delete_service":false};var translator = {"lang":"fa_IR"};
</script>
```

### [بررسی تنظیم](#has_option)
 با فراخوانی متد `hasOption($name)` میتوانید وجود یا عدم وجود تنظیمات ذخیره شده در $data['options'] را بررسی کنید. خروجی متد boolean میباشد. 
با فراخوانی متد `getData` با ورودی `options` میتوانید به تمامی options های ذخیره شده در این کلاس (بصورت آرایه) دسترسی داشته باشید. 

**مثال**
```php
<?php
namespace themes\themename\views;

use packages\base\{Options, views\Form};

class Prioritize extends Form {

    public function __beforeLoad() {
        
        $this->setTitle(t("posts.prioritize"));
        $this->addBodyClass("posts-prioritize");

        Options::load("packages.packagename.has_access_to_delete_service");

        if(!$this->dynamicData()->hasOption("packages.packagename.has_access_to_delete_service")) {
            $this->dynamicData()->setOption("packages.packagename.has_access_to_delete_service");
        }
    }
}
```
در مثال فوق تنظیم ذخیره شده با متد load در صفحه لود می‌شود سپس با متد hasOption بررسی می‌شود اگر این تنظیم در $data['options'] ذخیره نشده است، با فراخوانی متد setOption ذخیره می‌شود.

### [حذف تنظیم](#delete_option)
با فراخوانی متد `deleteOption($name)` میتوانید تنظیم ایجاد شده در $data['options'] را حذف کنید. آرگومان ورودی متد نام تنظیم میباشد.


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

## [اطلاعات و داده‌ها](#data)
علاوه بر تنظیمات برنامه میتوانید سایر اطلاعات مورد استفاده در جاوااسکریپت را با استفاده از متدهای زیر ذخیره و مدیریت کنید.

**توجه :** مقدار `lang` که زبان فعال برنامه را نمایش می‌دهد بطور خودکار در `$data['translator']` ذخیره می‌شود.

### [تعریف داده](#set_data) 
متد `setData($name, $value)` برای تعریف اطلاعات، ایجاد شده است. 
متد setData دو آرگومان ورودی میگیرد که در آرگومان اول کلید برای داده و در آرگومان دوم مقدار داده مقداردهی می‌شود. آرگومان اول باید رشته باشد. آرگومان دوم از هر نوع داده میتواند باشد.

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
 آرایه‌ای از مجوز‌ها تحت عنوان کلید permissions در متغیر $data کلاس throwDynamicData ذخیره می‌شود. 

خروجی کد فوق در صفحه html بصورت زیر می‌باشد
```html
<script>
var options = {"packages.base.translator.defaultlang":"fa_IR","packages.base.translator.changelang":"uri","packages.base.translator.changelang.type":"short","packages.base.routing.www":"nowww"};var translator = {"lang":"fa_IR"}; var permissions = [{"key":"userpanel_users_list"},{"key":"userpanel_users_add"},{"key":"userpanel_users_view"},{"key":"userpanel_users_view_invisibles"}]
</script>
```

### [بررسی وجود داده](#has_data)
متد `hasData($name)` برای بررسی وجود و یا عدم وجود داده تعریف شده است. 
آرگومان ورودی متد کلید داده‌ای است که میخواهید وجود آن را بررسی کنید.
خروجی متد boolean است.

### [حذف داده](#delete_data) 
متد `deleteData($name)` برای حذف داده ایجاد شده استفاده می‌شود. ورودی متد کلید تعریف شده برای داده میباشد.

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

        if($this->dynamicData()->hasData("permissions")) {
            $this->dynamicData()->deleteData("permissions")
        }
    }
}
```

### [خواندن داده](#get_data) 
متد `getData` برای دریافت داده‌های تعریف شده استفاده میشود. آرگومان ورودی متد کلید تعریف شده برای داده میباشد.
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

**نحوه ی استفاده در فایل جاوااسکریپت**
```javascript
if (!permissions["users_edit"]) {
    $(".btn_users_edit").css("display", "none");
} 
if (!permissions["users_delete"]) {
    $(".btn_users_delete").css("display", "none");
}
```

**خروجی داده‌ها در تگ script**
```html
<script>
var options = {"packages.base.translator.defaultlang":"fa_IR","packages.base.translator.changelang":"uri","packages.base.translator.changelang.type":"short","packages.base.routing.www":"nowww"};var translator = {"lang":"fa_IR"};var permissions = {"users_edit":true,"users_delete":false};
</script>
```