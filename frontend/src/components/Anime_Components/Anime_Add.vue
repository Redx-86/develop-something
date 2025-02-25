<template>
  <div class="add-anime-container">
    <h2>Add New Anime</h2>
    <form @submit.prevent="submitAnime">
      <div class="form-group">
        <label for="animeName">Anime Name</label>
        <input type="text" id="animeName" v-model="animeName" required />
      </div>
      <div class="form-group">
        <label for="animeCategory">Category</label>
        <input type="text" id="animeCategory" v-model="animeCategory" required />
      </div>
      <div class="form-group">
        <label for="animeDescription">Description</label>
        <textarea id="animeDescription" v-model="animeDescription" required></textarea>
      </div>
      <div class="form-group">
        <label for="animeImage">Image Upload</label>
        <input type="file" @change="onFileChange" accept="image/*" required />
      </div>
      <div class="form-group">
        <label for="animeCreator">Creator</label>
        <input type="text" id="animeCreator" v-model="animeCreator" required />
      </div>
      <div class="form-group">
        <label for="animeStudio">Studio</label>
        <input type="text" id="animeStudio" v-model="animeStudio" required />
      </div>
      <div class="form-group">
        <label for="animeYear">Year</label>
        <input type="date" id="animeYear" v-model="animeYear" :max="maxDate" @input="validateDate" required />
      </div>
      <div class="form-group">
        <label for="animeChapters">Chapters</label>
        <input type="text" id="animeChapters" v-model="animeChapters" required />
      </div>
      <button type="submit" class="submit-button">Add Anime</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      animeName: '',
      animeCategory: '',
      animeDescription: '',
      animeImage: '',
      animeCreator: '',
      animeStudio: '',
      animeYear: '',
      animeChapters: '',
      maxDate: '',
    };
  },
  mounted(){
    this.setMaxDate();
  },
  methods: {
    setMaxDate(){
      const today = new Date();
      const day = String(today.getDate()).padStart(2,'0');
      const month = String(today.getMonth()+1).padStart(2,'0');
      const year = today.getFullYear();
      this.maxDate = `${year}-${month}-${day}`
    },

    validateDate(event){
      const inputDate= new Date(event.target.value)
      const today = new Date();
      today.setHours(0,0,0,0);

      if (inputDate > today) {
        event.target.value = this.maxDate; 
        this.animeYear = this.maxDate; 
        alert('Lütfen bugünden önceki bir tarih girin.'); 
    }
  },

    async submitAnime() {
      const newAnime = {
        AnimeName: this.animeName,
        AnimeCategory: this.animeCategory,
        AnimeDescription: this.animeDescription,
        AnimeImage: this.animeImage,
        AnimeCreator: this.animeCreator,
        AnimeStudio: this.animeStudio,
        AnimeYear: this.animeYear,
        AnimeChapters: this.animeChapters,
      };

      try {
        await axios.post('http://localhost:5000/api/animes', newAnime);
        alert('Anime added successfully!');
        this.resetForm();
      } catch (error) {
        console.error('Error adding anime:', error);
        alert('Failed to add anime. Please try again.');
      }
    },
    resetForm() {
      this.animeName = '';
      this.animeCategory = '';
      this.animeDescription = '';
      this.animeImage = '';
      this.animeCreator = '';
      this.animeStudio = '';
      this.animeYear = '';
      this.animeChapters = '';
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.animeImage = URL.createObjectURL(file);
      }
    },
  },
};
</script>

<style scoped>
.add-anime-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
  resize: none;
}
input:focus,
textarea:focus {
  border-color: #007bff;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.submit-button:hover {
  background-color: #0056b3;
}
</style>
