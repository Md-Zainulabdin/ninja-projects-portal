import React from "react";
import { Heading, Button } from "@radix-ui/themes";

const Navbar = () => {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-8 border-b mb-6">
      <div className="logo">
        <Heading size={"6"}>Ninja</Heading>
      </div>

      <div className="menu">
        <Button variant="outline">Login</Button>
      </div>
    </nav>
  );
};

export default Navbar;
