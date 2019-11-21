<template>
  <div
    class="cursor-pointer"
    @click.stop.prevent
    v-tooltip.bottom="{
      content: 'Copied',
      show: showCopiedTooltip,
      trigger: 'manual',
    }"
  >
    <i
      ref="clipboard"
      class="fad fa-clipboard"
      v-tooltip="{
        content: tooltip,
      }"
      :data-clipboard-text="data"
    ></i>
  </div>
</template>

<script>
  import ClipboardJS from "clipboard";
  export default {
    props: {
      data: {
        required: true,
      },
      tooltip: {
        required: false,
      },
    },
    data() {
      return {
        showCopiedTooltip: false,
      };
    },
    mounted() {
      new ClipboardJS(this.$refs.clipboard)
        .on("success", () => {
          this.showCopiedTooltip = true;
          setTimeout(() => {
            this.showCopiedTooltip = false;
          }, 3000);
        })
        .on("error", () => {
          this.showCopiedTooltip = false;
          this.alertService.error("Unable to copy to clipboard.");
        });
    },
  };
</script>
