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
            <codemirror v-model="code" class="codemirror" />
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
    isNew: { type: Boolean, default: true },
    id: Number
  },
  components: {
    codemirror
  },
  methods: {
    updateList() {
      // just terrible - refactor later away from global state / needing ids
      if (!this.isNew) {
        var itemCopy = this.$root.$data.items;
        itemCopy.forEach(
          function(element, index) {
            if (element.id == this.id) {
              this.$root.$data.items[index] = {
                id: this.id,
                name: this.name,
                input: this.input,
                code: this.code,
                output: this.output
              };
              this.$toast.open({
                message: "Updated!",
                position: "is-bottom"
              });
            }
          }.bind(this)
        );
      } else {
        var newId = this.$root.$data.items[this.$root.$data.items.length - 1]
          .id;
        this.$root.$data.items.push({
          id: newId,
          name: this.name,
          input: this.input,
          code: this.code,
          output: this.output
        });
        this.$toast.open({
          message: `Added! New id ${newId}`,
          position: "is-bottom"
        });
      }
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
