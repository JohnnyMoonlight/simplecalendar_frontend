<template lang="html">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/calendar">Calendar</router-link>
      <span v-if="userIsAdmin"> |
        <router-link to="/menu">Settings</router-link>
      </span>

    </div>
</template>

<script lang="js">

  export default  {
    name: 'nav-bar',
    props: [],
    mounted () {

    },
    data () {
      return {
        userIsAdmin: true
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped>
  .nav-bar {

  }
</style>
