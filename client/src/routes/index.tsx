import * as React from "react";
import { Button } from "@carbon/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="">
      {/* <div className="text-center heroHeader p-2 text-xl">
        <h2> <span className="font-bold">Roaming Roomies</span> brings places and people together</h2>
      </div> */}
      <div className="heroHeader">
        <div className="h-20"></div>
        <div className="text-center  text-xl">
          <h2>
            {" "}
            <span className="font-bold">Roaming Roomies</span> brings places and
            people together
          </h2>
        </div>
        <div>
          <div className="text-center">
            <Button className="m-2" kind="primary" size="lg" >
              Login
              <img src="" alt="" />
            </Button>
            <Button className="m-2" kind="secondary" size="lg" >
              Register
            </Button>
          </div>
        </div>
      </div>

      {/* it will come after login  */}
      {/* before auth it should show login or register   */}
      {/* after auth chack we can load the all components  */}
    </div>
  );
}
