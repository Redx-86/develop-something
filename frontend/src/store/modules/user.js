import actions from './User/actions';
import mutations from './User/mutations';
import getters from './User/getters';

const state = {
  user: {},
  cities: [],
  districts: {},
  firstName: '',
  lastName: '',
  birthDate: '',
  gender: '',
  tcno: '',
  formattedPhone: '',
  email: '',
  selectedCity: '',
  selectedDistrict: '',
  address: '',

  //tcError
  //maxdate
  
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
