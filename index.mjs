import path from "path";

const noop = (_) => _;
const defaults = {
  processDirectory: noop,
  processFile: noop,
};

export default function (list, { processDirectory = defaults.processDirectory, processFile = defaults.processFile} = {}) {
  return list.reduce(
    (acc, route) => {
      route.reduce((build, step, index, full) => {
        // if file
        if (index === full.length - 1) {
          build.children[step] = {
            name: step,
            route: full,
            type: "file",
            parent: build,
          };
          processFile(build.children[step])
        }
        
        // if not a dir, make a dir
        if (!build.children[step]) {
          build.children[step] = {
            name: step,
            route: full.slice(0, index+1),
            type: "directory",
            children: {},
            parent: build
          };
          processDirectory(build.children[step]);
        }

        // return new subdirectory for next step
        return build.children[step];
      }, acc);
      return acc;
    },
    { type: "directory", children: {} }
  );
}
