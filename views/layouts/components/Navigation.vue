<template>
  <header class="flex flex-shrink-0">
    <div class="flex-shrink-0 px-4 py-3 bg-gray-700 lg:w-64 lg:bg-gray-800">
      <button class="block text-gray-400 hover:text-gray-200 sm:hidden">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M3 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM4 17a1 1 0 100 2h7a1 1 0 100-2H4z"
          />
        </svg>
      </button>

      <button class="hidden sm:flex sm:items-center sm:w-full">
        <img
          class="h-8 w-8 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=144&h=144&q=80"
          alt=""
        />
        <span class="hidden lg:inline ml-4 mr-2 text-sm font-medium text-white">
          Monica White
        </span>
        <i
          class="fa fa-chevron-down mt-2 ml-2 h-6 w-6 text-gray-400 lg:ml-auto"
        ></i>
      </button>
    </div>
    <div
      class="flex-1 flex items-center justify-between pl-2 pr-6 bg-gray-700 lg:px-6"
    >
      <nav class="hidden sm:flex">
        <a
          href="#"
          class="inline-block px-3 py-2 bg-gray-800 rounded-lg leading-none text-sm font-medium text-white"
        >
          Mailbox
        </a>
        <a
          href="#"
          class="ml-2 inline-block px-3 py-2 rounded-lg leading-none text-sm font-medium text-white hover:bg-gray-600"
        >
          Some Other Tab
        </a>
      </nav>
      <div class="ml-auto flex items-center">
        <button class="lg:hidden ml-5 text-gray-400 hover:text-gray-200">
          <i class="fal fa-search fa-lg"></i>
        </button>
        <div class="hidden lg:block relative w-64">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <i class="fal fa-search fa-sm text-gray-500"></i>
          </span>
          <input
            placeholder="Search"
            class="pl-8 pr-4 py-2 w-full bg-gray-800 rounded-lg text-sm placeholder-gray-400 text-white focus:bg-white focus:placeholder-gray-600 focus:text-gray-900 focus:outline-none"
          />
        </div>
        <button class="ml-5 text-gray-400 hover:text-gray-200">
          <i class="fal fa-bell fa-lg"></i>
        </button>
        <button class="ml-4 text-gray-400 hover:text-gray-200">
          <i class="fal fa-question-circle fa-lg"></i>
        </button>
      </div>
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
