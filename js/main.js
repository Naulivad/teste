// ---------- PIXEL ART ----------

const PAL = {

  b: "#b5485f",
  L: "#e8869a",
  D: "#6b1a30",

  y: "#b8860b",
  Y: "#ffd23f",

  w: "#fff6b0",
  o: "#e0a800",

  c: "#d8d8e0",
  W: "#ffffff",

  r: "#ff3b4f",

  x: "#e8e2cf",
  d: "#8a8470",

  f: "#cfe8ff",
  n: "#2b2b33",
  h: "#6a6a7a",
  k: "#1a1a1a",

  g: "#5c8f5a",
  G: "#35573a",
  u: "#1f3322"
};


const SPR = {

  wall: [
      "bbbbbbbb",
      "bLLbbbDb",
      "bLbbbDDb",
      "bbbDDbbb",
      "bbDDDbLb",
      "bDbbbLLb",
      "bbbLbbbb",
      "DDDDDDDD"
  ],

  coin: [
      "..yyyy..",
      ".yYYYYy.",
      "yYYwYYYy",
      "yYwYYYYy",
      "yYYYYYYy",
      "yYYYYYoy",
      ".yYYYYy.",
      "..yyyy.."
  ],

  fly0: [
      "f......f",
      "ff....ff",
      ".ffnnff.",
      "..rnnr..",
      "..nnnn..",
      "..nhhn..",
      "..nnnn..",
      "...nn..."
  ],

  fly1: [
      "........",
      "........",
      "fffnnfff",
      ".frnnrf.",
      "..nnnn..",
      "..nhhn..",
      "..nnnn..",
      "...nn..."
  ],

  spike: [
      "xx....xx",
      "xxx..xxx",
      ".xxxxxx.",
      "..xxxd..",
      "..dxxx..",
      ".xxxxxx.",
      "xxx..xxx",
      "xx....xx"
  ]
};


// Desenha sprite
function spr(rows, X, Y, c, flip) {

  const n = rows.length;
  const p = c / n;

  for (let i = 0; i < n; i++) {

      for (let j = 0; j < n; j++) {

          const ch =
              rows[i][
                  flip
                      ? n - 1 - j
                      : j
              ];

          if (ch === ".") {
              continue;
          }

          const x0 =
              Math.round(
                  X + j * p
              );

          const y0 =
              Math.round(
                  Y + i * p
              );

          ctx.fillStyle =
              PAL[ch];

          ctx.fillRect(
              x0,
              y0,

              Math.max(
                  1,
                  Math.round(
                      X + (j + 1) * p
                  ) - x0
              ),

              Math.max(
                  1,
                  Math.round(
                      Y + (i + 1) * p
                  ) - y0
              )
          );
      }
  }
}


// ---------- SAPO ----------

