import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import MainNav from "./MainNav";

const Navbar = () => {
  const { userId } = auth();
  return (
    <nav className="w-full h-20 flex items-center justify-between px-6 lg:px-12 border-b mb-6 bg-white">
      <div className="logo flex items-center space-x-6">
        <Link className="text-2xl font-bold text-[#222]" href={"/"}>
          Innovate.dev
        </Link>
        {userId && <MainNav />}
      </div>

      <div className="menu flex items-center space-x-6">
        {userId && (
          <Link
            href={"/profile"}
            className="text-md transtion-colors text-muted-foreground hover:text-primary"
          >
            Profile
          </Link>
        )}
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
