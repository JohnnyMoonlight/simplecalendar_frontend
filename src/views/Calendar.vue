<template>
<div>
  <span v-if="this.loading == true">Lädt...</span>
  <span v-if="this.loading == false">Fertig geladen</span>
  <button @click="refreshData"> Daten neu laden </button>
  <FullCalendar  :options="calendarOptions"  />
</div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      loading : false,
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
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
            "end":endDate
          };
          this.calendarOptions.events.push(d);
        }
      }
    },
    refreshData () {
      this.loading = true;
      this.fetchData().then(appointments=>this.parseAppointments(appointments)).then(()=>this.loading=false);
    }
  }
}

var calendar;

</script>
