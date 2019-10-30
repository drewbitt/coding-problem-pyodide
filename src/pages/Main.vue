<template>
  <div class="columns is-centered">
    <!--- Using root data for now instead of state-->
    <ul>
      <h1>All Projects</h1>
      <li
        v-for="item in this.$root.$data.items"
        :key="item.id"
        style="margin: 10px;"
      >
        <b-button expanded type="is-dark is-medium">
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
            >{{ item.name }}</router-link
          >
        </b-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>

<style scoped>
h1 {
  font-size: 2em;
  color: white;
}
</style>
