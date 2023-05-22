"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Profile from "@components/Profile";


const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are your sure to Delete this Prompt?");

    if(hasConfirmed){
      try{
        const response = await fetch(`/api/prompt/${post._id.toString()}`,{
          method: "DELETE"
        });

        const filteredPosts = posts.filter((p) => p.id !== post._id);

        setPosts(filteredPosts);
        
        if (response.ok) {
          router.push("/");
        }

      }catch(err){
        console.log(err);
      }
    }

  };

  return (
    <>
      {session ? (
        <Profile
          name="My"
          desc="Welcome to your Personalized Profile page"
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        router.push("/")
      )}
    </>
  );
};

export default MyProfile;
