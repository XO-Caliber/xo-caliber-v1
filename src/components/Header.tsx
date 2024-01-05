import React from "react";

interface HeaderProps {
  children: string;
  className?: string;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <div className={`ml-56  ${className}`}>
      <div className="h-[65px] border-2 border-l-0">
        <p className="m-4 font-bold text-muted">{children}</p>
      </div>
    </div>
  );
};

export default Header;
