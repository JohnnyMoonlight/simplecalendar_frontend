<template lang="html">
  <section class="rooms-vue">
    <h1>Rooms </h1>
  Available rooms: {{rooms.length}}
      <div class="overflow-auto">
      <b-pagination
      v-model="currentPage"
      :total-rows="rooms.length"
      :per-page="perPage"
      aria-controls="roomTable"
      ></b-pagination>
      
    <b-table id="roomTable" striped hover :items="rooms" :per-page="perPage" :current-page="currentPage"></b-table>

  </div>


    <div v-if="isLoggedIn">
      <b-form  @submit="postData">
        <b-form-group
          id="input-group-1"
          label="Room name:"
          label-for="input-1"
          description="Create a new room to book appointments."
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            placeholder="Enter room name"
            required
          ></b-form-input>
        </b-form-group>
      <b-button type="submit" variant="success">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'rooms-vue',
    props: [],
    data () {
      return {
        rooms : [{}],
        isLoggedIn:true,
        perPage: 3,
        currentPage: 1,
        form: {
          name:"",
          roomId:null
        }

      }
    },
    created() {
      this.fetchRooms();
    },
    methods: {
      debug(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      async postData() {
      const roomsRequest = await fetch("http://localhost:8081/createRoom", {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
      });
      this.fetchRooms();
    },
      async fetchRooms() {
        const roomsRequest = await fetch("http://localhost:8081/allRooms");
        const rooms = await roomsRequest.json();
        this.rooms = rooms;
      }
    },
    computed: {

    }
}


</script>

<style>
  .rooms-vue {
    text-align: center;
  }

</style>
