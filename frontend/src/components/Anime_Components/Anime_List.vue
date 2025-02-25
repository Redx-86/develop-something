<template>
    <div class="container">
      <h2 class="title">MyAnimeList</h2>
  
      <div class="columns is-multiline">
        <div
          class="column is-one-quarter"
          v-for="anime in getAnimes"
          :key="anime._id"
        >
          <div class="card" @click="toggleDetails(anime)">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="anime.AnimeImage" alt="Anime Image" />
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-5">{{ anime.AnimeName }}</p>
            </div>
          </div>
          <transition name="fade">
            <div v-if="getSelectedAnime && getSelectedAnime._id === anime._id" class="content">
              <p>{{ anime.AnimeDescription }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters('anime', ['getAnimes', 'getSelectedAnime']),
    },
    async created() {
      await this.$store.dispatch('anime/fetchAnimes'); 
    },
    methods: {
      toggleDetails(anime) {
        this.$store.dispatch('anime/toggleDetails', anime);
      },
    },
  };
  </script>
  

<style scoped>
.container {
  margin-top: 20px;
}
.card {
  cursor: pointer;
  transition: transform 0.3s;
}
.card:hover {
  transform: translateY(-5px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, 
.fade-leave-to {
  opacity: 0;
}
</style>
