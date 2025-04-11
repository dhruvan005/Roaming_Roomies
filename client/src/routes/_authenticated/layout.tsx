import * as React from "react";
import { Outlet, useRouter, useNavigate, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CircleUser,
  UserRoundPen,
  Search,
} from "lucide-react";
import { Layout, Menu, theme } from "antd";
import { createFileRoute } from "@tanstack/react-router";

const { Header, Content, Footer, Sider } = Layout;
const { useToken } = theme;

// Map between menu keys and routes
const keyToRouteMap = {
  "1": "/",
  "2": "/about",
  "3": "/allUsers",
  "4": "/profile",
} as const;

// Define a function to get the key based on pathname
function getKeyFromPath(pathname: string): string {
  if (pathname === "/" || pathname === "") return "1";
  if (pathname === "/about" || pathname.startsWith("/about/")) return "2";
  if (pathname === "/allUsers" || pathname.startsWith("/allUsers/")) return "3";
  if (pathname === "/profile" || pathname.startsWith("/profile/")) return "4";
  return "1"; // Default to home
}

export const Component = () => {
  const { token } = useToken();
  const router = useRouter();
  const navigate = useNavigate();
  const location = useLocation();

  // State to track the selected menu item
  const [selectedKey, setSelectedKey] = React.useState(() => {
    return getKeyFromPath(location.pathname);
  });

  // Update selected key when route changes
  React.useEffect(() => {
    const currentKey = getKeyFromPath(location.pathname);
    setSelectedKey(currentKey);
  }, [location.pathname]);

  // Handle menu selection
  const handleMenuSelect = ({ key }: { key: string }) => {
    const targetRoute = keyToRouteMap[key as keyof typeof keyToRouteMap];
    if (targetRoute) {
      setSelectedKey(key);
      navigate({ to: targetRoute });
    }
  };

  const items = [
    {
      key: "1",
      icon: <LayoutDashboard style={{ height: "17px" }} />,
      label: "Home",
    },
    {
      key: "2",
      icon: <CircleUser style={{ height: "17px" }} />,
      label: "About",
    },
    {
      key: "3",
      icon: <Search style={{ height: "17px" }} />,
      label: "Find Roommate",
    },
    {
      key: "4",
      icon: <UserRoundPen style={{ height: "17px" }} />,
      label: "Profile",
    },
  ];

  return (
    <div className="root-layout">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          className="pt-5"
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={items}
            onSelect={handleMenuSelect}
          />
        </Sider>
        <Layout>
          <Content style={{ flex: "1 0 auto" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/layout")({
  component: Component,
});

