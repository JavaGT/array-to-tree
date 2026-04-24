Small packages that converts a collection of array-based routes to a file-tree format.

```javascript
import toTree from "@javagt/array-to-tree";
console.log(
  toTree([
    ["foo", "bar.txt"],
    ["foo", "rab.txt"],
    ["foo", "baz", "other.txt"],
  ])
);

/*
<ref *1> {
  type: 'directory',
  children: {
    foo: {
      name: 'foo',
      route: [Array],
      type: 'directory',
      children: [Object],
      parent: [Circular *1]
    }
  }
*/
```
