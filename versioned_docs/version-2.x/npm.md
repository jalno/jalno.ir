:::warning
این پکیج منسوخ شده و بروزرسانی نمیشود. برای جایگزینی از پکیج [Node webpack](node_webpack.md) استفاده کنید.
:::

# NPM
برای راحتی کد نویسی و استفاده از پکیج های مختلف [NPM](https://npmjs.org)  میتوانید در فایل معرف هر قالب پکیج های مد نظر را معرفی کنید. فرم-ورک  به صورت خودکار پکیج ها را دانلود وبعد از  کامپایل و در یک فایل در صفحه بارگذاری خواهد کرد

برای استفاده از این قابلیت نیاز هست تا پکیج [Webpack](webpack.md) را برای کامپایل فایل ها در کنار پکیج اصلی استفاده کنید .

:::info
برای اطلاعات بیشتر به صفحه ی [Webpack](webpack.md) مراجعه کنید
:::

نمونه معرفی پکیج ها در فایل معرف قالب
```json
{"type":"package", "name":"bootstrap", "version": "^3.3.7"}
{"type":"package", "name":"jquery", "version": "^3.0.0"}
```

:::info
برای اطلاعات بیشتر به صفحه ی [قالب](frontend.md) مراجعه کنید
:::
