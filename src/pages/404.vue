<script setup lang="ts"></script>

<template>
  <div class="flex flex-col h-full text-center">
    <div class="m-auto">
      <p class="text-3xl font-bold mb-3">Cooming Soon</p>
      <router-link
        :to="{ name: 'index' }"
        class="text-2xl underline text-blue-700 hover:text-blue-500"
        >Home page</router-link
      >
    </div>
  </div>
</template>

<style></style>
