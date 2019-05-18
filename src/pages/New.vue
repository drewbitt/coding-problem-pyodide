<template>
  <div class="container">
    <section>
      <div class="columns is-centered">
        <div>
          <b-field label="Name">
            <b-input v-model="name" />
          </b-field>
          <b-field label="Input">
            <b-input v-model="input" />
          </b-field>
          <b-field label="Code">
            <codemirror
              v-model="code"
              :options="cmOptions"
              class="codemirror"
            />
          </b-field>
          <b-field label="Output">
            <b-input v-model="output" />
          </b-field>
          <b-button type="button is-primary" @click="updateList">Save</b-button>
          <b-button type="button" outlined>Run</b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/python/python.js";

export default {
  name: "New",
  props: {
    name: String,
    input: String,
    code: String,
    output: String,
    isNew: Boolean
  },
  components: {
    codemirror
  },
  methods: {
    updateList() {
      // need to determine id?
      this.$root.$data.items.push({
        id: 100,
        name: this.name,
        input: this.input,
        code: this.code,
        output: this.ouput
      });
    }
  }
};
</script>

<style>
.codemirror {
  border: 1px solid #000000;
  height: auto;
  text-align: left;
}
</style>
