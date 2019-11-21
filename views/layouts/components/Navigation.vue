<template>
  <header class="flex flex-shrink-0">
    <div class="flex-shrink-0 px-4 py-3 bg-gray-700 w-64 bg-gray-800">
      <span class="ml-4 mr-2 font-medium text-lg text-white italic">
        <i class="fad fa-mailbox mr-2"></i>
        Local Mail
      </span>
    </div>
    <div
      class="flex-1 flex items-center justify-between pl-2 pr-6 bg-gray-700 px-6"
    >
      <nav class="sm:flex">
        <router-link
          :to="{ name: 'developer' }"
          active-class="bg-gray-800"
          class="ml-2 inline-block px-3 py-2 rounded-lg leading-none text-sm font-medium text-white hover:bg-gray-600"
        >
          Developer Tools
        </router-link>
      </nav>
<!--      <div class="ml-auto flex items-center">-->
<!--        <button class="lg:hidden ml-5 text-gray-400 hover:text-gray-200">-->
<!--          <i class="fal fa-search fa-lg"></i>-->
<!--        </button>-->
<!--        <div class="hidden lg:block relative w-64">-->
<!--          <span class="absolute inset-y-0 left-0 flex items-center pl-3">-->
<!--            <i class="fal fa-search fa-sm text-gray-500"></i>-->
<!--          </span>-->
<!--          <input-->
<!--            placeholder="Search"-->
<!--            class="pl-8 pr-4 py-2 w-full bg-gray-800 rounded-lg text-sm placeholder-gray-400 text-white focus:bg-white focus:placeholder-gray-600 focus:text-gray-900 focus:outline-none"-->
<!--          />-->
<!--        </div>-->
<!--        <button class="ml-5 text-gray-400 hover:text-gray-200">-->
<!--          <i class="fal fa-bell fa-lg"></i>-->
<!--        </button>-->
<!--        <a href="#" class="ml-4 text-gray-400 hover:text-gray-200">-->
<!--          <i class="fal fa-cog fa-lg"></i>-->
<!--        </a>-->
<!--      </div>-->
    </div>
  </header>
</template>

<script>
  export default {
    data() {
      return {};
    },
  };
</script>
