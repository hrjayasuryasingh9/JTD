import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import axios from "axios";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
}

interface ApiResponse {
  results: Movie[];
  total_pages: number;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const moviesPerPage = 16;
  const maxMovies = 64;
  const maxPages = Math.ceil(maxMovies / moviesPerPage);

  const fetchMoviesData = async () => {
    const url = `https://api.themoviedb.org/3/trending/all/week?language=en-US`;
    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDI2NWY3Y2JhZmUyMjEwNDcwZjg5YTJjOTYzNTM5NiIsIm5iZiI6MTczMTE0MzE2Ni44NTY5MDIxLCJzdWIiOiI2NzJlNTM0OGYwOTI3YWNkZTBkMWNhOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UfslpLxb3WhE7o17d8hiUjkyeQhQ3BxyBLu_o2h_Q5U",
      },
    };

    setLoading(true);
    setError(null);
    let allMovies: Movie[] = [];

    try {
      for (let page = 1; page <= maxPages; page++) {
        const response = await axios.get<ApiResponse>(
          `${url}&page=${page}`,
          options
        );
        allMovies = allMovies.concat(response.data.results);

        if (allMovies.length >= maxMovies) {
          allMovies = allMovies.slice(0, maxMovies);
          break;
        }
      }

      setMovies(allMovies);
    } catch (error) {
      console.error("Error fetching movies data:", error);
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesData();
  }, []);

  return (
    <main>
      <Header />
      <div className="pt-16">
        {loading ? (
          <p>Loading movies...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Outlet context={{ movies }} />
        )}
      </div>
      <Footer />
    </main>
  );
}

export default App;
