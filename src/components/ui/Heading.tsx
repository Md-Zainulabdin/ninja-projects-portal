interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl lg:text-3xl font-bold text-[#222]">{title}</h1>
      <p className="text-md text-[#777]">{description}</p>
    </div>
  );
};

export default Heading;
