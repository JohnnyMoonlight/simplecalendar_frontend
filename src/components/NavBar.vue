<template lang="html">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/rooms">Rooms</router-link> |
      <router-link to="/calendar">Calendar</router-link> |
      <a href="/login.html">Sign In</a>

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
        userIsAdmin: true,
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
