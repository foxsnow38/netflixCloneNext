import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
interface InfoModalProps {
  movieId?: string;
  vis: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({
  movieId: MovieID,
  vis,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(!!vis);

  const { movieId } = useInfoModal();
  const { movie, isLoading, isError } = useMovie(MovieID || movieId || "");
  useEffect(() => {
    setIsVisible(!!vis);
  }, [vis]);

  const handleClose = React.useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isVisible) return null;
  // else
  return (
    <div
      className="
  z-50
transition
duration-300
bg-black
bg-opacity-50
flex justify-center
items-center
overflow-x-hidden
overflow-y-auto
fixed
inset-0"
    >
      <div
        className="
relative
w-auto
mx-auto
max-w-3xl
rounded-md
overflow-hidden
bg-zinc-800"
      >
        <div
          className={` ${
            isVisible ? "scale-100" : "scale-0"
          } transform relative flex-auto bg-zinc-900 drop-shadow-md
      `}
        >
          <div
            className="
relative
 h-96
"
          >
            <video
              className="
             w-full
             brightness-[60%]
             object-cover
             h-full
            "
              autoPlay
              muted
              loop
              poster={movie?.thumbnailUrl || ""}
              src={movie?.videoUrl}
            ></video>
            <div
              className="
              cursor-pointer
              absolute
              top-3
              right-3
              h-100
              rounded-full
              bg-black
              bg-opacity-80
              flex 
              items-center
              justify-center
              p-1
              "
              onClick={handleClose}
            >
              <AiOutlineClose className="text-white " size={15} />
            </div>
            <div
              className="
            absolute
            bottom-[10%]
            left-10

            "
            >
              <p className="text-white text-3xl md:text-4xl font-bold h-full lg:text-5xl mb-8">
                {movie?.title}
              </p>
              <div
                className="
              flex flex-row
              gap-4
              items-center
              "
              >
                <PlayButton movieId={movieId || ""} />
                <FavoriteButton movieId={movieId || ""} />
              </div>
            </div>
          </div>
          <div
            className="
          px-12
           py-8

          "
          >
            <p className="text-green-400 font-semibold text-lg">
              New
              <span
                className="
            text-white
            ml-2
            font-normal
            "
              >
                {movie?.duration}
              </span>
            </p>

            <p className="text-white text-lg ">{movie?.genre}</p>
            <p className="text-white text-lg ">{movie?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
