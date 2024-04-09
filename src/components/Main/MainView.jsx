import { Profile } from "./Profile/Profile";
import { Work } from "./Work/Work";
import { Contact } from "./Contact/Contact";
import References from "./References/References";

export const MainView = ({ isEnglish }) => {
  return (
    <div id="main">
      <Profile isEnglish={isEnglish} />
      <Work isEnglish={isEnglish} />
      <Contact isEnglish={isEnglish} />
      <References isEnglish={isEnglish} />
    </div>
  );
};
