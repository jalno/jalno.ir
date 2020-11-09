# صفحه‌بندی

سطرهایی که از پایگاه داده طبق کوئری ارسال شده دریافت می‌شود گاها بسیار زیاد بوده و نمایش تمامی آن‌‌ها در یک صفحه باعث ازدحام می‌شود. برای بهبود کارایی و ux باید سطرها صفحه‌بندی شده نمایش داده شود. برای صفحه بندی سطرها در فریمورک کلاس `packages\base\views\Listview` ایجاد شده است. 

برای استفاده از متدهای صفحه‌بندی‌ باید کلاس view از کلاس `packages\base\views\Listview` ارث بری کند و یا `packages\base\views\traits\ListTrait` در کلاس استفاده شود.

 با ارث بری از کلاس Listview  در زمان پاسخ به درخواست های API و JSON اطلاعات بصورت خودکار به JSON تبدیل شده و به همراه اطلاعات مورد نیاز در صفحه بندی برگردانده میشوند.


**مثال :** ارث بری از کلاس
```php
<?php
namespace themes\package_theme\views;
use packages\base\views\Listview;

class UsersList extends Listview {
    
    
}
```

**مثال :** استفاده از trait
```php
<?php
namespace themes\package_theme\views;
use packages\base\View;
use packages\base\views\traits\listTrait;

class usersList extends View {
    use listTrait;
    
}
```

برای صفحه بندی سطرها باید داده‌ها، تعداد سطر مجاز برای نمایش، تعداد کل سطرها و شماره صفحه مشخص شود. 

## مشخص کردن سطرها
سطرهایی که قصد صفحه‌بندی آن‌ها را داریم به صورت آرایه به آرگومان ورودی متد `setDataList` داده میشود.

## تنظیمات صفحه‌بندی
تنظیمات صفحه‌بندی که شامل تعداد سطرهای مجاز و شماره صفحه و تعدادکل سطر‌ها می‌باشد با استفاده از متد `setPaginate` انجام می‌شود. 

متد سه آرگومان ورودی دریافت میکند که آرگومان اول شماره صفحه، آرگومان دوم تعداد کل سطرها و آرگومان سوم تعداد سطرهای مجاز می‌باشد.

## دریافت سطرها 
بعد از انجام صفحه بندی، سطرها با استفاده از متد `getDataList` دریافت می‌شوند. همچنین میتوان از صفت dataList تعریف شده در کلاس استفاده کرد.


