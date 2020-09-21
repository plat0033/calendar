Vue.component('day', {
  props: ['year', 'month', 'day', 'events'],
  computed: {
    date: function () {
      return new Date(this.year, this.month - 1, this.day)
    },
    isToday: function () {
      // let today = new Date();
      return this.onDate(new Date())
      // console.log("isToday")
      // console.log(this.date.getDate() === today.getDate())
      // return this.date.getDate() === today.getDate()
    }
  },
  methods: {
    onDate: function (someDate) {
      return this.date.getDate() === someDate.getDate() &&
        this.date.getMonth() === someDate.getMonth() &&
        this.date.getFullYear() === someDate.getFullYear()
    },
    getTime: function (date) {
      const d = new Date(date)
      return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    },
    editEvent: function (event) {
      this.$root.newEvent = event
      this.$root.editEventForm = true
      this.$root.showEventForm = true
    }
  },
  template: `
  <div class="day" :class="{today: isToday}">
    <span class="day-number">{{ day }}</span>
    <div class="event" v-for="event in events" v-if="onDate(new Date(event.date))" @click="editEvent(event)">{{ event.text }} <span class="event-time">{{ getTime(event.date) }}</span></div>
  </div>`
})

const app = new Vue({
  el: '#app',
  data: {
    month: 3,
    year: 2020,
    newEvent: {
      text: '',
      date: '',
      details: ''
    },
    showEventForm: false,
    editEventForm: false,
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    events: [
      { text: 'Web Production', date: '2020-02-03T01:30', details: 'Vue Transitions and localStorage' },
      { text: 'Web Production', date: '2020-02-10T13:30', details: 'Vue CLI' },
      { text: 'Web Production', date: '2020-02-17T13:30', details: 'No Class' }
    ]
  },
  mounted: function () {
    console.log(this.events)
    if (localStorage.getItem('events')) {
      this.events = JSON.parse(localStorage.getItem('events'))
      console.log(this.events)
    }

    const today = new Date()
    this.month = today.getMonth() + 1
    this.year = today.getFullYear()
  },
  watch: {
    events: {
      handler: function () {
        localStorage.setItem('events', JSON.stringify(this.events))
      },
      deep: true
    }
  },
  computed: {
    monthName: function () {
      return this.months[this.month - 1]
    },
    daysInMonth: function () {
      return new Date(this.year, this.month, 0).getDate()
    },
    startDay: function () {
      return new Date(this.year, this.month - 1, 1).getDay()
    }
  },
  methods: {
    getEventIndex: function (event) {
      return this.events.findIndex(e => e.text === event.text && e.date === event.date)
    },
    addEvent: function () {
      this.events.push( {...this.newEvent} )
      this.close()
    },
    deleteEvent: function () {
      this.events.splice(this.getEventIndex(this.newEvent), 1)
      this.close()
    },
    close: function () {
      this.showEventForm = false
      this.newEvent = { text: '', date: '', details: '' }
      this.editEventForm = false
    }
  }
})
