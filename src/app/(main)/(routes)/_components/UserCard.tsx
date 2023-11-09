import { currentUser } from "@clerk/nextjs";

const UserCard = async () => {
  const user = await currentUser();
  return (
    <div>
      <div className="flex gap-3 items-center">
        <div className="img">
          <img
            className="rounded-full w-[35px] h-[35px]"
            src={user?.imageUrl}
            alt="Profile Image"
          />
        </div>

        <div className="profile">
          <h1 className="text-sm font-semibold text-[#333]">
            {user?.firstName}
          </h1>
          <p>{user?.username}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
