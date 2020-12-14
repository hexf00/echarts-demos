import echarts from "echarts";
let option = {
  color: ["#1890FF"],
  tooltip: { trigger: "axis" },
  legend: { bottom: -2, selected: {}, selectedMode: false },
  grid: { top: 30, left: "3%", right: "4%", bottom: "80", containLabel: true },
  xAxis: {
    type: "time",
    axisLabel: { margin: 12 },
    interval: 3600000,
    max: "2020-12-14 23:59:59"
  },
  yAxis: { type: "value", min: 3.29 },
  dataZoom: {
    show: true,
    realtime: true,
    bottom: 40,
    filterMode: "none",
    showDetail: false,
    start: 0,
    end: 100
  },
  dataset: [
    {
      dimensions: ["date", "yield"],
      source: [
        {
          date: "2020-12-14 09:24:32",
          quoteStatus: 0,
          ref: false,
          yield: 3.2975
        },
        { date: "2020-12-14 10:29:43", quoteStatus: 0, ref: false, yield: 3.3 },
        {
          date: "2020-12-14 10:31:44",
          quoteStatus: 0,
          ref: false,
          yield: 3.295
        },
        { date: "2020-12-14 10:32:34", quoteStatus: 0, ref: false, yield: 3.3 },
        {
          date: "2020-12-14 13:43:34",
          quoteStatus: 0,
          ref: false,
          yield: 3.29
        },
        { date: "2020-12-14 14:09:22", quoteStatus: 0, ref: false, yield: 3.3 },
        {
          date: "2020-12-14 14:10:47",
          quoteStatus: 0,
          ref: false,
          yield: 3.2975
        }
      ]
    }
  ],
  series: [
    {
      symbolSize: 0,
      name: "BBBXXX",
      type: "line",
      step: "end",
      datasetIndex: 0,
      connectNulls: true,
      symbol: "line",
      lineStyle: { type: "solid", width: 1 }
    }
  ]
};

let chart = echarts.init(<HTMLDivElement>document.getElementById("app"), {});
chart.setOption(option);
