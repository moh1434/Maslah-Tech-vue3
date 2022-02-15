<script setup lang="ts"></script>

<template>
  <section class="background-section relative">
    <div class="absolute relative-center">
      <h1>Complete your projects online easily and safely</h1>
      <h2>Get freelancers to complete your projects</h2>
    </div>
  </section>
</template>

<style>
/* Start background-section */
.background-section {
  background: url('@/assets/imgs/img1.jpg') black;
  background-size: cover;
  background-repeat: no-repeat;
  height: 90vh;
  color: black;
  text-align: center;
}
.background-section h1 {
  @apply text-2xl font-bold;
}
.background-section h2 {
  @apply text-lg mt-2;
}
.background-section > div {
  @apply p-5 bg-gray-200 bg-opacity-90 rounded-3xl;
}

.relative-center {
  top: 60%;
  left: 0;
  right: 0;
  @apply mx-12;
  transform: translateY(-50%);
}
@media screen(md) {
  .background-section h1 {
    @apply text-3xl;
  }
  .background-section h2 {
    @apply text-2xl mt-6;
  }
  .background-section > div {
    @apply p-9;
  }
  .relative-center {
    width: 50%;
    max-width: 550px;
    @apply mx-auto;
  }
}
@media screen(2xl) {
  .background-section {
    background-position: 0 -120px;
  }
}
/* End background-section */
</style>
