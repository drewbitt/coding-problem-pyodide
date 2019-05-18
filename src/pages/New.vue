<template>
  <div class="container">
    <section>
      <div class="columns is-centered">
        <div class="is-full">
          <b-field label="Input">
            <b-input v-model="input"></b-input>
          </b-field>
          <b-field label="Code">
            <codemirror
              v-model="code"
              :options="cmOptions"
              class="codemirror"
            />
          </b-field>
          <b-field label="Output">
            <b-input v-model="input"></b-input>
          </b-field>
          <b-button type="is-primary">Save</b-button>
          <b-button type="is-primary" outlined>Run</b-button>
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
    input: String,
    code: String,
    output: String
  },
  components: {
    codemirror
  }
};
</script>

<style>
.codemirror {
  border: 1px solid #000000;
  height: auto;
}

.b-button {
  padding-right: 10px;
}
</style>
