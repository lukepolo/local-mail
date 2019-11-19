<template>
  <div id="app" class="h-screen flex flex-col">
    <alerts></alerts>
    <navigation></navigation>
    <div class="flex-1 flex overflow-hidden">
      <mail-box-list></mail-box-list>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Alerts from "varie/Alerts";
  import MailBoxList from "@components/mailbox/MailboxList";
  import Navigation from "@views/layouts/components/Navigation";

  export default {
    components: {
      Alerts,
      Navigation,
      MailBoxList,
    },
  };
</script>
