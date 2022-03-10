import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
  const [movies, setMovies] = useState([]);
  const [loadding, setLoadding] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = React.useCallback(async () => {
    setLoadding(true);
    try {
      const res = await fetch("https://swapi.dev/api/films");
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      console.log(res);
      const data = await res.json();
      const dataFormated = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.opening_crawl,
          openingText: movie.openingText,
        };
      });
      setMovies(dataFormated);
    } catch (error) {
      setError(error.message);
    }
    setLoadding(false);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  let content = <p>Found no Movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (loadding) {
    content = <p>Loadding</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
