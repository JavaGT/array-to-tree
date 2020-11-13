import util from "util";
import path from 'path'
import toTree from "./index.mjs";

// console.log(
//   util.inspect(
//     toTree(
//       [
//         "java/main/neat/cool.txt",
//         "peter/cool.txt",
//         "lit.txt",
//         "java/main/neat/cool2.txt",
//         "java/main/neat/cool3.txt",
//         "java/main/some/cool.txt",
//         "java/main/some/haha.txt",
//       ].map((x) => x.split("/")),
//       {
//         processFile: (x) =>
//           Object.assign(x, { route: path.join("rootDIR", ...x.route) }),
//       }
//     ), {depth: 5}
//   )
// );
console.log(
  toTree([["foo", "bar.txt"], ["foo", "rab.txt"], ["foo", "baz", "other.txt"]])
);