import { Profile } from "./profile-section/profile-section";
import { Work } from "./work-section/work-section";
import { Contact } from "./contact-section/contact-section";
import References from "./references-section/References";

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
