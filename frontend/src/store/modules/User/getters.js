export default {
    getUser(state) {
      return state.user;
    },
    getCities(state) {
      return state.cities;
    },
    getDistricts: (state) => (city) => {
      return state.districts[city] || [];
    }
  };
  