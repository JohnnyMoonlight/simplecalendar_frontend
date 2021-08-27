<template lang="html">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/rooms">Rooms</router-link> |
      <router-link to="/calendar">Calendar</router-link> |
      <a v-if="userStatus.authorities=='ROLE_ANONYMOUS'" href="/login.html">
        <span >Sign In</span>
      </a>
      <a v-else href="/logout">
        Logout user <i>{{userStatus.name}}</i>
      </a>

    </div>
</template>

<script lang="js">

  export default  {
    name: 'nav-bar',
    props: [],
    beforeCreated () {
      this.getUserStatus();
    },
    data () {
      return {
        userStatus: {"name":"anonymousUser","isAuthenticated":false,"authorities":["ROLE_ANONYMOUS"]}
      }
    },
  methods: {
    async getUserStatus () {
      const userStatusRequest = await fetch("/api/users/status");
      if (userStatusRequest.ok) {
        const status = await userStatusRequest.json();
        this.userStatus = status;
      }
    },
    userHasMoreRolesThanAnonymous() {
      if (this.userStatus.authorities.includes('ROLE_ANONYMOUS')) {
        return true;
      }
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
