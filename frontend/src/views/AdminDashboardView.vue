<template>
  <div class="user-update-container">
    <div class="user-list">
      <h2>Kullanıcı Listesi</h2>
      <ul>
        <li v-for="user in users" :key="user._id" @click="selectUser(user)">
          {{ user.firstName }} {{ user.lastName }}
        </li>
      </ul>
    </div>
    <div class="user-form">
      <h2>Kullanıcı Bilgilerini Güncelle</h2>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="firstName">İsim:</label>
          <input type="text" id="firstName" v-model="selectedUser.firstName" @input="validateName('firstName')" required />
        </div>
        <div class="form-group">
          <label for="lastName">Soyisim:</label>
          <input type="text" id="lastName" v-model="selectedUser.lastName" @input="validateName('lastName')" required />
        </div>
        <div class="form-group">
          <label for="birthDate">Doğum Tarihi:</label>
          <input type="date" id="birthDate" v-model="selectedUser.birthDate" :max="maxDate" @change="validateDate" required />
        </div>
        <div class="form-group">
          <label>Cinsiyet:</label>
          <div class="radio-group">
            <label>
              <input type="radio" value="erkek" v-model="selectedUser.gender" required /> Erkek
            </label>
            <label>
              <input type="radio" value="kadin" v-model="selectedUser.gender" required /> Kadın
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="phone">Telefon:</label>
          <input type="text" id="phone" v-model="selectedUser.phone" @input="formatPhone" disabled />
        </div>
        <div class="form-group">
          <label for="tcno">TC Kimlik No:</label>
          <input type="text" id="tcno" v-model="selectedUser.tcno" @input="validateTCNo" maxlength="11" disabled />
        </div>
        <div class="form-group">
          <label for="email">E-posta:</label>
          <input type="email" id="email" v-model="selectedUser.email" required />
        </div>
        <div class="form-group">
          <label for="city">Şehir:</label>
          <select id="city" v-model="selectedCity" @change="updateDistricts" required>
            <option value="" disabled>Şehir Seçin</option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="district">İlçe:</label>
          <select id="district" v-model="selectedDistrict" required>
            <option value="" disabled>İlçe Seçin</option>
            <option v-for="district in districts[selectedCity]" :key="district" :value="district">{{ district }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="address">Adres:</label>
          <input type="text" id="address" v-model="selectedUser.address" required />
        </div>
        <button type="submit" class="submit-button">Güncelle</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const users = ref([]);
    const cities = ref([]);
    const districts = ref({});
    const selectedCity = ref('');
    const selectedDistrict = ref('');
    const selectedUser = ref({
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      phone: '',
      tcno: '',
      email: '',
      city: '',
      district: '',
      address: '',
    });
    const maxDate = ref('');

    // Ad ve soyad validasyonu
    const validateName = (field) => {
      selectedUser.value[field] = selectedUser.value[field].replace(/[^a-zA-ZığüşöçİĞÜŞÖÇ\s]/g, '');
    };

    const formatPhone = () => {
      const cleaned = selectedUser.value.phone.replace(/\D/g, '').slice(0, 10);
      if (cleaned.length === 10) {
        const formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}`;
        selectedUser.value.phone = formatted;
      }
    };

    const validateTCNo = () => {
      const cleaned = selectedUser.value.tcno.replace(/\D/g, '');
      selectedUser.value.tcno = cleaned.slice(0, 11);
    };

    const setMaxDate = () => {
      const today = new Date().toISOString().split('T')[0];
      maxDate.value = today;
    };

    const validateDate = (event) => {
      const inputDate = new Date(event.target.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (inputDate > today) {
        selectedUser.value.birthDate = '';
        alert('Lütfen bugünden önceki bir tarih girin.');
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        users.value = response.data;
      } catch (error) {
        console.error('Kullanıcılar yüklenemedi:', error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/iller');
        cities.value = response.data.map(city => city.il);
      } catch (error) {
        console.error('Şehirler yüklenemedi:', error);
      }
    };

    // İlçeleri güncelle
    const updateDistricts = async () => {
      try {
        if (selectedCity.value) {
          const response = await axios.get(`http://localhost:5000/api/iller/${selectedCity.value}`);
          districts.value[selectedCity.value] = response.data;
        }
        selectedDistrict.value = '';
      } catch (error) {
        console.error('İlçeler yüklenemedi:', error);
      }
    };

    const selectUser = (user) => {
      selectedUser.value = { ...user };
      selectedCity.value = user.city;
      selectedDistrict.value = user.district;
      updateDistricts();
    };

    const updateUser = async () => {
      try {
        selectedUser.value.city = selectedCity.value;
        selectedUser.value.district = selectedDistrict.value;
        const response = await axios.put(`http://localhost:5000/api/users/${selectedUser.value._id}`, selectedUser.value);
        alert('Kullanıcı bilgileri başarıyla güncellendi! Yanıt: ' + response.data._id);
        fetchUsers();
      } catch (error) {
        console.error('Kullanıcı güncellenemedi:', error);
      }
    };

    onMounted(() => {
      fetchUsers();
      fetchCities();
      setMaxDate();
    });

    return {
      users,
      cities,
      districts,
      selectedCity,
      selectedDistrict,
      selectedUser,
      maxDate,
      validateName,
      formatPhone,
      validateTCNo,
      setMaxDate,
      validateDate,
      fetchUsers,
      fetchCities,
      updateDistricts,
      selectUser,
      updateUser,
    };
  },
};
</script>

  
  <style scoped>
  .user-update-container {
    display: flex;
    justify-content: space-between;
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #2c2c2c;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .user-list {
    width: 16%;
    border-right: 2px solid #ccc;
    padding-right: 15px;
  }
  .user-form {
    width: 65%;
    padding-left: 15px;
  }
  h2 {
    color: #ccc3c3;
    font-style: bold;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  .user-list li {
    cursor: pointer;
    padding: 10px;
    border: 1px solid transparent;
    transition: background-color 0.3s, border 0.3s;
  }
  .user-list li:hover {
    background-color: #e1e1e1;
    border: 1px solid #ccc;
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input[type="text"],
  input[type="date"],
  input[type="email"],
  input[type="radio"] {
    width: 40%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
  }
  input[type="text"]:focus,
  input[type="date"]:focus,
  input[type="email"]:focus {
    border-color: #007bff;
    outline: none;
  }
  input[disabled]{
    color:black;
    font-size: large;
    
  }
  .radio-group {
    display: flex;
    gap: 15px;
  }
  .submit-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .submit-button:hover {
    background-color: #0056b3;
  }
  </style>
  