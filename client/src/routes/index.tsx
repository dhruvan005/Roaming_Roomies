import * as React from "react";
import { Button } from "@carbon/react";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/")({
  component: HomeComponent,
});



function HomeComponent() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold">Welcome UserName !! 👋 </h1>
      {/* it will come after login  */}
      {/* before auth it should show login or register   */}
      {/* after auth chack we can load the all components  */}
    </div>
  );
}
