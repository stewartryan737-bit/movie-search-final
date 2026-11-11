import React from "react";
import { Link } from "react-router-dom";

function Nav() {

  return (
    <nav>
     <img src="./assets/fes-logo.png" alt="Logo" />
      <Link to="/">Home</Link>
    </nav>
  );
}

export default Nav;