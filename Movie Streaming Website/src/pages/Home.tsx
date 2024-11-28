import { useOutletContext } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

const Home = () => {
  const {
    movies,
  }: {
    movies: Array<{
      id: number;
      title?: string;
      name?: string;
      backdrop_path?: string;
    }>;
  } = useOutletContext();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const moviesPerPage = 15;

  const currentMovies = useMemo(() => {
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    return movies.slice(indexOfFirstMovie, indexOfLastMovie);
  }, [movies, currentPage]);

  const handleCardClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="pt-10 flex flex-col items-center">
      {movies && movies.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {currentMovies.map((movie) => (
            <Card
              key={movie.id}
              style={{
                width: "250px",
                height: "350px",
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#f5f5f7",
                display: "flex",
                alignItems: "flex-end",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleCardClick(movie.id)}
            >
              <CardHeader
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  width: "100%",
                  padding: "10px",
                }}
              >
                <CardTitle>{movie.title || movie.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <p style={{ color: "#f5f5f7" }}>No movies to display</p>
      )}

      <div className="mt-6">
        <ul className="flex gap-4">
          {currentPage > 1 && (
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                className="text-white hover:text-teal-500"
              >
                &laquo; Prev
              </button>
            </li>
          )}

          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1}>
              <button
                onClick={() => paginate(index + 1)}
                className={`text-white hover:text-teal-500 ${
                  currentPage === index + 1 ? "font-bold" : ""
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          {currentPage < totalPages && (
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                className="text-white hover:text-teal-500"
              >
                Next &raquo;
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
