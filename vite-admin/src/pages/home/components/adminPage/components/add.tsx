import { Form, Input, Modal } from "antd";
import md5 from "md5";
import { FC, useEffect, useRef, useState } from "react";

export const AddModal: FC<{
  onSubmit: (t: any) => void;
  visable: boolean;
  closeVisable: () => void;
}> = function ({ onSubmit, visable, closeVisable }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setName("");
    setPassword("");
  }, [visable]);
  return (
    <Modal
      visible={visable}
      onCancel={() => {
        closeVisable();
      }}
      onOk={() => {
        onSubmit({
          name,
          password: md5(password),
        });
        closeVisable();
      }}
      okText="添加"
      cancelText="取消"
      title="添加管理员"
    >
      <Form name="add_admin" initialValues={{ remember: false }}>
        <Form.Item label="账号" required>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="密码" required>
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
