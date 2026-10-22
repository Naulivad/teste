function hud() {

  $("lv").textContent = level;
  $("sc").textContent = score;
  $("dt").textContent = deaths;

  const collected =
      tc - coins.size +
      ts - stars.size;

  const total = tc + ts;

  $("it").textContent =
      collected + "/" + total;
}


function setFace(s, d) {
  faceS = s;
  faceT = d;
}


function burst(x, y, col, n, sp, g) {

  for (let i = 0; i < n; i++) {

      const a = Math.random() * 6.283;
      const s = sp * (
          0.3 + Math.random()
      );

      parts.push({
          x: x + 0.5,
          y: y + 0.5,

          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,

          l: 0.5 + Math.random() * 0.5,

          col,
          g: g || 0
      });
  }
}


function restart() {

  if (
      state !== "play" &&
      state !== "dead"
  ) {
      return;
  }

  score = saved.score;
  coinN = saved.coinN;
  starN = saved.starN;

  load();

  shake = 4;

  burst(
      start.x,
      start.y,
      "#9dff6a",
      22,
      4
  );

  rings.push({
      x: start.x,
      y: start.y,
      r: 0,
      l: 1,
      col: "#9dff6a"
  });
}


$("rs").onclick = () => restart();


function acidKill() {

  state = "dead";

  deadT = 0;
  slideDir = null;

  deaths++;

  hud();

  setFace("dead", 9);

  shake = 14;

  burst(
      player.x,
      player.y,
      "#9dff6a",
      40,
      5,
      6
  );

  burst(
      player.x,
      player.y,
      "#d6ffb0",
      16,
      4,
      6
  );
}


function acidHud() {

  const v = Math.max(
      0,
      Math.min(
          100,
          Math.round(
              (
                  acidSpeed * acidT -
                  acidOff
              ) / H * 100
          )
      )
  );

  if (v !== acPct) {

      acPct = v;

      $("ac").textContent =
          v + "%";
  }
}


function step() {

  const d = slideDir;

  if (
      isWall(
          player.x + d[0],
          player.y + d[1]
      )
  ) {

      slideDir = null;

      if (mv > 0) {

          shake = 6;
          sq = 1;

          setFace("hit", 0.8);

          burst(
              player.x,
              player.y,
              "#c9a24a",
              10,
              2.5
          );

          rings.push({
              x: player.x + d[0] * 0.5,
              y: player.y + d[1] * 0.5,
              r: 0,
              l: 1,
              col: "#c9a24a"
          });
      }

      return;
  }

  trail.push({
      x: player.x,
      y: player.y,
      l: 1
  });

  player.x += d[0];
  player.y += d[1];

  mv++;

  const k = K(
      player.x,
      player.y
  );


  // Moeda
  if (coins.delete(k)) {

      score += 10;
      coinN++;

      hud();

      setFace("happy", 0.45);

      burst(
          player.x,
          player.y,
          "#ffd166",
          10,
          3
      );

      floats.push({
          x: player.x,
          y: player.y,
          txt: "+10",
          col: "#ffd166",
          l: 0.7
      });
  }


  // Mosca
  if (stars.delete(k)) {

      score += 50;
      starN++;

      hud();

      setFace("happy", 0.7);

      burst(
          player.x,
          player.y,
          "#d8d8e0",
          24,
          4.5
      );

      shake = 3;

      rings.push({
          x: player.x,
          y: player.y,
          r: 0,
          l: 1,
          col: "#d8d8e0"
      });

      floats.push({
          x: player.x,
          y: player.y,
          txt: "+50",
          col: "#d8d8e0",
          l: 0.9
      });
  }


  // Espinho
  if (spikes.has(k)) {

      state = "dead";
      deadT = 0;
      slideDir = null;

      deaths++;

      hud();

      setFace("dead", 9);

      shake = 14;

      burst(
          player.x,
          player.y,
          "#d62828",
          34,
          5.5,
          9
      );

      burst(
          player.x,
          player.y,
          "#9dff6a",
          14,
          4,
          9
      );

      return;
  }


  // Portal
  if (
      player.x === exit.x &&
      player.y === exit.y
  ) {

      slideDir = null;

      setFace("win", 9);

      shake = 6;

      const perfect =
          !coins.size &&
          !stars.size;

      if (perfect) {

          score += 100;

          floats.push({
              x: player.x,
              y: player.y - 0.5,
              txt: "PERFEITO +100",
              col: "#ffd166",
              l: 1.4
          });
      }

      hud();

      burst(
          player.x,
          player.y,
          "#6bffb8",
          44,
          5
      );

      rings.push({
          x: player.x,
          y: player.y,
          r: 0,
          l: 1,
          col: "#6bffb8"
      });

      const left =
          coins.size +
          stars.size;


      if (level >= MAXL) {

          state = "over";

          setTimeout(
              async () => {
                  await saveScore();
                  showRank(true);
              },
              900
          );

      } else {

          state = "won";

          setTimeout(() => {

              ov(
                  "Fase " + level + " completa!",

                  (
                      perfect
                          ? "✨ <b>PERFEITO!</b> Você pegou tudo (+100)."
                          : "Faltaram <b>" +
                            left +
                            "</b> itens. Dá para pegar todos!"
                  ) +

                  "<br>Pontos: <b>" +
                  score +
                  "</b> · Mortes: <b>" +
                  deaths +
                  "</b>",

                  {
                      btn: "Fase " + (level + 1),

                      act: () => {
                          $("overlay")
                              .classList
                              .add("hidden");

                          level++;

                          load();
                      }
                  }
              );

          }, 900);
      }
  }
}