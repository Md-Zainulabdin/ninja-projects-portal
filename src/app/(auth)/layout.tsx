"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <div className="absolute top-12 left-12" onClick={() => router.back()}>
        <Button size={"sm"} variant={"default"}>
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
