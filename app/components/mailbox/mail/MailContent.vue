<template>
  <div>
    <mail-header :message="message"></mail-header>
    <iframe :srcdoc="message.html" class="w-full h-full"></iframe>
  </div>
</template>

<script>
  import MailHeader from "./components/MailHeader";
  export default {
    components: {
      MailHeader,
    },
    props: {
      message: {
        required: true,
      },
    },
  };
</script>
