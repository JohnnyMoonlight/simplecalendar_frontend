<template lang="html">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/rooms">Rooms</router-link> |
      <router-link to="/calendar">Calendar</router-link>
      <span v-if="$auth.isAuthenticated"> |
        <router-link to="/menu">Settings</router-link>
      </span>
        <span> |
          <!-- show login when not authenticated -->
          <span v-if="!$auth.isAuthenticated" @click="login">Log in</span>
          <!-- show logout when authenticated -->
          <span v-if="$auth.isAuthenticated" @click="logout">Log out</span>
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
        userIsAdmin: true,
      }
    },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  },
    computed: {

    }
}


</script>

<style scoped>
  .nav-bar {

  }
</style>
