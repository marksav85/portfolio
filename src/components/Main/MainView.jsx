import { Profile } from "./Profile/Profile";
import { Work } from "./Work/Work";
import { Contact } from "./Contact/Contact";
import References from "./References/References";

export const MainView = () => {
  return (
    <div id="main">
      <Profile />
      <Work />
      <Contact />
      <References />
    </div>
  );
};
