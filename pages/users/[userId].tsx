import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import Form from "@/components/Form";
import useCurrentUser from "@/hooks/useCurrentUser";

const UserView = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      {currentUser?.id === userId && <Form placeholder="What's happening?" />}
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
