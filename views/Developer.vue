<template>
  <main class="bg-gray-200">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="sendTestToMailbox"
    >
      Send Test
    </button>
  </main>
</template>

<script>
  import Vue from "vue";
  export default Vue.extend({
    $inject: ["SmtpService"],
    methods: {
      sendTestToMailbox() {
        this.smtpService.sendTestToMailbox(
          "93e4efa0-e9bf-434c-83a1-0b6729aacfcd",
        );
      },
    },
  });
</script>
