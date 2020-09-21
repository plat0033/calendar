const currentDay= new Date().getDate();
const currentMonth= new Date().getMonth();
const currentYear= new Date().getFullYear();
const currentMonthFirstDay= (new Date(currentYear, currentMonth)).getDay();
const monthsName= [
    {month: 'January', value: 1 },
    {month: 'February', value: 2 },
    {month: 'March', value: 3 },
    {month: 'April', value: 4 },
    {month: 'May', value: 5 },
    {month: 'June', value: 6 },
    {month: 'July', value: 7 },
    {month: 'August', value: 8 },
    {month: 'September', value: 9 },
    {month: 'October', value: 10 },
    {month: 'November', value: 11 },
    {month: 'December', value: 12 }
  ];
  let control_padre = 0;



Vue.component('simple-button', {
    props:['month','day','year', 'actual_title', 'actual_hour', 'actual_desc'],
    data: function(){
        return {
            hour: this.actual_hour,
            title: this.actual_title,
            description: this.actual_desc,
            sliderStatus: false
        }
    },
    methods: {
        action: function () {
            //this.title = "titulo2";
            //console.log(this.title);
            const event_id= "" + this.month + this.day + this.year 
            console.log(event_id)
            const event_detail = JSON.stringify({ title: this.title, detail: this.description, hour: this.hour })
            localStorage.setItem(event_id, event_detail)

            //localStorage.setItem('')
            const data = localStorage.getItem(event_id)
            console.log(data)
            const obj = JSON.parse(data)
            console.log(obj.title + obj.detail)
            this.sliderStatus = false;


        },

        clear: function () {
            const event_id= "" + this.month + this.day + this.year;
            localStorage.removeItem(event_id);
            this.sliderStatus = false;
            


        }

       
    },
    template: `
    <div>
        <div v-if="actual_title != ''">
            <button class="btn btn-sm btn-outline-success" @click="sliderStatus = true">
                {{this.title}}-{{this.hour}}
            </button>
        </div>
        <div v-else>
            <button class="btn btn-sm btn-outline-success" @click="sliderStatus = true">
                +
            </button>
        </div>
        
        
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <div v-if="sliderStatus" class="bg-event w-100 h-100">
                    <div class="w-50 h-50 mx-auto mt-5 eventSheet ">
                        <button type="button" class="close" @click="sliderStatus = false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="row m-3">
                            <span></span>
                        </div>
                        <div class="row m-3">
                            <h2>Event</h2>
                        </div>
                        <div class="row m-0">
                            <div class="input-group col-6">
                                <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Title</span>
                                </div>
                                <input v-model="title" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                            </div>
                            <div class="input-group col-3"></div>
                            <div class="input-group col-3">
                                <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Hour</span>
                                </div>
                                <input v-model="hour" type="time" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                            </div>
                        </div>
                        
                        
                        <div class="row m-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                <span class="input-group-text">Description</span>
                                </div>
                                <textarea v-model="description" class="form-control" aria-label="description"></textarea>
                            </div>
                        </div>
                        <div class="row m-3 ">
                           <!-- <button class="btn btn-sm btn-outline-success" @click="action">Guardar</button>
                            <button class="btn btn-sm btn-outline-danger ml-5" @click="clear">Borrar</button> -->
    
                            <div class="row m-3" v-if="actual_title != ''">
                                <form @submit.prevent="action">
                                    <button type="submit" class="btn btn-primary mr-5">Save</button>
                                </form>

                                <form @submit="clear">
                                    <button type="submit" class="btn btn-danger ml-5">Delete</button>
                                </form>
                            </div>
                            <div class="row m-3" v-else>
                                <form @submit="action">
                                    <button type="submit" class="btn btn-primary mr-5">Save</button>
                                </form>

                                <form @submit.prevent="clear">
                                    <button type="submit" class="btn btn-danger ml-5">Delete</button>
                                </form>
                                
                            </div>



                        </div>
                    </div>
                </div>
        </transition>
    </div>
    `
})


