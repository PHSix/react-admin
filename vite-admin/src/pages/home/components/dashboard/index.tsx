import { axiosReq } from "@/utils/http";
import { BulbOutlined, DashboardOutlined } from "@ant-design/icons";
import CommentOutlined from "@ant-design/icons/lib/icons/CommentOutlined";
import { Layout } from "antd";
import React, { FC, useEffect, useState } from "react";
import { RecentChart } from "./charts";
import { IconPanel } from "./iconPanel";

interface Status {
  staffs: number | string;
  admins: number | string;
  clocked: number | string;
}

/**
 * 仪表盘显示组件
 */
export const Dashboard: FC = function () {
  const [total, setTotal] = useState<Status>({
    staffs: "---",
    admins: "---",
    clocked: "---",
  });
  useEffect(() => {
    Promise.all([
      axiosReq({
        method: "GET",
        url: "/total/staffs",
      }),
      axiosReq({
        method: "GET",
        url: "/total/admins",
      }),
      axiosReq({
        method: "GET",
        url: "/total/clocked",
      }),
    ]).then((res) => {
      setTotal({
        staffs: res[0].data.count,
        admins: res[1].data.count,
        clocked: res[2].data.count,
      });
    });
  }, []);
  return (
    <div
      style={{
        backgroundColor: "transparent",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <RecentChart />
      <div
        className="grid-cols-3 grid"
        style={{
          backgroundColor: "transparent",
        }}
      >
        <IconPanel
          title="员工总数"
          value={total.staffs}
          icon={
            <CommentOutlined
              style={{
                fontSize: "600%",
                color: "#0891B2",
              }}
            />
          }
        ></IconPanel>
        <IconPanel
          title="管理员总数"
          value={total.admins}
          icon={
            <BulbOutlined
              style={{
                fontSize: "600%",
                color: "#EA580C",
              }}
            />
          }
        ></IconPanel>
        <IconPanel
          title="已经打卡人数"
          value={total.clocked}
          icon={
            <DashboardOutlined
              style={{
                fontSize: "600%",
                color: "#EAB308",
              }}
            />
          }
        ></IconPanel>
      </div>
    </div>
  );
};

export default Dashboard