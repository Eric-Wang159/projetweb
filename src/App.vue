<template>

  <img style="width:30%;" src="./assets/efreiq.png"/>
  <br><br>
  <div class="nav" id="nav">
    <router-link class="button" to="/">Home</router-link>
    <router-link class="button" to="/MemoryPage">Memory CO2</router-link>
    <router-link class="button" to="/CPUPage">CPU CO2</router-link>
    <router-link class="button" to="/StoragePage">Storage CO2</router-link>
    <router-link class="button" to="/Graph">Graph page</router-link>
  </div>
  <router-view/>
</template>

<style>

.button{
  font-size: xx-large;
  border: solid 1px;
  margin: 10px;
  padding: 10px;
  text-decoration: none;
}

.button:hover{
  background-color: lightgray;
}

.button:active{
  background-color: darkgrey;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.form{
  border-radius: 20px;
  width: 25%;
  font-size: x-large;
  box-shadow: inset 0px 0px 10px 3px lightgrey ;
  border: none;
  padding: 10px;
}

.submitButton{
  font-size: xx-large;
  border: solid 1px;
  margin: 10px;
  padding: 10px;
  text-decoration: none;
  background-color: white;
}

.submitButton:hover{
  background-color: lightgray;
}

.submitButton:active{
  background-color: darkgrey;
}

</style>
