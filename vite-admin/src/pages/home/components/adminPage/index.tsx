import type { Admin } from "@/model/admin";
import { axiosReq } from "@/utils/http";
import { Button, Layout, Table } from "antd";
import type { ColumnType } from "antd/lib/table";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AddModal } from "./components/add";
import { DeleteModal } from "./components/delete";
import { UpdateModal } from "./components/update";
export const AdminPage: FC = function () {
  const cur = useRef({
    name: "",
    password: "",
    key: 0,
    id: 0,
  });
  const [list, setList] = useState<any[]>([]);
  const [addModalVisiable, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const deleteOk = (value: any) => {
    setDeleteModalVisible(true);
    cur.current = value;
  };
  const updateOk = useCallback((value: any) => {
    setUpdateModalVisible(true);
    cur.current = value;
  }, []);
  const columns: ColumnType<any>[] = useMemo(() => {
    return [
      {
        key: "name",
        title: "账号",
        dataIndex: "name",
      },
      {
        key: "isSuper",
        title: "超级管理员",
        // dataIndex: "isSuper",
        render: (value) => {
          return value.isSuper ? "是" : "否";
        },
      },
      {
        key: "handle",
        title: "操作",
        render: (value, rec, index) => {
          return (
            <>
              <Button
                danger
                type="primary"
                onClick={() => {
                  deleteOk(value);
                }}
                style={{ marginRight: "1rem" }}
              >
                删除
              </Button>
              <Button
                danger
                type="primary"
                onClick={() => {
                  updateOk(value);
                }}
              >
                修改信息
              </Button>
            </>
          );
        },
      },
    ];
  }, []);
  // 获取数据
  useEffect(() => {
    axiosReq({
      method: "GET",
      url: "/admin",
    }).then((res) => {
      const admins: Admin[] = res.data.admins;
      admins.forEach((item, idx) => (item.key = idx));
      setList(admins);
    });
  }, []);
  return (
    <Layout
      style={{
        backgroundColor: "transparent",
      }}
    >
      <div style={{ display: "flex" }}>
        <div>管理员面板</div>
        <div style={{ flex: 1 }}></div>
        <Button
          type="primary"
          style={{
            marginRight: ".3rem",
            marginBottom: ".8rem",
          }}
          onClick={() => setAddModalVisible(true)}
        >
          添加
        </Button>
      </div>
      <Table columns={columns} dataSource={list}></Table>
      <AddModal
        onSubmit={function (t: any): void {
          // 提交数据到服务端
          // TODO:
          axiosReq({
            method: "POST",
            data: t,
            url: "/admin",
          })
            .then((res) => {
              if (res.status === 201) {
                t.key = list[list.length - 1].key + 1;
                t.password = null;
                setList([...list, t]);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        visable={addModalVisiable}
        closeVisable={() => {
          setAddModalVisible(false);
        }}
      />
      <DeleteModal
        visable={deleteModalVisible}
        closePanel={() => {
          setDeleteModalVisible(false);
        }}
        name={`${cur.current.name}`}
        onOk={() => {
          if (cur.current.name === localStorage.getItem("username")) {
            // TODO: 处理自己的情况
            return;
          }
          axiosReq({
            url: `/admin?id=${cur.current.id}`,
            method: "DELETE",
          })
            .then((res) => {
              if (res.status == 200) {
                //TODO:
                console.log("delete sucessful");

                setList(
                  list.filter((item) => {
                    return item.id == cur.current.id;
                  })
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      />
      <UpdateModal
        cur={cur}
        visable={updateModalVisible}
        closePanel={function (): void {
          setUpdateModalVisible(false);
        }}
        onSubmit={(t: any) => {
          axiosReq({
            method: "PUT",
            url: "/admin",
            data: t,
          }).then((res) => {
            // TODO: 更新处理
            t.password = null;
            setList([
              ...list.filter((item) => {
                return item.id !== t.id;
              }),
              t,
            ]);
          });
        }}
      />
    </Layout>
  );
};
