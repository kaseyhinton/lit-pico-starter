/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/mitt@3.0.1/dist/mitt.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function n(n) {
  return {
    all: (n = n || new Map()),
    on: function (t, e) {
      var i = n.get(t);
      i ? i.push(e) : n.set(t, [e]);
    },
    off: function (t, e) {
      var i = n.get(t);
      i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
    },
    emit: function (t, e) {
      var i = n.get(t);
      i &&
        i.slice().map(function (n) {
          n(e);
        }),
        (i = n.get("*")) &&
          i.slice().map(function (n) {
            n(t, e);
          });
    },
  };
}
export { n as default };
//# sourceMappingURL=/sm/8f1c3827625a5a79b190238390962600c5f3ebc08d7b86aba4a8b11dbdeb1a1a.map
