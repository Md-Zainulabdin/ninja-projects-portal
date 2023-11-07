import Navbar from "@/components/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="px-12">{children}</main>
    </>
  );
};

export default layout;
