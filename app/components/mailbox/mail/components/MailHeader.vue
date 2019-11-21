<template>
  <div class="relative shadow-md">
    <div
      class="flex items-center justify-between px-5 py-4 bg-gray-100 border-b"
    >
      <div class="flex items-center">
        <button>
          <i class="fad fa-reply fa-lg text-gray-600"></i>
        </button>
        <button class="ml-6">
          <button>
            <i class="fad fa-tag fa-lg text-gray-600"></i>
          </button>
        </button>
        <button class="ml-6">
          <button>
            <i class="fad fa-user-circle fa-lg text-gray-600"></i>
          </button>
        </button>
        <button class="ml-6">
          <button>
            <i class="fad fa-download fa-lg text-gray-600"></i>
          </button>
        </button>
        <button class="ml-6">
          <button>
            <i class="fad fa-ellipsis-h fa-lg text-gray-600"></i>
          </button>
        </button>
      </div>
      <div class="flex items-center">
        <button>
          <i class="fad fa-chevron-down fa-lg text-gray-600"></i>
        </button>
        <button class="ml-2">
          <i class="fad fa-chevron-up fa-lg text-gray-600"></i>
        </button>
      </div>
    </div>
    <div class="flex items-center justify-between px-5 py-4 bg-white">
      <h3 class="text-base text-lg text-gray-900 truncate">
        {{ message.subject }}
      </h3>
      <div class="ml-4 flex-shrink-0">
        <span class="text-sm">{{ messageDate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { format, parseISO } from "date-fns";
  import DateFormats from "@app/constants/DateFormats";
  export default {
    props: {
      message: {
        required: true,
      },
    },
    computed: {
      messageDate() {
        return format(parseISO(this.message.date), DateFormats.DATE_AND_TIME);
      },
    },
  };
</script>
