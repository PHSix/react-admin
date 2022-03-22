import type { Staff } from "@/model/staff";
import { axiosReq } from "@/utils/http";
import { Button, Layout, Table } from "antd";
import type { ColumnType } from "antd/lib/table";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AddModal } from "./components/add";
import { DeleteModal } from "./components/delete";
import { UpdateModal } from "./components/update";
export const StaffPage: FC = function () {
  const cur = useRef({
    firstName: "",
    secondName: "",
    key: 0,
    id: 0,
    address: "",
    email: "",
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
        title: "姓名",
        render: (source) => {
          return `${source.firstName} ${source.secondName}`;
        },
      },
      {
        key: "email",
        title: "邮箱",
        dataIndex: "email",
      },
      {
        key: "address",
        title: "地址",
        dataIndex: "address",
      },
      {
        key: "isClock",
        title: "打卡情况",
        render: (value) => {
          return value.isClock ? "已打卡" : "未打卡";
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
      url: "/staff",
      method: "GET",
    }).then((res) => {
      const staffs: Staff[] = res.data.staffs;
      staffs.forEach((element, idx) => {
        element.key = idx;
      });
      setList(staffs);
    });
  }, []);
  return (
    <Layout
      style={{
        backgroundColor: "transparent",
      }}
    >
      <div style={{ display: "flex" }}>
        <div>员工面板</div>
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
            url: "/staff",
          })
            .then((res) => {
              if (res.status === 201) {
                t.key = list[list.length - 1].key + 1;
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
        name={`${cur.current.firstName} ${cur.current.secondName}`}
        onOk={() => {
          axiosReq({
            url: `/staff?id=${cur.current.id}`,
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
            url: "/staff",
            data: t,
          }).then((res) => {
            // TODO: 更新处理
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
