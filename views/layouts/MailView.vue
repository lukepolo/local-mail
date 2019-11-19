<template>
  <div id="app" class="h-screen flex flex-col">
    <alerts></alerts>
    <navigation></navigation>
    <div class="flex-1 flex overflow-hidden">
      <mail-boxes></mail-boxes>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Alerts from "varie/Alerts";
import MailBoxes from "@components/MailBoxes";
import Navigation from "@views/layouts/components/Navigation";

export default {
  components: {
    Alerts,
    MailBoxes,
    Navigation,
  },
};
</script>
