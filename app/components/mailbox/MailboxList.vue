<template>
  <div
    class="z-30 fixed inset-y-0 left-0 w-64 bg-gray-100 border-r overflow-y-auto sm:static sm:block sm:translate-x-0 sm:transition-none"
  >
    <div class="absolute top-0 left-0 pl-4 pt-3 sm:hidden">
      <button
        @click="sidebarOpen = false"
        class="block text-gray-600 hover:text-gray-800"
      >
        <i class="fal fa-times fa-2x ml-1"></i>
      </button>
    </div>
    <nav class="mt-16 sm:mt-0">
      <div class="mt-8 px-6">
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
      <div class="mt-8 p-6 border-t sm:hidden">
        <div class="flex items-center">
          <img
            class="h-8 w-8 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=144&h=144&q=80"
            alt=""
          />
          <span class="ml-4 mr-2 text-sm font-medium text-gray-800">
            Monica White
          </span>
        </div>
        <div class="mt-4">
          <a href="#" class="block text-sm font-medium text-gray-700">
            Settings
          </a>
          <a href="#" class="mt-4 block text-sm font-medium text-gray-700">
            Log out
          </a>
        </div>
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
