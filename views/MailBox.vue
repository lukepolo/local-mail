<template>
  <main class="flex-1 flex bg-gray-200">
    <mail-box-messages :messages="messages"></mail-box-messages>
    <mail-message :message="message" v-if="message"></mail-message>
    <template v-else>
      <div class="flex-1 text-center mt-20 text-2xl text-gray-600">
        <h1>
          Select a message ...
          <pre>{{ mailboxId }}</pre>
        </h1>
      </div>
    </template>
  </main>
</template>

<script>
import Vue from "vue";
import MailBoxMessages from "@components/MailBoxMessages";
import MailMessage from "@components/message/MailMessage";

export default Vue.extend({
  props: {
    mailboxId: {
      required: false,
    },
    messageId: {
      required: false,
    },
  },
  components: {
    MailMessage,
    MailBoxMessages,
  },
  data() {
    return {
        message : null
    }
  },
  watch : {
    messageId: {
      immediate : true,
      handler(messageId) {
        if(messageId) {
          this.$store.dispatch('mailbox/message/show', {
            messageId,
            mailboxId : this.mailboxId
          }).then((message) => {
            this.message = message;
          })
        }
      }
    }
  },
  computed: {
    messages() {
      return this.$store.state.mailbox.message.messages[this.mailboxId];
    },
  },
});
</script>
