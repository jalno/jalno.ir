
# Node Webpack
سرویس NPM به شما این قابلیت را میدهد تا بتوانید به آسانی از پکیج های آماده Javascript و css استفاده کنید.
البته استفاده از پکیج های آماده در سایت ها به راحتی نبوده و مشکلات مربوط به خود را دارد.
از جمله این مشکلات تغییر نسخه های پکیج ها و یا بارگزاری تعداد فایل های زیاد در صفحه هستند که باعث افت سرعت و همچنین افت رتبه سایت میشود.
##[مدیریت پکیج ها](#manage_npm)
در جالنو برای مدیریت پکیج های هر قالب این امکان فراهم شده است تا پکیج های مورد نیاز را در فایل معرفی قالب با نام `theme.json` و در قسمت `assets` معرفی کنید. در زمان معرفی میتوانید نسخه ی پکیج مورد نیاز را نیز ذخیره کنید تا در نصب های بعدی دقیقا همان پکیج نصب شود.
با استفاده از این قابلیت دیگر نیاز نیست تا در زمان جابه جایی سایت، فایل های پکیج ها ( که حجم زیادی خواهند داشت ) را نیز جابه جا کنید. میتوانید به راحتی و بعد از جابه جایی مجددا اقدام به نصب آنها کنید.
 پکیج node_webpack به صورت خودکار تمامی قالب ها را شناسایی و پکیج های مورد نیاز و معرفی شده هر قالب را در مسیر همان قالب نصب میکند.
 ####نمونه فایل معرفی قالب
 
	{
	    "name" : "clipone",
	    "title":"Clip One",
	    "assets":[
	        {"type": "package", "name": "bootstrap", "version": "^3.3.7"},
	        {"type": "package", "name": "jquery", "version": "^3.4.1"},
	        {"type": "package", "name": "jquery-ui", "version": "^1.12.1"},
	        {"type": "package", "name": "jquery.growl", "version": "^1.3.5"}
	    ]
    }

###[معرفی نسخه ها](#npm_versions)
نسخه های معرفی شده دقیقا از قواعد NPM پیروی کرده و باید این قاعده توسط این سرویس قابل شناسایی باشد. چنانچه نسخه ی معرفی نشود، آخرین نسخه از پکیج همیشه نصب میشود و اگر نسخه ی معرفی شده معتبر نباشد، در زمان اجرا و نصب پکیج ها خطا دریافت خواهید کرد.
<table class="table table-bordered">
    <thead>
        <tr>
            <th class="text-center">نمونه</th>
            <th class="text-center">توضیح</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="ltr">~3.3.7</td>
            <td>نسخه ی 3.3.7 و یا یکی از نسخه هایی که دو رقم ابتدایی حتما 3.3 و رقم سوم آن از 7 بزرگتر است نصب شود.</td>
        </tr>
        <tr>
            <td class="ltr">=3.3.7</td>
            <td>دقیقا نسخه ی 3.3.7 نصب شود.</td>
        </tr>
        <tr>
            <td class="ltr">^3.3.7 یا 3.3.7</td>
            <td>نسخه ی 3.3.7 و یا یکی از نسخه هایی که رقم ابتدایی آنها حتما 3، رقم دوم آن 3 و یا بزرگتر و رقم سوم آن از 7 بزرگتر است نصب شود.</td>
        </tr>
    </tbody>
</table>
 ولی هنوز مشکل تعداد فایل های زیادی که باید در زمان اجرای صفحه بارگزاری شوند، وجود دارد. در Node Webpack این مشکل نیز قابل حل است.
 ##[مدیریت فایل ها](#manage_files)
