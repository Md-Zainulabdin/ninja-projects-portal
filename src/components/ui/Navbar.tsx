import Link from "next/link";
import { UserButton, auth, SignOutButton } from "@clerk/nextjs";

const Navbar = async () => {
  const { userId } = await auth();
  return (
    <nav className="w-full h-16 flex items-center justify-between px-8 border-b mb-6">
      <h1 className="text-2xl">Ninja-Projects</h1>
      <Link href={"/sign-in"}>Login</Link>
    </nav>
  );
};

export default Navbar;
