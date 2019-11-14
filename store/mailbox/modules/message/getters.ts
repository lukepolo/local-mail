import { MailboxMessagesState } from "./stateInterface";

export default function() {
  return {
    SAMPLE_GETTER: (state: MailboxMessagesState) => {
      return state;
    },
  };
}
