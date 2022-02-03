<script setup lang="ts"></script>

<template>
  <section class="image-parent relative">
    <div class="absolute relative-center">
      <h1>Complete your projects online easily and safely</h1>
      <h2>Get freelancers to complete your projects</h2>
    </div>
  </section>
</template>

<style>
.image-parent {
  background: url('@/assets/imgs/img1.jpg') black;
  background-size: cover;
  background-repeat: no-repeat;
  height: 85vh;
  color: black;
  text-align: center;
}
.image-parent h1 {
  @apply text-2xl font-bold;
}
.image-parent h2 {
  @apply text-lg mt-2;
}
.image-parent > div {
  @apply p-5 bg-gray-200 bg-opacity-90 rounded-3xl;
}

.relative-center {
  top: 70%;
  left: 0;
  right: 0;
  @apply mx-12;
  transform: translateY(-50%);
}
@media screen(md) {
  .image-parent h1 {
    @apply text-3xl;
  }
  .image-parent h2 {
    @apply text-2xl mt-6;
  }
  .image-parent > div {
    @apply p-9;
  }
  .relative-center {
    width: 50%;
    max-width: 550px;
    @apply mx-auto;
  }
}

@media screen(2xl) {
  .image-parent {
    background-position: 0 -120px;
  }
}
</style>
