import echarts from "echarts";
import dayjs from "dayjs";

import _ from "lodash";

declare global {
  interface Window {
    series: any;
    chart: any;
    topTarget: any;
  }
}
let chart = echarts.init(<HTMLDivElement>document.getElementById("app"), {});

let xMin = "2020/12/10 00:00";
let xMax = "2020/12/20 23:59";
let yMin = 900;
let yMax = 1320;

function bisecLeft(a, x, compare) {
  let hi = a.length;
  let lo = 0;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;

    if (compare(a[mid], x) < 0) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}

function renderTrendItem(params, api) {
  // //第几个月
  // var monthIndex = api.value(0);

  // //每个月的平均宽度
  // var unitBandWidth = api.size([0, 0])[0] / (yearCount - 1);

  // var points = echarts.util.map(rawData, function (entry, index) {
  //   //该月 某年的值
  //   var value = rawData[index][monthIndex + 1];

  //   //换算得出坐标轴中的X/Y值
  //   var point = api.coord([monthIndex, value]);

  //   //由于是同一个月的数据，X轴是相同的，需要计算和添加上X轴的偏移
  //   point[0] += unitBandWidth * (index - yearCount / 2);

  //   return point;
  // });

  // //console.log(points);

  // const stepPoints = [];

  // const baseIndex = 0;
  // const stepPt = [];
  // const nextPt = [];
  // const pt = [];

  // if (monthIndex !== 0 /** 第一个月，连接上一个月末尾 */) {
  //   //该月 某年的值
  //   var value = rawData[rawData.length - 1][monthIndex];

  //   //换算得出坐标轴中的X/Y值
  //   var point = api.coord([monthIndex - 1, value]);

  //   //由于是同一个月的数据，X轴是相同的，需要计算和添加上X轴的偏移
  //   point[0] += unitBandWidth * 4.5;

  //   stepPoints.push(point);
  // }
  // for (let i = 0; i < points.length; i++) {
  //   const pt1 = points[i];
  //   const pt2 = points[i + 1];
  //   stepPoints.push(pt1);

  //   if (pt2) {
  //     stepPoints.push([pt2[0], pt1[1]]);
  //   }
  // }

  // console.log(stepPoints);

  console.log(params);

  let stepPoints = [];

  return {
    type: "group",
    children: [
      {
        //原生图形，非series.type
        type: "polyline",
        shape: {
          points: stepPoints
        },
        style: api.style({
          fill: null,
          stroke: api.visual("color")
        })
      }
    ]
  };
}

chart.setOption({
  dataZoom: [
    {
      type: "slider",
      show: true,
      xAxisIndex: [0]
      // start: 1,
      // end: 35
    },
    {
      type: "slider",
      show: true,
      yAxisIndex: [0],
      left: "93%"
      // start: 29,
      // end: 36
    },
    {
      type: "inside",
      xAxisIndex: [0]
      // start: 1,
      // end: 35
    },
    {
      type: "inside",
      yAxisIndex: [0]
      // start: 29,
      // end: 36
    }
  ],
  xAxis: {
    type: "time",
    boundaryGap: false, //填满，原点出发
    min: xMin,
    max: xMax
  },

  tooltip: {
    formatter(item) {
      return "123123";
    }
  },
  yAxis: {
    type: "value",
    max: yMax,
    min: yMin
  },
  series: [
    {
      type: "custom",
      id: "中国银行",
      name: "中国银行",
      coordinateSystem: "cartesian2d",
      clip: true,
      data: [
        { value: ["2020/12/10 8:09", yMin] },
        { value: ["2020/12/11 8:09", 932] },
        null,
        { value: ["2020/12/15 8:09", 901] },
        { value: ["2020/12/18 8:09", 934] },
        { value: ["2020/12/19 8:09", 1290] },
        { value: ["2020/12/19 12:09", yMax] },
        { value: ["2020/12/20 8:09", 1230] }
      ],

      //只对点生效
      // emphasis: {
      //   itemStyle: {
      //     color: "#ff0",
      //     borderColor: "#ff0"
      //   }
      // },
      symbolSize: 0,
      lineStyle: {
        width: 1,
        color: "#f00"
        // width: 10
      },
      renderItem: renderTrendItem,
      step: "end"
    }
    // {
    //   id: "农业银行",
    //   name: "农业银行",
    //   data: [
    //     { value: ["2020/12/10 8:09", 940] },
    //     { value: ["2020/12/12 8:09", 940] },
    //     { value: ["2020/12/16 8:09", 941] },
    //     { value: ["2020/12/19 6:09", 954] },
    //     { value: ["2020/12/19 10:09", 1190] },
    //     { value: ["2020/12/19 17:09", 1000] },
    //     { value: ["2020/12/20 20:09", 1230] }
    //   ],
    //   lineStyle: {
    //     width: 1,
    //     color: "#0f0"
    //   },
    //   symbolSize: 0,
    //   type: "line",
    //   step: "end"
    // },
    // {
    //   id: "工商银行",
    //   name: "工商银行",
    //   data: [
    //     { value: ["2020/12/10 8:09", 940] },
    //     { value: ["2020/12/12 8:09", 940] },
    //     { value: ["2020/12/16 8:09", 941] },
    //     { value: ["2020/12/19 6:09", 954] },
    //     null,
    //     { value: ["2020/12/19 10:09", 1190] },
    //     { value: ["2020/12/19 17:09", 1000] },
    //     { value: ["2020/12/20 20:09", 1230] }
    //   ],
    //   symbolSize: 0,
    //   lineStyle: {
    //     width: 1,
    //     color: "#f0f"
    //   },
    //   type: "line",
    //   step: "end"
    // }
  ]
});

window.chart = chart;
