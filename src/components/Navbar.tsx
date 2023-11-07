import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "./MainNav";

const Navbar = async () => {
  const { userId } = auth();
  return (
    <nav className="w-full h-16 flex items-center justify-between px-12 border-b mb-6">
      <div className="logo">
        <Link className="text-2xl font-bold text-[#222]" href={"/"}>
          Innovate.dev
        </Link>
      </div>

      <div className="menu flex items-center space-x-6">
        <MainNav />
        <div>
          {userId ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href={"/sign-in"}>
              <Button size={"sm"}>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
