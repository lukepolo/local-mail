import Routes from "@routes";
import RouterInterface from "varie/lib/routing/RouterInterface";
import { RoutingServiceProvider as ServiceProvider } from "varie";

/*
|--------------------------------------------------------------------------
| Route Service Provider
|--------------------------------------------------------------------------
|
*/
export default class RoutingServiceProvider extends ServiceProvider {
  public $router: RouterInterface;

  public async boot() {
    super.boot();

    // ...

    // TODO - fix varie-framework
    // console.info(this.$router.routes);
  }

  public async register() {
    super.register();

    // ...
  }

  map() {
    this.$router.register(Routes);
  }
}
