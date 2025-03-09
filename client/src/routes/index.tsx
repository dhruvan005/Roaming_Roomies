import * as React from "react";
import { Button } from "antd";
import { createFileRoute } from "@tanstack/react-router";
import Home from "../assets/home.png";
import People from "../assets/people.png";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="">
      {/* <div className="text-center heroHeader p-2 text-xl">
        <h2> <span className="font-bold">Roaming Roomies</span> brings places and people together</h2>
      </div> */}
      <div className="heroHeader  ">
        <div className="h-20"></div>
        <div className="text-center  text-xl">
          <h2>
            {" "}
            <span className="font-bold">Roaming Roomies</span> brings places and
            people together !! 
          </h2>
        </div>
        <div className="h-9"></div>
        <div>
          <div className="text-center flex items-center gap-5 justify-center">
            <div className="text-center">
              <Button className=" min-h-20  flex items-center justify-center" >
                List Your Room ? 
                <img
                  className="h-30 transition-transform duration-300 ease-in-out transform hover:scale-110"
                  src={Home}
                  alt=""
                />
              </Button>
            </div>
            <div className="text-center ">
              <Button className="min-h-20 flex items-center justify-center" href="/allUsers">
                Looking for Roommate ?
                <img
                  className="h-30 transition-transform duration-300 ease-in-out transform hover:scale-110"
                  src={People}
                  alt=""
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* it will come after login  */}
      {/* before auth it should show login or register   */}
      {/* after auth chack we can load the all components  */}
    </div>
  );
}
