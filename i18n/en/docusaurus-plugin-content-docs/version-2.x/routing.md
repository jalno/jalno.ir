# Routing

HTTP routing done by handing over a request from a browser to a controller after receiving it to open a specific address.

The framework does this based on the rules defined in the packages. These rules are defined by specifying the address, domain, protocol and method.

## Settings

To configure routing, you need to refer to the `config.php` file located in the `packages/base/libraries/config` directory.

### Domain Settings

When you want the site to be accessible through other domains or subdomains in addition to the main domain, you need to specify the domains or subdomains in the `packages.base.router.defaultDomain` option.

```php
'packages.base.router.defaultDomain' => ['panel.domain.com', 'domain.com']
```

### Protocol Settings

To set the protocol, use the `packages.base.routing.scheme` option. The protocol set for each option will automatically redirect the framework to the set option when the site is opened.

For example, if the site has a certificate and this option is set to 'https', if the site is in http mode, it will automatically redirect to https.

```php
'packages.base.routing.scheme' => 'http' // https
```


### Trailing Slash

If the `packages.base.routing.lastslash` option is set to true, a slash is added to the end of the address when the URL address is opened.


```php
'packages.base.routing.lastslash' => true //false
```

**Example**

```php
'packages.base.routing.lastslash' => true
/*
  url: domain.com/fa/contact-us/
*/
```

**Example**

```php
'packages.base.routing.lastslash' => false
/*
  url: domain.com/fa/contact-us
*/
```

### www Settings

To use `www` along with the domain, use the `packages.base.routing.www` option.

If the option has the value `withwww`, if we enter domain.com, www. will be added to the beginning of it.

