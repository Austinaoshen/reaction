const query1 = {
  link: [
    {
      source: 1,
      target: 0,
      value: "ΔG: -0.030635999999958585 eV",
      lineStyle: {
        curveness: 0.2,
        width: 5,
      },
    },
    {
      source: 2,
      target: 1,
      value: "ΔG: -0.002973999999994703 eV",
      lineStyle: {
        curveness: 0.2,
        width: 5,
      },
    },
    {
      source: 3,
      target: 2,
      value: "ΔG: -0.0291740000000118 eV",
      lineStyle: {
        curveness: 0.2,
        width: 5,
      },
    },
    {
      source: 4,
      target: 3,
      value: "ΔG: -0.03196200000002136 eV",
      lineStyle: {
        curveness: 0.2,
        width: 5,
      },
    },
  ],
  nodes: [
    {
      symbol: "image://http://8.130.53.206:8088/52463.png",
      value: "G: -345.108868 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/35983.png",
      value: "G: -345.078232 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/33366.png",
      value: "G: -345.075258 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/33271.png",
      value: "G: -345.046084 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/33385.png",
      value: "G: -345.014122 eV",
    },
  ],
  layout: "circular",
  roam: "move",
};

const query2 = {
  link: [
    {
      source: 1,
      target: 3,
      lineStyle: {
        curveness: 0.2,
        width: 2,
      },
    },
    {
      source: 0,
      target: 3,
      lineStyle: {
        curveness: 0.2,
        width: 2,
      },
    },
    {
      source: 3,
      target: 2,
      lineStyle: {
        curveness: 0.2,
        width: 5,
      },
    },
    {
      source: 4,
      target: 6,
      lineStyle: {
        curveness: 0.2,
        width: 2,
      },
    },
    {
      source: 0,
      target: 6,
      lineStyle: {
        curveness: 0.2,
        width: 2,
      },
    },
    {
      source: 6,
      target: 5,
      lineStyle: {
        curveness: 0.2,
        width: 5,
      },
    },
    {
      source: 7,
      target: 9,
      lineStyle: {
        curveness: 0.2,
        width: 2,
      },
    },
    {
      source: 0,
      target: 9,
      lineStyle: {
        curveness: 0.2,
        width: 2,
      },
    },
    {
      source: 9,
      target: 8,
      lineStyle: {
        curveness: 0.2,
        width: 5,
      },
    },
    {
      source: 10,
      target: 12,
      lineStyle: {
        curveness: 0.2,
        width: 2,
      },
    },
    {
      source: 0,
      target: 12,
      lineStyle: {
        curveness: 0.2,
        width: 2,
      },
    },
    {
      source: 12,
      target: 11,
      lineStyle: {
        curveness: 0.2,
        width: 5,
      },
    },
    {
      source: 13,
      target: 15,
      lineStyle: {
        curveness: 0.2,
        width: 2,
      },
    },
    {
      source: 0,
      target: 15,
      lineStyle: {
        curveness: 0.2,
        width: 2,
      },
    },
    {
      source: 15,
      target: 14,
      lineStyle: {
        curveness: 0.2,
        width: 5,
      },
    },
  ],
  nodes: [
    {
      symbol: "image://http://8.130.53.206:8088/0.png",
      value: "G: -40.498597 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/8.png",
      value: "G: -116.633775 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/42.png",
      value: "G: -157.143262 eV",
    },
    {
      symbolSize: [20, 20],
      value: "ΔG = -0.010889999999989186 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/8.png",
      value: "G: -116.633775 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/46.png",
      value: "G: -157.141657 eV",
    },
    {
      symbolSize: [20, 20],
      value: "ΔG = -0.009285000000005539 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/9.png",
      value: "G: -132.742149 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/44.png",
      value: "G: -173.174073 eV",
    },
    {
      symbolSize: [20, 20],
      value: "ΔG = 0.06667300000000864 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/10.png",
      value: "G: -153.812518 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/21.png",
      value: "G: -194.294663 eV",
    },
    {
      symbolSize: [20, 20],
      value: "ΔG = 0.01645199999998681 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/10.png",
      value: "G: -153.812518 eV",
    },
    {
      symbol: "image://http://8.130.53.206:8088/39.png",
      value: "G: -194.28893 eV",
    },
    {
      symbolSize: [20, 20],
      value: "ΔG = 0.02218500000000745 eV",
    },
  ],
  layout: "force",
  roam: "move",
};

export { query1, query2 };
