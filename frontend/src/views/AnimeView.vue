<template>
    <div class="container mt-5">
      <div class="field">
        <input 
          class="is-checkradio is-info" 
          id="anime-list-radio" 
          type="radio" 
          v-model="activeComponent" 
          :value="'Anime_List'" 
        />
        <label for="anime-list-radio">Anime List</label>
        
        <input 
          class="is-checkradio is-info" 
          id="anime-add-radio" 
          type="radio" 
          v-model="activeComponent" 
          :value="'Anime_Add'" 
        />
        <label for="anime-add-radio">Add Anime</label>
      </div>
  
      <Transition name="fade" mode="out-in">
        <component :is="activeComponent"></component>
      </Transition>
    </div>
  </template>
  
  <script>
  import Anime_Add from '@/components/Anime_Components/Anime_Add.vue';
  import Anime_List from '@/components/Anime_Components/Anime_List.vue';
  import { ref } from 'vue';
  
  export default {
    components: {
      Anime_List,
      Anime_Add,
    },
    setup() {
      const activeComponent = ref('Anime_List');
  
      return {
        activeComponent,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  
  .field {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .is-checkradio {
    margin-right: 10px;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  