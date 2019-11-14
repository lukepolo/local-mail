import { MailboxState } from "./stateInterface";

export default function() {
  return {
    SAMPLE_GETTER: (state: MailboxState) => {
      return state;
    },
  };
}
