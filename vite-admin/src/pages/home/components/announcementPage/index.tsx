import { Button, Layout } from "antd";
import type { FC } from "react";

export const NoticePage: FC = function () {
  return (
    <Layout style={{ backgroundColor: "transparent" }}>
      <div className="flex">
        <div>公告</div>
        <div className="flex-1"></div>
        <Button type="primary">发布</Button>
      </div>
    </Layout>
  );
};

export default NoticePage;