بعد از نصب و برای استفاده از پکیج ها باید فایل های پکیج ها قبل از فایل شما در صفحه بارگزاری شده باشند تا شما بتوانید از آن استفاده کنید. در هر صفحه باید این مورد رعایت شده و فایل های مورد نیاز در آن صفحه با رعایت اولویت بندی تماما معرفی شوند.
همچنین نمیتوانید از تکنولوژی های راحت تر و سریع تر مانند Typescript، Less و یا SCSS استفاده کنید چرا که این موارد توسط موتور های مرورگر ها شناسایی نشده  و باید به تکنولوژی های دیگر تبدیل و کامپایل شوند.
اما در جالنو میتوانید بدون نگرانی بابت این مسائل فقط بر روی مسائل سایت خودتان تمرکز کنید. در Node Webpack تمامی پکیج های استفاده شده در کدها و یا فایل های معرفی شده در فایل معرفی قالب ها به صورت یک فایل به تکنولوژی های مرورگر تبدیل و کامپایل میشوند. 
####نمونه فایل معرفی قالب

	{
	    "name" : "clipone",
	    "title":"Clip One",
	    "assets":[
	        {"type": "package", "name": "bootstrap", "version": "^3.3.7"},
	        {"type": "package", "name": "jquery", "version": "^3.4.1"},
	        {"type": "css", "file": "node_modules/bootstrap/dist/css/bootstrap.css"},
	        // or
	        // {"type": "less", "file": "node_modules/bootstrap/less/bootstrap.less"},
	        {"type": "less", "file": "assets/less/Main.less"},
	        {"type": "js", "file": "node_modules/bootstrap/dist/js/bootstrap.min.js"}
	        {"type": "js", "file": "assets/js/Main.js"}
	    ]
    }

####نمونه فایل Main.less

	@import "~bootstrap/less/bootstrap.less"; // Import installed package less file instead write in theme.json
	@import "fonts.less"; // Import other less file 
	body {
		font-size: 16px;
		lineheight: 1.4;
	}
	@import "responsive.less"; // Import other less file 

