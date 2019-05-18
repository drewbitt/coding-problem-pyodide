<template>
  <div class="container">
    <ul>
      <!--- Using root data for now instead of state-->
      <li v-for="item in this.$root.$data.items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>
