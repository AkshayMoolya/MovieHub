import "../Header/Header.css";
import React from "react";

const Header = () => {
  return (
    <span
      className="header"
      onClick={() => {
        window.scroll(0, 0);
      }}
    >🎥
      Movieshub 🎬
    </span>
  );
};

export default Header;