####نمونه فایل Main.js

	jQuery(function() {
		alert("Hello World!");
		$("#div").html("Hi");
	}(JQuery, this);

میتوانید بدون مشکل از $ برای استفاده از jquery استفاده نمایید.
برای استفاده از تکنولوژی Typescript میبایست ابتدا در شاخه اصلی قالب تنظیمات TS را در فایلی با نام `tsconfig.json` ذخیره کنید.
####نمونه فایل تنظیمات TS

	{
	    "compilerOptions": {
	        "module": "commonjs",
	        "target": "es5",
	        "sourceMap": false,
	        "removeComments": true
	    },
	    "files": [
	        "./assets/ts/Main.ts"
	    ]
    }

####نمونه فایل TS

	import * as $ from "jquery";
	import "bootstrap" // Import bootstrap js file instead write in theme.json
	import NotFound from "./NotFound.ts";
	
	export default class Main {
		public static init() {
			alert("Hello World!");
			$("#div").html("Hi");
			NotFound.initIfNeeded();
		}
	}
	$(() => {
		Main.init();
	});

چون تمامی فایل ها در قالب یک فایل اجرا میشوند، پس ممکن هست تا کدهای نوشته شده برای یک صفحه در صفحه ی دیگری به اشتباه بارگزاری و تاثیر گذار باشد؛ پس باید هر فایل را به آن صفحه محدود کنید.
####نمونه فایل TS مخصوص یک صفحه

	import * as $ from "jquery";
	
	export default class NotFound {
		public static initIfNeeded() {
			NotFound.$page = $("body.notfound-page");
			if (NotFound.$page.length) {
				NotFound.init();
			}
		}
		private static $body: JQuery;
		private static init() {
			alert("NotFound Page!");
		}
	}

البته که استفاده از شئ گرایی در Typescript وجود داشته و در این مثال ها چون نیاز نبوده استفاده نشده است.
فایل
##[نصب پکیج ها](#installing_pacakges)
در محیط خط فرمان به مسیر `packages/node_webpack/nodejs` بروید. در این مکان دستور زیر را اجرا و منتظر بمانید:

	$ npm install -- --install

با اجرای دستور بالا تمامی قالب ها شناسایی و پکیج های مورد نیاز نصب میشوند.

##[اجرای webpack](#run_webpack)
در محیط خط فرمان به مسیر `packages/node_webpack/nodejs` بروید. در این مکان دستور زیر را اجرا و منتظر بمانید:

	$ npm install -- --webpack

بعد از اتمام دستور، فایل های نهایی در مسیر `node_webpack/storage/public/frontend/dist` ذخیره میشوند. این فایل ها به صورت خودکار توسط فرم ورک شناسایی و در صفحه قرار داده میشوند.
بعد از هر بار تغییر در کد ها باید مجددا webpack را برای اعمال تغییرات، راه اندازی کنید. میتوانید از حالت Watch استفاده کنید. در این حالت webpack تمامی فایل های شما را نظارت کرده و به محض کوچکترین تغییری که ذخیره شود، مجددا فایل ها کامپایل میکند.

	$ npm install -- --webpack -w

این قابلیت فقط در حالت برنامه نویسی و طراحی سایت کاربرد دارد. برای تولید فایل نهایی برای استفاده از سایت در حالت آماده میتوانید از قابلیت Production استفاده نمایید. در این قابلیت کد های شما فشرده میشوند. در این حالت علاوه بر کم شدن حجم فایل ها در زمان باز شدن صفحه، کد های شما کد شده و قابل خواندن به راحتی نیستند.

	$ npm install -- --webpack --production

####نمونه فایل HTML

	<html>
    <head>
	    <title>Jalno framework </title>
	    <?php ehco $this->loadCSS(); ?>
    </head>
    <body>
	    <div id="div"></div>
	    <?php $this->loadJS(); ?>
    </body>
    </html>

##[قرار دادن سایت بر روی هاست های میزبانی](#installing_site)
برای قراردادن سایت بر روی هاست های میزبانی که شما دسترسی خط فرمان ندارید، میتوانید سایت را به صورت کامل بر روی سیستم برنامه نویس و یا خودتان در حالت production اجرا کنید. پوشه های node_modules در مسیر قالب ها نیازی نبوده و میتوانید آنها را حذف کنید.  یک نسخه ی فشرده از سایت تهیه و بر روی هاست قرار دهید.


# نود وب پک

برای استفاده از پکیج های مختلف جاوا اسکریپت و یا ظاهر CSS بهترین راه و سریع ترین راه استفاده از پکیج های آماده است. سرویس NPM به شما این قابلیت را میدهد تا بتوانید به آسانی از این پکیج ها استفاده کنید.
البته استفاده از پکیج های آماده علی رغم راحتی ایراداتی نیز دارد. تغییر نسخه پکیج های استفاده شده در نصب مجدد و بروز خطا در سایت، یا جا انداختن یک پکیج  و یا تعداد فایل های زیادی که باید صفحه بارگزاری کنید همگی از ایرادات هستند.
##[مدیریت پکیج ها](#manage_npm)
در جالنو برای مدیریت پکیج های هر قالب این امکان فراهم شده است تا پکیج های مورد نیاز را در فایل معرفی قالب با نام `theme.json` و در قسمت `assets` معرفی کنید. در زمان معرفی میتوانید نسخه ی پکیج مورد نیاز را نیز ذخیره کنید تا در نصب های بعدی دقیقا همان پکیج نصب شود.
با استفاده از این قابلیت دیگر نیاز نیست تا در زمان جابه جایی سایت، فایل های پکیج ها ( که حجم زیادی خواهند داشت ) را نیز جابه جا کنید. میتوانید به راحتی و بعد از جابه جایی مجددا اقدام به نصب آنها کنید.
 پکیج node_webpack به صورت خودکار تمامی قالب ها را شناسایی و پکیج های مورد نیاز و معرفی شده هر قالب را در مسیر همان قالب نصب میکند.
 ####نمونه فایل معرفی قالب
 
	{
	    "name" : "clipone",
	    "title":"Clip One",
	    "assets":[
	        {"type": "package", "name": "bootstrap", "version": "^3.3.7"},
	        {"type": "package", "name": "jquery", "version": "^3.4.1"},
	        {"type": "package", "name": "jquery-ui", "version": "^1.12.1"},
	        {"type": "package", "name": "jquery.growl", "version": "^1.3.5"}
	    ]
    }

###[معرفی نسخه ها](#npm_versions)
نسخه های معرفی شده دقیقا از قواعد NPM پیروی کرده و باید این قاعده توسط این سرویس قابل شناسایی باشد. چنانچه نسخه ی معرفی نشود، آخرین نسخه از پکیج همیشه نصب میشود و اگر نسخه ی معرفی شده معتبر نباشد، در زمان اجرا و نصب پکیج ها خطا دریافت خواهید کرد.
| توضیح                |                            نمونه                 |

|---------------------------------------------|-------------------------------------------|

| ~3.3.7                           | نسخه ی 3.3.7 و یا یکی از نسخه هایی که دو رقم ابتدایی حتما 3.3 و رقم سوم آن از 7 بزرگتر است نصب شود|

| =3.3.7           | دقیقا نسخه ی 3.3.7 نصب شود.|

| ^3.3.7, 3.3.7               | نسخه ی 3.3.7 و یا یکی از نسخه هایی که رقم ابتدایی آنها حتما 3، رقم دوم آن 3 و یا بزرگتر و رقم سوم آن از 7 بزرگتر است نصب شود |
 ولی هنوز مشکل تعداد فایل های زیادی که باید در زمان اجرای صفحه بارگزاری شوند، وجود دارد. در Node Webpack این مشکل نیز حل قابل حل است.
 ##[مدیریت فایل ها](#manage_files)
بعد از نصب و برای استفاده از پکیج ها باید فایل های پکیج ها قبل از فایل شما در صفحه بارگزاری شده باشند تا شما بتوانید از آن استفاده کنید. در هر صفحه باید این مورد رعایت شده و فایل های مورد نیاز در آن صفحه با رعایت اولویت بندی تماما معرفی شوند.
همچنین نمیتوانید از تکنولوژی های راحت تر و سریع تر مانند Typescript، Less و یا SCSS استفاده کنید چرا که این موارد توسط موتور های مرورگر ها شناسایی نشده  و باید تکنولوژی های دیگر تبدیل و کامپایل شوند.
اما در جالنو میتوانید بدون نگرانی بابت این مسائل فقط بر روی مسائل سایت خودتان تمرکز کنید. در Node Webpack تمامی پکیج های استفاده شده در کدها و یا فایل های معرفی شده در فایل معرفی قالب ها به صورت یک فایل به تکنولوژی های مرورگر تبدیل و کامپایل میشوند. 
####نمونه فایل معرفی قالب

	{
	    "name" : "clipone",
	    "title":"Clip One",
	    "assets":[
	        {"type": "package", "name": "bootstrap", "version": "^3.3.7"},
	        {"type": "package", "name": "jquery", "version": "^3.4.1"},
	        {"type": "css", "file": "node_modules/bootstrap/dist/css/bootstrap.css"},
	        // or
	        // {"type": "less", "file": "node_modules/bootstrap/less/bootstrap.less"},
	        {"type": "less", "file": "assets/less/Main.less"},
	        {"type": "js", "file": "node_modules/bootstrap/dist/js/bootstrap.min.js"}
	        {"type": "js", "file": "assets/js/Main.js"}
	    ]
    }

####نمونه فایل Main.less

	@import "~bootstrap/less/bootstrap.less"; // Import installed package less file instead write in theme.json
	@import "fonts.less"; // Import other less file 
	body {
		font-size: 16px;
		lineheight: 1.4;
	}
	@import "responsive.less"; // Import other less file 

####نمونه فایل Main.js

	jQuery(function() {
		alert("Hello World!");
		$("#div").html("Hi");
	}(JQuery, this);

میتوانید بدون مشکل از $ برای استفاده از jquery استفاده نمایید.
برای استفاده از تکنولوژی Typescript میبایست ابتدا در شاخه اصلی قالب تنظیمات TS را در فایلی با نام `tsconfig.json` ذخیره کنید.
####نمونه فایل تنظیمات TS

	{
	    "compilerOptions": {
	        "module": "commonjs",
	        "target": "es5",
	        "sourceMap": false,
	        "removeComments": true
	    },
	    "files": [
	        "./assets/ts/Main.ts"
	    ]
    }

####نمونه فایل TS

	import * as $ from "jquery";
	import "bootstrap" // Import bootstrap js file instead write in theme.json
	import NotFound from "./NotFound.ts";
	
	export default class Main {
		public static init() {
			alert("Hello World!");
			$("#div").html("Hi");
			NotFound.initIfNeeded();
		}
	}
	$(() => {
		Main.init();
	});

چون تمامی فایل ها در قالب یک فایل اجرا میشوند، پس ممکن هست تا کدهای نوشته شده برای یک صفحه در صفحه ی دیگری به اشتباه بارگزاری و تاثیر گذار باشد؛ پس باید هر فایل را به آن صفحه محدود کنید.
####نمونه فایل TS مخصوص یک صفحه

	import * as $ from "jquery";
	
	export default class NotFound {
		public static initIfNeeded() {
			NotFound.$page = $("body.notfound-page");
			if (NotFound.$page.length) {
				NotFound.init();
			}
		}
		private static $body: JQuery;
		private static init() {
			alert("NotFound Page!");
		}
	}

البته که استفاده از شئ گرایی در Typescript وجود داشته و در این مثال ها چون نیاز نبوده استفاده نشده است.
فایل
##[نصب پکیج ها](#installing_pacakges)
در محیط خط فرمان به مسیر `packages/node_webpack/nodejs` بروید. در این مکان دستور زیر را اجرا و منتظر بمانید:

	$ npm install -- --install

با اجرای دستور بالا تمامی قالب ها شناسایی و پکیج های مورد نیاز نصب میشوند.

##[اجرای webpack](#run_webpack)
در محیط خط فرمان به مسیر `packages/node_webpack/nodejs` بروید. در این مکان دستور زیر را اجرا و منتظر بمانید:

	$ npm install -- --webpack

بعد از اتمام دستور، فایل های نهایی در مسیر `node_webpack/storage/public/frontend/dist` ذخیره میشوند. این فایل ها به صورت خودکار توسط فرم ورک شناسایی و در صفحه قرار داده میشوند.
بعد از هر بار تغییر در کد ها باید مجددا webpack را برای اعمال تغییرات، راه اندازی کنید. میتوانید از حالت Watch استفاده کنید. در این حالت webpack تمامی فایل های شما را نظارت کرده و به محض کوچکترین تغییری که ذخیره شود، مجددا فایل ها کامپایل میکند.

	$ npm install -- --webpack -w

این قابلیت فقط در حالت برنامه نویسی و طراحی سایت کاربرد دارد. برای تولید فایل نهایی برای استفاده از سایت در حالت آماده میتوانید از قابلیت Production استفاده نمایید. در این قابلیت کد های شما فشرده میشوند. در این حالت علاوه بر کم شدن حجم فایل ها در زمان باز شدن صفحه، کد های شما کد شده و قابل خواندن به راحتی نیستند.

	$ npm install -- --webpack --production

####نمونه فایل HTML

	<html>
    <head>
	    <title>Jalno framework </title>
	    <?php ehco $this->loadCSS(); ?>
    </head>
    <body>
	    <div id="div"></div>
	    <?php $this->loadJS(); ?>
    </body>
    </html>

##[قرار دادن سایت بر روی هاست های میزبانی](#installing_site)
برای قراردادن سایت بر روی هاست های میزبانی که شما دسترسی خط فرمان ندارید، میتوانید سایت را به صورت کامل بر روی سیستم برنامه نویس و یا خودتان در حالت production اجرا کنید. پوشه های node_modules در مسیر قالب ها نیازی نبوده و میتوانید آنها را حذف کنید.  یک نسخه ی فشرده از سایت تهیه و بر روی هاست قرار دهید.

