import React from "react";
import MovieCard from "./MovieCard";

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

export default function MovieList({ data, title }: MovieListProps) {
  if (data.length === 0) return null;

  return (
    <div className="px-4 px-12 space-y-8">
      <div>
        <p className="text-white md:text-lg lg:text-2xl font-semibold mb-4 ">
          {title}
        </p>
        <div
          className="
        grid
        grid-cols-4
        gap-2"
        >
          {data.length > 0 &&
            data.map((movie) => <MovieCard key={movie.id} data={movie} />)}
        </div>
      </div>
    </div>
  );
}
