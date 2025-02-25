<template>
  <div class="container">
    <h2>Başvuru Listesi</h2>
    <div class="card-list">
      <div 
        v-for="user in users" 
        :key="user._id" 
        class="user-card" 
        @click="selectUser(user)">
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="selectedUser" class="user-details-card">
        <h3>Başvuru Detayları</h3>
        <p><strong>İsim:</strong> {{ selectedUser.firstName }} {{ selectedUser.lastName }}</p>
        <p><strong>Doğum Tarihi:</strong> {{ selectedUser.birthDate }}</p>
        <p><strong>Cinsiyet:</strong> {{ selectedUser.gender }}</p>
        <p><strong>Telefon:</strong> {{ selectedUser.phone }}</p>
        <p><strong>Email:</strong> {{ selectedUser.email }}</p>
        <p><strong>Şehir:</strong> {{ selectedUser.city }} </p>
        <p><strong>İlçe:</strong> {{ selectedUser.district }}</p>
        <p><strong>Adres:</strong> {{ selectedUser.address }}</p>
        <button class="close-button" @click="selectedUser = null">Kapat</button>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      selectedUser: null
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Kullanıcılar getirilemedi:', error);
      }
    },
    selectUser(user) {
      this.selectedUser = user;
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
strong{
  display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}
h3{
  display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  width: 100%;
  max-width: 800px;
}
.user-card {
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;
  
}
.user-card:hover {
  background-color: #f0f0f0;
}
.user-details-card {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  width: 100%;
  max-width: 400px;
}
.close-button {
  background-color: #ff4b4b;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
.close-button:hover {
  background-color: #e04444;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
