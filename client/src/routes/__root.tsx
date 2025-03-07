import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import {
  LayoutDashboard,
  CircleUser,
  UserRoundPen,
  Search,
} from "lucide-react";

import { Layout, Menu, theme } from "antd";
const { useToken } = theme;

const { Header, Content, Footer, Sider } = Layout;
export const Route = createRootRoute({
  component: RootComponent,
});
const items = [
  {
    key: "1",
    icon: <LayoutDashboard style={{ height: "17px" }} />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: "2",
    icon: <CircleUser style={{ height: "17px" }} />,
    label: <Link to="/about">About</Link>,
  },
  {
    key: "3",
    icon: <Search style={{ height: "17px" }} />,
    label: <Link to="/allUsers"> Find Roommate</Link>,
  },
  {
    key: "4",
    icon: <UserRoundPen style={{ height: "17px" }} />,
    label: <Link to="/profile">Profile</Link>,
  },
];

function RootComponent() {
  const { token } = useToken();

  return (
    <>
      <Layout style={{ height: "100dvh" }}>
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
          className="pt-5"
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Layout>
          {/* <Header style={{ padding: 0 }} /> */}
          <Content style={{ margin: "24px 16px 0" }}>
            <Outlet />
          </Content>
          <Footer
            style={{
              height: "3vh",
              textAlign: "center",
              backgroundColor: token.colorPrimaryBg,
            }}
          >
            Roaming Roomies ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
