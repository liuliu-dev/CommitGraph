import exp from "constants";
import {
  notPaintedWellInDoltHub,
  threeBranches,
  twoBranches,
  twoCommits,
} from "../../helpers/sampleCommits";
import { BranchPathType } from "../../helpers/types";
import { getCommits } from "../../helpers/utils";
import { computePosition } from "./computePosition";

type BranchPathTestType = {
  start: number;
  end: number;
  endCommit: CommitNodeWithPos;
  color?: string;
};

type CommitNodeWithPos = {
  x: number;
  y: number;
  hash?: string;
};

describe("computePosition", () => {
  test("notPaintedWellInDoltHub", () => {
    const nodes = getCommits(notPaintedWellInDoltHub);

    const { commitsMap, columns } = computePosition(nodes);

    const expectedColumns: BranchPathTestType[][] = [
      [
        {
          start: 0,
          end: Infinity,
          endCommit: {
            hash: "6fr1ifptpke22ab4lesertqd28dcegb7",
            x: 26,
            y: 0,
          },
        },
      ],
      [
        {
          start: 1,
          end: 9,
          endCommit: {
            hash: "gbcruhrhg4tqvp24ul9461l3c4jmbk14",
            x: 10,
            y: 0,
          },
        },
        {
          start: 12,
          end: Infinity,
          endCommit: {
            hash: "a0j2g4qgndfv22sn908q163mfc80r890",
            x: 15,
            y: 1,
          },
        },
      ],
      [
        {
          start: 4,
          end: 9,
          endCommit: {
            hash: "gbcruhrhg4tqvp24ul9461l3c4jmbk14",
            x: 10,
            y: 0,
          },
        },
        {
          start: 20,
          end: Infinity,
          endCommit: {
            hash: "6avev78m3nl41goli6vv9o25eqmip8rg",
            x: 27,
            y: 2,
          },
        },
      ],
      [
        {
          start: 5,
          end: 9,
          endCommit: {
            hash: "gbcruhrhg4tqvp24ul9461l3c4jmbk14",
            x: 10,
            y: 0,
          },
        },
        {
          start: 21,
          end: Infinity,
          endCommit: {
            hash: "ee7dt3p3383llun82br9ku0e4ghc390e",
            x: 28,
            y: 3,
          },
        },
      ],
      [
        {
          start: 24,
          end: Infinity,
          endCommit: {
            hash: "h5omkvmi34hrnlne2pmla6r0sjf6h1et",
            x: 29,
            y: 4,
          },
        },
      ],
    ];

    const expectedCommitsMap = new Map<string, CommitNodeWithPos>([
      ["01q43bda9nvs1uv71aiu4lb60e2rjoq7", { x: 3, y: 0 }],
      ["2g3kdbm14nlsfqkbg7f27b42ukn1ikrl", { x: 19, y: 0 }],
      ["339n302pfgu5rua1ghkgahkhc356j4v6", { x: 21, y: 0 }],
      ["4aoc84trn2qlvg721121bd17a0r35a3j", { x: 2, y: 1 }],
      ["4klnr8cmunft1jjf541kd1d4nevs692m", { x: 6, y: 2 }],
      ["68d4db6qtse4n5s7v8on9jimfer9sher", { x: 12, y: 0 }],
      ["6avev78m3nl41goli6vv9o25eqmip8rg", { x: 27, y: 2 }],
      ["6fr1ifptpke22ab4lesertqd28dcegb7", { x: 26, y: 0 }],
      ["6l6mbnbmcg69pdd4gundko5h7l2l738h", { x: 22, y: 0 }],
      ["7vejv57eja2skps6ke7s1mevvnj3t875", { x: 18, y: 0 }],
      ["9qvpdadg0ktrhg674trki4lt48rp3djp", { x: 1, y: 1 }],
      ["9rps6fs8svvf6a597gs34uj766iq8705", { x: 7, y: 3 }],
      ["a0j2g4qgndfv22sn908q163mfc80r890", { x: 15, y: 1 }],
      ["a6oiqv9s7u5vk9vjlt2udkotlttnljps", { x: 20, y: 0 }],
      ["amlpjh63l29tig7trhb2180farj7ce77", { x: 13, y: 0 }],
      ["ct7096i0s58u8a7j2jh2v3ihioop019m", { x: 16, y: 0 }],
      ["d26jeg4nkptu1oeahl201ceog176nk10", { x: 11, y: 0 }],
      ["dj38j1rae0stuiqa2cb11rmusvcdcb37", { x: 25, y: 0 }],
      ["ee7dt3p3383llun82br9ku0e4ghc390e", { x: 28, y: 3 }],
      ["eg4vd7jqlm1ji2kctu9di6kngnjqsdtj", { x: 8, y: 2 }],
      ["eogh9klv062daesg5s9hpa925budqe7l", { x: 0, y: 0 }],
      ["fnl5oupd4ctj3p3e4o9idha3t6sck1h3", { x: 23, y: 0 }],
      ["gbcruhrhg4tqvp24ul9461l3c4jmbk14", { x: 10, y: 0 }],
      ["h5omkvmi34hrnlne2pmla6r0sjf6h1et", { x: 29, y: 4 }],
      ["k88udm7vq388gvg5lq0e6e6np4qh7jv9", { x: 9, y: 2 }],
      ["mau2aqr6977bc6ogr0dm8f9u3518j66q", { x: 5, y: 2 }],
      ["ns83kqkheoj1oeqrotdsttncv4t90rib", { x: 24, y: 0 }],
      ["q7v55ms2p95nej59d254sp856dlbpqqk", { x: 17, y: 0 }],
      ["r1m9ekjems8dplu9teorc0s6q0mhnp5b", { x: 14, y: 0 }],
      ["sumt10me276kvl614q84d4095l4r3fck", { x: 4, y: 0 }],
    ]);

    expect(
      columns.map((c) =>
        c.map((v) => ({
          start: v.start,
          end: v.end,
          endCommit: {
            x: v.endCommit.x,
            y: v.endCommit.y,
            hash: v.endCommit.hash,
          },
        }))
      )
    ).toEqual(expectedColumns);

    expect(commitsMap.size).toBe(expectedCommitsMap.size);

    commitsMap.forEach((v, k) => {
      expect(expectedCommitsMap.get(k).x).toBe(v.x);
      expect(expectedCommitsMap.get(k).y).toBe(v.y);
    });
  });

  test("threeBranches", () => {
    const nodes = getCommits(threeBranches);

    const { commitsMap, columns } = computePosition(nodes);

    const expectedColumns: BranchPathTestType[][] = [
      [
        {
          start: 0,
          end: Infinity,
          endCommit: {
            hash: "qsmqckjvmlf7emqotdl67edm88shs73k",
            x: 28,
            y: 0,
          },
        },
      ],
      [
        {
          start: 4,
          end: 9,
          endCommit: {
            hash: "3cfrdsa12gba2g72ufuccq2evlqnianf",
            x: 10,
            y: 0,
          },
        },
      ],
      [
        {
          start: 2,
          end: 12,
          endCommit: {
            hash: "7vbn8f66bak5aqsjdvggdft0pr016han",
            x: 13,
            y: 0,
          },
        },
      ],
    ];

    expect(
      columns.map((c) =>
        c.map((v) => ({
          start: v.start,
          end: v.end,
          endCommit: {
            x: v.endCommit.x,
            y: v.endCommit.y,
            hash: v.endCommit.hash,
          },
        }))
      )
    ).toEqual(expectedColumns);

    const expectedCommitsMap = new Map<string, CommitNodeWithPos>([
      ["3cfrdsa12gba2g72ufuccq2evlqnianf", { x: 10, y: 0 }],
      ["41bjn4aq9gcv606ikspam44j0lj74kmf", { x: 7, y: 0 }],
      ["6higvr7ic9ndahfruh3kufu409im44jd", { x: 5, y: 0 }],
      ["7vbn8f66bak5aqsjdvggdft0pr016han", { x: 13, y: 0 }],
      ["8f4lkggoeq239mgtti0vsbsgujdjkmb7", { x: 3, y: 0 }],
      ["8k7a25kqtrhsq7rgj2p4ng31uc4d3ap8", { x: 23, y: 0 }],
      ["9h7n9bjj3oq3o8t70ki0h4s7mhea70og", { x: 16, y: 0 }],
      ["b1ao9bq270nb802ce871l1vh4fmq3n8f", { x: 20, y: 0 }],
      ["bgpqkjvf2mqoi9lq4upamdj0ke7e8iuo", { x: 0, y: 0 }],
      ["bgpv9t0smfear03um03737mrkggb84o2", { x: 9, y: 1 }],
      ["bjdqajn8g5uv98je18c0fks46nc68slh", { x: 21, y: 0 }],
      ["c2n67bt31got5ok9i6srucjcn7ukp6fc", { x: 25, y: 0 }],
      ["dpeijld2pajsqt93eci3e0jps4q6aj6s", { x: 15, y: 0 }],
      ["eeh3uumvgu4hcn4ocvn03nl1i2sj88jv", { x: 24, y: 0 }],
      ["g2ut7a6p7ij9luvi9207jihre375ecqp", { x: 17, y: 0 }],
      ["g8f0n0rgqnevnu1a4bi3mosbac33h4kd", { x: 11, y: 0 }],
      ["g9t0pechii36ajp6vq0ldd4727k5so4c", { x: 19, y: 0 }],
      ["hfpejf60airsgcmu3giv39rvn5i4lq8g", { x: 8, y: 0 }],
      ["j3d0emvhklpgp35sseviiujmfups3q0v", { x: 27, y: 0 }],
      ["jq3dsjngpk040uhf07slk3s00thei925", { x: 22, y: 0 }],
      ["ns725d8noah3m0mjjvrilet1rsmcgna2", { x: 4, y: 0 }],
      ["oafuq1kfti8jt5uvj0n7eq2cnc6gl282", { x: 14, y: 0 }],
      ["q8k2hvng89iak272hvileu237spgcp01", { x: 18, y: 0 }],
      ["qsmqckjvmlf7emqotdl67edm88shs73k", { x: 28, y: 0 }],
      ["r26g8v5vo7c82c5o1tt9hcleef924tp2", { x: 12, y: 2 }],
      ["son1fouu8sf01ae969ues924kqgeqni5", { x: 6, y: 0 }],
      ["srhkmbpv19uq6vpemek6hpr9hori8tl5", { x: 2, y: 0 }],
      ["taqc7u7mpagedgj1vr4s1uep91gsmoa0", { x: 26, y: 0 }],
      ["usb7m2d8ovpsffj2akjt8ik82dqtv91k", { x: 1, y: 0 }],
    ]);

    expect(commitsMap.size).toBe(expectedCommitsMap.size);

    commitsMap.forEach((v, k) => {
      expect(expectedCommitsMap.get(k).x).toBe(v.x);
      expect(expectedCommitsMap.get(k).y).toBe(v.y);
    });
  });

  test("twoBranches", () => {
    const nodes = getCommits(twoBranches);

    const { commitsMap, columns } = computePosition(nodes);

    const expectedColumns: BranchPathTestType[][] = [
      [
        {
          start: 0,
          end: Infinity,
          endCommit: {
            hash: "bg3k6inb0vu1lcivcj0kijb3lb3hrirj",
            x: 8,
            y: 0,
          },
        },
      ],
      [
        {
          start: 1,
          end: 5,
          endCommit: {
            hash: "1lq2jhf0eplg25d4sak0kj0is299gneb",
            x: 6,
            y: 0,
          },
        },
      ],
    ];

    const expectedCommitsMap = new Map<string, CommitNodeWithPos>([
      ["1lq2jhf0eplg25d4sak0kj0is299gneb", { x: 6, y: 0 }],
      ["4ttu5nqqifptnuqo6bk1hps3lu484jnu", { x: 2, y: 0 }],
      ["82m725ld1qq47m3smu9pmg09s2dh87ma", { x: 4, y: 1 }],
      ["bg3k6inb0vu1lcivcj0kijb3lb3hrirj", { x: 8, y: 0 }],
      ["euu20mq1b1d9ct2grotrka8jogsh6apl", { x: 0, y: 0 }],
      ["g6cuhf56904i64aq7anekeu1q7rrhgtq", { x: 7, y: 0 }],
      ["i57ecpdu31a4857j7noo35pj9v41m4fu", { x: 5, y: 0 }],
      ["qvsacjqo5q72mcg512ahhqj7hjmtmec0", { x: 1, y: 1 }],
      ["uk7kremprd9cesia4c4lh51ub8b1cf6p", { x: 3, y: 0 }],
    ]);

    expect(
      columns.map((c) =>
        c.map((v) => ({
          start: v.start,
          end: v.end,
          endCommit: {
            x: v.endCommit.x,
            y: v.endCommit.y,
            hash: v.endCommit.hash,
          },
        }))
      )
    ).toEqual(expectedColumns);

    expect(commitsMap.size).toBe(expectedCommitsMap.size);

    commitsMap.forEach((v, k) => {
      expect(expectedCommitsMap.get(k).x).toBe(v.x);
      expect(expectedCommitsMap.get(k).y).toBe(v.y);
    });
  });

  test("twoCommits", () => {
    const nodes = getCommits(twoCommits);

    const { commitsMap, columns } = computePosition(nodes);

    const expectedColumns: BranchPathTestType[][] = [
      [
        {
          start: 0,
          end: Infinity,
          endCommit: {
            hash: "4ttu5nqqifptnuqo6bk1hps3lu484jnu",
            x: 1,
            y: 0,
          },
        },
      ],
    ];

    const expectedCommitsMap = new Map<string, CommitNodeWithPos>([
      ["4ttu5nqqifptnuqo6bk1hps3lu484jnu", { x: 1, y: 0 }],
      ["euu20mq1b1d9ct2grotrka8jogsh6apl", { x: 0, y: 0 }],
    ]);

    expect(
      columns.map((c) =>
        c.map((v) => ({
          start: v.start,
          end: v.end,
          endCommit: {
            x: v.endCommit.x,
            y: v.endCommit.y,
            hash: v.endCommit.hash,
          },
        }))
      )
    ).toEqual(expectedColumns);

    expect(commitsMap.size).toBe(expectedCommitsMap.size);

    commitsMap.forEach((v, k) => {
      expect(expectedCommitsMap.get(k).x).toBe(v.x);
      expect(expectedCommitsMap.get(k).y).toBe(v.y);
    });
  });
});
