import RouterInterface from "varie/lib/routing/RouterInterface";

import middleware from "./middleware";
import ErrorViews from "@views/errors";
import MailBox from "@views/MailBox.vue";
import Developer from "@views/Developer.vue";

export default function($router: RouterInterface) {
  /*
  |--------------------------------------------------------------------------
  | Your default routes for your application
  |--------------------------------------------------------------------------
  |
  */
  $router.route("/", MailBox);

  $router.route("/developer", Developer);

  $router.prefix("/mailbox/:mailboxId").group(() => {
    // TODO - fix varie-framework
    // @ts-ignore
    $router.route("/", MailBox, true);
    // @ts-ignore
    $router.route("/message/:messageId", MailBox, true);
  });

  $router.route("*", ErrorViews.Error404);
}
