import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={"/not-found.png"}
          alt="not-found"
          width={300}
          height={300}
          priority
        />
        <h1 className="text-3xl font-medium">Opps! Page Not Found</h1>
        <Link href={"/"}>
          <Button variant={"default"}>
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
