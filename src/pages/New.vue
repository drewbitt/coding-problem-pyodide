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
                <span class="has-text-white" style="padding: 0.4em"
                  >Input
                  <b-tooltip
                    label="Sets the variable 'inp' to input. Multi-line input treated as an array. Strings only need quotes in arrays."
                    style="top: 6px;"
                    multilined
                  >
                    <b-icon pack="fas" icon="info-circle" type="is-white" />
                  </b-tooltip>
                </span>
              </template>
              <textarea class="textarea" v-model="inputL" rows="4" />
            </b-field>
            <b-field>
              <template slot="label">
                <span class="has-text-white">Code</span>
              </template>
              <codemirror
                v-model="codeL"
                class="codemirror"
                :options="cmOption"
                ref="cm"
              />
            </b-field>
            <b-field>
              <template slot="label">
                <span class="has-text-white">Output</span>
              </template>
              <textarea class="textarea" v-model="outputL" readonly rows="4" />
            </b-field>
            <b-button type="button is-primary" @click="updateList"
              >Save</b-button
            >
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
        styleActiveLine: true,
        lineNumbers: true,
        mode: "text/x-python",
        theme: "lesser-dark",
        // better use of spaces for tab https://github.com/codemirror/CodeMirror/issues/988#issuecomment-549644684
        extraKeys: {
          Tab: cm => {
            if (cm.getMode().name === "null") {
              cm.execCommand("insertTab");
            } else {
              if (cm.somethingSelected()) {
                cm.execCommand("indentMore");
              } else {
                cm.execCommand("insertSoftTab");
              }
            }
          },
          Backspace: cm => {
            if (!cm.somethingSelected()) {
              let cursorsPos = cm
                .listSelections()
                .map(selection => selection.anchor);
              let indentUnit = cm.options.indentUnit;
              let shouldDelChar = false;
              for (let cursorIndex in cursorsPos) {
                let cursorPos = cursorsPos[cursorIndex];
                let indentation = cm.getStateAfter(cursorPos.line).indented;
                if (
                  !(
                    indentation !== 0 &&
                    cursorPos.ch <= indentation &&
                    cursorPos.ch % indentUnit === 0
                  )
                ) {
                  shouldDelChar = true;
                }
              }
              if (!shouldDelChar) {
                cm.execCommand("indentLess");
              } else {
                cm.execCommand("delCharBefore");
              }
            } else {
              cm.execCommand("delCharBefore");
            }
          },
          "Shift-Tab": cm => cm.execCommand("indentLess")
        }
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
          var runCode;
          // if there is a variable to set
          if (this.codeL) {
            if (this.realInput) {
              // Type of input check
              // check if string to see if need quotes
              if (
                this.isString(this.realInput)
                // // Make sure it's not multiple lines
                // && !this.inputL.includes("\n")
              ) {
                // single line string - put quotes around it
                runCode = 'inp = "' + this.realInput + '"\n' + this.codeL;
              } else if (this.isArray(this.realInput)) {
                runCode = "inp = [" + this.realInput + "]\n" + this.codeL;
              } else {
                // So not going to be interpreting input as string
                runCode = "inp = " + this.realInput + "\n" + this.codeL;
              }
            } else {
              // TODO: think there's some logical error
              // Nothing in input or multine. Just run code.
              runCode = this.codeL;
            }

            console.log(runCode);
            this.outputL = pyodide.runPython(runCode);
          }
        });
      });
    },
    typeInput(vr) {
      // Uses regex to determine object types, used for input
      if (vr === "" || vr == null) {
        return null;
      }
      if (vr.match(/^[+-]?\d+$/)) {
        return parseInt(vr);
      } else if (vr.match(/^[+-]?\d+(\.\d+)?$/)) {
        return parseFloat(vr);
        // Matches array (incomplete)
      } else if (vr.match(/^\[.+,\S+\]$/)) {
        return vr.slice(1, -1).split(",");
      } else {
        return vr;
      }
    },
    isString(vr) {
      return Object.prototype.toString.call(vr) === "[object String]";
    },
    isArray(vr) {
      return Object.prototype.toString.call(vr) === "[object Array]";
    }
  },
  beforeMount() {
    // if path matches /item/:id, get data from json loaded in root
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
  mounted() {
    // Override default to 100% of container
    this.$refs.cm.codemirror.setSize("100%", "100%");
  },
  computed: {
    realInput: function() {
      // currently not supporting numbers being strings

      if (this.inputL == null) {
        return null;
      }

      // Deal with multiple line input by putting each line in an array
      else if (this.inputL.includes("\n")) {
        var newArr = "[";
        var splitArr = this.inputL.split("\n");
        for (let i = 0; i < splitArr.length; i++) {
          var inp = this.typeInput(splitArr[i]);
          if (inp == null) {
            return null;
          } else if (
            // If string, add quotes
            this.isString(inp)
          ) {
            // deal with trailing commas
            if (i == splitArr.length - 1) {
              newArr = newArr + '"' + inp + '"';
            } else {
              newArr = newArr + '"' + inp + '",';
            }
            // } else if (this.isArray(inp)) {
            //   newArr = newArr + "[" + inp + "]";
          } else {
            if (i == splitArr.length - 1) {
              newArr = newArr + inp;
            } else {
              newArr = newArr + inp + ",";
            }
          }
        }
        newArr = newArr + "]";
        return newArr;
      } else {
        // type them correctly if numbers, strings, array
        return this.typeInput(this.inputL);
      }
    }
  }
};
</script>

<style>
.codemirror {
  border: 1px solid #000000;
  height: 45vh;
  text-align: left;
}
</style>
