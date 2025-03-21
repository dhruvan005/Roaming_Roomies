import * as React from "react";
import { Button } from "antd";
import { createFileRoute } from "@tanstack/react-router";
import Home from "../../assets/home.png";
import People from "../../assets/people.png";
import { User } from "lucide-react";
import UserList from "../../components/UserList";
import Information from "../../components/Information";
import { Divider } from "antd";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-5 md:p-0">
      <div className="h-25"></div>
      <div className="text-center text-md md:text-xl">
        <h2 className="text-2xl  md:text-3xl">
          Welcome to <span className="font-bold">Roaming Roomies</span> brings
          places and people together !!
        </h2>
      </div>
      <div className="h-9"></div>
      <div>
        <div className="text-center flex flex-col md:flex-row items-center gap-5 justify-center">
          <div className="text-center mb-4 md:mb-0">
            <Button
              className="min-h-20 flex items-center justify-center"
              // href="/HouseListing"
              onClick={() => navigate({ to: "/HouseListing" })}
            >
              Rent your House !
              <img
                className="h-30 transition-transform duration-300 ease-in-out transform hover:scale-110"
                src={People}
                alt=""
              />
            </Button>
          </div>
          <div className="text-center">
            <Button
              className="min-h-20 flex items-center justify-center"
              // href="/roomListing"
              onClick={() => navigate({ to: "/roomListing" })}
            >
              Looking for Roommate ?
              <img
                className="h-25 transition-transform duration-300 ease-in-out transform hover:scale-110"
                src={Home}
                alt="profileCreation"
              />
            </Button>
          </div>
        </div>
      </div>
      {/* <Divider /> */}
      {/* <UserList />
      <Information  /> */}
    </div>
  );
}
