<template>
    <h1>Calcule ton CO2 avec Memory</h1>
  <br><br>
    <form @submit.prevent="elma();">
      <span style="color: red;" v-for="(error, index) in myErrors" :key="index">{{error}}<br><br></span><br>
      <div class="bigContainer">
        <div class="formContainer">
          <select class="form" v-model="region" name="region">
            <option v-if='!region' value="">Select your region</option>
            <option v-for='(region, index) in valid_regions' :key = 'index' :value=region>{{region}}</option>
          </select>
          <br/><br/><br/>

          <input class="form" type="number" step="0.01" v-model="daata" placeholder="Enter your data consumption"/>&nbsp;

          <select class="form" style="width:100px;" v-model="data_unit" name="data_unit">
            <option value = "MB">MB</option>
            <option value = "GB">GB</option>
            <option value = "TB">TB</option>
          </select>
          <br/><br/><br/>

          <input class="form" type="number" step="0.1" v-model="duration" placeholder="Enter your usage duration"/>&nbsp;

          <select class="form" style="width:100px;" v-model="duration_unit" name="duration_unit">
            <option value = "day">day</option>
            <option value = "h">h</option>
            <option value = "m">min</option>
            <option value = "s">s</option>
            <option value = "ms">ms</option>
          </select>

          <br/><br/><br/>
          <div class="buttonContainer">
            <input class="submitButton" type="submit" value="Submit"/>
          </div>
        </div>
      </div>
    </form>
    <br>
    <div v-if="co2e" style="font-size: x-large; font-weight: bold;">Ton CO2 est de {{co2e + " " + co2e_unit}}</div>
  </template>
  
  <script>
  
  export default {
    name: "CPUPage",
    data() {
      return {
        valid_regions: ['australia', 'australia_central', 'australia_central_2', 'australia_east', 'australia_south_east', 'brazil', 'brazil_south', 'brazil_south_east', 'canada',
         'canada_central', 'canada_east', 'central_india', 'central_us', 'east_asia', 'east_us', 
         'east_us_2', 'east_us_3', 'france', 'france_central', 'france_south', 'germany', 
         'germany_north', 'germany_west_central', 'india', 'india_central', 'india_south', 'india_west',
         'japan', 'japan_east', 'japan_west', 'korea', 'korea_east', 'korea_south',
         'north_central_us', 'north_europe', 'norway', 'norway_east', 'norway_west', 'south_africa',
         'south_africa_north', 'south_africa_west', 'south_central_us', 'south_india',
         'southeast_asia', 'switzerland', 'switzerland_north', 'switzerland_west', 'uk',
         'uk_south', 'uk_west', 'united_arab_emirates', 'united_arab_emirates_central',
         'united_arab_emirates_north', 'west_central_us', 'west_europe', 'west_india',
         'west_us', 'west_us_2', 'west_us_3'],
        region: '',
        duration_unit: 'h',
        duration: null,
        data_unit: 'GB',
        daata: null,
        myErrors: [],
        co2e: 0,
        co2e_unit: '',
        }
    },
    methods: {
      lucoa() {
        fetch("https://beta3.api.climatiq.io/compute/azure/memory", {
            method: 'POST',
            headers: {'Authorization': 'Bearer 3A0YPFGDWZMDZDJEH66B9Y2BYPX7'},
            body: JSON.stringify({
                "region": this.region,
                "data": this.daata,
                "data_unit": this.data_unit,
                "duration": this.duration,
                "duration_unit": this.duration_unit
            })
        })
        .then((res) => res.json())
        .then((jsonRes) => {
            this.reset();
            this.co2e = jsonRes.co2e;
            this.co2e_unit = jsonRes.co2e_unit;
        });
      },
      elma() {
        this.myErrors = [];
        !this.region ? this.myErrors.push("No region given") : null;
        if (this.daata == null || this.daata == 0){
          this.myErrors.push("No data given");
        } else if(this.daata < 0) {
           this.myErrors.push("Data cannot be negative");
        } else {
          this.daata > 1e+300 ? this.myErrors.push("Data number too high") : null;
        }

        if (this.duration == null || this.duration == 0){
          this.myErrors.push("No duration given");
        } else if (this.duration < 0) {
          this.myErrors.push("Duration cannot be negative");
        } else {
          this.duration > 1e+300 ? this.myErrors.push("Duration number too high") : null;
        }
        
        !this.myErrors.length ? this.lucoa() : null;
      },
      reset() {
        this.myErrors = [];
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>