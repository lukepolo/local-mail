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
      <div class="m-4 text-gray-600">
        <div>
          <h1 class="text-2xl">Connection Information</h1>
          <div>
            <h2 class="text-xl font-bold">SMTP</h2>

            <div>
              <div class="font-bold inline-block">
                Host:
              </div>
              <div class="inline-block">
                localhost
              </div>
            </div>
            <div>
              <div class="font-bold inline-block">
                Port:
              </div>
              <div class="inline-block">
                {{ smtpService.getRunningPort() }}
              </div>
            </div>
            <div>
              <div class="font-bold inline-block">
                Host:
              </div>
              <div class="inline-block">
                Username / Password: {{ mailboxId }}
                <clipboard
                  class="inline-block ml-2"
                  :data="mailboxId"
                ></clipboard>
              </div>
            </div>
            <div>
              <div class="font-bold inline-block">
                Auth:
              </div>
              <div class="inline-block">
                PLAIN, LOGIN and CRAM-MD5
              </div>
            </div>
            <div>
              <div class="font-bold inline-block">
                TLS:
              </div>
              <div class="inline-block">
                Optional (STARTTLS on all ports)
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
  import Vue from "vue";
  import MailContent from "@components/mailbox/mail/MailContent";
  import MailBoxMessages from "@components/mailbox/MailboxMessages";
  import Clipboard from "@components/Clipboard";

  export default Vue.extend({
    $inject: ["SmtpService"],
    props: {
      mailboxId: {
        required: false,
      },
      messageId: {
        required: false,
      },
    },
    components: {
      Clipboard,
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
          if (messageId) {
            this.$store
              .dispatch("mailbox/message/show", {
                messageId,
                mailboxId: this.mailboxId,
              })
              .then((message) => {
                this.message = message;
              });
          } else {
            this.message = null;
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
