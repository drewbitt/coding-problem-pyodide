<template>
  <div class="container">
    <section>
      <div class="columns is-centered">
        <div class="column is-half is-vcentered">
          <div id="fields">
            <b-field>
              <template slot="label">
                <span class="has-text-white">Name</span>
              </template>
              <b-input v-model="nameL" />
            </b-field>
            <b-field>
              <template slot="label">
                <span class="has-text-white">Input</span>
              </template>
              <textarea class="textarea" v-model="inputL" rows="4" />
            </b-field>
            <b-field>
              <template slot="label">
                <span class="has-text-white">Code</span>
              </template>
              <codemirror v-model="codeL" class="codemirror" :options="cmOption" />
            </b-field>
            <b-field>
              <template slot="label">
                <span class="has-text-white">Output</span>
              </template>
              <textarea class="textarea" v-model="outputL" readonly rows="4" />
            </b-field>
            <b-button type="button is-primary" @click="updateList">Save</b-button>
            <b-button type="button" @click="runCode()" outlined>Run</b-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import { plugin } from "../pyodide/pyodide";
// codemirror theme
import "codemirror/theme/lesser-dark.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/python/python.js";

export default {
  name: "code-editor",
  props: {
    name: String,
    input: String,
    code: String,
    output: String,
    isNew: { type: Boolean, default: true },
    id: String
  },
  data: function() {
    return {
      inputL: this.input,
      nameL: this.name,
      codeL: this.code,
      outputL: this.output,
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: false,
        line: true,
        mode: "text/x-python",
        theme: "lesser-dark"
      }
    };
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
              this.$buefy.toast.open({
                message: "Updated!",
                position: "is-bottom"
              });
            }
          }.bind(this)
        );
      } else {
        var newId =
          parseInt(
            this.$root.$data.items[this.$root.$data.items.length - 1].id
          ) + 1;
        newId = newId + "";
        this.$root.$data.items.push({
          id: newId,
          name: this.nameL,
          input: this.inputL,
          code: this.codeL,
          output: this.outputL
        });
        this.$buefy.toast.open({
          message: `Added! New id ${newId}`,
          position: "is-bottom"
        });
      }
    },
    runCode() {
      plugin().then(() => {
        pyodide.loadPackage(["numpy"]).then(() => {
          this.outputL = pyodide.runPython(newCode);
        });
      });
    },
    typeString(vr) {
      if(vr === "" || vr == null) {
        return null;
      }
      if (vr.match(/^[+-]?\d+$/)) {
          return parseInt(vr);
        }
        else if(vr.match(/^[+-]?\d+(\.\d+)?$/)) {
          return parseFloat(vr);
        }
        else {
          return vr;
        }
    }
  },
  beforeMount() {
    // if path matches /item/:id
    if (this.$route.params.id) {
      var itemCopy = this.$root.$data.items;
      itemCopy.some(
        function(element) {
          if (element.id == this.$route.params.id) {
            this.inputL = element.input;
            this.outputL = element.output;
            this.codeL = element.code;
            this.nameL = element.name;
            return true;
          }
        }.bind(this)
      );

      if (!this.nameL) {
        // did not find ID - redirect
        this.$router.push("/");
      }
    }
  },
  computed: {
    realInput: function() {
      if(this.inputL == null) {
        return "";
      }

      // bad way to see if multiple lines - fix if possible
      else if (this.inputL.includes("\n")) {
        console.log('got here');
        newArr = '[';

        this.inputL.split('\n').forEach(function(element) {
          inp = this.typeString(element);

          if(inp == null) {
            return "";
          }
          else if (typeof inp === 'string' || inp instanceof String) {
            newArr = newArr + '\'' + inp + '\',';
          }
          else {
            newArr = newArr + inp + ',';
          }
        });
        newArr = newArr + ']';
        return newArr;
      }

      else {
        // type them correctly
        return this.typeString(this.inputL);
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
