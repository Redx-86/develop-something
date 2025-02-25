<template lang="tr">
  <div class="form-container">
    <h2>Başvuru Formu</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="isim">İsim</label>
        <input type="text" id="isim" v-model="firstName" @input="validateName('firstName')" placeholder="İsim" required />
      </div>
      <div class="form-group">
        <label for="soyisim">Soyisim</label>
        <input type="text" id="soyisim" v-model="lastName" @input="validateName('lastName')" placeholder="Soyisim" required />
      </div>
      <div class="form-group">
        <label for="dogum-tarihi">Doğum Tarihi</label>
        <input type="date" id="dogum-tarihi" v-model="birthDate" :max="maxDate" @input="validateDate" required />
      </div>
      <div class="form-group">
        <label>Cinsiyet</label>
        <div class="radio-group">
          <label>
            <input type="radio" name="cinsiyet" value="erkek" v-model="gender" required /> Erkek
          </label>
          <label>
            <input type="radio" name="cinsiyet" value="kadin" v-model="gender" required /> Kadın
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="tcno">TC Kimlik No</label>
        <input type="text" id="tcno" v-model="tcno" placeholder="TC Kimlik No" maxlength="11" required @input="validateTCNo" />
        <span v-if="tcError" class="error">{{ tcError }}</span>
      </div>
      <div class="form-group">
        <label for="telefon">Telefon</label>
        <input type="text" id="telefon" v-model="formattedPhone" @input="formatPhone" placeholder="(555) 123 4567" maxlength="14" required />
      </div>
      <div class="form-group">
        <label for="email">E-posta</label>
        <input type="email" id="email" v-model="email" placeholder="E-posta" required />
      </div>
      <div class="form-group">
        <label for="sehir">Şehir</label>
        <select id="sehir" v-model="selectedCity" @change="updateDistricts">
          <option value="" disabled>Şehir Seçin</option>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="ilce">İlçe</label>
        <select id="ilce" v-model="selectedDistrict">
          <option value="" disabled>İlçe Seçin</option>
          <option v-for="district in districts[selectedCity]" :key="district" :value="district">{{ district }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="adres">Adres</label>
        <input type="text" id="adres" v-model="address" placeholder="Adres" required />
      </div>
      <button type="submit" class="submit-button">Gönder</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
import { onMounted } from 'vue';
import { useUserForm } from '@/composables/UserFormFuncs';

export default {
  setup() {
    const {
      firstName,
      lastName,
      birthDate,
      gender,
      tcno,
      formattedPhone,
      email,
      selectedCity,
      selectedDistrict,
      address,
      maxDate,
      validateName,
      validateDate,
      validateTCNo,
      formatPhone,
      updateDistricts,
      cities,
      districts,
      setMaxDate,
    } = useUserForm();

    onMounted(async () => {
      await fetchCities();
      setMaxDate(); 
    });

    const handleSubmit = async () => {
      const formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        birthDate: birthDate.value,
        gender: gender.value,
        tcno: tcno.value,
        formattedPhone: formattedPhone.value,
        email: email.value,
        selectedCity: selectedCity.value,
        selectedDistrict: selectedDistrict.value,
        address: address.value,
      };

      try {
        const response = await axios.post('http://localhost:5000/api/users', formData);
        alert('Form başarıyla gönderildi! ID: ' + response.data._id);
      } catch (error) {
        console.error('Form gönderilemedi:', error);
        alert('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/iller');
        if (response.data) {
          cities.value = response.data.map((city) => city.il);
        }
      } catch (error) {
        console.error('Şehirler yüklenemedi:', error);
      }
    };

    return {
      firstName,
      lastName,
      birthDate,
      gender,
      tcno,
      formattedPhone,
      email,
      selectedCity,
      selectedDistrict,
      address,
      maxDate,
      handleSubmit,
      validateName,
      validateDate,
      validateTCNo,
      formatPhone,
      updateDistricts,
      districts,
      cities,
      fetchCities,
    };
  },
};
</script>

  
<style scoped>

.form-container {
    background-color: #fff;
    color: #333;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
h2 {
    text-align: center;
    margin-bottom: 20px;
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
input[type="tel"],
input[type="email"],
input[type="date"],
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
}
input[type="radio"] {
    margin-right: 5px;
}
.radio-group {
    display: flex;
    justify-content: space-between;
}
.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}
.submit-button:hover {
    background-color: #0056b3;
}
</style>
