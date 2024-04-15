# URL Generation

In Jalno, there are three methods for generating URLs that can be accessed in a browser. Each method is used to access different types of files, as described below:

| Method/Function | Purpose |
|---|---|
| `packages\base\url` | Generates links to pages |
| `packages\base\frontend\theme::url` | Generates links to static template files |
| `packages\base\package::url` | Generates links to static package files |


## Language Settings

First, you need to configure the default language, language switch, and language abbreviation settings in the `config.php` file located in the `packages/base/libraries/config` directory.

:::note
If the language settings have been made, the active language will be included in the URL when generating URLs.
:::

### Default Language

You can specify the default language for the site using the `packages.base.translator.defaultlang` option. The value entered must be the full language code.
If this option is not set, it will accept any full language code.
The full language code consists of a two-letter language code_two-letter country code

```php
'packages.base.translator.defaultlang' => 'fa_IR' // or en_US
```

### Allowed Languages for Language Change

The `packages.base.translator.active.langs` option is used to specify the languages that can be switched in the project.

This is useful when your project has translation files for 3 languages but you only want 2 of them to be active. By defining the languages in this option, you can prevent the site from opening in the third language.

:::note
The default language is considered an allowed language for language change even if it is not defined in this option.
:::

**Example:**
```php
'packages.base.translator.defaultlang' => 'en_US',
'packages.base.translator.active.langs' => array(
    "fa_IR",
)
```
### Language Switch

The `packages.base.translator.changelang` option is used to specify how the user can specify the language.
It can have three values:

| Value | Purpose |
|---|---|
| `uri` | Language is added to the beginning of the URL |
| `parameter` | Added to the end of the URL |
| Empty | Users cannot change the language directly |

**Example uri:**
````
/fa/contactus 
````

**Example parameter:**
````
/contactus?lang=fa
````

**Example of empty:** Language is not added to the URL
````
/contactus
````
### Language Abbreviation

The `packages.base.translator.changelang.type` option allows you to abbreviate the language in the URL.
The option takes the values `short`, `complete`.

**Example** 
```php
'packages.base.translator.changelang.type' => 'short'  // fa
'packages.base.translator.changelang.type' => 'complete'    //fa_IR
```

**Example config.php file**
```php
'packages.base.translator.defaultlang' => 'fa_IR',
'packages.base.translator.changelang' => 'parameter', //uri, parameter
'packages.base.translator.changelang.type' => 'complete', //short, complete
```


## Linking to Pages

To link to pages, use the `packages\base\url` function.
This function takes three arguments:

### First Argument

The first argument takes the URL of the page you want to access, which is defined in the `routing.json` file.

:::info
For more information, please refer to the [Routing page](routing.md).
:::

Example routing.json file
```json 
[
    {
        "path": "/",
        "controller": "controllers/Main@index"
    },
    {
        "path": "about-us",
        "controller": "controllers/Main@aboutus"
    }
]
```

You can import the url as `function packages\base\url` in the file to be used.

**Example 1**
```php
<?php
namepsacep packages\packagename\controllers;

use function packages\base\url;
use packages\base\{Controller, Response};

class Main extends Controller {
    public function index(): Response {
        $response = new Response(true);
        $response->Go(url("about-us")); // redirect to about us page
        return $response;
    }
}
```

**Example 2**
```php
<?php
namepsacep packages\packagename\controllers;

use packages\base;
use packages\base\{Controller, Response};

class Main extends Controller {
    public function index(): Response {
        $response = new Response(true);
        $response->Go(base\url("about-us")); // redirect to about us page
        return $response;
    }
}
```
### Second Argument

The second argument takes a `key => value` array that specifies the URL parameters.
The key of each element in the array is the parameter key and the value is the parameter value.

**Example**
```php
use function packages\base\url;

// domain is domain.com

echo url("users", ["id" => 1]);
/**
 * Output is:
 * /en/users?id=1 or
 * /users?id=1&lang=en or
 * /users?id=1 // if the Site isn't multi languages
 */
```

Within the Jalno framework, the indexes `@hostname`, `@lang`, and `@encode` are reserved in this array. They have functionalities beyond defining URL parameters:

**@lang:** This index allows you to specify the desired language for the URL. The value of this index can be a two-letter language code. You can only set the language if the site is multilingual and language settings are configured in the `config.php` file located in `packages/base/libraries/config`.

**Example**
```php
use function packages\base\url;


echo url("login", ["@lang" => "fa"], true);
/**
 * Output is:
 * https://domain.com/fa/login  or
 * https://domain.com/login/?%40lang=fa   
**/
```


