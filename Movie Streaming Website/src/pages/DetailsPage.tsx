import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface MovieDetails {
  title: string;
  overview: string;
  poster_path?: string;
  release_date: string;
  vote_average: number;
}

interface Video {
  key: string;
  site: string;
  type: string;
}

const DetailsPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [trailer, setTrailer] = useState<Video | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return;

      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      const options = {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDI2NWY3Y2JhZmUyMjEwNDcwZjg5YTJjOTYzNTM5NiIsIm5iZiI6MTczMTE0MzE2Ni44NTY5MDIxLCJzdWIiOiI2NzJlNTM0OGYwOTI3YWNkZTBkMWNhOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UfslpLxb3WhE7o17d8hiUjkyeQhQ3BxyBLu_o2h_Q5U",
        },
      };

      try {
        const response = await axios.get(url, options);
        setMovieDetails(response.data);

        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );
        const trailerData = videoResponse.data.results.find(
          (video: Video) => video.type === "Trailer"
        );
        setTrailer(trailerData || null);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) return <p>Loading...</p>;

  const trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}`
    : null;

  return (
    <div className="py-16 bg-gray-900 text-white flex flex-col items-center md:flex-row md:justify-center md:gap-12 px-6">
      <div className="flex-1 md:max-w-lg">
        <img
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
              : "/path/to/placeholder-image.jpg"
          }
          alt={movieDetails.title || "Movie Poster"}
          className="rounded-xl shadow-lg w-3/4 max-w-md mx-auto"
        />
      </div>

      <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight mb-4">
          {movieDetails.title}
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-4">
          {movieDetails.overview}
        </p>

        <div className="mb-4">
          <p className="text-base font-semibold text-gray-400">
            Release Date:{" "}
            <span className="text-gray-200">{movieDetails.release_date}</span>
          </p>
          <p className="text-base font-semibold text-gray-400">
            Rating:{" "}
            <span className="text-gray-200">
              {movieDetails.vote_average} / 10
            </span>
          </p>
        </div>

        <div>
          <button
            className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-500 transition-all duration-300"
            onClick={() => {
              if (trailerUrl) {
                window.open(trailerUrl, "_blank");
              }
            }}
          >
            Watch Now
          </button>
        </div>

        {trailerUrl && (
          <div className="mt-8">
            <iframe
              width="560"
              height="315"
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
