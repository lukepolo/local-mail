<template>
  <div class="border-t">
    <router-link
      class="block px-6 pt-3 pb-4 bg-white border-l-4 border-transparent hover:bg-gray-300"
      :to="{
        name: 'mailbox.message',
        params: {
          messageId: message._id,
          mailboxId: message.mailboxId,
        },
      }"
    >
      <div class="flex justify-between">
        <span class="text-sm font-semibold text-gray-900">
          <template v-for="address in message.to.value">
            <small>to:</small>{{ address.name }} <{{ address.address }}>
          </template>
        </span>
        <span class="text-sm text-gray-600">
          {{ getMessageDate() }}
        </span>
      </div>
      <p class="text-sm text-gray-900">
        {{ message.subject }}
      </p>
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

<style lang="scss" scoped>
  .router-link-exact-active {
    @apply .bg-gray-200;
  }
</style>
