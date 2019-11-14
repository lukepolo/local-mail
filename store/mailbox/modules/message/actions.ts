import { ActionContext } from "vuex";
import RootState from "@store/rootState";
import { MailboxMessagesState } from "./stateInterface";

export default function(mailBoxMessageService) {
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
  };
}
