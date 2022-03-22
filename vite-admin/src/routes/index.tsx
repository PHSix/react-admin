import React from "react";
import {
  UserOutlined,
  SettingOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { RouteObject } from "react-router-dom";
import { HomePage } from "../pages/home";
import { AdminPage } from "../pages/home/components/adminPage";
import { Dashboard } from "../pages/home/components/dashboard";
import { StaffPage } from "../pages/home/components/staffPage";
import { LoginPage } from "../pages/login";
import { NoticePage } from "@/pages/home/components/announcementPage";
import { NotFound } from "@/pages/home/components/notfound";

interface MyRoute extends RouteObject {
  name: string;
  icon: React.ReactNode;
}

export const sideRoutes: MyRoute[] = [
  {
    name: "总览",
    path: "dashboard",
    element: <Dashboard />,
    icon: <DashboardOutlined />,
  },
  {
    name: "人员",
    path: "staff",
    element: <StaffPage />,
    icon: <UserOutlined />,
  },
  {
    name: "管理",
    path: "admin",
    element: <AdminPage />,
    icon: <SettingOutlined />,
  },
  {
    name: "公告",
    path: "announcement",
    icon: <DatabaseOutlined />,
    element: <NoticePage />,
  },
  {
    name: "404",
    path: "*",
    element: <NotFound />,
    icon: <InfoCircleOutlined />,
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
    children: [...sideRoutes],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export default routes;
