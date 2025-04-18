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
import UserListItem from "../../components/UserListItem";

export const Route = createFileRoute("/_authenticated/")({
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4 lg:p-8 min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center py-8 md:py-12 lg:py-16">
        <div className="text-center max-w-3xl mb-10 md:mb-16">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
            Welcome to{" "}
            <span className="font-extrabold bg-blue-100 text-blue-600/90 p-1 rounded-xs">Roaming Roomies</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Bringing places and people together!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-3xl ">
          <Button
            className="flex items-center justify-between min-h-12 md:min-h-18 px-6 py-4 rounded-lg shadow-md hover:shadow-lg duration-300 ease-in-out group bg-white border border-gray-100"
            onClick={() => navigate({ to: "/HouseListing" })}
            size="large"
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-lg md:text-xl font-medium mb-1">
                I Have a Room
              </span>
              <span className="text-gray-500 text-xs md:text-sm">
                Share your space with roommates
              </span>
            </div>
            <img
              className="h-16 md:h-20 transition-transform duration-300 ease-in-out group-hover:scale-110"
              src={People}
              alt="House icon"
            />
          </Button>

          <Button
            className="flex items-center justify-between min-h-12 md:min-h-18 px-6 py-4 rounded-lg shadow-md hover:shadow-lg duration-300 ease-in-out group bg-white border border-gray-100"
            onClick={() => navigate({ to: "/roommateListing" })}
            size="large"
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-lg md:text-xl font-medium mb-1">
                I Need a Room
              </span>
              <span className="text-gray-500 text-xs md:text-sm">
                Find your perfect roommate
              </span>
            </div>
            <img
              className="h-16 md:h-20 transition-transform duration-300 ease-in-out group-hover:scale-110"
              src={Home}
              alt="Roommate icon"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
