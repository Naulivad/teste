function go(dn) {

  if (
      state !== "play" ||
      slideDir
  ) {
      return;
  }

  slideDir = DIRS[dn];

  lastDir = slideDir;

  mv = 0;
  acc = 0;

  acidOn = true;
}


// Teclado
addEventListener("keydown", e => {

  if (
      state !== "play" &&
      state !== "dead"
  ) {
      return;
  }

  if (
      e.key === "r" ||
      e.key === "R"
  ) {

      e.preventDefault();

      restart();

      return;
  }

  const m = {
      ArrowUp: "u",
      w: "u",
      W: "u",

      ArrowDown: "d",
      s: "d",
      S: "d",

      ArrowLeft: "l",
      a: "l",
      A: "l",

      ArrowRight: "r",
      d: "r",
      D: "r"

  }[e.key];

  if (m) {

      e.preventDefault();

      go(m);
  }
});


// Controle por toque
let tx;
let ty;


cv.addEventListener(
  "touchstart",
  e => {

      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;

  },
  {
      passive: true
  }
);


cv.addEventListener(
  "touchend",
  e => {

      const dx =
          e.changedTouches[0].clientX - tx;

      const dy =
          e.changedTouches[0].clientY - ty;

      if (
          Math.max(
              Math.abs(dx),
              Math.abs(dy)
          ) < 20
      ) {
          return;
      }

      if (
          Math.abs(dx) >
          Math.abs(dy)
      ) {

          go(
              dx > 0
                  ? "r"
                  : "l"
          );

      } else {

          go(
              dy > 0
                  ? "d"
                  : "u"
          );
      }
  }
);


// Redimensiona o jogo
addEventListener(
  "resize",
  resize
);