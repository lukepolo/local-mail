import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import StoreModule from "varie/lib/state/StoreModule";
import { injectable, inject, unmanaged } from "inversify";
import MailBoxMessageService from "@app/services/MailBoxMessageService";

@injectable()
export default class MailboxMessageStore extends StoreModule {
  constructor(@inject("MailBoxMessageService") mailBoxMessageService) {
    super();
    this.setName("message")
      .addState(state)
      .addActions(actions(mailBoxMessageService))
      .addMutations(mutations)
      .addGetters(getters);
  }
}
