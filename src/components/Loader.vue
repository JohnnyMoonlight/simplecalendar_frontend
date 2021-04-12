<template lang="html">

  <section class="">
    <div v-if="this.loading == true" class="backdrop">
      <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
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
