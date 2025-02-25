// store/modules/user/actions.js

import axios from 'axios';

export default {
  async submitForm({ commit }, formData) {
    try {
      const response = await axios.post('http://localhost:5000/api/users', formData);
      commit('setUser', response.data);
      alert('Form başarıyla gönderildi! ID: ' + response.data._id);
      return response.data;
    } catch (error) {
      console.error('Form gönderilemedi:', error);
      alert('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  },
  
  async fetchCities({ commit }) {
    try {
      const response = await axios.get('http://localhost:5000/api/iller');
      if (response.data) { 
        commit('setCities', response.data.map((city) => city.il)); 
      }
    } catch (error) {
      console.error('Şehirler yüklenemedi:', error);
      alert('Şehirler yüklenemedi. Lütfen bağlantınızı kontrol edin.');
    }
  },

  async fetchDistricts({ commit }, selectedCity) {
    try {
      const response = await axios.get(`http://localhost:5000/api/iller/${selectedCity}`);
      commit('setDistricts', { city: selectedCity, districts: response.data });
    } catch (error) {
      console.error('İlçeler yüklenemedi:', error);
    }
  }
};
