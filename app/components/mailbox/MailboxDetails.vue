<template>
  <div
    class="mt-3"
    @contextmenu="showMailboxMenu"
    v-click-away.click.contextmenu="closeMailboxMenu"
  >
    <div class="relative z-10" v-if="canSeeMailboxMenu">
      <div
        class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl"
      >
        <inline-confirm
          class="p-2"
          @confirmed="deleteMailbox"
          @canceled="closeMailboxMenu"
        >
          <a
            href="#"
            class="flex px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Delete
            <div class="flex-auto text-right">
              <i class="fad fa-trash-alt"></i>
            </div>
          </a>
        </inline-confirm>
      </div>
    </div>
    <router-link
      class="-mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium bg-gray-200 hover:bg-gray-400 rounded-lg"
      :to="{
        name: 'mailbox',
        params: {
          mailboxId: mailbox._id,
        },
      }"
    >
      <div class="flex ml-1 text-gray-900">
        <clipboard
          class="hover:text-white"
          :data="mailbox._id"
          tooltip="Copy User / Password"
        ></clipboard>
        <div class="ml-3">{{ mailbox.name }}</div>
      </div>
      <div
        class="inline-block w-6 text-center py-1 leading-none text-xs font-semibold text-gray-700 bg-gray-300 rounded-full"
      >
        {{ messageCount }}
      </div>
    </router-link>
  </div>
</template>

<script>
  import Clipboard from "../Clipboard";
  import InlineConfirm from "@components/InlineConfirm";
  export default {
    components: { InlineConfirm, Clipboard },
    props: {
      mailbox: {
        required: true,
      },
    },
    data() {
      return {
        canSeeMailboxMenu: false,
      };
    },
    methods: {
      showMailboxMenu() {
        this.canSeeMailboxMenu = true;
      },
      closeMailboxMenu() {
        this.canSeeMailboxMenu = false;
      },
      deleteMailbox() {
        this.closeMailboxMenu();
        this.$store.dispatch("mailbox/destroy", this.mailbox).then(() => {
          this.alertService.success(
            `Mailbox (${this.mailbox.name}) has been removed`,
          );
        });
      },
    },
    created() {
      this.$store.dispatch("mailbox/message/get", this.mailbox._id);
    },
    computed: {
      messageCount() {
        return (
          (this.$store.state.mailbox.message.messages[this.mailbox._id] &&
            this.$store.state.mailbox.message.messages[this.mailbox._id]
              .length) ||
          0
        );
      },
    },
  };
</script>

<style lang="scss" scoped>
  .router-link-active {
    @apply .bg-gray-400;
  }
</style>
