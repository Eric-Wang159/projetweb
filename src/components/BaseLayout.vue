
<template>

  <base-header>
    <template #BaseHeader/>
  </base-header>
  <slot/>
  <base-footer>
    <template #BaseFooter/>
  </base-footer>

</template>



<script>
import BaseHeader from "./BaseHeader";
import BaseFooter from "./BaseFooter";


export default {
  name: "BaseLayout",
  components: {
    BaseFooter,
    BaseHeader
  }
}
</script>

<style scoped>

</style>