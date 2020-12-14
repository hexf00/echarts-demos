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
let xMax = "2020/12/30 23:59";
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

chart.setOption({
  dataZoom: [
    // {
    //   type: "slider",
    //   show: true,
    //   filterMode: "none",
    //   xAxisIndex: [0]
    //   // start: 1,
    //   // end: 35
    // },
    {
      type: "slider",
      show: true,
      filterMode: "none",

      // rangeMode: ["percent", "percent"],
      yAxisIndex: [0]
      // left: "93%"
      start: 0,
      end: 99
    }
    // {
    //   type: "inside",
    //   xAxisIndex: [0],

    //   filterMode: "none"
    //   // start: 1,
    //   // end: 35
    // }
    // {
    //   type: "inside",
    //   yAxisIndex: [0],

    //   filterMode: "none"
    //   // start: 29,
    //   // end: 36
    // }
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
      id: "中国银行",
      name: "中国银行",
      // clip: false,
      data: [
        { value: ["2020/12/10 8:09", yMin] },
        { value: ["2020/12/11 8:09", 932] },
        { value: ["2020/12/15 8:09", 901] },
        null,
        { value: ["2020/12/18 8:09", 934] },
        { value: ["2020/12/19 8:09", 1290] },
        { value: ["2020/12/19 12:09", yMax] },
        { value: ["2020/12/20 8:09", 1230] },
        null
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
      type: "line",
      step: "end"
    },
    {
      id: "农业银行",
      name: "农业银行",
      data: [
        { value: ["2020/12/10 8:09", 940] },
        { value: ["2020/12/12 8:09", 940] },
        { value: ["2020/12/16 8:09", 941] },
        { value: ["2020/12/19 6:09", 954] },
        { value: ["2020/12/19 10:09", 1190] },
        { value: ["2020/12/19 17:09", 1000] },
        { value: ["2020/12/20 20:09", 1230] }
      ],
      lineStyle: {
        width: 1,
        color: "#0f0"
      },
      symbolSize: 0,
      type: "line",
      step: "end"
    },
    {
      id: "工商银行",
      name: "工商银行",
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
      lineStyle: {
        width: 1,
        color: "#f0f"
      },
      type: "line",
      step: "end"
    },

    // {
    //   id: "交通银行",
    //   name: "交通银行",
    //   data: [
    //     { value: ["2020/12/10 4:09", 840] },
    //     { value: ["2020/12/12 4:09", 840] },
    //     null,
    //     { value: ["2020/12/16 4:09", 841] },
    //     { value: ["2020/12/19 9:09", 854] },
    //     null,
    //     { value: ["2020/12/19 5:09", 1090] },
    //     { value: ["2020/12/19 7:09", 900] },
    //     { value: ["2020/12/20 12:09", 1130] }
    //   ],
    //   symbolSize: 0,
    //   lineStyle: {
    //     color: "#000"
    //   },
    //   type: "line",
    //   step: "end"
    // },
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
    // }
    {
      //移动事件遮罩
      name: "focusPoint",
      type: "custom",
      z: 10,
      clip: true,
      tooltip: {
        formatter(item) {
          let option = chart.getOption();

          //@ts-ignore
          let [x, y] = item.data;

          // return `${dayjs(x).format("YYYY-MM-DD HH:mm")}<br>`;

          // console.log(x, y);

          let items = option.series
            .filter((it) => it.type === "line")
            .map((lineSeries) => {
              const tmp = (lineSeries.data as any[]).filter(Boolean);

              let index = bisecLeft(tmp, x, (item, x) => {
                return (
                  new Date(item.value[0]).getTime() - new Date(x).getTime()
                );
              });

              let lastPoint = tmp[index - 1] as { value: [number, number] };

              // console.log(
              //   "tmp[index - 1]",
              //   Math.abs(new Date(lastPoint.value[0]).getTime() - x),
              //   new Date(lastPoint.value[0]).getTime(),
              //   x
              // );

              if (
                index === 0 ||
                index > tmp.length ||
                (index === tmp.length &&
                  Math.abs(new Date(lastPoint.value[0]).getTime() - x) >
                    60 * 60 * 1000) /** 暂定误差一小时 */ ||
                lastPoint.value[1] !== y //不在同一Y
              ) {
                // hideFocusPoint({ options, focusPoint, chart });
                return null;
              } else {
                return { lineSeries, point: lastPoint };
              }
            })
            .filter(Boolean);
          // console.log("items", items);
          // options.series.find((it) => it.name === "focusPoint");

          return (
            `${dayjs(x).format("YYYY-MM-DD HH:mm")}<br>` +
            items
              .map((it) => `${it.lineSeries.name}: ${it.point.value[1]}`)
              .join("<br>")
          );
        }
      },
      animation: false,
      // silent: true,
      // animationDurationUpdate: 200,
      renderItem: function (params, api) {
        // console.log(api.value());
        var startPoint = api.coord([api.value(0), api.value(1)]);

        // console.log("renderItem", api.value(0), api.value(1), api.value(2));

        let option = chart.getOption();
        // console.log("option.series[api.value(2)]", option.series[api.value(2)]);

        return {
          type: "group",
          children: [
            {
              type: "circle",
              shape: {
                cx: startPoint[0],
                cy: startPoint[1],
                r: api.value(2) === -1 ? 0 : 5
              },
              style: api.style({
                fill: api.value(2) === -1 ? "transparent" : "#fff",
                stroke:
                  api.value(2) === -1
                    ? "transparent"
                    : //@ts-ignore
                      option.series[api.value(2)].lineStyle.color,
                // opacity: api.value(2),
                lineWidth: api.value(2) === -1 ? 0 : 2
              })
            }
            // {
            //   type: "text",
            //   style: {
            //     text: `${dayjs(api.value(0)).format(
            //       "YYYY-MM-DD HH:mm"
            //     )} ${api.value(1).toFixed(2)}`,
            //     textAlign: "center",
            //     textVerticalAlign: "bottom"
            //   },
            //   position: [startPoint[0], startPoint[1]]
            // }
          ]
        };
      },
      data: [[xMin, yMin, 0]]
    }
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

window.chart = chart;
// chart.setOptioxn(option);
const hideFocusPoint = function ({ options, focusPoint, chart }) {
  options.series
    .filter((it) => it.type === "line")
    .map((it) => (it.lineStyle.width = 1));

  focusPoint.data[0][2] = -1;
  chart.setOption(options);
};

const onMouseMove = function (params) {
  const { x, y, seriesIndex } = params;
  // const { seriesIndex } = seriesModel;
  let point = chart.convertFromPixel(
    {
      // seriesIndex
      xAxisIndex: 0,
      yAxisIndex: 0
    },
    [x, y]
  );
  var options = chart.getOption();
  const data = <any[]>options.series[seriesIndex].data;

  options.series
    .filter((it) => it.type === "line")
    .map((it) => (it.lineStyle.width = 1));

  options.series[seriesIndex].lineStyle.width = 4;

  const tmp = data.filter(Boolean);
  let index = bisecLeft(tmp, point[0], (item, x) => {
    return new Date(item.value[0]).getTime() - new Date(x).getTime();
  });

  let focusPoint = options.series.find((it) => it.name === "focusPoint");

  // || !data[index]

  // console.info(
  //   "data[data.indexOf(tmp[index - 1]) - 1]",
  //   data.indexOf(tmp[index - 1]),
  //   data[data.indexOf(tmp[index - 1]) - 1]
  // );

  if (
    index === 0 ||
    index > tmp.length ||
    (!data[data.indexOf(tmp[index - 1]) + 1] &&
      Math.abs(tmp[index - 1].value[1] - point[1]) > 10) //误差太大)
  ) {
    hideFocusPoint({ options, focusPoint, chart });
    return;
  } else {
    focusPoint.data = [[point[0], tmp[index - 1].value[1], seriesIndex]];

    chart.setOption(options);

    // setTimeout(() => {
    // console.log(options.series.indexOf(focusPoint), [
    //   point[0],
    //   tmp[index - 1].value[1]
    // ]);
    chart.dispatchAction({
      type: "showTip",
      // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
      seriesIndex: options.series.indexOf(focusPoint),
      // // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
      dataIndex: 0
      // 可选，数据名称，在有 dataIndex 的时候忽略
      // name?: string,
      // // 本次显示 tooltip 的位置。只在本次 action 中生效。
      // // 缺省则使用 option 中定义的 tooltip 位置。
      // position: [point[0], tmp[index - 1].value[1]]
    });
    // }, 200);
  }
};

//@ts-ignore
chart.getZr().on(
  "mousemove",
  // _.throttle(
  function (params) {
    const { offsetX, offsetY, target, topTarget } = params;

    var options = chart.getOption();

    // console.log(options.series.filter((it) => it.type === "line"));

    // console.log(target, topTarget);

    // console.log(target);

    if (topTarget) {
      // window.topTarget = topTarget;

      // console.log("mousemove");
      //@ts-ignore
      const seriesModel = chart._api.getComponentByElement(topTarget);

      if (
        seriesModel &&
        seriesModel.mainType === "series" &&
        seriesModel.option.type === "line"
      ) {
        onMouseMove({
          x: offsetX,
          y: offsetY,
          seriesIndex: seriesModel.seriesIndex
        });
      } else if (
        seriesModel &&
        seriesModel.mainType === "series" &&
        seriesModel.name === "focusPoint"
      ) {
        onMouseMove({
          x: offsetX,
          y: offsetY,
          seriesIndex: seriesModel.option.data[0][2]
        });
      }
    } else {
      let focusPoint = options.series.find((it) => it.name === "focusPoint");

      hideFocusPoint({ options, focusPoint, chart });
    }
  }
  // , 16)
);
chart.on("datazoom", ({ start, end }) => {
  let { rangeStart, rangeEnd } = chart.getOption().xAxis[0];

  if (!rangeStart || !rangeEnd) {
    // 完整数据
    return;
  }

  console.log(
    start,
    end,
    rangeStart,
    rangeEnd,
    dayjs(rangeStart).format("YYYY-MM-DD HH:mm:ss"),
    dayjs(rangeEnd).format("YYYY-MM-DD HH:mm:ss"),
    chart.getOption().xAxis
  );
});
// chart.on(
//   "mouseout",
//   _.throttle(function (params) {
//     if (params.seriesName === "focusPoint") {
//       console.log("mouseout");
//       var options = chart.getOption();
//       let focusPoint = options.series.find((it) => it.name === "focusPoint");
//       hideFocusPoint({ options, focusPoint, chart });
//     }
//     // console.log(params);
//   }, 33)
// );

// chart.on(
//   "mousemove",
//   _.throttle(function (params) {
//     const {
//       componentType,
//       seriesIndex,
//       seriesId,
//       seriesType,
//       seriesName,
//       event
//     } = params;
//     if (params.seriesName === "focusPoint") {
//       console.log("mousemove");
//       var options = chart.getOption();
//       let focusPoint = options.series.find((it) => it.name === "focusPoint");

//       console.log("event.offsetX, event.offsetY", event.offsetX, event.offsetY);
//       let point = <[]>chart.convertFromPixel(
//         {
//           // seriesIndex
//           xAxisIndex: 0,
//           yAxisIndex: 0
//         },
//         [event.offsetX, event.offsetY]
//       );
//       focusPoint.data = [[...point, 1]];
//       chart.setOption(options);
//     }
//   }, 1)
// );
