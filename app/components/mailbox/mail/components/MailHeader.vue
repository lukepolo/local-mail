<template>
  <div class="relative shadow-md">
<!--    <mail-actions></mail-actions>-->
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
  import MailActions from "@components/mailbox/mail/components/MailActions";
  export default {
    props: {
      message: {
        required: true,
      },
    },
    components: {
      MailActions,
    },
    computed: {
      messageDate() {
        return format(parseISO(this.message.date), DateFormats.DATE_AND_TIME);
      },
    },
  };
</script>
