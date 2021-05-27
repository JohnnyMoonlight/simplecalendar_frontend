<template lang="html">
  <section class="rooms-vue">
    <h1>Rooms </h1>
    Available rooms: {{rooms.length}}
    <div class="overflow-auto">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="roomTable"
          />
      
          <b-table id="roomTable" :fields="fields" striped hover :items="rooms" :per-page="perPage" :current-page="currentPage">

            <template #cell(index)="data">
              {{ data.index + 1 }}
            </template>

            <template #cell(name)="data">
              <span>{{data.item.name}}</span>
            </template>

            <template #cell(actions)="row">
              <b-button-group>
                <b-button title="Feature under development..." :disabled="true" v-if="$auth.isAuthenticated" variant="success">
                  <span>Edit</span>
                </b-button>
                <b-button @click="info(row.item, row.index, $event.target)" variant="info">
                  Details
                </b-button>
                <b-button v-if="$auth.isAuthenticated" @click="showDeleteModal(row.item, row.index, $event.target)" variant="danger">
                  Delete
                </b-button>
              </b-button-group>
            </template>

          </b-table>


      <!-- Delete modal -->
      <b-modal ref="deleteModal" hide-footer :id="deleteModal.id" :title="'Delete ' +deleteModal.title" @hide="resetDeleteModal">
        <b-alert variant="danger" show>Deleting this room will also delete all associated appointments.</b-alert>
          <b-button-group>
            <b-button @click="deleteRoomWithId(deleteModal.room.roomId);hideDeleteModal();"variant="danger">Delete</b-button>
            <b-button @click="resetDeleteModal();hideDeleteModal()">Cancel</b-button>
          </b-button-group>
      </b-modal>

      <!-- Info modal -->
      <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        
        <ul id="appointmentList">
          <span v-if="infoModal.content.appointments">
            Appointments: {{infoModal.content.appointments.length}}
          </span>
          <li v-for="(appointment, index) in infoModal.content.appointments" :key="appointment.id">
            <div>
              {{index+1}}
            </div>
            <div>
              <small>
              Start: {{new Date(JSON.parse(appointment.startTime)).toLocaleDateString() + " - " + new Date(JSON.parse(appointment.startTime)).toLocaleTimeString() }}
              </small>
            </div>
            <div>
              <small>
              End: {{new Date(JSON.parse(appointment.endTime)).toLocaleDateString() + " - " + new Date(JSON.parse(appointment.endTime)).toLocaleTimeString() }}
              </small>
            </div>
          </li>
        </ul>
      </b-modal>

      <div v-if="$auth.isAuthenticated">
        <b-form>
          <b-row cols="10" class="justify-content-md-center">
            <b-col cols="8">
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
            </b-col>  
            <b-col cols="2">  
              <IconSelector @iconEmitted="setIcon($event)"></IconSelector>
            </b-col>
            </b-row>
  
            <b-button @click="postData" variant="success">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </div>
     </section>
</template>

<script lang="js">

import IconSelector from '../components/IconSelector'

  export default  {
    name: 'rooms-vue',
  components: {
    IconSelector
  },
    props: [],
    data () {
      return {
        selected: null,
        options: [

        ],
        rooms : [],
        fields: [{key:"index", sortable:true}, {key:"name", sortable:true}, "actions"],
        isLoggedIn:true,
        perPage: 10,
        currentPage: 1,
        form: {
          name:"",
          icon:"",
          roomId:null
        },
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        deleteModal : {
          id: 'delete-modal',
          title: "",
          room:""
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
      showDeleteModal (item, index, button) {
        this.deleteModal.title=item.name;
        this.deleteModal.room=item;
        this.$root.$emit('bv::show::modal', this.deleteModal.id, button);
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      resetDeleteModal() {
        this.deleteModal.title = "";
        this.deleteModal.room = "";
      },
      hideDeleteModal() {
        this.$refs['deleteModal'].hide();
      },
      setIcon(icon) {
        this.form.icon = icon;
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
        try {
          const rooms = await roomsRequest.json();
          this.rooms = rooms;
        } catch {
          this.rooms = [];
        }
      }
    },
    computed: {
      totalRows() {
        return this.rooms.length;
      }
    }
}


</script>

<style>
  .rooms-vue {
    text-align: center;
  }


</style>