const app = new Vue({
    el: '#app',
    data: {
        columns: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", ],
        monthSelected: currentMonth+1,
        yearSelected: currentYear,
        months: monthsName,
        events:[],
        events2:[],
        event:{},
        control: control_padre,
        //sliderStatus: false,  se esta ocupando en el component

        //from the component

        
        firstD: 0 //only as a control  TBDel
    },
    computed:{
        displayMonth: function () {
            //test = this.control
            //console.log(currentDay);
            
            if (this.yearSelected >= 2000 && this.yearSelected <=2100){

                firstDay= (new Date(this.yearSelected, this.monthSelected-1)).getDay()
                daysInMonth = 32 - new Date(this.yearSelected, this.monthSelected-1, 32).getDate();
                daysInLastMonth = 32 - new Date(this.yearSelected, this.monthSelected-2, 32).getDate();
                this.firstD = firstDay //TBDel
                numberOfWeeks = Math.ceil((daysInMonth + firstDay)/7);

                lastDaysInPrevMonth = daysInLastMonth - firstDay;
                firstDaysInNextMonth = 0;
                calendarDay = 0;
                
                const data = localStorage.getItem(4292020);   //testing
                console.log(data);

                

                if(localStorage.getItem(this.monthSelected + '29' + currentYear)){
                    console.log("dentro");
                }

                console.log(this.events);
                //if (localStorage.getItem())
               
                

                week= [[],[],[],[],[],[]];
                events2=[];

                for (let i= 0; i < numberOfWeeks; i++) {
                    if (i === 0){
                        for (let j=0; j < firstDay; j++){
                            lastDaysInPrevMonth++
                            week[i].push("")
                        }
                        for(let j = firstDay; j < 7; j++){
                            calendarDay++
                            week[i].push(calendarDay)
                            console.log(this.monthSelected, calendarDay, currentYear)
                            
                            if(localStorage.getItem(this.monthSelected + calendarDay.toString() + currentYear)){
                                console.log("dentro2");
                                const value = this.monthSelected + calendarDay.toString() + currentYear;
                                const data = localStorage.getItem(this.monthSelected + calendarDay.toString() + currentYear);
                                const obj = JSON.parse(data);
                                console.log(obj.title + obj.hour);
                                console.log(value);

                                if(this.events.some(event => event.event_date === value)){
                                    
                                } else{
                                    this.events.push({event_date: value, description: obj})
                                    this.events2[value] = {title: obj.title, hour: obj.hour , desc: obj.detail};
                                }

                            }
                            
                        }
                    }else if(i < numberOfWeeks-1 ) {
                        for (let j=0; j < 7; j++) {
                            calendarDay++
                            week[i].push(calendarDay)

                            if(localStorage.getItem(this.monthSelected + calendarDay.toString() + currentYear)){
                                const value = this.monthSelected + calendarDay.toString() + currentYear;
                                const data = localStorage.getItem(this.monthSelected + calendarDay.toString() + currentYear);
                                const obj = JSON.parse(data);

                                if(this.events.some(event => event.event_date === value)){
                                    
                                } else{
                                    this.events.push({event_date: value, description: obj})
                                    this.events2[value] = {title: obj.title, hour: obj.hour , desc: obj.detail};
                                }

                            }

                        } 
                    }else{
                        for (let j=calendarDay; j < daysInMonth; j++) {
                            calendarDay++
                            week[i].push(calendarDay)

                            if(localStorage.getItem(this.monthSelected + calendarDay.toString() + currentYear)){
                                const value = this.monthSelected + calendarDay.toString() + currentYear;
                                const data = localStorage.getItem(this.monthSelected + calendarDay.toString() + currentYear);
                                const obj = JSON.parse(data);

                                if(this.events.some(event => event.event_date === value)){
                                    
                                } else{
                                    this.events.push({event_date: value, description: obj})
                                    this.events2[value] = {title: obj.title, hour: obj.hour , desc: obj.detail};
                                }

                            }
                        } 
                        lastDays = week[i].length
                        for (let j= 0; j < (7 - lastDays); j++  ) {
                            firstDaysInNextMonth++
                            week[i].push("")
                        }
                            
                    }
                } 
                return week

            }

                
        }  
    } 
}) 