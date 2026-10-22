function rng(a) {
  return function () {
      a |= 0;
      a = a + 0x6D2B79F5 | 0;

      let t = Math.imul(
          a ^ a >>> 15,
          1 | a
      );

      t = t + Math.imul(
          t ^ t >>> 7,
          61 | t
      ) ^ t;

      return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}


const K = (x, y) => y * W + x;


const isWall = (x, y) => {
  return (
      x < 0 ||
      y < 0 ||
      x >= W ||
      y >= H ||
      walls.has(K(x, y))
  );
};


// Gera o labirinto
function gen(lv) {

  W = H = Math.min(
      14,
      7 + Math.ceil(lv * 0.75)
  );

  let tgt = 4 + Math.round(lv * 1.1);

  for (let att = 0; att < 800; att++) {

      if (att && att % 120 === 0) {
          tgt = Math.max(3, tgt - 1);
      }

      const R = rng(
          lv * 977 + att * 31 + 5
      );

      walls = new Set();
      spikes = new Set();
      coins = new Set();
      stars = new Set();

      const dens = 0.12 + lv * 0.012;

      for (let i = 0; i < W * H; i++) {
          if (R() < dens) {
              walls.add(i);
          }
      }

      let sx;
      let sy;
      let n = 0;

      do {
          sx = R() * W | 0;
          sy = R() * H | 0;
          n++;
      } while (
          walls.has(K(sx, sy)) &&
          n < 60
      );

      if (walls.has(K(sx, sy))) {
          continue;
      }

      start = {
          x: sx,
          y: sy
      };

      let c = {
          x: sx,
          y: sy
      };

      const seen = new Set([
          K(sx, sy)
      ]);

      const stops = [c];
      const vt = new Map();

      let ok = false;

      for (let i = 0; i < tgt + 10; i++) {

          const opts = [];

          for (const d of Object.values(DIRS)) {

              let x = c.x;
              let y = c.y;

              let nw = 0;

              const cells = [];

              while (
                  !isWall(
                      x + d[0],
                      y + d[1]
                  )
              ) {
                  x += d[0];
                  y += d[1];

                  cells.push(K(x, y));

                  if (!seen.has(K(x, y))) {
                      nw++;
                  }
              }

              if (cells.length) {
                  opts.push({
                      x,
                      y,
                      cells,
                      nw
                  });
              }
          }

          if (!opts.length) {
              break;
          }

          const pool = opts.filter(
              o => o.nw > 0
          );

          const src = pool.length
              ? pool
              : opts;

          const o = src[
              R() * src.length | 0
          ];

          const last =
              i + 1 >= tgt &&
              !seen.has(K(o.x, o.y));

          o.cells.forEach((k, j) => {

              if (!vt.has(k)) {
                  vt.set(
                      k,
                      i * 0.85 +
                      (j + 1) * 0.03
                  );
              }

          });

          o.cells.forEach(k =>
              seen.add(k)
          );

          c = {
              x: o.x,
              y: o.y
          };

          stops.push(c);

          if (last) {
              ok = true;
              break;
          }
      }

      if (!ok) {
          continue;
      }

      const aw = 0.14 + lv * 0.03;

      let spMax = 9;

      for (const [k, tt] of vt) {

          if (tt > 0) {

              spMax = Math.min(
                  spMax,
                  (
                      H -
                      (k / W | 0) -
                      0.5 +
                      2.5
                  ) * 0.95 / tt
              );

          }
      }

      if (
          spMax <
          aw * Math.max(
              0,
              0.75 - att * 0.00108
          )
      ) {
          continue;
      }

      acidSpeed = Math.max(
          0.04,
          Math.min(aw, spMax)
      );

      acidOff = 2.5;

      exit = stops[
          stops.length - 1
      ];

      const ek = K(
          exit.x,
          exit.y
      );

      const sk = K(sx, sy);

      const mids = [
          ...new Set(
              stops.map(
                  s => K(s.x, s.y)
              )
          )
      ].filter(
          k => k !== ek && k !== sk
      );

      const ns = Math.min(
          mids.length,
          1 + Math.floor(lv / 2)
      );

      for (let i = 0; i < ns; i++) {

          stars.add(
              mids.splice(
                  R() * mids.length | 0,
                  1
              )[0]
          );
      }

      for (const k of seen) {

          if (
              k !== ek &&
              k !== sk &&
              !stars.has(k)
          ) {
              coins.add(k);
          }
      }

      const free = [];

      for (let k = 0; k < W * H; k++) {

          if (
              !walls.has(k) &&
              !seen.has(k)
          ) {
              free.push(k);
          }
      }

      const al = free.filter(k =>
          stops.some(s =>
              s.x === k % W ||
              s.y === (k / W | 0)
          )
      );

      const cand =
          al.length >= 3
              ? al
              : free;

      const want = Math.min(
          cand.length,
          Math.round(2 + lv * 2.3)
      );

      for (let i = 0; i < want; i++) {

          spikes.add(
              cand.splice(
                  R() * cand.length | 0,
                  1
              )[0]
          );
      }

      tc = coins.size;
      ts = stars.size;

      return;
  }
}


function resize() {

  const s = Math.min(
      innerWidth - 12,
      innerHeight - 120,
      940
  );

  cell = Math.max(
      16,
      Math.floor(s / W)
  );

  cv.width = cell * W;
  cv.height = cell * W;
}


function load() {

  gen(level);

  resize();

  t0 = t;

  player = {
      x: start.x,
      y: start.y,
      px: start.x,
      py: start.y
  };

  saved = {
      score,
      coinN,
      starN
  };

  acidT = 0;
  acidOn = false;

  state = "play";
  slideDir = null;

  faceT = 0;

  parts = [];
  trail = [];
  floats = [];
  rings = [];

  hud();
}