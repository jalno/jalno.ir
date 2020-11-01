<div class="alert alert-danger text-center">
این پکیج منسوخ شده و بروزرسانی نمیشود. برای جایگزینی از پکیج <a href="node_webpack.md">Node webpack</a> استفاده کنید.
</div>
#webpack
برای راحتی کد نویسی و استفاده از پکیج های مختلف [NPM](https://npmjs.org) ،  قابلیت [Webpack](http://webpack.js.org/) در فرم-ورک پیاده سازی شده است. میتوانید css های قالب را با استفاده از less و فایل های javascript را به صورت JQuery و یا حتی Typescript بنویسید. فرم-ورک  به صورت خودکار پکیج های مورد نیاز را دانلود و فایل های معرفی شده را بعد از  کامپایل و در یک فایل در صفحه بارگذاری خواهد کرد.

برای استفاده از این قابلیت نیاز هست تا پکیج [Webpack](https://github.com/yeganemehr/webpack) را برای کامپایل فایل ها در کنار پکیج اصلی استفاده کنید .
<div class="alert alert-info text-center">
برای اطلاعات بیشتر در مورد پکیج های NPM به صفحه ی <a href="npm">NPM</a> مراجعه کنید
</div>
##نصب
میتوانید همواره آخرین نسخه را از شاخه اصلی مخزن دانلود کنید: [دانلود ZIP](https://github.com/yeganemehr/webpack)

یا اینکه مخزن را بصورت کامل در کنار پکیج اصلی کلون کنید:
```bash
git clone https://github.com/yeganemehr/webpack.git
```
## راه اندازی
بعد از این میتوانید با مراجعه به پوشه ی اصلی پروژه،  روند این پکیج را طریق خط فرمان فراخوانی کنید. این روند با استفاده از [NPM](npm) تمامی 
پکیج های معرفی شده در فایل معرف قالب ها را دانلود کرده و با css و javascript هایی که در هر قالب نوشته اید، کامپایل میکند.


```bash
php index.php --process=packages/webpack/processes/webpack@run
```
<div class="alert alert-info text-center">
برای اطلاعات بیشتر به صفحه ی <a href="process">روند</a> مراجعه کنید
</div>

بعد از اجرای خط فرمان بالا، شاهد لاگ های بسیاری خواهید بود، باید منتظر باشید تا روند به انتها برسد.   
پس از اتمام در پوشه ی هر قالب پوشه ای با عنوان `node_modules` ایجاد خواهد  شد. نیاز به تغییر در فایل های این پوشه و همچنین در هنگام جابه جایی پکیج سایت نیازی به انتقال آن نخواهید داشت.

**نکته**: پس از تغییر در هریک از پکیج های npm و یا تغییر در کد های css و javascript نیاز هست تا این روند مجددا فراخوانی شود.

**نکته**: در هر بار فراخوانی این روند، در صورتی که پکیجی از npm قبلا دانلود شده باشد، مجددا  دانلود نخواهد شد.

خروجی فقط دو فایل یکی برای css و دیگری برای javascript است و کمک بسیاری به سرعت بارگزاری سایت خواهد کرد.

برای فراخوانی فایل های css فقط نیاز هست تا در صفحه ی html متد `loadCSS` را صدا بزنید. این متد در کلاس `packages/base/view` تعریف شده و ظاهر ها با توجه به رابطه ی پدر-فرزندی از آن ارث بری دارند.

نمونه فراخوانی فایل های css
```php
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <title>My First Site</title>
    <?php $this->loadCSS(); ?>
<head>
```
 برای فراخوانی فایل های javascript فقط نیاز هست تا در صفحه ی html متد `loadJS` را صدا بزنید. این متد نیز در کلاس `packages/base/view` تعریف شده و ظاهر ها با توجه به رابطه ی پدر-فرزندی از آن ارث بری دارند.

 نمونه فراخوانی فایل های javascript
```php
<!DOCTYPE html>
<html lang="en" dir="ltr">
<body>
<?php $this->loadJS(); ?>
</body>
</html>
```

## پاک سازی پکیج های NPM
متد clean در این روند تمامی پکیج های npm دانلود شده در هر قالب را حذف میکند.
```php
php index.php --process=packages/webpack/processes/webpack@clean
```
