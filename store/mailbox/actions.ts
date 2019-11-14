import { ActionContext } from "vuex";
import RootState from "@store/rootState";
import { MailboxState } from "./stateInterface";
import MailBoxService from "@app/services/MailBoxService";

export default function(mailBoxService: MailBoxService) {
  return {
    get: (context: ActionContext<MailboxState, RootState>) => {
      return mailBoxService.get().then((mailboxes) => {
        context.commit("SET_ALL", mailboxes);
      });
    },
    create: (context: ActionContext<MailboxState, RootState>, { name }) => {
      return mailBoxService.create(name).then((mailbox) => {
        context.commit("ADD", mailbox);
      });
    },
  };
}
