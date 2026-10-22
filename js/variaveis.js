const cv = document.getElementById("c");
const ctx = cv.getContext("2d");

const $ = id => document.getElementById(id);

const DIRS = {
    u: [0, -1],
    d: [0, 1],
    l: [-1, 0],
    r: [1, 0]
};

const MAXL = 10;

let W = 8;
let H = 8;
let cell = 60;

let walls;
let spikes;
let coins;
let stars;

let start;
let exit;
let player;

let state = "menu";
let nick = "";

let level = 1;
let score = 0;
let coinN = 0;
let starN = 0;
let deaths = 0;

let saved;

let t = 0;
let t0 = 0;
let deadT = 0;

let slideDir = null;
let acc = 0;

let tc = 0;
let ts = 0;

let dbc = null;

let parts = [];
let floats = [];
let trail = [];
let rings = [];
let flies = [];

let shake = 0;
let sq = 0;
let mv = 0;

let lastDir = null;

let faceS = "idle";
let faceT = 0;

let act = null;
let act2 = null;

let acidT = 0;
let acidOn = false;
let acidSpeed = 0.12;
let acidOff = 2.5;
let acPct = -1;


// Moscas decorativas
for (let i = 0; i < 36; i++) {
    flies.push({
        x: Math.random(),
        y: Math.random(),
        p: Math.random() * 9,
        s: 0.3 + Math.random()
    });
}


// Banco opcional do Claude
(window.claude && claude.use
    ? claude.use("db")
    : Promise.resolve(null)
)
    .then(d => dbc = d)
    .catch(() => {});