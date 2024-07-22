import ProfileCard from "../leftMenu/ProfileCard";
import Ad from "../Ad";
import MenuBar from "../MenuBar";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6 mb-24">
     {type === "home" && <div className="max-xl:hidden"> <ProfileCard /></div>}
     <MenuBar/>
      <Ad size="sm"/>
    </div>
  );
};

export default LeftMenu;