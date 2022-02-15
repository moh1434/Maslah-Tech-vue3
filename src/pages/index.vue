<script setup lang="ts">
import WhyMaslahaCard from '@/components/WhyMaslahaCard.vue';
import { ref } from 'vue';
const WhyMaslahaData = ref<{ svgId: string; title: string; p: string }[]>([
  {
    svgId: '#lightbulb',
    title: 'Complete your creative idea',
    p: 'Choose a professional freelancer to complete your work effortlessly',
  },
  {
    svgId: '#thumbs-up',
    title: 'Hire the best for you',
    p: 'Visit freelancers profiles, see their past work and their price, then hire the best',
  },
  {
    svgId: '#money-bill-alt',
    title: 'Pay safely',
    p: 'Pay for work only when it has been completed and you are satisfied with the quality.',
  },
  {
    svgId: '#handshake',
    title: 'We are here to help',
    p: 'Our talented team of recruiters can help you find the best freelancer for the job.',
  },
]);
</script>

<template>
  <section class="background-section relative">
    <div class="absolute relative-center">
      <h1>Complete your projects online easily and safely</h1>
      <h2>Get freelancers to complete your projects</h2>
    </div>
  </section>
  <section class="bg-cyan-600 text-center py-14">
    <div class="container mx-auto flex flex-wrap justify-evenly">
      <WhyMaslahaCard
        v-for="(data, index) in WhyMaslahaData"
        :key="index"
        class="md:w-1/2 2xl:w-1/4"
      >
        <template #icon>
          <svg><use :xlink:href="data.svgId" /></svg>
        </template>
        <template #title-text>{{ data.title }}</template>
        <template #p>
          <p class="xl:max-w-md xl:mx-auto">
            {{ data.p }}
          </p>
        </template>
      </WhyMaslahaCard>
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
