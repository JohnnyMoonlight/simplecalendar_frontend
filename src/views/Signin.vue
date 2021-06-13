<template lang="html">
<div>
<b-form>
  <b-container>
  <b-row>
    <b-col>
  <b-form-group
    id="userNameGroup"
    for="userName"
    description="Please enter your user name"

  >
    <b-form-input
    id="userName"
    placeholder="User name"
    v-model="userInfo.userName"
    >
    </b-form-input>
  </b-form-group>
</b-col>
<b-col>
  <b-form-group
    id="passwordGroup"
    for="password"
    type="password"
    description="Please enter your password"
  >
    <b-form-input
    id="password"
    placeholder="..."
    v-model="userInfo.password"
    >

    </b-form-input>
  </b-form-group>
  </b-col>
</b-roW>
    <b-button @click="submit" variant="primary">Log in</b-button>
</b-container>
</b-form>


</div>
</template>

<script lang="js">

  export default  {
    name: 'signin',
    props: [],
    mounted () {

    },
    data () {
      return {
        userInfo:{
          username:"",
          password:""
        }
      }
    },
    methods: {
      submit () {
        let request = fetch("/signin", {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.userInfo)
        })
      }

    },
    computed: {

    }
}


</script>

<style scoped>
  .signin {

  }
</style>
