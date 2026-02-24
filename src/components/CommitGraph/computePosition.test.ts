import {
  notPaintedWellInDoltHub,
  threeBranches,
  twoBranches,
  twoCommits,
} from "../../helpers/sampleCommits";
import { formatCommits } from "../../helpers/utils";
import { computePosition } from "./computePosition";

type BranchPathTestType = {
  start: number;
  end: number;
  endCommit: CommitNodeWithPos;
  color?: string;
  branchOrder?: number;
};

type CommitNodeWithPos = {
  x: number;
  y: number;
  hash?: string;
};

describe("computePosition", () => {
  test("notPaintedWellInDoltHub", () => {
    const nodes = formatCommits(notPaintedWellInDoltHub);

    const { commitsMap, columns } = computePosition(nodes);

    const expectedColumns: BranchPathTestType[][] = [
      [
        {
          start: 0,
          end: Infinity,
          endCommit: {
            hash: "6fr1ifptpke22ab4lesertqd28dcegb7",
            x: 0,
            y: 26,
          },
          branchOrder: 0,
        },
      ],
      [
        {
          start: 1,
          end: 9,
          endCommit: {
            hash: "gbcruhrhg4tqvp24ul9461l3c4jmbk14",
            x: 0,
            y: 10,
          },
          branchOrder: 1,
        },
        {
          start: 12,
          end: Infinity,
          endCommit: {
            hash: "a0j2g4qgndfv22sn908q163mfc80r890",
            x: 1,
            y: 15,
          },
          branchOrder: 4,
        },
      ],
      [
        {
          start: 4,
          end: 9,
          endCommit: {
            hash: "gbcruhrhg4tqvp24ul9461l3c4jmbk14",
            x: 0,
            y: 10,
          },
          branchOrder: 2,
        },
        {
          start: 20,
          end: Infinity,
          endCommit: {
            hash: "6avev78m3nl41goli6vv9o25eqmip8rg",
            x: 2,
            y: 27,
          },
          branchOrder: 5,
        },
      ],
      [
        {
          start: 5,
          end: 9,
          endCommit: {
            hash: "gbcruhrhg4tqvp24ul9461l3c4jmbk14",
            x: 0,
            y: 10,
          },
          branchOrder: 3,
        },
        {
          start: 21,
          end: Infinity,
          endCommit: {
            hash: "ee7dt3p3383llun82br9ku0e4ghc390e",
            x: 3,
            y: 28,
          },
          branchOrder: 6,
        },
      ],
      [
        {
          start: 24,
          end: Infinity,
          endCommit: {
            hash: "h5omkvmi34hrnlne2pmla6r0sjf6h1et",
            x: 4,
            y: 29,
          },
          branchOrder: 7,
        },
      ],
    ];

    const expectedCommitsMap = new Map<string, CommitNodeWithPos>([
      ["eogh9klv062daesg5s9hpa925budqe7l", { x: 0, y: 0 }],
      ["9qvpdadg0ktrhg674trki4lt48rp3djp", { x: 1, y: 1 }],
      ["4aoc84trn2qlvg721121bd17a0r35a3j", { x: 1, y: 2 }],
      ["01q43bda9nvs1uv71aiu4lb60e2rjoq7", { x: 0, y: 3 }],
      ["sumt10me276kvl614q84d4095l4r3fck", { x: 0, y: 4 }],
      ["mau2aqr6977bc6ogr0dm8f9u3518j66q", { x: 2, y: 5 }],
      ["4klnr8cmunft1jjf541kd1d4nevs692m", { x: 2, y: 6 }],
      ["9rps6fs8svvf6a597gs34uj766iq8705", { x: 3, y: 7 }],
      ["eg4vd7jqlm1ji2kctu9di6kngnjqsdtj", { x: 2, y: 8 }],
      ["k88udm7vq388gvg5lq0e6e6np4qh7jv9", { x: 2, y: 9 }],
      ["gbcruhrhg4tqvp24ul9461l3c4jmbk14", { x: 0, y: 10 }],
      ["d26jeg4nkptu1oeahl201ceog176nk10", { x: 0, y: 11 }],
      ["68d4db6qtse4n5s7v8on9jimfer9sher", { x: 0, y: 12 }],
      ["amlpjh63l29tig7trhb2180farj7ce77", { x: 0, y: 13 }],
      ["r1m9ekjems8dplu9teorc0s6q0mhnp5b", { x: 0, y: 14 }],
      ["a0j2g4qgndfv22sn908q163mfc80r890", { x: 1, y: 15 }],
      ["ct7096i0s58u8a7j2jh2v3ihioop019m", { x: 0, y: 16 }],
      ["q7v55ms2p95nej59d254sp856dlbpqqk", { x: 0, y: 17 }],
      ["7vejv57eja2skps6ke7s1mevvnj3t875", { x: 0, y: 18 }],
      ["2g3kdbm14nlsfqkbg7f27b42ukn1ikrl", { x: 0, y: 19 }],
      ["a6oiqv9s7u5vk9vjlt2udkotlttnljps", { x: 0, y: 20 }],
      ["339n302pfgu5rua1ghkgahkhc356j4v6", { x: 0, y: 21 }],
      ["6l6mbnbmcg69pdd4gundko5h7l2l738h", { x: 0, y: 22 }],
      ["fnl5oupd4ctj3p3e4o9idha3t6sck1h3", { x: 0, y: 23 }],
      ["ns83kqkheoj1oeqrotdsttncv4t90rib", { x: 0, y: 24 }],
      ["dj38j1rae0stuiqa2cb11rmusvcdcb37", { x: 0, y: 25 }],
      ["6fr1ifptpke22ab4lesertqd28dcegb7", { x: 0, y: 26 }],
      ["6avev78m3nl41goli6vv9o25eqmip8rg", { x: 2, y: 27 }],
      ["ee7dt3p3383llun82br9ku0e4ghc390e", { x: 3, y: 28 }],
      ["h5omkvmi34hrnlne2pmla6r0sjf6h1et", { x: 4, y: 29 }],
    ]);

    expect(
      columns.map(c =>
        c.map(v => ({
          start: v.start,
          end: v.end,
          endCommit: {
            x: v.endCommit?.x,
            y: v.endCommit?.y,
            hash: v.endCommit?.hash,
          },
          branchOrder: v.branchOrder,
        })),
      ),
    ).toEqual(expectedColumns);

    expect(commitsMap.size).toBe(expectedCommitsMap.size);

    commitsMap.forEach((v, k) => {
      expect(expectedCommitsMap.get(k)?.x).toBe(v.x);
      expect(expectedCommitsMap.get(k)?.y).toBe(v.y);
    });
  });

  test("threeBranches", () => {
    const nodes = formatCommits(threeBranches);

    const { commitsMap, columns } = computePosition(nodes);

    const expectedColumns: BranchPathTestType[][] = [
      [
        {
          start: 0,
          end: 15,
          endCommit: {
            hash: "g2ut7a6p7ij9luvi9207jihre375ecqp",
            x: 0,
            y: 15,
          },
          branchOrder: 0,
        },
      ],
      [
        {
          start: 4,
          end: 9,
          endCommit: {
            hash: "3cfrdsa12gba2g72ufuccq2evlqnianf",
            x: 0,
            y: 10,
          },
          branchOrder: 1,
        },
      ],
      [
        {
          start: 2,
          end: 12,
          endCommit: {
            hash: "7vbn8f66bak5aqsjdvggdft0pr016han",
            x: 0,
            y: 13,
          },
          branchOrder: 2,
        },
      ],
    ];

    expect(
      columns.map(c =>
        c.map(v => ({
          start: v.start,
          end: v.end,
          endCommit: {
            x: v.endCommit?.x,
            y: v.endCommit?.y,
            hash: v.endCommit?.hash,
          },
          branchOrder: v.branchOrder,
        })),
      ),
    ).toEqual(expectedColumns);

    const expectedCommitsMap = new Map<string, CommitNodeWithPos>([
      ["bgpqkjvf2mqoi9lq4upamdj0ke7e8iuo", { x: 0, y: 0 }],
      ["usb7m2d8ovpsffj2akjt8ik82dqtv91k", { x: 0, y: 1 }],
      ["srhkmbpv19uq6vpemek6hpr9hori8tl5", { x: 0, y: 2 }],
      ["8f4lkggoeq239mgtti0vsbsgujdjkmb7", { x: 0, y: 3 }],
      ["ns725d8noah3m0mjjvrilet1rsmcgna2", { x: 0, y: 4 }],
      ["6higvr7ic9ndahfruh3kufu409im44jd", { x: 0, y: 5 }],
      ["son1fouu8sf01ae969ues924kqgeqni5", { x: 0, y: 6 }],
      ["41bjn4aq9gcv606ikspam44j0lj74kmf", { x: 0, y: 7 }],
      ["hfpejf60airsgcmu3giv39rvn5i4lq8g", { x: 0, y: 8 }],
      ["bgpv9t0smfear03um03737mrkggb84o2", { x: 1, y: 9 }],
      ["3cfrdsa12gba2g72ufuccq2evlqnianf", { x: 0, y: 10 }],
      ["g8f0n0rgqnevnu1a4bi3mosbac33h4kd", { x: 0, y: 11 }],
      ["r26g8v5vo7c82c5o1tt9hcleef924tp2", { x: 2, y: 12 }],
      ["7vbn8f66bak5aqsjdvggdft0pr016han", { x: 0, y: 13 }],
      ["oafuq1kfti8jt5uvj0n7eq2cnc6gl282", { x: 0, y: 14 }],
      ["g2ut7a6p7ij9luvi9207jihre375ecqp", { x: 0, y: 15 }],
    ]);

    expect(commitsMap.size).toBe(expectedCommitsMap.size);

    commitsMap.forEach((v, k) => {
      expect(expectedCommitsMap.get(k)?.x).toBe(v.x);
      expect(expectedCommitsMap.get(k)?.y).toBe(v.y);
    });
  });

  test("twoBranches", () => {
    const nodes = formatCommits(twoBranches);

    const { commitsMap, columns } = computePosition(nodes);

    const expectedColumns: BranchPathTestType[][] = [
      [
        {
          start: 0,
          end: 8,
          endCommit: {
            hash: "bg3k6inb0vu1lcivcj0kijb3lb3hrirj",
            x: 0,
            y: 8,
          },
          branchOrder: 0,
        },
      ],
      [
        {
          start: 1,
          end: 5,
          endCommit: {
            hash: "1lq2jhf0eplg25d4sak0kj0is299gneb",
            x: 0,
            y: 6,
          },
          branchOrder: 1,
        },
      ],
    ];

    const expectedCommitsMap = new Map<string, CommitNodeWithPos>([
      ["euu20mq1b1d9ct2grotrka8jogsh6apl", { x: 0, y: 0 }],
      ["qvsacjqo5q72mcg512ahhqj7hjmtmec0", { x: 1, y: 1 }],
      ["4ttu5nqqifptnuqo6bk1hps3lu484jnu", { x: 0, y: 2 }],
      ["uk7kremprd9cesia4c4lh51ub8b1cf6p", { x: 0, y: 3 }],
      ["82m725ld1qq47m3smu9pmg09s2dh87ma", { x: 1, y: 4 }],
      ["i57ecpdu31a4857j7noo35pj9v41m4fu", { x: 0, y: 5 }],
      ["1lq2jhf0eplg25d4sak0kj0is299gneb", { x: 0, y: 6 }],
      ["g6cuhf56904i64aq7anekeu1q7rrhgtq", { x: 0, y: 7 }],
      ["bg3k6inb0vu1lcivcj0kijb3lb3hrirj", { x: 0, y: 8 }],
    ]);

    expect(
      columns.map(c =>
        c.map(v => ({
          start: v.start,
          end: v.end,
          endCommit: {
            x: v.endCommit?.x,
            y: v.endCommit?.y,
            hash: v.endCommit?.hash,
          },
          branchOrder: v.branchOrder,
        })),
      ),
    ).toEqual(expectedColumns);

    expect(commitsMap.size).toBe(expectedCommitsMap.size);

    commitsMap.forEach((v, k) => {
      expect(expectedCommitsMap.get(k)?.x).toBe(v.x);
      expect(expectedCommitsMap.get(k)?.y).toBe(v.y);
    });
  });

  test("twoCommits", () => {
    const nodes = formatCommits(twoCommits);

    const { commitsMap, columns } = computePosition(nodes);

    const expectedColumns: BranchPathTestType[][] = [
      [
        {
          start: 0,
          end: 1,
          endCommit: {
            hash: "4ttu5nqqifptnuqo6bk1hps3lu484jnu",
            x: 0,
            y: 1,
          },
          branchOrder: 0,
        },
      ],
    ];

    const expectedCommitsMap = new Map<string, CommitNodeWithPos>([
      ["euu20mq1b1d9ct2grotrka8jogsh6apl", { x: 0, y: 0 }],
      ["4ttu5nqqifptnuqo6bk1hps3lu484jnu", { x: 0, y: 1 }],
    ]);

    expect(
      columns.map(c =>
        c.map(v => ({
          start: v.start,
          end: v.end,
          endCommit: {
            x: v.endCommit?.x,
            y: v.endCommit?.y,
            hash: v.endCommit?.hash,
          },
          branchOrder: v.branchOrder,
        })),
      ),
    ).toEqual(expectedColumns);

    expect(commitsMap.size).toBe(expectedCommitsMap.size);

    commitsMap.forEach((v, k) => {
      expect(expectedCommitsMap.get(k)?.x).toBe(v.x);
      expect(expectedCommitsMap.get(k)?.y).toBe(v.y);
    });
  });
});
