import * as React from "react";
import { Button } from "antd";
import { createFileRoute } from "@tanstack/react-router";
import Home from "../../assets/home.png";
import People from "../../assets/people.png";
import { User } from "lucide-react";
import UserList from "../../components/UserList";
import Information from "../../components/Information";
import { Divider } from 'antd';

export const Route = createFileRoute("/_authenticated/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="container mx-auto">
      <div className="h-20"></div>
      <div className="text-center text-md md:text-xl">
        <h2>
          Welcome to {" "}
          <span className="font-bold">Roaming Roomies</span> brings places and
          people together !!
        </h2>
      </div>
      <div className="h-9"></div>
      <div>
        <div className="text-center flex flex-col md:flex-row items-center gap-5 justify-center">
          <div className="text-center mb-4 md:mb-0">
            <Button
              className="min-h-20 flex items-center justify-center"
              href="/roomListing"
            >
              Create your Room Listing !
              <img
                className="h-30 transition-transform duration-300 ease-in-out transform hover:scale-110"
                src={Home}
                alt="profileCreation"
              />
            </Button>
          </div>
          <div className="text-center">
            <Button
              className="min-h-20 flex items-center justify-center"
              href="/allUsers"
            >
              Looking for Roommate ?
              <img
                className="h-25 transition-transform duration-300 ease-in-out transform hover:scale-110"
                src={People}
                alt=""
              />
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      {/* <UserList />
      <Information  /> */}
    </div>
  );
}
