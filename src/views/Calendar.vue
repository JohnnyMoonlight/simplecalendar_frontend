<style scoped>

</style>

<template>
<div>
  <Loader :loading="loading"/>
  <FullCalendar  :options="calendarOptions"  />
</div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import Loader from '../components/Loader.vue'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    Loader
  },
  data() {
    return {
      loading : false,
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek reloadButton'
        },
        dateClick: (info) => alert("132"),
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
  },
  methods: {
    async fetchData () {
      const appointmentsRequest = await fetch("http://localhost:8081/allAppointments");
      const appointments = await appointmentsRequest.json();
      return appointments;
    },
    parseAppointments (appointments) {
      if (appointments.length > 0) {
        for (let apt of appointments) {
          let startDate = new Date(apt.startTime);
          let endDate = new Date(apt.endTime);
          let d = {
            "title":apt.id,
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
      .then(()=>this.loading=false);
    }
  }
}

var calendar;

</script>
