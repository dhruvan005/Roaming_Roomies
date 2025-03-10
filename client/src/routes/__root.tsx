import * as React from "react";
import {
  Link,
  Outlet,
  createRootRoute,
  useRouter,
  useNavigate
} from "@tanstack/react-router";

import {
  LayoutDashboard,
  CircleUser,
  UserRoundPen,
  Search,
  HousePlus,
} from "lucide-react";

import { Layout, Menu, theme } from "antd";
const { useToken } = theme;

const { Header, Content, Footer, Sider } = Layout;
export const Route = createRootRoute({
  component: RootComponent,
});

// Map between menu keys and routes
const keyToRouteMap = {
  "1": "/",
  "2": "/about",
  "3": "/allUsers",
  "4": "/roomListing",
  "5": "/profile",
};

// Define a function to get the key based on pathname
function getKeyFromPath(pathname: string): string {
  if (pathname === "/") return "1";
  if (pathname === "/about" || pathname.startsWith("/about/")) return "2";
  if (pathname === "/allUsers" || pathname.startsWith("/allUsers/")) return "3";
  if (pathname === "/roomListing" || pathname.startsWith("/roomroomListing/")) return "4";
  if (pathname === "/profile" || pathname.startsWith("/profile/")) return "5";
  return "1"; // Default to home
}

function RootComponent() {
  const { token } = useToken();
  const router = useRouter();
  const navigate = useNavigate();
  
  // State to track the selected menu item
  const [selectedKey, setSelectedKey] = React.useState(() => {
    const currentPathname = router.state.location.pathname;
    return getKeyFromPath(currentPathname);
  });

  // Update selected key when route changes
  React.useEffect(() => {
    const currentPathname = router.state.location.pathname;
    setSelectedKey(getKeyFromPath(currentPathname));
  }, [router.state.location.pathname]);

  // Handle menu selection
  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
    // Navigate to the corresponding route if needed
    if (keyToRouteMap[key as keyof typeof keyToRouteMap]) {
      navigate({ to: keyToRouteMap[key as keyof typeof keyToRouteMap] });
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
      icon: <HousePlus style={{ height: "17px" }} />,
      label: "List Your Room",
    },
    {
      key: "5",
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
            selectedKeys={[selectedKey]}
            items={items}
            onSelect={handleMenuSelect}
          />
        </Sider>
        <Layout>
          {/* <Header style={{ padding: 0 }} /> */}
          <Content style={{  flex: "1 0 auto" }}>
            <Outlet />
          </Content>
          <Footer
            style={{
              height: "3vh",
              textAlign: "center",
              backgroundColor: token.colorPrimaryBg,
              flexShrink: 0,
            }}
          >
            Roaming Roomies ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}