**@hostname:** This index is used to generate a URL with a different hostname instead of the main site domain. To change the domain, you need to set the third argument of the `packages\base\url` function to `true`.

If the third argument is `false`, `@hostname` is added as a parameter to the end of the URL.

**Example 1**
```php
use function packages\base\url;


echo base\url("login", ["@hostname" => "domain.com"], true);
/**
 * Output is:
 * https://domain.com/en/login  or
 * https://domain.com/login/?lang=en   or
 * https://domain.com/login     // if the Site isn't multi languages

```

**Example 2**
```php
use function packages\base\url;


echo url("login", ["@hostname" => "domain.com"], false);
/**
 * Output is:
 * /en/login?%40hostname=domain.com  or
 * /login/?%40hostname=domain.com&lang=en   or
 * /login/?%40hostname=domain.com     // if the Site isn't multi languages

```

**@encode:** This index is used to specify the encoding of the page.

:::note
All arguments of the `base\url()` function are optional. If no arguments are passed to the function, it returns the main domain address.
:::

:::info
When using the `packages\base\url` function for linking pages, it automatically includes the active language in the URL.

For more information, please refer to the [Translator page](translator.md).
:::


**Example 1 :** 
```php
<?php
use packages\base;
?>
<!DOCTYPE html>
<html>
<body>

<h1>
   <a href="<?php echo base\url(); ?>"> home page </a> 
</h1>

/*output
    <a href="/"> home page </a> 
*/

</body>
</html>
```

**Example 2 :** 
```php
/*
Example config.php:
    'packages.base.translator.defaultlang' => 'fa_IR',
    'packages.base.translator.changelang' => 'uri',
    'packages.base.translator.changelang.type' => 'short'
*/ 
<?php
use packages\base;
?>
<!DOCTYPE html>
<html>
<body>

<h1>
   <a href="<?php echo base\url('about-us'); ?>"> about us </a> 
</h1>

/*output
    <a href="/fa/about-us"> about us </a> 
*/

</body>
</html>
```

**Example 3 :** 
```php
/*
Example config.php:
    'packages.base.translator.defaultlang' => 'fa_IR',
    'packages.base.translator.changelang' => 'uri',
    'packages.base.translator.changelang.type' => 'short'
*/    
<?php
use packages\base;
?>
<!DOCTYPE html>
<html>
<body>

<h1>
   <a href='<?php echo base\url("about-us", ["@hostname" => "test.com", "@lang" => "en", "key" => "value", "key2" => "value2"], true); ?>'> about us </a> 
</h1>

/*output
    <a href="http://test.com/en/about-us?key=value&key2=value2"> about us </a> 
*/

<h1>
   <a href='<?php echo base\url("about-us", ["@hostname" => "test.com", "@lang" => "en"]); ?>'> about us </a> 
</h1>

/*output
    <a href="/en/about-us?%40hostname=test.com"> about us </a> 
*/

</body>
</html>
```

**Example 4 :** 
```php
/*
Example config.php:
    'packages.base.translator.defaultlang' => 'fa_IR',
    'packages.base.translator.changelang' => 'parameter',
    'packages.base.translator.changelang.type' => 'complete'
*/    
<?php
use packages\base;
?>
<!DOCTYPE html>
<html>
<body>

<h1>
   <a href='<?php echo base\url("about-us", ["@hostname" => "test.com", "@lang" => "en"],true); ?>'> about us </a> 
</h1>

/*output
    <a href="http://test.com/about-us?%40lang=en_US"> about us </a> 
*/

<h1>
   <a href='<?php echo base\url("about-us", ["@hostname" => "test.com", "@lang" => "en", "key" => "value"]); ?>'> about us </a> 
</h1>

/*output
    <a href="/about-us?%40hostname=test.com&%40lang=en_US&key=value"> about us </a> 
*/

</body>
</html>
```

**Example 5 :** 
```php
/*
Example config.php:
    'packages.base.translator.defaultlang' => 'en_US',
    'packages.base.translator.changelang' => 'uri',
    'packages.base.translator.changelang.type' => 'short'
*/
<?php
namespace packages\my_package\controllers;
use packages\base\{response, controller};
use packages\my_package\User;

class User extends controller {

    public function delete($user): response {
        $user = User::byId($user['id']);
        if($user) {
            $user->delete();
            $this->response->setStatus(true);
            $this->response->Go(base\url('users'));
            /*
                /en/users
            */
        }
        return $this->response;
    }
}
?>
```

