<template>
  <h1>Calcule ton CO2 avec Storage</h1>
  <form @submit.prevent="elma();">
    <span style="color: red;" v-for="(error, index) in myErrors" :key="index">{{error}}<br></span>
    <select style="width: 209px;" v-model="region" name="region">
      <option v-if='!region' value="">Select your region</option>
      <option v-for='(region, index) in valid_regions' :key = 'index' :value=region>{{region}}</option>
    </select>
    <br/><br/>
    <select style="width: 209px;" v-model="storage_type" name="storage_type">
      <option value = "ssd">ssd</option>
      <option value = "hdd">hdd</option>
    </select>
    <br/><br/>
    <input style="width: 145px;" type="number" step="0.01" v-model="ndata" placeholder="data"/>&nbsp;
    <select v-model="data_unit" name="data_unit">
      <option value = "MB">MB</option>
      <option value = "GB">GB</option>
      <option value = "TB">TB</option>
    </select>
    <br/><br/>
    <input style="width: 145px;" type="number" step="0.01" v-model="duration" placeholder="duration"/>&nbsp;
    <select v-model="duration_unit" name="duration_unit">
      <option value = "day">day</option>
      <option value = "h">h</option>
      <option value = "m">min</option>
      <option value = "s">s</option>
      <option value = "ms">ms</option>
    </select>
    <br/><br/>
    <input type="submit" value="Submit"/>
  </form>
  <br>
  <div v-if="co2e">Ton CO2 est de {{co2e + " " + co2e_unit}}</div>
  <div class="container">
    <Bar class="graph"
      :chart-options="{responsive: true}"
      :chart-data="{
          labels: [ 'Central US', 'France', 'East Asia' ],
          datasets: [ { data: [...yourMom], backgroundColor:'#1B006A',	  label: 'Emission intensity for the HDD storage in g CO2e per terabyte-hour for the Azure data centers' } ]
        }"
      :chart-id="'bar-chart'"
      :dataset-id-key="'label'"
      :plugins="{}"
      :css-classes="''"
      :styles="{}"
      :width="20"
      :height="20"
    />
  </div>

</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "StoragePage",
  components: {
    Bar
  },
  data() {
    return {
      valid_regions: ['australia', 'australia_central', 'australia_central_2',
        'australia_east', 'australia_south_east', 'brazil', 'brazil_south', 'brazil_south_east',
        'canada', 'canada_central', 'canada_east', 'central_india', 'central_us', 'east_asia',
        'east_us', 'east_us_2', 'east_us_3', 'france', 'france_central', 'france_south', 'germany',
        'germany_north', 'germany_west_central', 'india', 'india_central', 'india_south',
        'india_west', 'japan', 'japan_east', 'japan_west', 'korea', 'korea_east', 'korea_south',
        'north_central_us', 'north_europe', 'norway', 'norway_east', 'norway_west', 'south_africa',
        'south_africa_north', 'south_africa_west', 'south_central_us', 'south_india',
        'southeast_asia', 'switzerland', 'switzerland_north', 'switzerland_west', 'uk', 'uk_south',
        'uk_west', 'united_arab_emirates', 'united_arab_emirates_central',
        'united_arab_emirates_north', 'west_central_us', 'west_europe', 'west_india', 'west_us',
        'west_us_2', 'west_us_3'],
      region: '',
      duration_unit: 'h',
      duration: null,
      ndata: null,
      data_unit: 'GB',
      storage_type: 'ssd',
      myErrors: [],
      co2e: 0,
      co2e_unit: '',
      yourMom: []
    }
  },
  created() {
    this.data('storage-provider_azure-region_central_us-type_hdd');
    this.data('storage-provider_azure-region_france-type_hdd');
    this.data('storage-provider_gcp-region_asia_east_2-type_hdd');
  },
  methods: {
    data(activity_id) {
      fetch("https://beta3.api.climatiq.io/estimate", {
          method: 'POST',
          headers: {'Authorization': 'Bearer 3A0YPFGDWZMDZDJEH66B9Y2BYPX7'},
          body: JSON.stringify({
              "emission_factor": {"activity_id": activity_id},
              "parameters": {
                "data": 15,
                "data_unit": "GB",
                "time": 3600,
                "time_unit": "m"
              }
          })
      })
      .then((res) => res.json())
      .then((jsonRes) => {
        this.yourMom.push(Number((jsonRes.co2e*1000).toPrecision(2)));
      });
    },
    lucoa() {
      fetch("https://beta3.api.climatiq.io/compute/azure/storage", {
        method: 'POST',
        headers: {'Authorization': 'Bearer 3A0YPFGDWZMDZDJEH66B9Y2BYPX7'},
        body: JSON.stringify({
          "storage_type": this.storage_type,
          "region": this.region,
          "data": this.ndata,
          "data_unit":this.data_unit,
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
      if (this.ndata == null){
        this.myErrors.push("no data given");
      } else {
        this.ndata < 0 ? this.myErrors.push("bad data number") : null;
      }
      if (this.duration == null){
        this.myErrors.push("no duration given");
      } else {
        this.duration < 0 ? this.myErrors.push("duration cannot be negative") : null;
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