# صفحه‌بندی

سطرهایی که از پایگاه داده طبق کوئری ارسال شده دریافت می‌شود گاها بسیار زیاد بوده و نمایش تمامی آن‌‌ها در یک صفحه باعث ازدحام می‌شود. برای بهبود کارایی و ux باید سطرها صفحه‌بندی شده نمایش داده شود. برای صفحه بندی سطرها در فریمورک کلاس `packages\base\views\Listview` ایجاد شده است. 

برای استفاده از متدهای صفحه‌بندی‌ باید کلاس view از کلاس `packages\base\views\Listview` ارث بری کند و یا `packages\base\views\traits\ListTrait` در کلاس استفاده شود.

 با ارث بری از کلاس Listview  در زمان پاسخ به درخواست های API و JSON اطلاعات بصورت خودکار به JSON تبدیل شده و به همراه اطلاعات مورد نیاز در صفحه بندی برگردانده میشوند.


**مثال :** ارث بری از کلاس
```php
<?php
namespace themes\themename\views\packagename\users;
use packages\base\views\Listview;

class UsersList extends Listview {
	
	
}
```

**مثال :** استفاده از trait
```php
<?php
namespace themes\themename\views\packagename\users;

use packages\base\View;
use packages\base\views\traits\ListTrait;

class Search extends View {
	use ListTrait;
	
}
```

برای صفحه بندی سطرها باید داده‌ها، تعداد سطر مجاز برای نمایش، تعداد کل سطرها و شماره صفحه مشخص شود. 

## مشخص کردن سطرها {#set_data}
سطرهایی که قصد نمایش آن‌ها را داریم با استفاده از متد `setDataList`به view منتقل داده میشوند.

## تنظیمات صفحه‌بندی {#configure_pagination}
تنظیمات صفحه‌بندی که شامل تعداد سطرهای نمایش داده شده در این صفحه، شماره صفحه و تعدادکل سطر‌ها می‌باشد با استفاده از متد `setPaginate` انجام می‌شود. 

متد سه آرگومان ورودی دریافت میکند که آرگومان اول شماره صفحه، آرگومان دوم تعداد کل سطرها و آرگومان سوم تعداد سطرهای نمایش داده شده در این صفحه می‌باشد.

**مثال :** نمونه فایل کنترلر
```php
<?php
namespace packages\packagename\controllers;

use packages\packagename\User as Model;
use packages\base\{Controller, Response, View};
use themes\themename\views\packagename\users as views;

class Users extends Controller {

	public function search(): Response {

		$view = view::byName(views\Search::class);
		$this->response->setView($view);

		$inputs = $this->checkinputs(array(
			"page" => array(
				"type" => "number",
				"optional" => true,
				"default" => 1,
			),
			"ipp" => array(
				"type" => "number",
				"optional" => true,
				"default" => 25,
			),
		));

		if ($inputs["page"] < 1) {
			$inputs["page"] = 1;
		}
		if ($inputs["ipp"] < 1) {
			$inputs["ipp"] = 1;
		}
		if ($inputs["ipp"] > 100) {
			$inputs["ipp"] = 100;
		}

		$model = new Model();
		$model->pageLimit = $inputs["ipp"];
		$users = $model->paginate($inputs["page"]);
	
		$view->setDataList($users);
		$view->setPaginate($inputs["page"], $user->totalCount, $inputs["ipp"]);
		
		$this->response->setStatus(true);

		return $this->response;
	}
}
?>
```
__برای اطلاعات بیشتر به صفحه [پایگاه داده](dbObject.md) مراجعه کنید.__

## دریافت سطرها  {#get_data}
بعد از انجام صفحه بندی، سطرها با استفاده از متد `getDataList` دریافت می‌شوند.

**مثال :** نمونه کد view
```php
namespace themes\themename\views\packagename\users;

use packages\base\views\ListView;

class Search extends ListView {
	public function __beforeLoad() {
		$this->setTitle(t("users.search");
	}
	public function getUsers(): array {
		return $this->getDataList(); // Or you can use $this->getDataList() directly in html file
	}
}
```

## صفحه‌بندی در قالب  {#pagination_in_html}
برای نمایش همه سطر ها باید امکانی به کاربر داده شود تا بتواند صفحات بعد و یا حتی صفحات قبل را انتخاب کنید.
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
	<?php foreach($this->getDataList() as $user) { ?>
		<tr>
			<td><?php echo $user->id; ?></td>
			<td><?php echo $user->name; ?></td>
			<td><?php echo $user->lastname; ?></td>
			<td><?php echo $user->email; ?></td>
			<td><?php echo $user->cellphone; ?></td>
		</tr>
	<?php } ?>
	</tbody>
</table>

<nav>
	<ul class="pagination">
	<?php
	$urlData = Http::$request['get'];
	for ($i = 1; $i <= $this->totalPages; $i++) {
		$urlData["page"] = $i;
	?>
		<li class="page-item<?php echo ($i == $this->currentPage) ? ' active' : ''; ?>">
			<a class="page-link" href="?<?php echo http_build_query($urlData); ?>"><?php echo $i; ?></a>
		</li>
	<?php } ?>
	</ul>
</nav>
```

استفاده از روش فوق برای ایجاد قالب صفحه‌بندی بسیار وقت گیر و باعث ایجاد حجم زیادی از کد میشود. برای سهولت میتوانید از متد `paginator` پکیج [یوزرپنل](https://github.com/Jalno/userpanel) استفاده کنید. 

برای فراخوانی متد paginator لازم است مخزن `themes\clipone\views\ListTrait` در کلاس view استفاده شود.


**نکته**:درحال حاضر پکیج یوزرپنل از boostrap نسخه‌ی 3 استفاده میکند و ظاهر ایجاد شده برای صفحه بندی ها بر اساس boostrap نسخه‌ی 3 است.

**مثال :** نمونه فایل view
```php
<?php
namespace themes\themename\views\packagename\users;

use packages\base\views\ListView;
use themes\clipone\views\ListTrait;

class Search extends ListView {
	use ListTrait;
}
```

```php
<?php
namespace themes\themename\views\packagename\users;

use packages\base\{View, views\traits\ListTrait};
use themes\clipone\views\ListTrait as UserpanelListTrait;

class Search extends View {
	use ListTrait, UserpanelListTrait;
	
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
	<?php foreach($this->getDataList() as $user) { ?>
		<tr>
			<td><?php echo $user->id; ?></td>
			<td><?php echo $user->name; ?></td>
			<td><?php echo $user->lastname; ?></td>
			<td><?php echo $user->email; ?></td>
			<td><?php echo $user->cellphone; ?></td>
		</tr>
	<?php } ?>
	</tbody>
</table>
<?php $this->paginator(); ?>
```
