import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import MessageDemo from "../../components/MessageDemo";

export const Route = createFileRoute("/_authenticated/about")({
  component: AboutComponent,
});

function AboutComponent() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Page</h1>
      <div className="text-xl text-gray-600 mb-4">
        Page is Under Construction
      </div>
      <p className="text-gray-500 max-w-md text-center mb-8">
        We are working hard to bring you an amazing house listing experience.
        Please check back soon for exciting updates!
      </p>
      <Button
        type="primary"
        size="large"
        icon={<HomeOutlined />}
        className="flex items-center gap-2 hover:opacity-90"
        onClick={handleBackToHome}
      >
        Back to Home
      </Button>
     
    </div>
  );
}
