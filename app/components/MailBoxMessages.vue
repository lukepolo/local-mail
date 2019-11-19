<template>
  <div
    class="hidden lg:flex flex-col relative z-10 w-full max-w-xs flex-grow flex-shrink-0 border-r bg-gray-300"
  >
    <div
      class="flex-shrink-0 px-4 py-2 flex items-center justify-between border-b bg-gray-200"
    >
      <button class="flex items-center text-xs font-semibold text-gray-600">
        <!--          TODO-->
        Sorted by Date
        <i class="fa fa-chevron-down ml-4 text-gray-500"></i>
      </button>
      <button>
        <i class="fad fa-sort-amount-up fa-lg ml-4 text-gray-500"></i>
      </button>
    </div>
    <div class="flex-1 overflow-y-auto">
      <div class="shadow">
        <mail-box-message
          :message="message"
          :key="message.id"
          v-for="message in messages"
        ></mail-box-message>
      </div>
    </div>
  </div>
</template>

<script>
import MailBoxMessage from "@components/MailBoxMessage";
export default {
  components: { MailBoxMessage },
  props: {
    messages: {
      required: true,
    },
  },
};
</script>
