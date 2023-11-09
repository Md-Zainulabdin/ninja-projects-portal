import { currentUser } from "@clerk/nextjs";

const UserCard = async () => {
  const user = await currentUser();
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
        <div className="img">
          <img
            className="rounded-full w-[70px] h-[70px]"
            src={user?.imageUrl}
            alt="Profile Image"
          />
        </div>

        <div className="profile text-center">
          <h1 className="text-2xl font-semibold text-[#333]">
            {user?.firstName} {user?.lastName}
          </h1>
          <div>
            {user?.emailAddresses.map((emailAddress, index) => (
              <span className="text-sm text-muted-foreground" key={index}>{emailAddress.emailAddress}</span>
            ))}
          </div>
        </div>
    </div>
  );
};

export default UserCard;
