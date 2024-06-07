import React, { useEffect } from "react";
import { Card, Empty } from "antd";
import * as echarts from "echarts";
import "./index.less";

let getchart;
// 返回组件
export default (props) => {
  const id = `chart-content-${props.name || ""}`;
  useEffect(() => {
    if (props.nodes.length) {
      getchart = echarts.init(document.getElementById(id));
    } else {
      getchart && getchart.clear();
    }

    const option = {
      title: {
        // text: '同分异构体间热力学关系'
      },
      tooltip: {},
      animationDurationUpdate: 1500,
      animationEasingUpdate: "quinticInOut",
      series: [
        {
          type: "graph",
          // layout: 'circular',
          layout: props.layout,
          roam: props.roam,
          symbolSize: [15 * 5, 10 * 5],
          label: {
            show: true,
          },
          edgeSymbol: ["circle", "arrow"],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 20,
          },
          data: props.nodes,
          links: props.link,
          lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0,
          },
          draggable: true,
          force: {
            // edgeLength: 400,
            repulsion: 400,
            // gravity: 0.2
          },
        },
      ],
    };
    getchart && getchart.setOption(option);

    // 随着屏幕大小调节图表
    window.addEventListener("resize", () => {
      getchart && getchart.resize();
    });
  });
  return (
    <Card title={props.title} bordered={false} className="chart-wrapper">
      {Boolean(props.nodes.length) && (
        <div id={id} style={{ aspectRatio: "4 / 3" }}></div>
      )}
      {!props.nodes.length && (
        <div className="empty-wrapper">
          <Empty />
        </div>
      )}
    </Card>
  );
};
