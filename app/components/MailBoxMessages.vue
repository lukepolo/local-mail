<template>
  <div
    class="hidden lg:flex flex-col relative z-10 w-full max-w-xs flex-grow flex-shrink-0 border-r bg-gray-300"
  >
    <div
      class="flex-shrink-0 px-4 py-2 flex items-center justify-between border-b bg-gray-200"
    >
      <button class="flex items-center text-xs font-semibold text-gray-600">
        Sorted by Date
        <svg
          class="ml-1 h-6 w-6 fill-current text-gray-500"
          viewBox="0 0 24 24"
        >
          <path
            d="M7.293 9.293a1 1 0 011.414 0L12 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
      </button>
      <button>
        <svg class="h-6 w-6 fill-current text-gray-500" viewBox="0 0 24 24">
          <path
            d="M16 3H3a1 1 0 000 2h13a1 1 0 100-2zm-4 4H3a1 1 0 000 2h9a1 1 0 100-2zm-9 4h6a1 1 0 110 2H3a1 1 0 110-2zm9.293.293l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L18 10.414V20a1 1 0 11-2 0v-9.586l-2.293 2.293a1 1 0 01-1.414-1.414z"
          />
        </svg>
      </button>
    </div>
    <div class="flex-1 overflow-y-auto">
      <div class="shadow">
        <div class="border-t" v-for="message in messages">
          <a
            href="#"
            class="block px-6 pt-3 pb-4 bg-white border-l-4 border-transparent hover:bg-gray-100"
          >
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-gray-900">
                {{ message.from }}
              </span>
              <span class="text-sm text-gray-600">
                {{ message.date }}
              </span>
            </div>
            <p class="text-sm text-gray-900">
              Refund
            </p>
            <p class="mt-1 text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              tempus element...
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      required: true,
    },
  },
};
</script>
