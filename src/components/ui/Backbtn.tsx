"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

const BackBtn = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.back()}>
      <Button size={"sm"} variant={"outline"}>
        <ChevronLeft className="w-5 h-5 mr-2" />
        Back
      </Button>
    </div>
  );
};

export default BackBtn;