function frog(cx, cy, s, st) {

  const u = s / 14;

  const ox =
      cx - s / 2;

  const oy =
      cy - s * 0.48;


  const R = (
      x,
      y,
      w,
      h,
      col
  ) => {

      const x0 =
          Math.round(
              ox + x * u
          );

      const y0 =
          Math.round(
              oy + y * u
          );

      ctx.fillStyle = col;

      ctx.fillRect(
          x0,
          y0,

          Math.max(
              1,
              Math.round(
                  ox + (x + w) * u
              ) - x0
          ),

          Math.max(
              1,
              Math.round(
                  oy + (y + h) * u
              ) - y0
          )
      );
  };


  const K = "#0f3a1c";

  const G =
      st === "dead"
          ? "#8fc9a0"
          : "#4cd964";

  const Dk =
      st === "dead"
          ? "#6aa37c"
          : "#2a9d44";

  const B = "#d6f7b5";
  const P = "#ff6b9a";


  const d =
      slideDir || [0, 0];

  const fx_ =
      slideDir
          ? -d[0] * 2
          : 0;

  const fy_ =
      slideDir
          ? -d[1] * 2
          : 0;


  R(
      2,
      13,
      10,
      1,
      "rgba(0,0,0,.35)"
  );


  R(
      fx_,
      11 + fy_,
      5,
      2,
      K
  );

  R(
      1 + fx_,
      11 + fy_,
      3,
      1,
      G
  );

  R(
      9 + fx_,
      11 + fy_,
      5,
      2,
      K
  );

  R(
      10 + fx_,
      11 + fy_,
      3,
      1,
      G
  );


  R(1, 4, 12, 8, K);
  R(2, 5, 10, 6, G);

  R(5, 8, 4, 2, B);

  R(3, 6, 1, 1, Dk);
  R(10, 7, 1, 1, Dk);
  R(2, 9, 1, 1, Dk);
  R(11, 9, 1, 1, Dk);


  R(1, 0, 5, 5, K);
  R(8, 0, 5, 5, K);

  R(2, 1, 3, 3, "#fff");
  R(9, 1, 3, 3, "#fff");


  for (const e of [2, 9]) {

      const L = e === 2;


      if (st === "hit") {

          (
              L
                  ? [
                      [2, 1],
                      [3, 2],
                      [4, 2],
                      [2, 3]
                  ]
                  : [
                      [11, 1],
                      [10, 2],
                      [9, 2],
                      [11, 3]
                  ]
          ).forEach(q =>
              R(
                  q[0],
                  q[1],
                  1,
                  1,
                  K
              )
          );


      } else if (st === "dead") {

          [
              [0, 1],
              [2, 1],
              [1, 2],
              [0, 3],
              [2, 3]
          ].forEach(q =>
              R(
                  e + q[0],
                  q[1],
                  1,
                  1,
                  "#e63946"
              )
          );


      } else if (st === "happy") {

          R(e, 2, 1, 1, K);
          R(e + 1, 1, 1, 1, K);
          R(e + 2, 2, 1, 1, K);


      } else if (st === "win") {

          [
              [1, 1],
              [0, 2],
              [1, 2],
              [2, 2],
              [1, 3]
          ].forEach(q =>
              R(
                  e + q[0],
                  q[1],
                  1,
                  1,
                  "#ffb703"
              )
          );


      } else if (
          st === "idle" &&
          t % 3.4 < 0.14
      ) {

          R(
              e,
              1,
              3,
              3,
              G
          );

          R(
              e,
              2,
              3,
              1,
              K
          );


      } else {

          R(
              e + 0.5 + d[0] * 0.5,
              1.5 + d[1] * 0.5,
              2,
              2,
              "#101010"
          );
      }
  }


  if (st === "hit") {

      R(4, 6, 2, 1, K);
      R(6, 7, 2, 1, K);
      R(8, 6, 2, 1, K);


  } else if (st === "dead") {

      R(4, 6, 6, 1, K);
      R(7, 7, 2, 3, P);


  } else if (
      st === "happy" ||
      st === "win"
  ) {

      R(3, 5, 1, 1, K);
      R(10, 5, 1, 1, K);
      R(4, 6, 6, 1, K);
      R(5, 7, 4, 1, "#c1121f");


  } else if (st === "slide") {

      R(5, 6, 4, 2, K);


  } else {

      R(3, 5, 1, 1, K);
      R(4, 6, 6, 1, K);
      R(10, 5, 1, 1, K);
  }


  if (st === "happy") {

      const a =
          lastDir || [0, 1];

      if (a[0] > 0) {

          R(
              7,
              6,
              8,
              1,
              P
          );

      } else if (a[0] < 0) {

          R(
              -1,
              6,
              8,
              1,
              P
          );

      } else if (a[1] < 0) {

          R(
              6.5,
              -5,
              1,
              9,
              P
          );

      } else {

          R(
              6.5,
              7,
              1,
              8,
              P
          );
      }
  }


  if (st === "hit") {

      for (let i = 0; i < 3; i++) {

          const a =
              t * 8 + i * 2.09;

          ctx.fillStyle =
              "#ffd23f";

          ctx.fillRect(

              Math.round(
                  ox +
                  7 * u +
                  Math.cos(a) *
                  6 * u
              ),

              Math.round(
                  oy -
                  1.5 * u +
                  Math.sin(a) *
                  1.5 * u
              ),

              Math.ceil(u * 1.4),
              Math.ceil(u * 1.4)
          );
      }
  }
}

