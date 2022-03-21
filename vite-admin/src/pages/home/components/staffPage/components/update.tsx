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
    firstName: "",
    secondName: "",
    id: 0,
    key: 0,
    address: "",
    email: "",
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
        <Form.Item label="姓氏" required>
          <Input
            value={formData.firstName}
            onChange={(e) => {
              // setFirstName(e.target.value);
              setFormData({ ...formData, firstName: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="名字" required>
          <Input
            value={formData.secondName}
            onChange={(e) => {
              setFormData({ ...formData, secondName: e.target.value });
              // setSecondName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="地址" required>
          <Input
            value={formData.address}
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
              // setAddress(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="邮箱" required>
          <Input
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
