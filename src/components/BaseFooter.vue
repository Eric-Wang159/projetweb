<template>

  <slot name="BaseFooter">
    <div class="footer">
      This work is blablabla
    </div>
  </slot>

</template>

<script>
export default {
  name: "BaseFooter"
}
</script>

<style scoped>

.footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border: solid black 2px;
  background-color: beige;
  text-align: center;
}


</style>