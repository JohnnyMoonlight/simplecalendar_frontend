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
      
      <b-table id="roomTable"
        :fields="fields"
        striped hover
        :items="rooms"
        :per-page="perPage"
        :current-page="currentPage">

          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>

          <template #cell(name)="data">
            <span>{{data.item.name}}</span>
          </template>

          <template #cell(actions)="row">
            <b-button-group>
              <b-button v-if="$auth.isAuthenticated" variant="success">
                <span>Edit</span>
              </b-button>
              <b-button @click="info(row.item, row.index, $event.target)" variant="info">
                Details
              </b-button>
              <b-button v-if="$auth.isAuthenticated" @click="deleteRoomWithId(row.item.roomId)" variant="danger">
                <span>Delete</span>
              </b-button>
            </b-button-group>
          </template>
      </b-table>
    </div>

      <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      
      <ul id="example-1">
        <span v-if="infoModal.content.appointments">
          Appointments: {{infoModal.content.appointments.length}}
        </span>
        <li v-for="(appointment, index) in infoModal.content.appointments" :key="appointment.id">
          <div>
            {{index+1}}
          </div>
          <div>
            <small>
            Start: {{ appointment.startTime }}
            </small>
          </div>
          <div>
            <small>
            End: {{ appointment.endTime }}
            </small>
          </div>
       </li>
      </ul>
    </b-modal>

    <div v-if="$auth.isAuthenticated">
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
        rooms : [],
        fields: [{key:"index", sortable:true}, {key:"name", sortable:true}, "actions"],
        isLoggedIn:true,
        perPage: 10,
        currentPage: 1,
        form: {
          name:"",
          roomId:null
        },
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }

      }
    },
    created() {
      this.fetchRooms();
    },
    methods: {
      debug(event) {
        console.log(event)
      },
      info(item, index, button) {
        this.infoModal.title = `Room : ${item.name}`;
        this.infoModal.content = item;
        this.$root.$emit('bv::show::modal', this.infoModal.id, button);
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      async postData() {
      const roomsRequest = await fetch("api/createRoom", {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
      });
      this.fetchRooms();
    },
      async deleteRoomWithId(id) {
        const deleteOptions = {"method":"delete"}
        const deleteRoomRequest = await fetch ("api/deleteRoom/"+id, deleteOptions);
        console.log(deleteRoomRequest);
        this.fetchRooms();
      }, 
      async fetchRooms() {
        const roomsRequest = await fetch("api/allRooms", {
          headers: { 'Accept': 'application/json' }
        }
        );
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
