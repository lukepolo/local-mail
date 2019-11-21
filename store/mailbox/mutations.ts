import { MailboxState } from "./stateInterface";

export default function() {
  return {
    SET_ALL: (state: MailboxState, mailboxes) => {
      state.mailboxes = mailboxes;
    },
    ADD: (state: MailboxState, mailbox) => {
      state.mailboxes.push(mailbox);
    },
    REMOVE: (state: MailboxState, mailbox) => {
      state.mailboxes.splice(
        state.mailboxes.findIndex((_mailbox) => {
          return _mailbox._id === mailbox._id;
        }),
        1,
      );
    },
  };
}
