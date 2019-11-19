<template>
  <div class="mt-3">
    <div
      href="#"
      class="-mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium bg-gray-200 rounded-lg"
    >
      <span class="inline-flex">
        <i class="fa fa-inbox fa-lg text-gray-700 mt-1"></i>
        <span class="ml-2 text-gray-900">
          <input
            placeholder="Mailbox Name"
            class="rounded pl-1 mr-1 text-sm placeholder-gray-400 focus:placeholder-gray-600 focus:text-gray-900 focus:outline-none"
            v-model="form.name"
            type="text"
            @keyup.enter="addMailBox"
          />
        </span>
      </span>
      <span
        class="inline-block text-center leading-none font-semibold text-xs text-gray-700 bg-gray-400 rounded-full cursor-pointer"
        @click="addMailBox"
      >
        <i class="fa fa-check fa-xs p-2"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: this.createForm({
          name: "",
        }).validation({
          rules: {
            name: "required",
          },
        }),
      };
    },
    methods: {
      addMailBox() {
        if (this.form.isValid()) {
          this.$store.dispatch("mailbox/create", this.form.data()).then(
            () => {
              this.form.reset();
            },
            (error) => {
              this.alertService.error(error.message);
            },
          );
        }
      },
    },
  };
</script>
