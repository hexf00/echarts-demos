import echarts from "echarts";
import dayjs from "dayjs";

import _ from "lodash";

let chart = echarts.init(<HTMLDivElement>document.getElementById("app"), {});

let xMin = "2020/12/10 00:00";
let xMax = "2020/12/20 23:59";
let yMin = 900;
let yMax = 1320;

const data = [
  { value: ["2020/12/10 8:09", yMin] },
  { value: ["2020/12/11 8:09", 932] },
  { value: ["2020/12/15 8:09", 901] },
  { value: ["2020/12/18 8:09", 934] },
  // null,
  { value: ["2020/12/19 8:09", 1290] },
  { value: ["2020/12/19 12:09", yMax] },
  { value: ["2020/12/20 8:09", 1230] }
];

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

chart.setOption({
  // dataZoom: [
  //   {
  //     type: "slider",
  //     show: true,
  //     xAxisIndex: [0]
  //     // start: 1,
  //     // end: 35
  //   },
  //   {
  //     type: "slider",
  //     show: true,
  //     yAxisIndex: [0],
  //     left: "93%"
  //     // start: 29,
  //     // end: 36
  //   },
  //   {
  //     type: "inside",
  //     xAxisIndex: [0]
  //     // start: 1,
  //     // end: 35
  //   },
  //   {
  //     type: "inside",
  //     yAxisIndex: [0]
  //     // start: 29,
  //     // end: 36
  //   }
  // ],
  xAxis: {
    type: "time",
    boundaryGap: false, //填满，原点出发
    min: xMin,
    max: xMax
  },

  // tooltip: {
  //   formatter(item) {
  //     return "123123";
  //   }
  // },
  yAxis: {
    type: "value",
    max: yMax,
    min: yMin
  },
  series: [
    {
      data,

      //只对点生效
      // emphasis: {
      //   itemStyle: {
      //     color: "#ff0",
      //     borderColor: "#ff0"
      //   }
      // },
      symbolSize: 0,
      type: "line",
      step: "end"
    },
    {
      data: [
        { value: ["2020/12/10 8:09", 940] },
        { value: ["2020/12/12 8:09", 940] },
        { value: ["2020/12/16 8:09", 941] },
        { value: ["2020/12/19 6:09", 954] },
        null,
        { value: ["2020/12/19 10:09", 1190] },
        { value: ["2020/12/19 17:09", 1000] },
        { value: ["2020/12/20 20:09", 1230] }
      ],
      symbolSize: 0,
      type: "line",
      step: "end"
    }
    // {
    //   //移动事件遮罩
    //   name: "moveMask",
    //   type: "custom",
    //   renderItem: function (params, api) {
    //     var startPoint = api.coord([api.value(0), api.value(1)]),
    //       endPoint = api.coord([api.value(2), api.value(3)]);

    //     // console.log("renderItem",api.value(0),api.value(1),startPoint);
    //     return {
    //       type: "group",
    //       children: [
    //         {
    //           type: "rect",
    //           shape: {
    //             x: startPoint[0],
    //             y: startPoint[1],
    //             width: endPoint[0] - startPoint[0],
    //             height: endPoint[1] - startPoint[1]
    //           },
    //           style: api.style({
    //             fill: "transparent",
    //             stroke: "#f00",
    //             // opacity: 0,
    //             lineWidth: 0
    //           })
    //         }
    //       ]
    //     };
    //   },
    //   data: [[xMin, 0, xMax, yMax]]
    // },
    // {
    //   //移动事件遮罩
    //   name: "focusPoint",
    //   type: "custom",
    //   z: 10,
    //   animation: false,
    //   renderItem: function (params, api) {
    //     var startPoint = api.coord([api.value(0), api.value(1)]);

    //     // console.log("renderItem",api.value(0),api.value(1),startPoint);
    //     return {
    //       type: "group",
    //       children: [
    //         {
    //           type: "circle",
    //           shape: {
    //             cx: startPoint[0],
    //             cy: startPoint[1],
    //             r: 5
    //           },
    //           style: api.style({
    //             fill: "#fff",
    //             stroke: "#f00",
    //             // opacity: 0,
    //             lineWidth: 3
    //           })
    //         },
    //         {
    //           type: "text",
    //           style: {
    //             text: `${dayjs(api.value(0)).format(
    //               "YYYY-MM-DD HH:mm"
    //             )} ${api.value(1).toFixed(2)}`,
    //             textAlign: "center",
    //             textVerticalAlign: "bottom"
    //           },
    //           position: [startPoint[0], startPoint[1]]
    //         }
    //       ]
    //     };
    //   },
    //   data: [[xMin, yMin]]
    // }
  ]
});

// null实际被转换为了NaN, NaN
// var option = {
//   xAxis: {
//     type: "category",
//     boundaryGap: false,
//     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
//   },
//   yAxis: {
//     type: "value"
//   },
//   series: [
//     {
//       data: [820, 932, 901, null, 934, 1290, 1330, 1320],
//       type: "line"
//       // areaStyle: {}
//     }
//   ]
// };

// chart.setOption(option);

chart.on("focusnodeadjacency", function () {
  console.log("focusnodeadjacency");
});

//@ts-ignore
chart.getZr().on("mousemove", function (params) {
  const { offsetX, offsetY, target, topTarget } = params;
  console.log("zr mousemove", offsetX, offsetY, target, topTarget);
});
//@ts-ignore
chart.getZr().on("mouseover", function () {
  console.log("zr mouseover");
});
//@ts-ignore
chart.getZr().on("mouseout", function () {
  console.log("zr mouseout");
});
chart.on("mousemove", function () {
  console.log("mousemove");
});
chart.on("mouseover", function () {
  console.log("mouseover");
});
chart.on("mouseout", function () {
  console.log("mouseout");
});

// chart.on(
//   "mousemove",
//   _.throttle(function ({
//     componentType,
//     seriesIndex,
//     seriesId,
//     seriesType,
//     seriesName,
//     event
//   }) {
//     // console.log("mousemove", "12313");

//     let point = chart.convertFromPixel(
//       {
//         seriesIndex,
//         seriesId,
//         seriesName
//       },
//       [event.offsetX, event.offsetY]
//     );

//     let index = bisecLeft(data, point[0], (item, x) => {
//       return new Date(item.value[0]).getTime() - new Date(x).getTime();
//     });

//     var options = chart.getOption();
//     if (index === 0 || index >= data.length) {
//       options.series[3].data = [[-1, -1]];
//       chart.setOption(options);
//       return;
//     } else {
//       options.series[3].data = [
//         // dayjs(new Date(point[0])).format("YYYY-MM-DD HH:mm"),
//         [point[0], data[index - 1].value[1]]
//       ];

//       chart.setOption(options);
//     }

//     // console.log("renderItem1", data[index - 1].value);
//   },
//   50)
// );
