import { MailboxMessagesState } from "./stateInterface";

export default function() {
  return {
    SET: (state: MailboxMessagesState, { mailboxId, messages }) => {
      state.messages[mailboxId] = messages || [];
      state.messages = Object.assign({}, state.messages);
    },
    ADD: (state: MailboxMessagesState, message) => {
      console.info("ADD", message);
      let mailboxId = message.mailboxId;
      if (state.messages[mailboxId]) {
        state.messages[message.mailboxId].unshift(message);
      }

      if (!state.viewing[message.mailboxId]) {
        state.viewing[message.mailboxId] = message;
        state.viewing = Object.assign({}, state.viewing);
      }
    },
    VIEW: (state: MailboxMessagesState, message) => {
      state.viewing[message.mailboxId] = message;
      state.viewing = Object.assign({}, state.viewing);
    },
  };
}
