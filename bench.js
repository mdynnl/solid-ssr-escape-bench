import { barplot, bench, run, summary } from "mitata";

import { escape } from "./escape.js";
import { escape as escape_array_assign } from "./escape_array_assign.js";
import { escape as escape_assign } from "./escape_assign.js";
import { escape as escape_from_assign } from "./escape_from_assign.js";
import { escape as escape_from_clone_assign } from "./escape_from_clone_assign.js";
import { escape as escape_map } from "./escape_map.js";
import { escape as escape_push } from "./escape_push.js";
import { escape as escape_slice_assign } from "./escape_slice_assign.js";
import { escape as escape_spread_assign } from "./escape_spread_assign.js";

const escapes = {
  escape,
  escape_array_assign,
  escape_assign,
  escape_from_assign,
  escape_from_clone_assign,
  escape_map,
  escape_push,
  escape_slice_assign,
  escape_spread_assign,
};

barplot(() => {
  summary(() => {
    for (const name in escapes) {
      const fn = escapes[name];
      bench(name, function* (state) {
        const size = state.get("size");
        yield {
          [0]: () => Array.from({ length: size }, (_, i) => Array.from({ length: 2 }, (_, j) => [i, j])),
          bench: (s) => fn(s),
        };
      }).range("size", 1, 1024);
    }
  });
});

await run();
