
<style scoped>
  .backdrop {
    background: rgba(87, 87, 83, 0.5);
    position:fixed;
    height: 110%;
    width: 110%;
    z-index: 10000;
    top:-10%;
    left:-10%;
  }
  .content {
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
  <section v-if="selectedDate" class="date-time-select">
    <b-modal @close="cancelModal" @ok="saveAndCloseModal" :visible="toggled" id="my-modal" :title="'Create new appointment for ' + selectedDate.toLocaleDateString()">
              
            Raum:
            <div>
                <b-select v-model="selectedRoom" >
                  <option v-for="room in rooms" v-bind:value="room.roomId"> {{room.name}}</option>
                </b-select>
              </div>
            </div>

              Start: <Datetime class="input-form" v-model="startDate" :minute-step="15" type="time" />

              End: <Datetime v-model="endDate" :minute-step="15" type="time" />

    </b-modal>

  </section>
</template>

<script lang="js">
import { Datetime } from 'vue-datetime';

  export default  {
    name: 'date-time-select',
    props: ["toggled", "selectedDate", "rooms", "isLoggedIn"],
    components: {
      Datetime
    },
    mounted () {

    },
    data () {
      return {
        selectedRoom: "",
        startDate: "",
        endDate: ""
      }
    },
    methods: {
      cancelModal() {
        this.toggle = false;
      },
      saveAndCloseModal() {
        this.$emit('saveNewAppointment', this.returnAppointmentJson());
      },
      createAppointmentDateFromSelectedDateAndSelectedTime(selectedDate, selectedTime) {
        let dateWithDate = new Date(selectedDate);
        let dateWithTime = new Date(selectedTime);

        return new Date(dateWithDate.getFullYear(), dateWithDate.getMonth(), dateWithDate.getDate(), dateWithTime.getHours(), dateWithTime.getMinutes());

      },
      returnAppointmentJson() {
        return {
          roomId:this.selectedRoom,
          startTime:this.createAppointmentDateFromSelectedDateAndSelectedTime(this.selectedDate, this.startDate),
          endTime:this.createAppointmentDateFromSelectedDateAndSelectedTime(this.selectedDate, this.endDate)
        }
      }
    }
}


</script>
