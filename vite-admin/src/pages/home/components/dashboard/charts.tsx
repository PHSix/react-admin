import { FC, useEffect, useRef } from "react";
import * as echart from "echarts";
export const RecentChart: FC = function () {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const option = {
      xAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };
    const myChart = echart.init(chartRef.current!);
    //@ts-ignore
    myChart.setOption(option);
  }, []);

  return (
    <div
      style={{
        height: "800px",
        width: "800px",
        display: "block",
        lineHeight: "1",
      }}
      ref={chartRef}
    ></div>
  );
};
