import { Form, Input, Modal } from "antd";
import { FC, useEffect, useRef, useState } from "react";

export const AddModal: FC<{
  onSubmit: (t: any) => void;
  visable: boolean;
  closeVisable: () => void;
}> = function ({ onSubmit, visable, closeVisable }) {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const onFinish = function (t: any) {
    onSubmit(t);
  };
  useEffect(() => {
    setFirstName("");
    setSecondName("");
    setEmail("");
    setAddress("");
  }, [visable]);
  return (
    <Modal
      visible={visable}
      onCancel={() => {
        closeVisable();
      }}
      onOk={() => {
        onSubmit({
          firstName,
          secondName,
          address,
          email,
        });
        closeVisable();
      }}
      okText="添加"
      cancelText="取消"
      title="添加人员"
    >
      <Form
        name="add_staff"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item label="姓氏" required>
          <Input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="名字" required>
          <Input
            value={secondName}
            onChange={(e) => {
              setSecondName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="地址" required>
          <Input
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="邮箱" required>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
