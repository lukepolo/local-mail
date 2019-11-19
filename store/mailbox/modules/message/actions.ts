import { ActionContext } from "vuex";
import RootState from "@store/rootState";
import { MailboxMessagesState } from "./stateInterface";
import MailBoxMessageService from "@app/services/MailBoxMessageService";

export default function(mailBoxMessageService: MailBoxMessageService) {
  return {
    get: (
      context: ActionContext<MailboxMessagesState, RootState>,
      mailboxId,
    ) => {
      return mailBoxMessageService.get(mailboxId).then((messages) => {
        context.commit("SET", {
          messages,
          mailboxId,
        });
      });
    },
    show: (
      context: ActionContext<MailboxMessagesState, RootState>,
      { mailboxId, messageId },
    ) => {
      return mailBoxMessageService.show(mailboxId, messageId);
    },
  };
}
