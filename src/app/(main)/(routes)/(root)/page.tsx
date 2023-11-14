import Link from "next/link";

import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      <div className="relative z-20 Hero-Text flex flex-col space-y-5 justify-center items-center py-12 md:py-20">
        <div>
          <span className="px-6 py-2 border text-muted-foreground shadow-md rounded-full">
            A Place Where Ideas Shines 🚀
          </span>
        </div>

        <div className="text-center space-y-3 pt-3">
          <h1 className="text-6xl font-semibold text-[#222]">
            Elevate Your Creations
          </h1>
          <h1 className="text-6xl font-semibold text-[#222]">
            with <span className="text-primary"> Innovate.dev</span>
          </h1>
        </div>

        <div className="text-center">
          <p className="max-w-[500px] text-lg text-muted-foreground">
            Innovate.dev is here to empower your projects, Join us in
            highlighting your professional journey
          </p>
        </div>

        <div className="mt-3">
          <Link href={"/projects"}>
            <Button size={"lg"} className="text-lg">
              Explore
            </Button>
          </Link>
        </div>
      </div>

      <div className="footer-gradient z-0"></div>

      <div className="Hero-Image"></div>
    </div>
  );
};

export default Home;
