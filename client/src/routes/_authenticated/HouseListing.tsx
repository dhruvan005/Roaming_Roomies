import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import UC from "../../assets/under-construction.png";
import { Card, Avatar } from 'antd';
import { Divider } from "antd";
const { Meta } = Card;

export const Route = createFileRoute("/_authenticated/HouseListing")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    // <div className="min-h-screen flex flex-col items-center justify-center p-8">
    //   <div className="mb-4 w-25">
    //     <img src={UC} alt="" />
    //   </div>
    //   <h1 className="text-4xl font-bold text-gray-800 mb-4">House Listing</h1>
    //   <div className="text-xl text-gray-600 mb-4">
    //     Page is Under Construction
    //   </div>
    //   <p className="text-gray-500 max-w-md text-center mb-8">
    //     We are working hard to bring you an amazing house listing experience.
    //     Please check back soon for exciting updates!
    //   </p>
    //   <Link to="/">
    //     <Button
    //       type="primary"
    //       size="large"
    //       icon={<HomeOutlined />}
    //       className="flex items-center gap-2 hover:opacity-90"
    //     >
    //       Back to Home
    //     </Button>
    //   </Link>
    // </div>
    <div>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-2xl font-medium">
            Check Out some amazing Rooms
          </div>
          <div>
            <Link to="/">
              <Button
                type="primary"
                size="large"
                icon={<HomeOutlined />}
                className="flex text-xs items-center gap-2 hover:opacity-90"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Divider style={{
          margin:'15px'
        }} />
        <div className="flex gap-3 flex-wrap">

          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://images.pexels.com/photos/6434595/pexels-photo-6434595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />}
          >
            <Meta title="House - A.V Road , Anand" description=" 5000/- month" />
          </Card>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://images.pexels.com/photos/6782270/pexels-photo-6782270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />}
          >
            <Meta title="Apartment - Science City" description="1200/- month" />
          </Card>

        </div>
      </div>
    </div>
  );
}
