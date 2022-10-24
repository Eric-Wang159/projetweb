<template>

  <div class="container">

    <Bar class="graph"
         :chart-options="{responsive: true,
          scales:{
              y: {
                title: {
                  display: true,
                  text: 'Grams per terabyte-hour'
                }
              }
            }
          }"
         :chart-data="{
          labels: [ 'Central US', 'France', 'East Asia' ],
          datasets: [ { data: [...yourMom], backgroundColor:'#1B006A',	  label: 'Emission intensity for the HDD storage in g CO2e per terabyte-hour' } ]
        }"
         :chart-id="'bar-chart'"
         :dataset-id-key="'label'"
         :plugins="{}"
         :css-classes="''"
         :styles="{}"
         :width="20"
         :height="20"
    />

    <Bar class="graph"
         :chart-options="{
            responsive: true,
             scales: {
                y: {
                  title: {
                    display: true,
                    text: 'Grams per gigabyte-hour'
                  }
                }
              }

          }"
         :chart-data="{
            labels: [ 'Central US', 'France', 'East Asia' ],
            datasets: [ { data: [...yourSister], backgroundColor:'#B00003', label: 'Emission intensity for use of cloud computing memory in g CO2e per gigabyte-hour'} ]
          }"
         :chart-id="'bar-chart'"
         :dataset-id-key="'label'"
         :plugins="{}"
         :css-classes="''"
         :styles="{}"
         :width="20"
         :height="20"
    />

    <Bar class="graph"
         :chart-options="{responsive: true,
          scales:{
              y: {
                title: {
                  display: true,
                  text: 'Grams per hour'
                }
              },
            }
          }"
         :chart-data="{
          labels: [ 'Central US', 'France', 'East Asia' ],
          datasets: [ { data: [...yourDad], backgroundColor:'#B000AB', label: 'Emission intensity for usage of a single CPU in g CO2e per hour' } ]
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
import {Bar} from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "Graph",
  components: {
    Bar
  },
  created() {
    this.data('storage-provider_azure-region_central_us-type_hdd');
    this.data('storage-provider_azure-region_france-type_hdd');
    this.data('storage-provider_gcp-region_asia_east_2-type_hdd');

    this.data2('cpu-provider_azure-region_central_us');
    this.data2('cpu-provider_azure-region_france');
    this.data2('cpu-provider_gcp-region_asia_east_2');

    this.data3('memory-provider_azure-region_france');
    this.data3('memory-provider_azure-region_france');
    this.data3('memory-provider_gcp-region_asia_east_2');
  },
  data() {
    return {
      yourMom: [],
      yourDad: [],
      yourSister: []
    }
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
    data2(activity_id) {
      fetch("https://beta3.api.climatiq.io/estimate", {
        method: 'POST',
        headers: {'Authorization': 'Bearer 3A0YPFGDWZMDZDJEH66B9Y2BYPX7'},
        body: JSON.stringify({
          "emission_factor": {"activity_id": activity_id},
          "parameters": {
            "number": 15,
            "time": 3,
            "time_unit": "m"
          }
        })
      })
          .then((res) => res.json())
          .then((jsonRes) => {
            this.yourDad.push(Number((jsonRes.co2e*1000).toPrecision(2)));
          });
    },
    data3(activity_id) {
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
            this.yourSister.push(Number((jsonRes.co2e*1000).toPrecision(2)));
          });
    }
  }
}
</script>

<style scoped>
.graph{
  width: 70%;
  margin: 2%;
}

.container{
  display: flex;
  justify-content: center;
}
</style>