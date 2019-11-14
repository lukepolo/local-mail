import { MailboxMessagesState } from "./stateInterface";

export default function() {
  return {
    SET: (state: MailboxMessagesState, { mailboxId, messages }) => {
      state.messages[mailboxId] = messages;
      state.messages = Object.assign({}, state.messages);
    },
    ADD: (state: MailboxMessagesState, message) => {
      if (state.messages[message.mailboxId]) {
        state.messages[message.mailboxId].unshift(message);
      }
    },
  };
}
