<template>
  <div class="z-30 w-64 bg-gray-100 border-r overflow-y-auto">
    <nav class="mt-4">
      <div class="px-6">
        <h2 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Mailboxes
        </h2>
        <mailbox-details
          :key="mailbox._id"
          :mailbox="mailbox"
          v-for="mailbox in mailboxes"
        ></mailbox-details>
        <mailbox-form></mailbox-form>
      </div>
    </nav>
  </div>
</template>

<script>
  import MailboxForm from "@components/mailbox/forms/MailboxForm";
  import MailboxDetails from "@components/mailbox/MailboxDetails";

  export default {
    components: {
      MailboxForm,
      MailboxDetails,
    },
    data() {
      return {
        sidebarOpen: false,
      };
    },
    created() {
      this.$store.dispatch("mailbox/get");
    },
    computed: {
      mailboxes() {
        return this.$store.state.mailbox.mailboxes;
      },
    },
  };
</script>
