<template>
  <div>
    User:{{params}}
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data(){
    return{
      params:{}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      debugger;
      if(to.meta._maskType==='param'){
        let temp=vm.$store.getters.getParamsByToken(vm.$route.params.token);
        let obj={}
        for(const key of Object.keys(temp)){
          if(temp.hasOwnProperty(key)&&key!=='token'){
            obj[key]=temp[key].value.trueV
          }
        }
        vm.params=obj;
      }
      debugger;

    })
  },
  mounted(){
    console.log(this.params)
  }
}
</script>

<style scoped>

</style>
