import React from "react";
import { Profile } from "./Profile/Profile";
import { Work } from "./Work/Work";
import { Contact } from "./Contact/Contact";
import References from "./References/References";

// Define the functional component with an explicit return type
export const MainView: React.FC = () => {
  return (
    <div id="main">
      <Profile />
      <Work />
      <Contact />
      <References />
    </div>
  );
};
