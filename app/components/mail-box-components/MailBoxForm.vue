<template>
  <div class="mt-3">
    <div
      href="#"
      class="-mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium bg-gray-200 rounded-lg"
    >
      <span class="inline-flex">
        <svg class="h-6 w-6 fill-current text-gray-700" viewBox="0 0 24 24">
          <path
            d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm3-1a1 1 0 00-1 1v6h1.586A2 2 0 018 12.586L10.414 15h3.172L16 12.586A2 2 0 0117.414 12H19V6a1 1 0 00-1-1H6zm13 9h-1.586L15 16.414a2 2 0 01-1.414.586h-3.172A2 2 0 019 16.414L6.586 14H5v4a1 1 0 001 1h12a1 1 0 001-1v-4z"
          />
        </svg>
        <span class="ml-2 text-gray-900">
          <input v-model="form.name" type="text" @keyup.enter="addMailBox" />
        </span>
      </span>
      <span
        class="inline-block w-9 text-center py-1 leading-none text-xs font-semibold text-gray-700 bg-gray-300 rounded-full"
      >
        <span>checkmark</span>
        <span>cancel</span>
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
      }),
    };
  },
  methods: {
    addMailBox() {
      this.$store.dispatch("mailbox/create", this.form.data());
    },
  },
};
</script>