**مثال :** نمونه فایل کنترلر
```php
<?php
namespace packages\my_package\controllers;
use packages\userpanel\Controller;
use packages\base\View;
use themes\package_theme\views;
use packages\my_package\User;

class Users extends Controller {
    function usersList() {
        $view = view::byName(views\panel\UsersList::class);
        $this->response->setView($view);

        $user = new User();
        $user->pageLimit = $this->items_per_page;
        $users = $user->paginate($this->page, ["userpanel_users.*"]);
    
        $view->setDataList($users);
        $view->setPaginate($this->page, $user->totalCount, $this->items_per_page);
        
        return $this->response;
    }
}
?>
```
در مثال فوق سطرها با استفاده از متد paginate با تعداد مشخص از پایگاه داده دریافت میشوند.
pageLimit تعداد سطری که از پایگاه داده دریافت می‌شود را مشخص میکند. items_per_page در کنترلر پکیج [یوزرپنل](https://github.com/Jalno/userpanel) تعریف شده و برابر 25 می‌باشد.

__برای اطلاعات بیشتر به صفحه [پایگاه داده](dbObject.md) مراجعه کنید.__

سطرهای دریافتی از پایگاه داده بصورت آرایه در $users ذخیره می‌شود.

$this->page در کنترلر پکیج [یوزرپنل](https://github.com/Jalno/userpanel) تعریف شده است و شماره صفحه‌ای که درآن هستیم، در آن ذخیره شده است.

شماره صفحه‌ای که در $this->page ذخیره شده است، مطابق پارامتر page در آدرس url می‌باشد.

کد زیر بخشی از متد سازنده کنترلر یوزرپنل است که مقداردهی متغیرهای توضیح داده شده در فوق را انجام می‌دهد.
```php
public function __construct() {
    
    $this->page = Http::getURIData('page');
    $this->items_per_page = Http::getURIData('ipp');
    if($this->page < 1)$this->page = 1;
    if($this->items_per_page < 1)$this->items_per_page = 25;
    DB::pageLimit($this->items_per_page);
}
```

$user->totalCount تعداد کل سطرهای موجود در پایگاه داده می‌باشد.

آرگومان سوم ($this->items_per_page) تعداد سطر مجازی است که در هر صفحه نمایش داده می‌شود. که این عدد با تعداد سطرهایی که از پایگاه داده دریافت میشود برابر است.


**مثال :** نمونه کد view
```php
public function getUsers() {
    return $this->dataList;
}
```
برای دسترسی به سطرها علاوه بر فراخوانی متد getDataList() میتوان از dataList نیز استفاده کرد.


## صفحه‌بندی در قالب 
برای نمایش سطرها در html باید مشخص شود سطرهای نمایشی صفحه‌بندی شده هستند برای نمایش شماره صفحات باید ابتدا تعداد کل صفحات و صفحه‌ای که در آن هستیم را بدانیم. با استفاده از totalPages تعریف شده در شئ ایجاد شده از پایگاه داده به تعداد کل صفحات دسترسی داریم (تعداد کل صفحات مطابق با تعداد کل سطرها و تعداد سطرهای دریافتی می‌باشد.)

طبق کد زیر تعداد صفحات را در متغیر pages و صفحه ای که در آن هستیم را در متغیر thisPage قالب ذخیره میکنیم.
```php
$user = new User();
$user->pageLimit = $this->items_per_page;
$users = $user->paginate($this->page);

$view->pages = $users->totalPages;
$view->thisPage = http::$request["get"]["page"] ? http::$request["get"]["page"] : 1;
```

کد زیر نمونه ایجاد شماره صفحات در html است. 

```php
<table class="table table-striped">
    <head>
        <th>#</th>
        <th>نام</th>
        <th>نام خانوادگی</th>
        <th>ایمیل</th>
        <th>موبایل</th>
    </head>
    <tbody>
        <?php
        foreach($this->getDataList() as $key => $user){
        echo `
        <tr>
            <td>{++$key}</td>
            <td>{$user->name}</td>
            <td>{$user->lastname}</td>
            <td>{$user->email}</td>
            <td>{$user->cellphone}</td>
        </tr>`
        <?php } ?>
    </tbody>
</table>

<nav>
    <ul class="pagination">
        <?php 
        for($i = 1; $i <= $this->pages; $i++) {
            $active = $i == $this->thisPage ? 'active' : '';
            echo '
                <li class="page-item ' . $active .'">
                    <a class="page-link" href="?'. http_build_query(["page" => $i]). '">'.  $i . '</a>'.
                '</li>';
        }
        ?>
    </ul>
</nav>
```

استفاده از روش فوق برای ایجاد قالب صفحه‌بندی بسیار وقت گیر و باعث ایجاد حجم زیادی از کد میشود. برای سهولت میتوانید از متد `paginator` پکیج [یوزرپنل](https://github.com/Jalno/userpanel) استفاده کنید. 

برای فراخوانی متد paginator لازم است بجای استفاده از `packages\base\views\traits\listTrait` از `themes\clipone\views\listTrait` در کلاس view استفاده شود و بجای ایجاد تگ nav متد paginator فراخوانی شود. در این روش نیاز به مقدار دهی متغیر های thisPage و pages برای صفحه فعلی و تعداد صفحات نیست تمامی موارد توسط پکیج مدیریت می‌شود.

**مثال :** نمونه فایل view
```php
<?php
namespace themes\package_theme\views;
use packages\base\View;
use themes\clipone\views\listTrait;

class usersList extends View {
    use listTrait;
    
}
```

**مثال :** نمونه فایل html
```php
<table class="table table-striped">
    <head>
        <th>#</th>
        <th>نام</th>
        <th>نام خانوادگی</th>
        <th>ایمیل</th>
        <th>موبایل</th>
    </head>
    <tbody>
        <?php
        foreach($this->getDataList() as $key => $user){
        echo `
        <tr>
            <td>{++$key}</td>
            <td>{$user->name}</td>
            <td>{$user->lastname}</td>
            <td>{$user->email}</td>
            <td>{$user->cellphone}</td>
        </tr>`
        <?php } ?>
    </tbody>
</table>
<?php $this->paginator(); ?>
```
