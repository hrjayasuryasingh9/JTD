import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons/faTv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [, setSearching] = useState(false);

  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput) return;

    setSearching(true);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchInput}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDI2NWY3Y2JhZmUyMjEwNDcwZjg5YTJjOTYzNTM5NiIsIm5iZiI6MTczMTE0MzE2Ni44NTY5MDIxLCJzdWIiOiI2NzJlNTM0OGYwOTI3YWNkZTBkMWNhOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UfslpLxb3WhE7o17d8hiUjkyeQhQ3BxyBLu_o2h_Q5U", // Replace with your actual API key
          },
        }
      );

      if (response.data.results.length > 0) {
        const movieId = response.data.results[0].id;
        navigate(`/movie/${movieId}`);
      } else {
        alert("Movie not found. Please check the name and try again.");
      }
    } catch (error) {
      console.error("Error searching for movie:", error);
      alert("There was an error with the search. Please try again later.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75 z-10">
      <div className="container mx-auto px-4 flex items-center h-full">
        <div className="flex justify-between w-full items-center">
          <Link to={"/"}>
            <h1 className="text-start font-sans text-3xl text-blue-400 font-bold">
              <FontAwesomeIcon icon={faTv} /> Homies TV
            </h1>
          </Link>

          <div className="relative">
            <button
              onClick={handleSearchIconClick}
              className="lg:hidden text-white p-2"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            {isSearchVisible && (
              <form
                className="search absolute top-16 left-0 w-full bg-neutral-700 p-2 rounded-md"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Search Movie Name"
                  className="bg-transparent px-4 py-2 w-full"
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                  autoFocus
                />
                <button type="submit" className="hidden">
                  <FontAwesomeIcon icon={faSearch} className="px-2" />
                </button>
              </form>
            )}
          </div>

          <form
            className="search hidden lg:flex items-center border-neutral-400"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Movie Name"
              className="bg-transparent px-4 py-1"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} className="px-2" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
