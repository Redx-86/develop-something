import { ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export function useUserForm() {
  const store = useStore();

  const firstName = ref('');
  const lastName = ref('');
  const birthDate = ref('');
  const gender = ref('');
  const tcno = ref('');
  const formattedPhone = ref('');
  const email = ref('');
  const selectedCity = ref('');
  const selectedDistrict = ref('');
  const address = ref('');
  const maxDate = ref(new Date().toISOString().split('T')[0]); 
  const tcError = ref('');
  const cities = ref([]);
  const districts = ref({}); 

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
      await store.dispatch('user/submitForm', formData);
    } catch (error) {
      console.error('Hata oluştu:', error);
    }
  };

  const setMaxDate = () => {
    const today = new Date();
    maxDate.value = today.toISOString().split('T')[0]; 
  };

  const validateName = (field) => {
    if (field === 'firstName') {
      firstName.value = firstName.value.replace(/[^a-zA-ZığüşöçİĞÜŞÖÇ\s]/g, '');
    } else if (field === 'lastName') {
      lastName.value = lastName.value.replace(/[^a-zA-ZığüşöçİĞÜŞÖÇ\s]/g, '');
    }
  };

  const validateDate = (event) => {
    const inputDate = new Date(event.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (inputDate > today) {
      event.target.value = maxDate.value; 
      alert('Lütfen bugünden önceki bir tarih girin.');
    }
  };

  const validateTCNo = () => {
    tcno.value = tcno.value.replace(/\D/g, '');
    if (tcno.value.length !== 11) {
      tcError.value = 'TC Kimlik Numarası 11 haneli olmalıdır.';
      return false;
    }
    let tekBasamaklar = 0;
    let ciftBasamaklar = 0;
    for (let i = 0; i <= 8; i += 2) tekBasamaklar += parseInt(tcno.value[i]);
    for (let i = 1; i <= 7; i += 2) ciftBasamaklar += parseInt(tcno.value[i]);
    if (((7 * tekBasamaklar) - ciftBasamaklar) % 10 !== parseInt(tcno.value[9])) {
      tcError.value = 'Geçersiz TC Kimlik Numarası.';
      return false;
    }
    let toplam = 0;
    for (let i = 0; i <= 9; i++) toplam += parseInt(tcno.value[i]);
    if (toplam % 10 !== parseInt(tcno.value[10])) {
      tcError.value = 'Geçersiz TC Kimlik Numarası.';
      return false;
    }
    tcError.value = '';
    return true;
  };

  const formatPhone = () => {
    let cleaned = formattedPhone.value.replace(/\D/g, '');
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      formattedPhone.value = `(${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
    } else {
      formattedPhone.value = cleaned;
    }
  };

  const updateDistricts = async () => {
    try {
      if (selectedCity.value) {  
        const response = await axios.get(`http://localhost:5000/api/iller/${selectedCity.value}`);
        console.log('İlçe verileri:', response.data); 
        districts.value[selectedCity.value] = response.data;
      }
      selectedDistrict.value = ''; 
    } catch (error) {
      console.error('İlçeler yüklenemedi:', error);
      alert('İlçe verileri yüklenemedi.');
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
    cities,
    districts,
    tcError,
    setMaxDate,
  };
}
