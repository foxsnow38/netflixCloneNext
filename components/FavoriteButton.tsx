import React from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiFillHeart, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}
const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const { mutate: mutateFavorites } = useFavorites(movieId);
  const { data: currentUser, mutate: mutateUser } = useCurrentUser();

  const isFavorite = React.useMemo(() => {
    return currentUser?.favoritesIds?.includes(movieId);
  }, [currentUser.favoritesIds, currentUser, movieId]);

  const toggleFavorites = React.useCallback(async () => {
    let response: any;
    if (isFavorite) {
      response = await fetch(`/api/favorite/`, {
        body: JSON.stringify({ movieId }),
        method: "DELETE",
      }).then((res) => res.json());
    } else {
      response = await fetch(`/api/favorite`, {
        body: JSON.stringify({ movieId }),

        method: "POST",
      }).then((res) => res.json());
    }

    const updatedFavorites = await response;

    mutateUser(
      {
        ...currentUser,
        favorites: updatedFavorites,
      },
      false
    );
    mutateFavorites();
  }, [currentUser, isFavorite, movieId, mutateFavorites, mutateUser]);

  return (
    <div
      onClick={toggleFavorites}
      className="
  cursor-pointer
  group/item
  w-6
  h-6
  lg:w-10
  lg:h-10
  border-white
  border-2
  rounded-full
  flex
  justify-center
  items-center
     transition
    hover:border-neutral-300"
    >
      {isFavorite ? (
        <AiFillHeart className="text-white" size={24} />
      ) : (
        <AiOutlinePlus className="text-white" size={27} />
      )}
    </div>
  );
};
export default FavoriteButton;
