
import ProfileCard from "../leftMenu/ProfileCard";
import Ad from "../Ad";
import MenuBar from "../MenuBar";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
     <MenuBar/>
      <Ad size="sm"/>
    </div>
  );
};

export default LeftMenu;