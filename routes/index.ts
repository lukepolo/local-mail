import RouterInterface from "varie/lib/routing/RouterInterface";

import middleware from "./middleware";
import ErrorViews from "@views/errors";
import Home from "@views/Home.vue";

export default function($router: RouterInterface) {
  /*
  |--------------------------------------------------------------------------
  | Your default routes for your application
  |--------------------------------------------------------------------------
  |
  */
  $router.route("/", Home);
  // TODO - fix varie-framework
  // @ts-ignore
  $router.route("/mailbox/:mailboxId", Home, true);

  $router.route("*", ErrorViews.Error404);
}
