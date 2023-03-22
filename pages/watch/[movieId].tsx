import React from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
export default function MovieId() {
  const router = useRouter();
  const { movieId } = router.query as { movieId: string };
  console.log("movieID", movieId);

  const { isError, movie, isLoading } = useMovie(movieId);

  return (
    <div className="h-screen w-screen bg-zinc-900 ">
      <nav
        className="
 fixed
 w-full
 p-4
 z-10
 flex
    flex-row
    
    items-center
    gap-8
    bg-black
    bg-opacity-70

"
      >
        <AiOutlineArrowLeft
          size={40}
          className="text-white"
          onClick={() => router.push("/")}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light ">Watching</span>
          {movie?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        src={movie?.videoUrl}
        className="h-full  w-full object-cover "
      ></video>
    </div>
  );
}
