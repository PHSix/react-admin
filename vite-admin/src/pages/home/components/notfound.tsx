import { Button, Layout, Result } from "antd";
import { FC } from "react";

export const NotFound: FC = function () {
  return (
    <Layout style={{ backgroundColor: "transparent" }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        style={{
          backgroundColor: "transparent",
        }}
        extra={<Button type="primary">Back Home</Button>}
      />
    </Layout>
  );
};

export default NotFound;