function draw() {

  const c = cell;
  const w = cv.width;
  const p = c / 8;

  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = "#3a0a10";
  ctx.fillRect(
      0,
      0,
      w,
      w
  );


  ctx.save();


  if (shake > 0) {

      ctx.translate(
          Math.round(
              (Math.random() - 0.5) *
              shake
          ),

          Math.round(
              (Math.random() - 0.5) *
              shake
          )
      );
  }


  const ready =
      !coins.size &&
      !stars.size;


  // ---------- MAPA ----------

  for (
      let y = 0;
      y < H;
      y++
  ) {

      for (
          let x = 0;
          x < W;
          x++
      ) {

          const k = K(x, y);

          const X = x * c;
          const Y = y * c;

          const a = Math.min(
              1,
              Math.max(
                  0,
                  (t - t0) * 3 -
                  (x + y) * 0.08
              )
          );


          if (a <= 0) {
              continue;
          }


          ctx.globalAlpha = a;


          ctx.fillStyle =
              (x + y) % 2
                  ? "#451018"
                  : "#3b0b12";

          ctx.fillRect(
              X,
              Y,
              c,
              c
          );


          // Detalhes do fundo
          if (
              (x * 7 + y * 3) % 3 === 0
          ) {

              const bp =
                  (
                      t * 0.5 +
                      x * 0.37 +
                      y * 0.61
                  ) % 1;

              ctx.fillStyle =
                  "rgba(255,150,150,.35)";

              ctx.fillRect(

                  Math.round(
                      X +
                      c * 0.2 +
                      (
                          (x * 13 + y * 5) % 5
                      ) *
                      c *
                      0.12
                  ),

                  Math.round(
                      Y +
                      c * (1 - bp)
                  ),

                  Math.ceil(p),
                  Math.ceil(p)
              );
          }


          // Parede
          if (walls.has(k)) {

              spr(
                  SPR.wall,
                  X,
                  Y +
                  Math.round(
                      Math.sin(
                          t * 1.6 +
                          x * 0.7 +
                          y * 0.7
                      ) *
                      p *
                      0.6
                  ),
                  c,
                  (x + y * 3) % 2
              );
          }


          // Espinhos
          if (spikes.has(k)) {

              spr(
                  SPR.spike,
                  X,
                  Y,
                  c,
                  (x * 5 + y) % 2
              );
          }


          // Moeda
          if (coins.has(k)) {

              ctx.save();

              ctx.translate(
                  X + c / 2,
                  Y + c / 2
              );

              ctx.scale(
                  Math.max(
                      0.2,
                      Math.abs(
                          Math.cos(
                              t * 3 +
                              x +
                              y
                          )
                      )
                  ),
                  1
              );

              spr(
                  SPR.coin,
                  -c * 0.3,
                  -c * 0.3 +
                  Math.round(
                      Math.sin(
                          t * 3 + x
                      ) *
                      p *
                      0.5
                  ),
                  c * 0.6
              );

              ctx.restore();
          }


          // Mosca
          if (stars.has(k)) {

              const jx =
                  Math.round(
                      Math.sin(
                          t * 9 +
                          x * 3
                      ) *
                      p *
                      0.7
                  );

              const jy =
                  Math.round(
                      Math.cos(
                          t * 11 +
                          y * 2
                      ) *
                      p *
                      0.7
                  );

              spr(
                  Math.floor(
                      t * 14 + x
                  ) % 2
                      ? SPR.fly1
                      : SPR.fly0,

                  X + c * 0.1 + jx,
                  Y + c * 0.1 + jy,

                  c * 0.8
              );
          }


          ctx.globalAlpha = 1;
      }
  }


  // ---------- BOLHAS ----------

  ctx.strokeStyle =
      "rgba(157,255,106,.3)";

  ctx.lineWidth = 1;


  for (const f of flies) {

      const by2 =
          (
              (
                  f.y -
                  t * 0.03 * f.s
              ) % 1 + 1
          ) % 1 * w;

      const bx =
          f.x * w +
          Math.sin(
              t * f.s + f.p
          ) * 10;


      ctx.strokeRect(
          Math.round(bx),
          Math.round(by2),
          Math.ceil(p * 1.5),
          Math.ceil(p * 1.5)
      );
  }


  // ---------- PORTAL ----------

  const ex =
      exit.x * c + c / 2;

  const ey =
      exit.y * c + c / 2;

  const pc =
      ready
          ? "#ffd23f"
          : "#6bffb8";


  for (let i = 0; i < 14; i++) {

      const a =
          t * 3 + i * 0.7;

      const r =
          c *
          (
              0.1 +
              0.24 * i / 13
          );

      const z =
          Math.ceil(p * 1.4);


      ctx.fillStyle =
          i % 2
              ? pc
              : "#e8fff1";


      ctx.fillRect(

          Math.round(
              ex +
              Math.cos(a) * r -
              z / 2
          ),

          Math.round(
              ey +
              Math.sin(a) * r -
              z / 2
          ),

          z,
          z
      );
  }


  // ---------- RASTRO ----------

  for (const q of trail) {

      const z =
          Math.ceil(
              c * 0.28 * q.l
          );

      ctx.fillStyle =
          "rgba(157,255,106," +
          Math.max(0, q.l) * 0.5 +
          ")";


      ctx.fillRect(

          Math.round(
              (q.x + 0.5) * c -
              z / 2
          ),

          Math.round(
              (q.y + 0.5) * c -
              z / 2
          ),

          z,
          z
      );
  }


  // ---------- ÁCIDO ----------

  const ar =
      acidSpeed * acidT -
      acidOff;


  if (ar > 0) {

      const top =
          Math.round(
              (H - ar) * c
          );

      const z =
          Math.ceil(p);


      for (
          let X2 = 0;
          X2 < w;
          X2 += z
      ) {

          const yy =
              top +
              Math.round(
                  Math.sin(
                      t * 5 +
                      X2 / c * 3
                  ) *
                  p *
                  0.8 +

                  Math.sin(
                      t * 9 +
                      X2 / c * 7
                  ) *
                  p *
                  0.4
              );


          ctx.fillStyle =
              "rgba(110,230,40,.86)";

          ctx.fillRect(
              X2,
              yy,
              z,
              w - yy
          );


          ctx.fillStyle =
              "#d6ffb0";

          ctx.fillRect(
              X2,
              yy,
              z,
              z
          );
      }


      ctx.fillStyle =
          "rgba(30,120,20,.35)";


      for (
          let yy = top + c * 0.6;
          yy < w;
          yy += c * 0.5
      ) {

          ctx.fillRect(
              0,
              Math.round(yy),
              w,
              z
          );
      }


      ctx.strokeStyle =
          "rgba(214,255,176,.7)";

      ctx.lineWidth = 1;


      for (let i = 0; i < 14; i++) {

          const bx =
              ((i * 97) % 100) /
              100 *
              w;

          const by =
              w -
              (
                  (
                      t *
                      0.25 *
                      (1 + i % 3) +
                      i * 0.19
                  ) % 1
              ) *
              (w - top);


          ctx.strokeRect(
              Math.round(bx),
              Math.round(by),
              Math.ceil(p * 1.6),
              Math.ceil(p * 1.6)
          );
      }
  }


  // ---------- SAPO ----------

  const cx =
      player.px * c + c / 2;

  const cy =
      player.py * c + c / 2;


  ctx.save();


  if (state === "dead") {

      ctx.globalAlpha =
          Math.max(
              0,
              1 -
              Math.max(
                  0,
                  deadT - 0.6
              ) * 2.5
          );
  }


  let sxv = 1;
  let syv = 1;


  if (slideDir) {

      sxv =
          slideDir[0]
              ? 1.25
              : 0.85;

      syv =
          slideDir[1]
              ? 1.25
              : 0.85;


  } else if (state === "dead") {

      sxv =
          1 +
          Math.min(
              deadT * 2,
              0.5
          );

      syv =
          Math.max(
              0.4,
              1 - deadT * 1.4
          );


  } else if (sq > 0) {

      const h =
          lastDir &&
          lastDir[0];

      sxv =
          h
              ? 1 - sq * 0.3
              : 1 + sq * 0.3;

      syv =
          h
              ? 1 + sq * 0.3
              : 1 - sq * 0.3;
  }


  const by =
      cy +

      (
          state === "dead"
              ? c *
                0.2 *
                Math.min(
                    1,
                    deadT * 2
                )
              : 0
      ) +

      (
          state === "play" &&
          !slideDir

              ? Math.round(
                  Math.sin(t * 3) *
                  p *
                  0.4
              )

              : 0
      );


  ctx.translate(
      cx,
      by
  );

  ctx.scale(
      sxv,
      syv
  );

  ctx.translate(
      -cx,
      -by
  );


  frog(
      cx,
      by,
      c * 0.9,

      faceT > 0
          ? faceS
          : (
              slideDir
                  ? "slide"
                  : "idle"
          )
  );


  ctx.restore();


  // ---------- EFEITOS ----------

  for (const r of rings) {

      ctx.globalAlpha =
          Math.max(
              0,
              r.l
          );

      ctx.strokeStyle =
          r.col;

      ctx.lineWidth =
          Math.ceil(
              p * 0.8
          );


      ctx.strokeRect(

          Math.round(
              (
                  r.x +
                  0.5 -
                  r.r
              ) * c
          ),

          Math.round(
              (
                  r.y +
                  0.5 -
                  r.r
              ) * c
          ),

          Math.round(
              r.r * 2 * c
          ),

          Math.round(
              r.r * 2 * c
          )
      );
  }


  for (const q of parts) {

      ctx.globalAlpha =
          Math.max(
              0,
              q.l
          );

      ctx.fillStyle =
          q.col;


      ctx.fillRect(

          Math.round(
              q.x * c
          ),

          Math.round(
              q.y * c
          ),

          Math.ceil(
              c * 0.09
          ),

          Math.ceil(
              c * 0.09
          )
      );
  }


  // ---------- TEXTOS ----------

  ctx.font =
      Math.floor(c * 0.26) +
      "px 'Press Start 2P',monospace";

  ctx.textAlign = "center";


  for (const f of floats) {

      ctx.globalAlpha =
          Math.min(
              1,
              f.l * 2
          );


      ctx.fillStyle = "#000";

      ctx.fillText(
          f.txt,
          (f.x + 0.5) * c + 2,
          f.y * c + 2
      );


      ctx.fillStyle =
          f.col;

      ctx.fillText(
          f.txt,
          (f.x + 0.5) * c,
          f.y * c
      );
  }


  ctx.globalAlpha = 1;


  // Aviso de ácido chegando
  if (
      state === "play" &&
      acidOn &&
      H -
      (
          acidSpeed * acidT -
          acidOff
      ) -
      player.y < 3.2
  ) {

      ctx.fillStyle =
          "rgba(255,40,40," +
          (
              0.07 +
              0.07 *
              Math.sin(t * 14)
          ) +
          ")";

      ctx.fillRect(
          0,
          0,
          w,
          w
      );
  }


  // Tela vermelha ao morrer
  if (state === "dead") {

      ctx.fillStyle =
          "rgba(214,40,40," +
          Math.min(0.4, deadT) +
          ")";

      ctx.fillRect(
          0,
          0,
          w,
          w
      );
  }


  ctx.restore();


  // Efeito CRT
  ctx.fillStyle =
      "rgba(0,0,0,.12)";

  for (
      let y = 0;
      y < w;
      y += 4
  ) {

      ctx.fillRect(
          0,
          y,
          w,
          1
      );
  }
}

