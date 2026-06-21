import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import SearchBar from '../SearchBar/SearchBar';
import type { Movie } from '../../types/movie';
import css from './App.module.css';




export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

const handleSearch = async (query: string) => {
  try {
    setLoading(true);
    setError(false);
    setMovies([]);

    const data = await fetchMovies(query);

    if (!data || data.length === 0) {
      toast.error('No movies found for your request.');
      setMovies([]);
      return;
    }

    setMovies(data);

  } catch (err) {
    console.log("SEARCH ERROR:", err);
    setError(true);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={css.app}>
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

      {loading && <Loader />}

      {error && <ErrorMessage />}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
