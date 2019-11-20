<template>
  <form @submit.prevent="sendTestToMailbox" class="bg-gray-200">
    <input type="text" v-model="form.mailboxId" />
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Send Test
    </button>
  </form>
</template>

<script>
  import Vue from "vue";
  export default Vue.extend({
    $inject: ["SmtpService"],
    data() {
      return {
        form: this.createForm({
          mailboxId: "",
        }),
      };
    },
    methods: {
      sendTestToMailbox() {
        this.smtpService.sendTestToMailbox(this.form.mailboxId).then(
          () => {
            this.alertService.success(
              `You have sent a test email to  ${this.form.mailboxId}`,
            );
            this.form.reset();
          },
          () => {
            this.alertService.error(`We failed to send the email.`);
          },
        );
      },
    },
  });
</script>
