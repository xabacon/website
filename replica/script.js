import {
    animate,
    scroll,
  } from "https://cdn.jsdelivr.net/npm/framer-motion@11.11.11/dom/+esm";
  scroll(animate(".progress", { scaleX: [0, 1] }, { ease: "linear" }));

document.querySelectorAll("section").forEach((p) => {
  scroll(animate("#music-scroller", { x: [-400, 400] }, { ease: "linear" }), {
  });
});

