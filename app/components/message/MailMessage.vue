<template>
  <div class="flex-1 flex flex-col w-0 overflow-hidden">
    <mail-message-header></mail-message-header>
    <div class="p-3 flex-1 overflow-y-auto">
      <mail-message-reply></mail-message-reply>
    </div>
  </div>
</template>

<script>
import MailMessageReply from "@components/message/MailMessageReply";
import MailMessageHeader from "@components/message/MailMessageHeader";
export default {
  components: {
    MailMessageReply,
    MailMessageHeader,
  },
  props: {
    message: {
      required: true,
    },
  },
};
</script>
