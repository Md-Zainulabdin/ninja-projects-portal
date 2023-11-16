import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

const UserCard = async () => {
  const user = await currentUser();
  return (
    <div className="px-6 flex flex-col gap-4 justify-center items-center">
        <div className="img">
          <Image
          className="rounded-full w-[80px] h-[80px]"
          src={user?.imageUrl || ""}
          alt="Profile Image"
          />
        </div>

        <div className="profile text-center">
          <h1 className="text-3xl font-semibold text-[#333]">
            {user?.firstName} {user?.lastName}
          </h1>
          <div>
            {user?.emailAddresses.map((emailAddress, index) => (
              <span className="text-md text-muted-foreground" key={index}>{emailAddress.emailAddress}</span>
            ))}
          </div>
        </div>
    </div>
  );
};

export default UserCard;
