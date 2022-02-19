<script setup lang="ts">
import WhyMaslahaCard from '@/components/WhyMaslahaCard.vue';
import { ref, computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const WhyMaslahaData = ref<
  {
    svgId: string;
    title: string | ComputedRef<string>;
    p: string | ComputedRef<string>;
  }[]
>([
  {
    svgId: '#lightbulb',
    title: computed(() => t('WhyMaslahaData.lightbulb.title')),
    p: computed(() => t('WhyMaslahaData.lightbulb.p')),
  },
  {
    svgId: '#thumbs-up',
    title: computed(() => t('WhyMaslahaData.thumbs-up.title')),
    p: computed(() => t('WhyMaslahaData.thumbs-up.p')),
  },
  {
    svgId: '#money-bill-alt',
    title: computed(() => t('WhyMaslahaData.money-bill-alt.title')),
    p: computed(() => t('WhyMaslahaData.money-bill-alt.p')),
  },
  {
    svgId: '#handshake',
    title: computed(() => t('WhyMaslahaData.handshake.title')),
    p: computed(() => t('WhyMaslahaData.handshake.p')),
  },
]);
</script>

<template>
  <section class="background-section relative">
    <div class="absolute relative-center">
      <h1>{{ t('Complete_your_projects_online_easily_and_safely') }}</h1>
      <h2>{{ t('Get_freelancers_to_complete_your_projects') }}</h2>
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
