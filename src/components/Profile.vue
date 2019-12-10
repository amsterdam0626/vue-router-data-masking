<template>
  <div>
    Profile:{{params}}
  </div>
</template>

<script>
export default {
  name: 'Profile',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      debugger;
      vm.params=vm.$store.getters.getParamsByToken(vm.$route.query.token)
    })
  },
  data(){
    return{
      params:{}
    }
  },
}
</script>

<style scoped>

</style>
