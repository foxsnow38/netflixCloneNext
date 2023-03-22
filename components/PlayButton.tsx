import React from "react";

import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";

type PlayButtonProps = {
  movieId: string;
};

export default function PlayButton({ movieId }: PlayButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(`/watch/${movieId}`);
      }}
      className="
      bg-white

      rounded-md
      py-1
      md:py-2
        px-2 md:px-4
         w-auto
            text-xs lg:text-lg font-semibold  flex flex-row items-center hover:bg-opacity-50 transition
      "
    >
      <BsFillPlayFill className="text-black mr-1" size={27} />
      Play
    </button>
  );
}
