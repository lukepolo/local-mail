<template>
  <main class="flex-1 flex bg-gray-200">
    <mail-box-messages :messages="messages"></mail-box-messages>
    <template v-if="message">
      <mail-content
        class="flex-1 flex flex-col w-0 overflow-hidden"
        :message="message"
      ></mail-content>
    </template>
    <template v-else>
      <div class="flex-1 text-center mt-20 text-2xl text-gray-600">
        <h1>
          Select a message ...
          <pre>MailboxID : {{ mailboxId }}</pre>

          To continue blah blah blah.

          <i class="fa fa-trash"></i>
          Delete this crap
        </h1>
      </div>
    </template>
  </main>
</template>

<script>
  import Vue from "vue";
  import MailContent from "@components/mailbox/mail/MailContent";
  import MailBoxMessages from "@components/mailbox/MailboxMessages";

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
      MailContent,
      MailBoxMessages,
    },
    data() {
      return {
        message: null,
      };
    },
    watch: {
      messageId: {
        immediate: true,
        handler(messageId) {
          this.message = null;
          if (messageId) {
            this.$store
              .dispatch("mailbox/message/show", {
                messageId,
                mailboxId: this.mailboxId,
              })
              .then((message) => {
                this.message = message;
              });
          }
        },
      },
    },
    computed: {
      messages() {
        return this.$store.state.mailbox.message.messages[this.mailboxId];
      },
    },
  });
</script>
