import React from "react";
// import SaveChanges from "./pages/q&a/viewQA/firm/SaveChanges";

interface HeaderProps {
  children: string;
  workspace?: string;
}
const Header: React.FC<HeaderProps> = ({ children, workspace }) => {
  return (
    <div className={`ml-56 `}>
      <div className="h-[68px] border-2 border-l-0">
        <p className="m-4 mt-[1.2rem] font-bold text-muted">{children}</p>
        {/* {workspace === "Caliber QA" && (
          <div className="relative bottom-11 left-[1400px]">
            <SaveChanges />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Header;
