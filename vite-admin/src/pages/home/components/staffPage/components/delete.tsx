import { Modal } from "antd";
import { FC, useState } from "react";
export const DeleteModal: FC<{
  onOk: () => void;
  name: string;
  visable: boolean;
  closePanel: () => void;
}> = function ({ onOk, name, visable, closePanel }) {
  return (
    <Modal
      visible={visable}
      onOk={() => {
        onOk();
        closePanel();
      }}
      onCancel={() => {
        closePanel();
      }}
    >
      <p>
        确定要删除 <strong>{name}</strong> 用户
      </p>
    </Modal>
  );
};
