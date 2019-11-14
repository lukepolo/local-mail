import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import StoreModule from "varie/lib/state/StoreModule";
import { injectable, inject, unmanaged } from "inversify";
import MailBoxService from "@app/services/MailBoxService";
import MailboxMessageStore from "@store/mailbox/modules/message/MailboxMessageStore";

@injectable()
export default class MailboxStore extends StoreModule {
  constructor(@inject("MailBoxService") mailBoxService: MailBoxService) {
    super();
    this.setName("mailbox")
      .addState(state)
      .addActions(actions(mailBoxService))
      .addMutations(mutations)
      .addGetters(getters)
      .addModule(MailboxMessageStore);
  }
}