If it has the value `nowww`, if we enter the address [www.domain.com](https://www.domain.com), www. will be removed from the beginning of the address.

:::note
In any case the option is set, if the site is opened in another mode, Jalno will automatically redirect to the set mode.
:::

For example, if the option has the value `withwww` and the address is entered as domain.com, Jalno will redirect to the address [www.domain.com](https://www.domain.com).

```php
'packages.base.routing.www' => 'nowww' // withwww
```

## Route

A Route is one of the most common routing rules. In Jalno, you have the ability to define three types of routes.

In Jalno, for each route, you can define the following properties:

| Property | Description |
|---|---|
| path | path part of URL  |
| controller | Corresponding method in the controller |
| method | HTTP method(s) |
| domain | Domain |
| absolute | Determine whether to add the language to the address |
| scheme | Protocol |
| middleware | Middleware calls before controller |
| exceptions | Exception handler |
| name | Specify a unique name for each path |
| permissions | Required permissions |

### Static Path

These paths are constant and are not supposed to handle mutiple URLs.


```json title="routing.json"
[{
  "path": "panel/news/posts",
  "controller": "controllers/panel/News@posts",
  "method": "get"
}]
```

You can also use the old way:


```json title="routing.json"
[{
  "path": ["panel", "news", "posts"],
  "controller": "controllers/panel/News@posts",
  "method": "get"
}]
```

### Dynamic Path

Dynamic route are generally composed of a combination of a fixed part as a prefix or suffix and dynamic parts. This type of path is a great replacement for Query Parameters and will ultimately increase user popularity for understanding, retaining and sharing addresses.

Each dynamic part in the address will have a name for identification and use in the controller.

The dynamic part of the address is defined as `:key` in the `path` characteristic.


```json title="routing.json"
[{
  "path": "news/view/:post",
  "controller": "controllers/News@view",
  "method": "get"
}]
```

Now, if a user opens the address `news/view/10`, the framework will pass over the request to the view method of News controller with an array as  first argument of the method with the value `["post"=>10"]` for the programmer to use.


```php title="controllers/News.php"
<?php
namespace packages\packagename\controllers;
use packages\base;
use packages\base\{response, NotFound};
use packages\packagename\{controller, view, views, news as newsObject};

class News extends controller {
  public function view($data): response {
    $news = new newsObject();
    $news->where("status", 1);
    $news->where("id", $data["post"]);
    if (!$news = $news->getOne()) {
      throw new NotFound();
    }
    $response = new response();
    $view = view::byName(views\news\view::class);
    $view->setNews($news);
    $response->setView($view);
    $response->setStatus(true);
    return $response;
  }
}
```

```json  title="routing.json With two dynamic parts"
[{
  "path": "book/:book/:page",
  "controller": "controllers/Book@page",
  "method": "get"
}]
```

In the above example, when the user opens the address `book/80/11`, the controller will receive the array `["book" => '80', "page" => '11']`

#### Regex Path

In dynamic routes where a part of the address is variable, we can use the `regex` property to manage it. The value of regex specifies the rule for the dynamic expression of the address.


:::note
When using regex, the `name` property must be used to specify the name of the dynamic variable. Additionally, the `type` property must be defined as `dynamic` (or `wildcard` for multiple addresses).
:::

```json title="routing.json"
[{
  "path": [
    "userpanel/logs/view/",
    { "type": "dynamic", "name": "log", "regex": "/^\\d+$/" }
  ],
  "controller": "controllers/Logs@view",
  "method": "get"
}]
```
In the above example, the dynamic part of the address must be an integer.

```json title="routing.json"
[{
  "path": [
    "book",
    { "type": "dynamic", "name": "book", "regex": "/^\\d+$/" },
    { "type": "dynamic", "name": "page", "regex": "/^\\d+$/" }
  ],
  "controller": "controllers/Book@page",
  "method": "get"
}]
```

## Wildcard Path

Wildcard routes represent a form of indefinite repetition of dynamic parts and are useful when you do not know the number of dynamic parts.


```json title="routing.json"
[{
  "path": "files/download/:path...",
  "controller": "controllers/Files@download",
  "method": "get"
}]
```

In the above example, any number of dynamic expressions is acceptable. For instance, if the address `files/download/images/summer/5` is entered, the value `["path" => "images/summer/5"]` is sent to the controller.

You can also utilize the old method. In the old method, for wildcard addresses, the `type` property must be defined as `wildcard`.


```json title="routing.json"
[{
  "path": ["files", "download", { "type": "wildcard", "name": "path" }],
  "controller": "controllers/Files@download",
  "method": "get"
}]
```

## Domain


Unlike `path`, setting `domain` in each route is not mandatory and in most cases not even necessary. With this property, you can specify on which domain(s) exclusively this rule should apply if the app has more than one domain. If not set, this rule will be active for all domains.

:::note
If we want to have subdomains with variable names, we can use regular expressions in the domain name.
:::

```json title="routing.json"
[{
  "path": ["news", { "name": "post", "regex": "/^\\d+$/" }],
  "controller": "controllers/News@view",
  "method": "get",
  "absolute": true,
  "permissions": {
      "api": true
  },
  "domain": "news.yourdomain.com"
}]
```
In the above example, since the page is used for API and has no specific language, the value of `absolute` is set to true, and the language is not added to the address.


```json title="routing.json with regex domain"
[{
  "path": "product-list/:id",
  "controller": "controllers/Pages@productList",
  "domain": "/^([a-z0-9\\-]+)\\.domain\\.com$/"
}]
```

```json title="routing.json mutiple domains"
[{
  "path": ["news", { "name": "post", "regex": "/^\\d+$/" }],
  "controller": "controllers/News@view",
  "method": "get",
  "absolute": true,
  "domain": ["news.yourdomain.com", "yourdomain.com"]
}]
```

In the above example, if the domain is defined as `"domain":["news.yourdomain.com"]`, and the site is searched with the address `yourdomain.com/news/1`, because the domain `yourdomain.com` is not defined for it, we receive a `NotFound` exception.

## Scheme

Setting the protocol in rules is not mandatory, but if you want a rule to apply only to a specific protocol, write one of the two values "http" or "https" on "scheme". Otherwise, that rule will be active for both protocols.


```json title="routing.json"
[{
  "path": "panel",
  "controller": "controllers/Panel@dashboard",
  "method": "get",
  "scheme": "https"
}]
```

## Method

Setting restrictions on a route based on http method is done by setting an value "GET" or "POST" in front of the key "method".



In the example below, when the address `panel/news/posts/add` is opened normally in the browser, the GET route is activated. And when a form with the action post is submitted, the `POST` route is activated.


```json title="routing.json"
[
  {
    "path": "panel/news/posts/add",
    "controller": "controllers/panel/News@add",
    "method": "get"
  },
  {
    "path": "panel/news/posts/add",
    "controller": "controllers/panel/News@store",
    "method": "post"
  }
]
```

If we want to use both methods (POST, GET) in the controller, we proceed as follows.

```json title="routing.json"
[{
  "path": "panel/news/posts/add",
  "controller": "controllers/panel/News@add",
  "method": ["get", "post"]
}]
```

## Exceptions

To handle and route exceptions, you can use the `exceptions` property. By using this property, when the program encounters an exception, instead of displaying the error to the user, the exception is sent to the designed controller for handling it.

Multiple exceptions can be defined in this property.

:::note
The `paths` property in this section determines the scope of the address which this exception will handle. Multiple values can be defined for this property.
:::

In the example below, if the program encounters a `NotFound` exception, the handler is only executed when the address begins with `userpanel`, such as the address `userpanel/users/view/7`.

```json title="routing.json"
[{
    "paths": ["userpanel/"],
    "exceptions": ["/packages/base/NotFound"],
    "handler": "controllers/Dashboard@notFound"
}]
```

```php title="controllers/Users.php"
use packages\base\NotFound;

class Users extends Controller
{
  public function view()
  {
    $user = User::byId($data['id']);
    if(!$user) {
      throw new NotFound;
    }
  }
}
```

According to the above example, if the address `userpanel/users/view/7` is opened in the browser and there is no user with ID 7, a `NotFound` exception is thrown, preventing further execution of the program.

```json title="routing.json"
[{
    "paths": ["userpanel/", "/news"],
    "exceptions": ["/packages/base/NotFound", "/packages/base/NoViewException"],
    "handler": "controllers/dashboard@notfound"
}]
```

In the above example, all addresses that start with `userpanel` or `news` and encounter `NotFound` or `NoViewException` exceptions are sent to the defined handler controller.

## Middleware

The `middleware` property is executed before the controller. When this property is defined, the middleware is called first, then the desired processing is performed, and then the execution flow is passed to the controller.

Multiple middlewares can be defined for each address.

Furthermore, middleware defined in other packages can also be utilized.

Middleware is useful when we have similar processing in multiple controllers; we use middleware to prevent code duplication.

```json title="routing.json"
[{
    "path": "panel/news/posts/add",
    "controller": "controllers/panel/News@add",
    "method": ["get", "post"],
    "middleware": "middlewares/CheckAccess@localIP"
}]
```

```json title="routing.json"
[{
    "path": "panel/news/posts/add",
    "controller": "controllers/panel/News@add",
    "method": ["get", "post"],
    "middleware": [
      "middlewares/CheckAccess@localIP",
      "packages/another_package/middlewares/APIChecker@apikey"
    ]
}]
```

In the above examples, `localIP` is called first and then `apikey`.

```php title="middlewares/CheckAccess.php"
namespace packages\my_package\middlewares;

use packages\base\{Http, NotFound};

class CheckAccess
{
  public function localIP(): void
  {
    if (http::$client['ip'] != '127.0.0.1')
    {
      throw new NotFound();
    }
    echo http::$client['ip'];
  }
}
```

## Absolute Routes

The `absolute` property determines whether the language should be added to the route or not; it takes a boolean value. The default value for this property is `false`.

If the value of absolute is set to `false`, the language is added to the route. For example, if the route is `userpanel/test`, it will be converted to `fa/userpanel/test`.

Also, if absolute is set to `true`, the route remains the same as it was. `true` is used when the language is not important on that page, such as the API endpoints.

```json title="routing.json"
[{
    "path": ["news", { "type": "dynamic", "name": "post", "regex": "/^\\d+$/" }],
    "controller": "controllers/News@view",
    "method": "get",
    "absolute": true
}]
```

## Permissions

The `permissions` property determines access to the specified endpoint via `api` and `ajax`. Its values can be `true`, `false`, or a method used to check access to the page (the method must return boolean).


If either of the items (`api`, `ajax`) has a value of `false`, the route is not accessible in that mode. Similarly, if they have a value of `true`, access is allowed.

For example, if `api` is `false` and `ajax` is `true`, the route is not accessible in the API mode but is accessible in the AJAX mode.

```json title="routing.json"
[{
    "path": "news",
    "controller": "controllers/News@view",
    "method": "get",
    "absolute": true,
    "permissions": {
      "api": true
    }
}]
```

In the above example, since the language segment is not needed in the API mode, the `absolute` property is set accordingly.


```json title="routing.json"
[{
    "path": ["book", { "name": "book", "regex": "/^\\d+$/" }],
    "controller": "controllers/Books@view",
    "method": "get",
    "permissions": {
      "ajax": "controllers/Auth@apiCheck",
      "api": "controllers/Auth@apiCheck"
    }
}]
```

```php title="controllers/Auth.php"
use packages\base\Http;

class Auth
{
  public function apiCheck(): bool
  {
    if (!isset(Http::$data['app']) or empty(Http::$data['app']) ) {
      return false;
    }
    self::$app = App::where("token", Http::$data['app'])->getOne();

    return !empty(self::$app);
  }
}
```

### Customizing Ajax, API responses

If the `permissions` property for the route is `true` in ajax mode, when the value ajax=1 is set at the end of the URL (e.g., domain.com?ajax=1), View data is responded in `json` format. And if it's `false`, null is received.
The above cases also apply to api.

:::info
For more information on how to respond to AJAX, API requests, refer to the [Response page](response.md).
:::

The `export` method in the class `packages\base\views\ListView` is written to respond to api and ajax requests. To customize the data sent in the response, override this method in the app's view section.


```php title="views/users/search.php"
use packages\base\views\ListView;

class Search extends ListView {
  public function export(): array
  {
    $original = parent::export();
    $original['data']['items'] = array_map(function($log) {
      return array(
        'id' => $log->id,
        'name' => $log->name,
        'lastname' => $log->lastname
      );
    }, $this->dataList);
    return $original;
  }
}
```
In the above example, only name, lastname, and id are sent in the response instead of all the information.

```json title="Http Response"
{
  "status": true,
  "items": [
    { "id": 1, "name": "zahra", "lastname": "mohammadi" },
    { "id": 2, "name": "reza", "lastname": "rezayi" }
  ],
  "items_per_page": 25,
  "current_page": 1,
  "total_items": 2
}
```

If the export() method is not overridden, the result will be as follows:
```json  title="Http Response"
{
  "status": true,
  "items": [
    {
      "id": 1,
      "name": "zahra",
      "lastname": "mohammadi",
      "email": "zahra@example.com",
      "cellphone": "09131234567",
      "address": null,
      "web": null,
      "lastonline": 1587798956,
      "status": 1
    },
    {
      "id": 2,
      "name": "reza",
      "lastname": "rezayi",
      "email": "reza@example.com",
      "cellphone": "09137654321",
      "address": null,
      "web": null,
      "lastonline": 1587785947,
      "status": 1
    },
  ],
  "items_per_page": 25,
  "current_page": 1,
  "total_items": 2
}
```
