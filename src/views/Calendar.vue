<style>

</style>

<template>
  <div>
    <Loader :loading="loading"/>
    <DateTimeSelect ref="dateTimeSelect"
      @saveNewAppointment="postData($event)" 
      @close-modal="this.toggleAppointmentPicker"
      @modalClosed="this.appointmentPickerToggled = false"
      :rooms="rooms"
      :selectedDate="selectedDate"
      :appointmentPickerToggled="appointmentPickerToggled" />
    <FullCalendar  :options="calendarOptions"  />
    <b-modal ok-only :title="this.eventModal.title" v-model="eventModal.showEventModal" id="my-modal">{{eventModal.content}}</b-modal>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import Loader from '../components/Loader.vue'
import DateTimeSelect from '../components/DateTimeSelect.vue'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    Loader,
    DateTimeSelect
    
  },
  data() {
    return {
      loading : false,
      appointmentPickerToggled: false,
      selectedDate: null,
      rooms:null,
      eventModal: {
        title:"",
        content:"",
        showEventModal:false
      },
      calendarOptions: {
        height:"auto",
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
        eventClick: this.showEvent,
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek reloadButton'
        },
        dateClick: (info) => {
          this.toggleAppointmentPicker(info.date);
        },
        customButtons: {
          reloadButton: {
            text: 'Reload data',
            click: _ => {this.refreshData()}
            }
        },      
        weekNumbers: true,
        events: [
        ]
      }
    }
  },
  created (){
    this.refreshData();
    this.fetchRooms();
  },
  methods: {
    showEvent(clickInfo) {
      this.eventModal.title = clickInfo.event.title;
      this.eventModal.content = new Date();
      this.eventModal.showEventModal = true;
    },
    async fetchData () {
      const appointmentsRequest = await fetch("api/allAppointments");
      const appointments = await appointmentsRequest.json();
      return appointments;
    },
    async postData(data) {
      const appointmentsRequest = await fetch("api/createAppointment", {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      if (appointmentsRequest.ok) {
        this.refreshData();
        this.toggleAppointmentPicker();
      } else if (appointmentsRequest.status==403) {
        console.log("Not authenticated.")
      }
    },
    async fetchRooms() {
      const roomsRequest = await fetch("api/allRooms");
      const rooms = await roomsRequest.json();
      this.rooms = rooms;
    },
    debug (data) {
      console.log(data);
    },
    parseAppointments (appointments) {
      if (appointments.length > 0) {
        for (let apt of appointments) {
          let startDate = new Date(JSON.parse(apt.startTime));
          let endDate = new Date(JSON.parse(apt.endTime));
          let d = {
            "title":apt.room.name + ":" + apt.id,
            "start":startDate,
            "end":endDate,
          };
          this.calendarOptions.events.push(d);
        }
      }
    },
    refreshData () {
      this.calendarOptions.events = [];
      this.loading = true;
      this.fetchData()
      .then(appointments=>this.parseAppointments(appointments))
      .then(()=>this.loading=false)
    },
    toggleAppointmentPicker(info) {

        this.appointmentPickerToggled = true;
        this.selectedDate = info;
      
    }
  }
}


</script>
