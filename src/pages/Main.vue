<template>
  <div class="container">
    <ul>
      <!--- Using root data for now instead of state-->
      <li v-for="item in this.$root.$data.items" :key="item.id">
        <router-link
          :to="{
            name: 'item',
            params: {
              name: item.name,
              input: item.input,
              code: item.code,
              output: item.output,
              id: item.id,
              isNew: false
            }
          }"
        >{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>
