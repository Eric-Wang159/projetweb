<template>

  <slot name="BaseHeader">
    <div class="header">
      <h2 class="textHeader">Home</h2>
      <h2 class="textHeader">Log In</h2>
    </div>
  </slot>



</template>

<script>
export default {
  name: "BaseHeader"
}
</script>

<style scoped>

.header{
  border: solid black 2px;
  background-color: beige;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.textHeader{
  margin-left: 10px;
  margin-right: 10px;
}

</style>