# Controller 

The controller is called by the router. It serves as an interface between the model and the view.

```php title="controllers/Main.php"
namespace packages\packagename\controllers;

use packages\base\{Response, Controller, NotFound, View};
use packages\packagename\views;

class Main extends Controller
{
    public function index(): Response
    {
        $view = View::byName(views\index::class);
        $response = new Response(true);
        $response->setView($view);
        return $response;
    }
}
```

The responsibilities of the controller include validation, interaction with models and therefore databases, and returning responses.   
If the router has parameters, it will take and process them. If it needs to display a page, it creates an object of the `View` class and returns it in the response.

:::info
For more information, refer to the [Response](response.md) page.
:::

```php title="controllers/Posts.php"
namespace packages\packagename\controllers;

use packages\base\{Response, Controller, NotFound, View};
use packages\packagename\{views, Post};

class Posts extends Controller
{
    public function view($data): Response
    {
        $post = Post::byId($data['post_id']);
        if (!$post) {
            throw new NotFound();
        }
        $view = View::byName(views\posts\View::class);
        $view->setPost($post);

        $response = new Response(true);
        $response->setView($view);
        return $response;
    }
}
```
In the controller, to prevent the program from stopping after throwing model exceptions and validation, you should predict and write an appropriate catch for each exception. It catches each exception, prepare it for response, and sends it to the `View` for display.   
It also validates data sent via the form before any action based on type (and specified conditions). If there is a validation problem, it gets the validation response and stores it in the `View` for display to the user.

:::info
For more information, refer to the [Validation](validation.md) page.
:::

```php title="controllers/Auth.php"
namespace packages\packagename\controllers;

use function packages\base\url;
use packages\base\{Controller, Response, InputValidationException, views\FormError};
use packages\packagename\User;

class Auth extends Controller
{
    public function login(): Response
    {
        $response = new Response(false);
        $view = View::byName(views\Login::class);
        $response->setView($view);
        try {
            $inputs = $this->checkinputs([
                "username" => array(
                    "type" => "email",
                ),
                "password" => array()
            ]);
            $query = new User();
            $query->where("email", $inputs["username"]);
            $query->where("password", md5($inputs["password"]));
            if (!$user->has()) {
                throw new InputValidationException("username");
            }
            $response->setStatus(true);
            $response->Go(url("userpanel"));
        } catch(InputValidationException $e) {
            $view->setFormError(FormError::fromException($e));
        }
        return $response;
    }
}
```
