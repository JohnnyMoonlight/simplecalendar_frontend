<template lang="html">

  <section class="icon-selector">
    <label for="selectIcon">Icon:</label>
    <div class="input-group-prepend">
    <select @change="emitIcon($event.target.value)" id="selectIcon" class="form-control iconSelect" v-model="selectedIcon">
      <option value="">Kein Icon</option>
      <option value="user-secret">User-Secret</option>
      <option value="coffee">Kaffee</option>
      <option value="archway">Archway</option>
    </select> 
    <span class="iconContainer input-group-text"><font-awesome-icon :icon='selectedIcon' /></span>
    </div>

  </section>

</template>

<script lang="js">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faCoffee, faArchway } from '@fortawesome/free-solid-svg-icons'
library.add(faUserSecret, faCoffee, faArchway);
  export default  {
    name: 'icon-selector',
    props: [],
    mounted () {

    },
    data () {
      return {
        selectedIcon:null
      }
    },
    methods: {
      emitIcon(icon) {
        this.$emit('iconEmitted', icon)
      }

    },
    computed: {

    }
}


</script>

<style scoped>
  .iconContainer {
    width:45px;
  }

  .iconSelect {
    width:60%
  }
</style>
