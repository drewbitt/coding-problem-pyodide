# coding-problem-pyodide

Save and run Python coding snippets or problems entirely in the browser with Wasm through [pyodide](https://github.com/iodide-project/pyodide).

NumPy is included by default. To add other packages, in `runCode()` in `New.vue`, add the packages included in pyodide [shown here](https://github.com/iodide-project/pyodide/tree/master/packages), including Scipy, Matplotlib, scikit-learn, and Pandas.

![Example code page](public/photos/example.png)

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```
