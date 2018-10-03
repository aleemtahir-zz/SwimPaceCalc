$(function () {
  $('#datetimepicker3').datetimepicker({
      format: 'HH:mm:ss'
  });

});
// Navbar component
Vue.component('navbar', {
  // template: '#navbar-template',
  props:[
    "distance",
    "lengthUnit",
    "time",
    "paceMeteric",
    "paceImperial",
    "speedMeteric",
    "speedImperial",
    "showResult",
    "showExample"
    ]
});

// Create a root instance
new Vue({
  el: '#app',
  data: {
    form: {
      distance: 1000,
      unit: "Meters",
      time: "19:15:00",
      result:{
        pace:{
          meteric: "2:00",
          imperial: "2:34"
        },
        speed:{
          meteric: "0.5",
          imperial: "1.3"
        }
      },
      show: false,
      showExample: false
    }
  },
  methods:{
    calculateResult: function (event) {
      var distance = $('#distance').val();
      var time = $('#timeInput').val();
      var unit = $("input[name='unit']:checked").val();
      
      // `this` inside methods points to the Vue instance
      this.form.show = true;
      this.form.distance = distance;
      this.form.time = time;
      this.form.unit = unit;

      if(unit !== 'Meters')
        distance = distance*0.9144; //convert yards to meters
      
      //convert timeinto seconds
      seconds = time.split(':').reduce((acc,time) => (60 * acc) + +time);
      
      var paceMeteric   = seconds/distance * 100;
      var speedMeteric  = (distance / 1000) / (seconds / 3600);
      var paceImperial  = seconds/distance * 100 * 0.9144;
      var speedImperial  = (distance / 1609.34) / (seconds / 3600);
      
      //convert seconds into time
      this.form.result.pace.meteric = this.secondsTimeSpanToHMS(paceMeteric);
      this.form.result.pace.imperial = this.secondsTimeSpanToHMS(paceImperial);
      this.form.result.speed.meteric = Number.parseFloat(speedMeteric).toPrecision(1);
      this.form.result.speed.imperial = Number.parseFloat(speedImperial).toPrecision(1);

      
    },
    secondsTimeSpanToHMS: function (s) {
        var h = Math.floor(s/3600); //Get whole hours
        s -= h*3600;
        var m = Math.floor(s/60); //Get remaining minutes
        s -= m*60;
        s = Math.round(s);
        return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
    },
    closeResult: function(){
      this.form.show = false;
    },
    expandExample: function(){
      this.form.showExample = !this.form.showExample;
    }
  }
});