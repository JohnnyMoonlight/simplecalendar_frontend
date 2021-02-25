
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
  .picker {
    position:fixed;
    background: white;
    border-radius: 5px;
    top:30%;
    left:35%;
    width:30%;
    padding:5%;
  }
</style>


<template lang="html">
  <section v-if="toggled" class="date-time-select">
    <div class="backdrop">
      <div class="picker">

      <h1>Select appointment</h1>
      <Datetime :backdrop-click="true" :minute-step="15" type="datetime" />
    <button>Speichern</button>
    <button v-on:click="$emit('close-modal')">Schließen</button>
      </div>
    </div>
  </section>
</template>

<script lang="js">
import { Datetime } from 'vue-datetime';

  export default  {
    name: 'date-time-select',
    props: ["toggled"],
    components: {
      Datetime
    },
    mounted () {

    },
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