**Example 6 :** 
```php
/*
Example config.php:
    'packages.base.translator.defaultlang' => 'en_US',
    'packages.base.translator.changelang' => 'parameter',
    'packages.base.translator.changelang.type' => 'complete'
*/
<?php
namespace packages\my_package\controllers;
use packages\base\{response, controller};
use packages\my_package\User;

class User extends controller {

    public function insert(): response {

        $inputs = array(
            'name' => array(
                'type' => 'string'
            ),
            'lastname' => array(
                'type' => 'string',
                'optional' => true,
            ),
            'email' => array(
                'type' => 'email',
            )
        );
        $formdata = $this->checkinputs($inputs);
        $user = new User($formdata);
        $user->save();
        $this->response->Go(base\url('user/view/'.$user->id));
        /*
            /user/view/1?%40lang=en_US
        */
        return $this->response;
    }
}
?>
```


### Third Argument
The third argument is used to generate a complete URL. If set to `true`, the complete URL is generated, including the protocol (http:// or https://). The default value of this argument is `false`.


:::note
If the third argument is set to `true` and `@hostname` is provided in the second argument, the value of `@hostname` is considered the main domain.
:::

Here are some examples illustrating the third argument:


**Example 1:**
```php
use function packages\base\url;

// domain is domain.com
echo url("login", [], false); // default is false
/**
 * Output is:
 * /en/login   or
 * /login/?lang=en  or
 * /login   // if the Site isn't multi languages
*/
```

**Example 2:** 
```php
use function packages\base\url;

// domain is domain.com
echo url("login", [], true);
/**
 * Output is:
 * https://domain.com/en/login  or
 * https://domain.com/login/?lang=en   or
 * https://domain.com/login     // if the Site isn't multi languages
 */
```

**Example 3:**
```php
use function packages\base\url;

// domain is domain.com
echo url("login", ["@hostname" => "newdomain.com"], true);
/**
 * Output is:
 * https://newdomain.com/en/login  or
 * https://newdomain.com/login/?lang=en   or
 * https://newdomain.com/login     // if the Site isn't multi languages
 */
```


## Linking to Static Frontend Assets
To access static files within templates, such as images, use the `packages\base\frontend\theme::url` method. The argument passed to this method is the path to the file within the template.

**Example 1:**
```php
<?php
use packages\base\frontend\theme;
?>

<!DOCTYPE html>
<html>
<body>

    <img src="<?php echo theme::url('assets/images/img.jpg');?>">

    /*output
        <img src="/packages/my_package/frontend/assets/images/img.jpg');?>">
    */

</body>
</html>
```

## Linking to Static Package Assets

To access files within a package, use the `packages\base\package::url` method.

### Storage Directories

Package files that the program needs to use at runtime have different access levels. Therefore, each file should be stored in a folder that corresponds to its access level.

Generally, files have access levels of `public`, `protected`, and `private`. They should be stored in the folders `storage/public`, `storage/protected`, and `storage/private`, respectively. Here's a breakdown of their access levels:

**public:** Files with unrestricted access are stored in the `storage/public` folder. Users can access them through the browser and other packages can access them through code if they have the file address.

**protected:** These files can only be accessed by packages and are not accessible to users through the browser. They are stored in the `storage/protected` folder. Packages can freely access files in the `storage/protected` folder using code if they have the file address.

**private:** These files are stored in the `storage/private` folder and can only be accessed by the same package through code.

**Example 1 :**
```php
<?php
namespace packages\my_package\controllers;
use packages\base\{response, controller, Packages};

class Main extends controller {

    public function document(): response {

        $doc = packages::package("my_package")->url("storage/public/doc.pdf");
        $this->response->Go($doc);
        return $this->response;
    }
}
?>
```

**Example 2 :**
```php
<?php
use function packages\base\url;
use package\base\Packages;


<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"  data-target="#navbar-collapse" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        <a class="navbar-brand" href="#">Jalno.ir</a>
    </div>
    <div class="collapse navbar-collapse" id="navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
            <li><a href="<?php echo url("dashboard"); ?>">Dashboard</a></li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <img src="<?php echo Packages::package("packagename")->url("public/user_avatars/{$this->user->id}-avatar.jpg"); ?>" alt="<?php echo $this->user->name; ?>">
                    <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="<?php echo url("profile"); ?>">My Profile</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="<?php echo url("logout"); ?>">Logout</a></li>
                </ul>
            </li>
        </ul>
        </div>
    </div>
</nav>
```