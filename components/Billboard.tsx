import React from "react";
import { useBillboard } from "../hooks/useBillboard";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
export default function Billboard() {
  const { data, error, isLoading } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenModal = React.useCallback(() => {
    openModal(data?.id);
  }, [data?.id, openModal]);

  return (
    data && (
      <div className=" relative h-[56.25vw]">
        <video
          className="w-full h-[56.25vw] object-cover brightness-[60%]"
          poster={data?.thumbnailUrl}
          src={data?.videoUrl}
          autoPlay
          muted
          loop
        ></video>
        <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16 ">
          <p className="text-white text-xl md:text-5xl font-bold h-full w-[50%] lg:text-6xl drop-shadow-lg">
            {data?.title}
          </p>
          <p
            className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] lg:text-xl drop-shadow-lg md:w-[80%]
        lg:w-[50%]
        "
          >
            {data?.description}
          </p>
          <div
            className="
        flex flex-row 
        items-center
        mt-3
        md:mt-4
        gap-3
        "
          >
            <PlayButton movieId={data?.id} />
            <button
              className="
    bg-white
    text-white
    bg-opacity-30
    py-1
    md:py-2
    px-2 md:px-4
    w-auto
    text-xs lg:text-lg font-semibold  flex flex-row items-center hover:bg-opacity-50 transition
    rounded-md"
              onClick={handleOpenModal}
            >
              <AiOutlineInfoCircle
                className="
            mr-1 
            
            "
              />
              More Info
            </button>
          </div>
        </div>
      </div>
    )
  );
}
