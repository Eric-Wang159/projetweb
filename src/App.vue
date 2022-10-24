<template>

  <img style="width:500px;" src="./assets/efreiq.png"/>
  <br><br>
  <div id="nav">
    <router-link class="button" to="/">Home</router-link>
    <router-link class="button" to="/MemoryPage">Memory CO2</router-link>
    <router-link class="button" to="/CPUPage">CPU CO2</router-link>
    <router-link class="button" to="/StoragePage">Storage CO2</router-link>
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

.graph{
  width: 500px;
}

.container{
  display: flex;
  justify-content: center;
}

</style>
