<template>
  <div @click.stop @keyup.32.prevent @keyup.esc="cancel">
    <div @click="open">
      <slot v-if="!showConfirm"></slot>
    </div>
    <transition name="confirm">
      <div v-show="showConfirm">
        <div class="pl-2 pr-2 pb-2">
          <h4>Are you sure?</h4>
        </div>
        <div class="flex justify-around">
          <span class="btn btn--small btn-blue" @click.stop="cancel"
            >Cancel</span
          >
          <button class="btn btn--small btn-red" @click.stop="confirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      confirmText: {
        type: String,
        default: "Confirm",
      },
    },
    data() {
      return {
        showConfirm: false,
      };
    },
    methods: {
      open() {
        this.showConfirm = true;
      },
      cancel() {
        this.showConfirm = false;
        this.$emit("canceled");
      },
      confirm() {
        this.$emit("confirmed");
      },
    },
  };
</script>
