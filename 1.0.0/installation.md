# نصب و راه اندازی

نصب جالنو واقعا ساده است، فقط شامل سه مرحله است:

### آخرین نسخه را دانلود کنید

آخرین نسخه این فریم-ورک را میتونید همیشه از شاخه اصلی مخزنش دانلود کنید: [دانلود ZIP](https://github.com/jalno/base/archive/master.zip)

یا اینکه مخزن را بصورت کامل کلون کنید:

```bash
git clone https://github.com/jalno/base.git
```

### یک پایگاه داده بسازید

اگر پروژه را بر روی رایانه شخصیتون راه اندازی میکنید، از طریق `PHPMyAdmin`  یک پایگاه داده جدید بسازید، یا در غیر اینصورت به پنل میزبانیتون مراجعه کنید.سپس دستورات زیر را در پایگاه داده درون ریزی کنید:

```sql
CREATE TABLE `base_cache` (
	`name` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`expire_at` int(10) unsigned NOT NULL,
	PRIMARY KEY (`name`),
	KEY `expire_at` (`expire_at`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `base_processes` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) COLLATE utf8_persian_ci NOT NULL,
	`pid` int(11) DEFAULT NULL,
	`start` int(11) DEFAULT NULL,
	`end` int(11) DEFAULT NULL,
	`parameters` text COLLATE utf8_persian_ci,
	`response` text COLLATE utf8_persian_ci,
	`progress` int(11) DEFAULT NULL,
	`status` tinyint(4) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

CREATE TABLE `options` (
	`name` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`autoload` tinyint(1) NOT NULL DEFAULT '0',
	PRIMARY KEY (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `options` (`name`, `value`, `autoload`) VALUES
('packages.base.routing.www', 'nowww', 1),
('packages.base.routing.scheme', 'http', 1);
```

### اتصال را برقرار کنید

فایل `packages/base/libraries/config/config.php` را با یک ویرایشگر متن باز کنید و در قسمت `packages.base.loader.db` مشخصات اتصال به پایگاه داده را وارد کنید. برای مثال:

```php
<?php
namespace packages\base;
$options = array(
	'packages.base.loader.db' => array(
		'type' => 'mysql',
		'host' => '127.0.0.1',
		'user' => 'root',
		'pass' => 'myComplexPassword',
		'dbname' => 'jalno'
	)
...
```

