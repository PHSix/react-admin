import { Button, Layout, Menu } from "antd";
import { GithubOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Header, Content } from "antd/lib/layout/layout";
import { FC, useState } from "react";
import { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import { sideRoutes } from "../../routes";
import {
  clearStorageState,
  getStorageState,
  setStorageState,
} from "../../utils/storage";

const { Sider } = Layout;
/**
 * 判断是否有权限进入
 * 当匹配到路由为`/`的时候进行路由重定向到`/dashboard`
 */

const useInitHome = function () {
  const navigator = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const { isLogin } = getStorageState();
    if (isLogin == false) {
      navigator("/login", { replace: true });
      return;
    }
    if (location.pathname === "/") {
      navigator("/dashboard", { replace: true });
    }
  }, []);
};

/**
 * 判断当前位置是属于哪一个key
 * @returns 当前选中的key
 */
const useKey = function () {
  const location = useLocation();
  let key = sideRoutes.length - 1;
  if (location.pathname !== "/" + sideRoutes[key].path) {
    for (let i = 0; i < sideRoutes.length; i++) {
      if ("/" + sideRoutes[i].path === location.pathname) {
        key = i;
      }
    }
  }
  return key;
};

export const HomePage: FC = function () {
  useInitHome();
  const key = useKey();
  const navigator = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { username } = getStorageState();
  const quit = function () {
    clearStorageState();
    navigator("/login");
  };
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={[`${key}`]}>
          {sideRoutes.map((route, idx) => {
            return (
              <Menu.Item
                key={idx}
                icon={route.icon}
                onClick={() => {
                  if (idx !== sideRoutes.length - 1) {
                    navigator("/" + route.path);
                  }
                }}
              >
                {route.name}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout>
        {/* navigator menu */}
        <Header
          className="flex"
          style={{ backgroundColor: "white", padding: "0 30px" }}
        >
          <div>
            <MenuFoldOutlined
              className={`duration-700 transform transition ${
                collapsed ? "rotate-180" : "rotate-0"
              }`}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            ></MenuFoldOutlined>
          </div>
          <div className="flex-1"></div>
          <div>
            <span style={{ paddingRight: "1rem" }}>{username}</span>
            <GithubOutlined></GithubOutlined>
            <Button
              type="primary"
              style={{ marginLeft: "1rem" }}
              onClick={() => quit()}
            >
              退出
            </Button>
          </div>
        </Header>
        {/* content body */}
        <Content style={{ padding: "24px 16px" }} className="bg-gray-200">
          <div
            className="bg-white h-full"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
