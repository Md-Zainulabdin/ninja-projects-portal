import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";

const Navbar = async () => {
  const { userId } = await auth();
  return (
    <nav className="w-full h-16 flex items-center justify-between px-12 border-b mb-6">
      <div className="logo">
        <Link className="text-xl font-bold text-[#222]" href={"/"}>
          ninja-projects
        </Link>
      </div>

      <div className="menu">
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href={"/sign-in"}>
            <Button size={"sm"}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
