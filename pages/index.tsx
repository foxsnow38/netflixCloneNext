import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import Billboard from "../components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "../hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
}

export default function Home() {
  const { isError, isLoading, movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { closeModal, isOpen } = useInfoModal();
  return (
    <>
      <InfoModal vis={isOpen} onClose={closeModal} />
      <Navbar />

      <Billboard />
      <div className=" pb-4 py-2  flex flex-col gap-3">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
