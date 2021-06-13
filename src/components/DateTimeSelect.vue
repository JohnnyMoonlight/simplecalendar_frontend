
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

    <section >
      <b-modal ok-only v-if="selectedDate" class="date-time-select" @hide="cancelModal" @ok="saveAndCloseModal" :visible="appointmentPickerToggled" id="my-modal" :title="modalTitleWithDate">
              

              <div>Event title:
                <b-form-input v-model="eventTitle" placeholder="Give this event a fancy title"></b-form-input>
              </div>
              Room:
              <div>
                  <b-select v-model="selectedRoom" >
                    <option v-for="room in rooms" v-bind:value="room.roomId"> {{room.name}}</option>
                  </b-select>
                </div>
              </div>
              <b-row>
                <b-col>
                  Start: <Datetime placeholder="Click to select start time" input-class="form-control" v-model="startDate" :minute-step="15" type="time" />
                </b-col>
                <b-col>
                  End: <Datetime placeholder="Click to select end time" input-class="form-control"  v-model="endDate" :minute-step="15" type="time" />
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                <b-form-checkbox v-model="isRecurringEvent">Is recurring event</b-form-checkbox>
                  <b-form-select :disabled="!isRecurringEvent" v-model="selectedCycle" :options="recurringOptions"></b-form-select>
                </b-col>
                 <b-col>
                Number of recursions:
                  <b-form-select :disabled="!isRecurringEvent" v-model="selectedRecurrences" :options="recurrenceOptions"></b-form-select>
                </b-col>               
             </b-row>

      </b-modal>

    </section>
</template>

<script lang="js">
import { Datetime } from 'vue-datetime';

  export default  {
    name: 'date-time-select',
    props: ["appointmentPickerToggled", "selectedDate", "rooms"],
    components: {
      Datetime
    },
    mounted () {

    },
    data () {
      return {
        selectedRoom: "",
        startDate: "",
        endDate: "",
        eventTitle:"",
        isRecurringEvent: false,
        selectedCycle: "weekly",
        selectedRecurrences: 1,
        recurrenceOptions: [
          {value:1, text:1},
          {value:2, text:2},
          {value:3, text:3},
          {value:4, text:4},
          {value:5, text:5},
          {value:6, text:6},
          {value:7, text:7},
          {value:8, text:8},
          {value:9, text:9},
          {value:10, text:10},
          {value:11, text:11},
          {value:12, text:12},
          {value:13, text:13},
          {value:14, text:14},
        ],
        recurringOptions: [
          { value: "weekly", text: 'Weekly' },
          { value: "monthly", text: 'Monthly' }
        ]
      }
    },
    methods: {
      cancelModal() {
        this.appointmentPickerToggled = false;
        $emit('modalClosed', false);
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
          isRecurringEvent:this.isRecurringEvent,
          recurringCycle:this.selectedCycle,
          numberOfRecurrences: this.selectedRecurrences,
          eventTitle: this.eventTitle,
          startTime:this.createAppointmentDateFromSelectedDateAndSelectedTime(this.selectedDate, this.startDate),
          endTime:this.createAppointmentDateFromSelectedDateAndSelectedTime(this.selectedDate, this.endDate)
        }
      }
    },
    computed: {
      modalTitleWithDate () {
        return "Create new appointment for " + this.selectedDate.toLocaleDateString();
      }
    }
}


</script>
