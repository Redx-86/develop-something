<template>
  <Hed_Navbar></Hed_Navbar>
  <router-view/>
</template>

<script>
import Hed_Navbar from './components/Hed_Navbar.vue';
export default{
  components:{
    Hed_Navbar
  }
}
</script>


