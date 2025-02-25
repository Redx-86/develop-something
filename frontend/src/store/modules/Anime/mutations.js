export default {
    setUser(state, user) {
      state.user = user;
    },
    setCities(state, cities) {
      state.cities = cities;
    },
    setDistricts(state, { city, districts }) {
      state.districts[city] = districts;
    }
  };
  