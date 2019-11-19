<template>
  <div class="flex-1 flex flex-col w-0 overflow-hidden">
      <pre>{{ $route.path }}</pre>
    <mail-message-header :message="message"></mail-message-header>
    <iframe :srcdoc="message.html" class="w-full h-full"></iframe>
  </div>
</template>

<script>
import MailMessageHeader from "@components/message/MailMessageHeader";
export default {
  components: {
    MailMessageHeader,
  },
  props: {
    message: {
      required: true,
    },
  },
};
</script>
