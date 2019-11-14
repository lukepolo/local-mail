import { MailboxState } from "./stateInterface";

export default function() {
  return {
    SET_ALL: (state: MailboxState, mailboxes) => {
      state.mailboxes = mailboxes;
    },
    ADD: (state: MailboxState, mailbox) => {
      state.mailboxes.push(mailbox);
    },
  };
}
