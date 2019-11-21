<template>
  <div class="border-t">
    <router-link
      class="block p-4 bg-white border-l-4 border-transparent hover:bg-gray-400"
      exact-active-class="bg-gray-200"
      :to="{
        name: 'mailbox.message',
        params: {
          messageId: message._id,
          mailboxId: message.mailboxId,
        },
      }"
    >
      <div
        class="text-sm text-gray-900 truncate ..."
        v-tooltip="{ content: message.subject }"
      >
        {{ message.subject }}
      </div>
      <div
        class="text-sm font-semibold text-gray-900 truncate ..."
        v-if="message.to"
      >
        <span class="text-xs">to:</span>
        <template v-for="address in message.to.value">
          {{ address.name }} <{{ address.address }}>
        </template>
      </div>
      <div class="text-xs text-gray-600 text-right">
        {{ getMessageDate() }}
      </div>
      <p class="mt-1 text-sm text-gray-600">{{ message.text }}</p>
    </router-link>
  </div>
</template>

<script>
  import {
    formatDistanceToNow,
    differenceInSeconds,
    differenceInHours,
    parseISO,
  } from "date-fns";
  export default {
    props: {
      message: {
        required: true,
      },
    },
    data() {
      return {
        periodInterval: null,
        currentDate: new Date(),
      };
    },
    watch: {
      period: {
        immediate: true,
        handler(period) {
          this.clearPeriodInterval();
          if (period) {
            this.periodInterval = setInterval(() => {
              this.currentDate = new Date();
              this.$forceUpdate();
            }, this.period);
          }
        },
      },
    },
    methods: {
      getMessageDate() {
        return formatDistanceToNow(this.messageDateAndTime, {
          addSuffix: true,
        });
      },
      clearPeriodInterval() {
        clearInterval(this.periodInterval);
      },
    },
    computed: {
      messageDateAndTime() {
        return parseISO(this.message.date);
      },
      period() {
        // TODO - we can fix drag by setting a timeout difference
        if (
          differenceInSeconds(this.currentDate, this.messageDateAndTime) < 60
        ) {
          return 1000;
        }
        if (differenceInHours(this.currentDate, this.messageDateAndTime) < 60) {
          return 1000 * 60;
        }
        return false;
      },
    },
    beforeDestroy() {
      this.clearPeriodInterval();
    },
  };
</script>
