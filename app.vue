<!-- <template>
    <div>
        <Navbar />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
  </template>
  

  <script setup lang="ts">
useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script> -->

<script setup lang="ts">
const title = ref('Hello World')
</script>

<template>
    <div>
      <Head>
        <Title>{{ title }}</Title>
        <Meta name="description" :content="title" />
      </Head>
      <Navbar />
      <h1>{{ title }}</h1>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      
    </div>
</template>

<style scoped>

@font-face {
    font-family: 'Nunito';
    src: url('@/assets/fonts/Nunito.ttf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  
  section {
    font-family: 'Nunito', sans-serif;
  }
  
</style>