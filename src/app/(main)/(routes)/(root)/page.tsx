import Link from "next/link";
import Image from "next/image";

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

      <div className="Hero-Image relative z-20 w-full flex justify-center items-center mb-12">
        <div className="w-full rounded-xl p-3 bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <Image
            src={"/hero-bg.jpg"}
            alt="product preview"
            width={1200}
            height={500}
            // quality={100}
            className="w-full rounded-md shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>
      </div>

      <footer className="w-full h-[60px] flex items-center justify-center border-t mt-6">
        <div className="text-center py-3">
          <h1 className="text-lg text-[#555] font-medium">Innovate<span className="text-indigo-500">.dev</span></h1>
          <p className="text-sm text-muted-foreground">Developed by ~ Zain-ul-Abdin</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
