import React from "react";

interface HeaderProps {
  children: string;
}
const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div className="ml-56 h-screen">
      <div className="h-[65px] border-2 border-l-0">
        <p className="m-4 font-bold text-muted">{children}</p>
      </div>
    </div>
  );
};

export default Header;