function fx(dt) {

  // Partículas
  for (const p of parts) {

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      p.vx *= 0.96;

      p.vy =
          p.vy * 0.96 +
          p.g * dt;

      p.l -= dt;
  }

  parts =
      parts.filter(
          p => p.l > 0
      );


  // Textos flutuantes
  for (const f of floats) {

      f.y -= dt * 1.2;
      f.l -= dt;
  }

  floats =
      floats.filter(
          f => f.l > 0
      );


  // Ondas
  for (const r of rings) {

      r.r += dt * 3;
      r.l -= dt * 2;
  }

  rings =
      rings.filter(
          r => r.l > 0
      );


  // Rastro
  for (const q of trail) {
      q.l -= dt * 3.5;
  }

  trail =
      trail.filter(
          q => q.l > 0
      );


  shake =
      Math.max(
          0,
          shake - dt * 40
      );

  sq =
      Math.max(
          0,
          sq - dt * 5
      );


  if (
      faceT > 0 &&
      faceS !== "dead" &&
      faceS !== "win"
  ) {

      faceT -= dt;
  }
}


// ---------- LOOP ----------

let last =
  performance.now();


function loop(now) {

  const dt =
      Math.min(
          0.05,
          (now - last) / 1000
      );

  last = now;

  t += dt;


  // Ácido
  if (
      state === "play" &&
      acidOn
  ) {

      acidT += dt;

      if (
          H -
          (
              acidSpeed * acidT -
              acidOff
          ) <=
          player.y + 0.5
      ) {

          acidKill();
      }
  }


  // Movimento do sapo
  if (
      state === "play" &&
      slideDir
  ) {

      acc += dt;


      while (
          acc >= 0.03 &&
          slideDir &&
          state === "play"
      ) {

          acc -= 0.03;

          step();
      }
  }


  // Depois da morte
  if (state === "dead") {

      deadT += dt;

      if (deadT > 1.2) {

          score =
              saved.score;

          coinN =
              saved.coinN;

          starN =
              saved.starN;

          load();
      }
  }


  // Animação do jogador
  player.px +=
      (
          player.x -
          player.px
      ) *
      Math.min(
          1,
          dt * 28
      );


  player.py +=
      (
          player.y -
          player.py
      ) *
      Math.min(
          1,
          dt * 28
      );


  fx(dt);

  draw();

  acidHud();


  requestAnimationFrame(
      loop
  );
}


// ---------- INICIALIZAÇÃO ----------

gen(1);

resize();

player = {
  x: start.x,
  y: start.y,

  px: start.x,
  py: start.y
};

hud();

showEntry();

requestAnimationFrame(
  loop
);