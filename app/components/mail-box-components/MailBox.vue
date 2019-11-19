<template>
  <div class="mt-3">
    <router-link
      class="-mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium bg-gray-200 hover:bg-gray-400 rounded-lg"
      :to="{
        name: 'mailbox',
        params: {
          mailboxId: mailbox.id,
        },
      }"
    >
      <div class="ml-2 text-gray-900">{{ mailbox.name }}</div>
      <div
        class="inline-block w-6 text-center py-1 leading-none text-xs font-semibold text-gray-700 bg-gray-300 rounded-full"
      >
        {{ messageCount }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    mailbox: {
      required: true,
    },
  },
  created() {
    this.$store.dispatch("mailbox/message/get", this.mailbox.id);
  },
  computed: {
    messageCount() {
      return (
        (this.$store.state.mailbox.message.messages[this.mailbox.id] &&
          this.$store.state.mailbox.message.messages[this.mailbox.id].length) ||
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