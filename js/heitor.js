// ---------- RANKING ----------

const lget = () => {

  try {

      return JSON.parse(
          localStorage.getItem(
              "gruta_rank"
          ) || "[]"
      );

  } catch (e) {

      return [];
  }
};


const lput = a => {

  try {

      localStorage.setItem(
          "gruta_rank",
          JSON.stringify(a)
      );

  } catch (e) {}
};


const nk = n => {

  return (
      "n_" +
      (
          String(n)
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "") ||
          "anon"
      )
  );
};


async function saveScore() {

  const r = {
      nick,
      score,
      deaths,
      coins: coinN,
      stars: starN,
      ts: Date.now()
  };

  const a = lget();

  const i = a.findIndex(
      o => nk(o.nick) === nk(nick)
  );


  if (i < 0) {

      a.push(r);

  } else if (
      a[i].score < score
  ) {

      a[i] = r;
  }


  lput(a);


  if (dbc) {

      try {

          const d =
              dbc.collection("ranking")
                 .doc(nk(nick));

          const s = await d.get();

          if (
              !s.exists ||
              (s.data().score || 0) < score
          ) {
              await d.set(r);
          }

      } catch (e) {}
  }
}


async function getRank() {

  if (dbc) {

      try {

          const s =
              await dbc
                  .collection("ranking")
                  .orderBy(
                      "score",
                      "desc"
                  )
                  .limit(10)
                  .get();

          return {
              list: s.docs.map(
                  d => d.data()
              ),
              shared: true
          };

      } catch (e) {}
  }

  return {
      list: lget(),
      shared: false
  };
}


function renderRank(
  el,
  {
      list,
      shared
  }
) {

  list = list
      .slice()
      .sort(
          (a, b) =>
              b.score - a.score ||
              a.deaths - b.deaths
      )
      .slice(0, 10);


  el.textContent = "";


  if (!list.length) {

      el.textContent =
          "Ninguém jogou ainda. Seja o primeiro!";

      return;
  }


  const top =
      document.createElement("div");

  top.className = "top";

  top.textContent =
      "👑 Maior pontuação: " +
      list[0].nick +
      " (" +
      list[0].score +
      " pts)";

  el.append(top);


  list.forEach((r, i) => {

      const row =
          document.createElement("div");

      row.className =
          "row" +
          (
              nick &&
              nk(r.nick) === nk(nick)
                  ? " me"
                  : ""
          );


      const pos =
          ["🥇", "🥈", "🥉"][i] ||
          (i + 1) + "º";


      const valores = [
          pos,
          String(r.nick),
          r.score + " pts",
          "💀" + r.deaths
      ];


      valores.forEach(x => {

          const s =
              document.createElement("span");

          s.textContent = x;

          row.append(s);
      });


      el.append(row);
  });


  const n =
      document.createElement("div");

  n.className = "note";

  n.textContent =
      shared
          ? "Ranking compartilhado entre os jogadores"
          : "Ranking salvo somente neste aparelho";

  el.append(n);
}


// ---------- TELAS ----------

function ov(title, msg, o) {

  $("ot").textContent = title;
  $("om").innerHTML = msg;


  $("nick")
      .classList
      .toggle(
          "hidden",
          !o.input
      );


  $("rk")
      .classList
      .toggle(
          "hidden",
          !o.rank
      );


  $("btn").textContent = o.btn;

  act = o.act;


  $("btn2")
      .classList
      .toggle(
          "hidden",
          !o.btn2
      );


  if (o.btn2) {
      $("btn2").textContent =
          o.btn2;
  }

  act2 = o.act2;


  $("overlay")
      .classList
      .remove("hidden");
}


function showEntry() {

  state = "menu";

  ov(
      "Fuga da Cobra",

      "Você é um sapo engolido por uma cobra! " +
      "Deslize pelas paredes do estômago, pegue " +
      "<b>todas</b> as moedas e moscas, " +
      "desvie dos ossos de sapos mortos e " +
      "fuja pelo portal antes que o " +
      "<b>ácido</b> suba! " +
      "Setas / WASD ou deslize o dedo.",

      {
          input: 1,

          btn: "Começar a fuga",

          act: startGame,

          btn2: "🏆 Ranking",

          act2: () =>
              showRank(false)
      }
  );
}


async function showRank(final) {

  ov(

      final
          ? "Você escapou!"
          : "🏆 Ranking",

      final
          ? "Você fez <b>" +
            score +
            "</b> pontos com <b>" +
            deaths +
            "</b> mortes."
          : "Melhores fugitivos",

      {
          rank: 1,

          btn: final
              ? "Jogar de novo"
              : "Voltar",

          act: showEntry
      }
  );


  $("rk").textContent =
      "Carregando...";


  renderRank(
      $("rk"),
      await getRank()
  );
}


function startGame() {

  nick =
      $("nick")
          .value
          .trim()
          .slice(0, 12) ||
      "Anônimo";


  level = 1;

  score = 0;
  coinN = 0;
  starN = 0;
  deaths = 0;


  $("overlay")
      .classList
      .add("hidden");


  load();
}


// Botões
$("btn").onclick = () => {

  if (act) {
      act();
  }
};


$("btn2").onclick = () => {

  if (act2) {
      act2();
  }
};


// Enter no nick
$("nick").addEventListener(
  "keydown",
  e => {

      if (e.key === "Enter") {
          startGame();
      }

  }
);