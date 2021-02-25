<template lang="html">

  <section class="">
    <div v-if="this.loading == true" class="backdrop">
      <span class="loader" >Loading...<font-awesome-icon :icon="['fas', 'spinner']" spin /></span>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'Loader',
     mounted () {

    },
    props: ['loading'],
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped>
  .backdrop {
    background: rgba(87, 87, 83, 0.5);
    position:fixed;
    height: 110%;
    width: 110%;
    z-index: 10000;
    top:-10%;
    left:-10%
  }
  .loader{
    position: relative;
    background-color: rgba(2, 116, 33, 0.733);
    border-radius: 5px;
    padding: 15px;
    top:40%;
    left:3%;
  }
</style>
