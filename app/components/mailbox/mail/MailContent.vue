<template>
  <div class="flex-1 flex flex-col w-0 overflow-hidden">
    <pre>{{ $route.path }}</pre>
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
