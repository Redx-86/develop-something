<script setup lang="ts">
import { useState, onMounted, watch } from "#imports";

const theme = useState<string>("theme", () => "dark"); // Varsayılan temayı 'dark' yapıyoruz

const toggleTheme = () => {
  theme.value = theme.value === "cyberpunk" ? "dark" : "cyberpunk";
};

// Sayfa yüklendiğinde body'ye temayı uygula
onMounted(() => {
  document.documentElement.setAttribute("data-theme", theme.value);
});

// Tema değiştikçe güncelle
watch(theme, (newTheme) => {
  document.documentElement.setAttribute("data-theme", newTheme);
});
</script>

<template>
  <nav class="p-4 shadow-md bg-base-200 flex justify-between items-center">
    <h1 class="text-xl font-bold">My Nuxt App</h1>
    <label class="flex cursor-pointer gap-2 items-center">
      <span class="label-text">Dark</span>
      <input
        type="checkbox"
        class="toggle"
        :checked="theme === 'cyberpunk'"
        @change="toggleTheme"
      />
      <span class="label-text">Cyberpunk</span>
    </label>
  </nav>
</template>


<style scoped>

@font-face {
    font-family: 'Emotiq';
    src: url('@/assets/fonts/font.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  
  nav {
    font-family: 'Emotiq', sans-serif;
  }
  
</style>