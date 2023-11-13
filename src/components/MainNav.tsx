"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNav = () => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Create",
      href: "/create/new",
      active: pathname === '/create/new',
    },
    {
      label: "Profile",
      href: "/profile",
      active: pathname === '/profile',
    },
  ];
  return (
    <div>
      <ul className="flex items-center space-x-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            className={cn(
              "text-md font-medium transtion-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
            href={route.href}
          >
            {route.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MainNav;
