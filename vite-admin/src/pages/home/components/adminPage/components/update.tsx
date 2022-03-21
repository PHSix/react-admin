import { Form, Input, Modal } from "antd";
import { FC, useState, useEffect } from "react";
// TODO: 对比节流
export const UpdateModal: FC<{
  cur: any;
  visable: boolean;
  closePanel: () => void;
  onSubmit: (t: any) => void;
}> = function ({ cur, visable, closePanel, onSubmit }) {
  const [formData, setFormData] = useState({
    id: 0,
    key: 0,
    name: "",
    password: "",
  });
  useEffect(() => {
    setFormData(cur.current);
  }, [visable]);
  return (
    <Modal
      visible={visable}
      onCancel={() => {
        closePanel();
      }}
      onOk={() => {
        onSubmit(formData);
        closePanel();
      }}
      okText="提交"
      cancelText="取消"
      title="修改人员信息"
    >
      <Form name="add_staff" initialValues={{ remember: true }}>
        <Form.Item label="账号" required>
          <Input
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="密码" required>
          <Input
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
